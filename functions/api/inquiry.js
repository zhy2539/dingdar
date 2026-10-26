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
  if (!ip) return '';
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret || 'dingdar'),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(ip));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 32);
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

  const record = {
    name: pick(fields, ['name', 'fullname', 'full_name', 'contact']),
    email: email.slice(0, 200),
    company: pick(fields, ['company', 'organisation', 'organization', 'business']),
    country: pick(fields, ['country', 'country-name', 'market']),
    phone: pick(fields, ['phone', 'tel', 'whatsapp']),
    message: pick(fields, ['message', 'requirements', 'enquiry', 'inquiry', 'details']),
    source_page: pick(fields, ['source_page']).slice(0, 300),
    lang: pick(fields, ['lang', 'language']).slice(0, 8),
    extra: JSON.stringify(
      Object.fromEntries(
        Object.entries(fields).filter(
          ([k]) => !['_honey', 'website', 'email', 'name', 'company', 'country', 'phone', 'message', 'source_page', 'lang'].includes(k)
        )
      )
    ).slice(0, 4000),
    user_agent: (request.headers.get('user-agent') || '').slice(0, 300),
    ip_hash: await hashIp(request.headers.get('cf-connecting-ip'), env.ADMIN_SECRET),
  };

  let stored = false;
  if (env.DB) {
    try {
      await env.DB.prepare(
        `INSERT INTO inquiries
          (created_at, name, email, company, country, phone, message, source_page, lang, extra, status, user_agent, ip_hash)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?, ?)`
      )
        .bind(
          new Date().toISOString(),
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

  if (!stored && !forwarded) return json({ ok: false, error: 'delivery_failed' }, 502);
  return json({ ok: true, stored, forwarded });
}

export async function onRequestGet() {
  return json({ ok: false, error: 'method_not_allowed' }, 405);
}
