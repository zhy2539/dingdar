/**
 * 询盘接收端点：POST /api/inquiry
 *
 * 作用：
 * 1. 把表单内容写入 Cloudflare D1（后台 /admin 从这里读）；
 * 2. 原样转发一份给 Formspree，保留原有的邮件通知，不中断现有流程。
 *
 * 设计原则：两条链路互相兜底。数据库没绑定或写入失败时仍然转发 Formspree，
 * 邮件照常到达；转发失败但数据库写入成功时也返回成功，线索不会丢。
 * 因此即使环境变量还没配好，表单也不会比现在更差。
 */

import { sendInquiryEmail } from '../_lib/notify.js';
import { sendBuyerAck } from '../_lib/ack.js';

const DEFAULT_FORMSPREE = 'https://formspree.io/f/mwlvryqb';

// D1 数据库：dingdar-inquiries（Pages 绑定变量名 DB）

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

const pick = (obj, keys) => {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === 'string' && v.trim()) return v.trim().slice(0, 2000);
  }
  return '';
};

async function readFields(request) {
  const type = request.headers.get('content-type') || '';
  if (type.includes('application/json')) {
    const data = await request.json().catch(() => ({}));
    const out = {};
    for (const [k, v] of Object.entries(data || {})) {
      if (typeof v === 'string') out[k] = v;
    }
    return out;
  }
  const form = await request.formData();
  const out = {};
  for (const [k, v] of form.entries()) {
    if (typeof v === 'string') out[k] = v;
  }
  return out;
}

async function hashIp(ip, secret) {
  if (!ip || !secret) return '';
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(ip));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 32);
}

// 允许的来源站点（含 www 与 pages.dev 预览域）
const ALLOWED_HOSTS = ['dingdar.com', 'www.dingdar.com'];

function isAllowedHost(hostname) {
  const host = String(hostname || '').toLowerCase();
  return ALLOWED_HOSTS.includes(host) || host.endsWith('.dingdar.pages.dev');
}

/**
 * 来源页校验：真人从站内表单提交时，source_page 一定是我们自己的域名。
 * 爬虫直接 POST 接口，这个字段要么没有，要么乱填。
 */
function isSameSiteSource(sourcePage) {
  if (!sourcePage || typeof sourcePage !== 'string') return false;
  try {
    const u = new URL(sourcePage);
    return isAllowedHost(u.hostname);
  } catch {
    return false;
  }
}

/**
 * 同一 IP 每小时最多 5 条。
 * 用 D1 统计最近 1 小时的 ip_hash 命中数；数据库不可用时直接放行，绝不误伤真人。
 */
async function isRateLimited(env, ipHash) {
  if (!env.DB || !ipHash) return false;
  try {
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const row = await env.DB.prepare(
      `SELECT COUNT(*) AS n FROM inquiries WHERE ip_hash = ? AND created_at >= ?`
    )
      .bind(ipHash, since)
      .first();
    return (row?.n ?? 0) >= 5;
  } catch {
    return false;
  }
}

/**
 * Turnstile 校验。只有配置了 TURNSTILE_SECRET_KEY 才强制；
 * 未配置时放行，避免一上线就把旧表单全部挡死。
 */
async function verifyTurnstile(env, request, fields) {
  const secret = env.TURNSTILE_SECRET_KEY;
  const required = String(env.REQUIRE_TURNSTILE || '').toLowerCase() === 'true';
  if (!secret) return required ? { ok: false, reason: 'not_configured' } : { ok: true, skipped: true };

  const token =
    fields['cf-turnstile-response'] || fields['cf_turnstile_response'] || '';
  if (!token) return { ok: false, reason: 'missing_token' };

  try {
    const body = new FormData();
    body.append('secret', secret);
    body.append('response', token);
    const ip = request.headers.get('cf-connecting-ip');
    if (ip) body.append('remoteip', ip);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    });
    const data = await res.json().catch(() => ({}));
    return { ok: !!data.success, reason: (data['error-codes'] || []).join(',') };
  } catch (err) {
    console.error('turnstile verify failed', err);
    // 生产环境可通过 TURNSTILE_FAIL_OPEN=true 显式选择故障放行；默认拒绝，避免验证码故障变成无防护入口。
    return String(env.TURNSTILE_FAIL_OPEN || '').toLowerCase() === 'true'
      ? { ok: true, skipped: 'verify_error' }
      : { ok: false, reason: 'verify_error' };
  }
}

export async function onRequestPost({ request, env }) {
  let fields;
  try {
    fields = await readFields(request);
  } catch {
    return json({ ok: false, error: 'unreadable_body' }, 400);
  }

  // 蜜罐字段有值即视为机器人，静默成功，不给对方反馈
  if (fields._honey || fields.website) return json({ ok: true });

  const email = pick(fields, ['email', 'e-mail', 'mail']);
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ ok: false, error: 'invalid_email' }, 400);
  }

  // ---- 反垃圾三道闸 ----
  // 1) 来源页必须是本站：真实表单一定带 source_page，直接 POST 接口的爬虫这里是空的
  if (!isSameSiteSource(fields.source_page)) {
    return json({ ok: false, error: 'invalid_source' }, 400);
  }

  const rawMessage = pick(fields, ['message', 'requirements', 'enquiry', 'inquiry', 'details']);
  // 2) 正文太短基本是垃圾（"test"、"123" 之类），真人询盘不会这么写
  if (rawMessage.replace(/\s+/g, '').length < 5) {
    return json({ ok: false, error: 'too_short' }, 400);
  }

  // 3) 同一 IP 每小时限流（IP 只存 HMAC 哈希）
  if (!env.ADMIN_SECRET) {
    console.error('inquiry rejected: ADMIN_SECRET is not configured');
    return json({ ok: false, error: 'service_not_configured' }, 503);
  }
  const ipHash = await hashIp(request.headers.get('cf-connecting-ip'), env.ADMIN_SECRET);
  if (await isRateLimited(env, ipHash)) {
    return json({ ok: false, error: 'rate_limited' }, 429);
  }

  // 4) Turnstile（配置了 TURNSTILE_SECRET 才强制）
  const captcha = await verifyTurnstile(env, request, fields);
  if (!captcha.ok) {
    return json({ ok: false, error: 'captcha_failed' }, 400);
  }

  const record = {
    name: pick(fields, ['name', 'fullname', 'full_name', 'contact']),
    email: email.slice(0, 200),
    company: pick(fields, ['company', 'organisation', 'organization', 'business']),
    country: pick(fields, ['country', 'country-name', 'market']),
    phone: pick(fields, ['phone', 'tel', 'whatsapp']),
    message: rawMessage,
    source_page: pick(fields, ['source_page']).slice(0, 300),
    // 站内表单实际提交的字段名是 page_language，早期只认 lang 导致该列一直是空的
    lang: pick(fields, ['lang', 'language', 'page_language']).slice(0, 8),
    extra: JSON.stringify({
      utm_source: pick(fields, ['utm_source']),
      utm_medium: pick(fields, ['utm_medium']),
      utm_campaign: pick(fields, ['utm_campaign']),
      utm_content: pick(fields, ['utm_content']),
      utm_term: pick(fields, ['utm_term']),
      referrer: pick(fields, ['referrer']),
      ...Object.fromEntries(
        Object.entries(fields).filter(
          ([k]) =>
            ![
              '_honey',
              'website',
              'email',
              'name',
              'company',
              'country',
              'phone',
              'message',
              'source_page',
              'lang',
              'cf-turnstile-response',
            ].includes(k)
        )
      )
    }).slice(0, 4000),
    user_agent: (request.headers.get('user-agent') || '').slice(0, 300),
    ip_hash: ipHash,
  };

  const createdAt = new Date().toISOString();
  let extra = {};
  try {
    extra = JSON.parse(record.extra || '{}');
  } catch {
    extra = {};
  }

  let stored = false;
  if (env.DB) {
    try {
      await env.DB.prepare(
        `INSERT INTO inquiries
          (created_at, name, email, company, country, phone, message, source_page, lang, extra, status, user_agent, ip_hash)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?, ?)`
      )
         .bind(
           createdAt,
          record.name,
          record.email,
          record.company,
          record.country,
          record.phone,
          record.message,
          record.source_page,
          record.lang,
          record.extra,
          record.user_agent,
          record.ip_hash
        )
        .run();
      stored = true;
    } catch (err) {
      console.error('D1 insert failed', err);
    }
  }

  let forwarded = false;
  try {
    const endpoint = env.FORMSPREE_ENDPOINT || DEFAULT_FORMSPREE;
    const body = new FormData();
    for (const [k, v] of Object.entries(fields)) body.append(k, v);
    body.append('_source', 'dingdar.com');
    const res = await fetch(endpoint, {
      method: 'POST',
      body,
      headers: { Accept: 'application/json' },
    });
    forwarded = res.ok;
  } catch (err) {
    console.error('Formspree forward failed', err);
  }

  // 邮件通知：额外提醒，失败不影响主链路
  const notify = await sendInquiryEmail(env, record, extra, createdAt);

  // 客户确认信：让买家马上知道信到了，顺便把 12–24 小时的预期讲清楚
  const ack = await sendBuyerAck(env, record, extra);

  if (!stored && !forwarded && !notify.ok) return json({ ok: false, error: 'delivery_failed' }, 502);
  return json(
    {
      ok: true,
      stored,
      forwarded,
      notified: notify.ok,
      acksent: ack.ok,
      ...(notify.skipped ? { notify_skipped: notify.detail } : {}),
      ...(ack.skipped ? { ack_skipped: ack.detail } : {}),
    },
    200
  );
}

export async function onRequestGet() {
  return json({ ok: false, error: 'method_not_allowed' }, 405);
}
