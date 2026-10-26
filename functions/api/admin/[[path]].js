/**
 * 询盘后台接口：/api/admin/*
 *
 *   POST   /api/admin/login              { password }        登录，种签名 Cookie
 *   POST   /api/admin/logout                                 退出
 *   GET    /api/admin/inquiries          ?status=&q=&limit=   列表
 *   POST   /api/admin/update             { id, status }       标记状态
 *   GET    /api/admin/export             ?status=             导出 CSV
 *
 * 需要的环境变量（Cloudflare Pages → Settings → Environment variables）：
 *   ADMIN_PASSWORD  后台登录密码，自己定
 *   ADMIN_SECRET    随机长字符串，用于签发 Cookie 与 IP 哈希
 * 需要 D1 绑定：变量名 DB
 */

const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers },
  });

const enc = new TextEncoder();

async function hmac(secret, message) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

const safeEqual = (a, b) => {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
};

const COOKIE = 'dd_admin';
const MAX_AGE = 60 * 60 * 24 * 7;

function readCookie(request, name) {
  const raw = request.headers.get('cookie') || '';
  for (const part of raw.split(';')) {
    const [k, ...rest] = part.trim().split('=');
    if (k === name) return rest.join('=');
  }
  return '';
}

async function issueToken(secret) {
  const exp = String(Date.now() + MAX_AGE * 1000);
  return `${exp}.${await hmac(secret, exp)}`;
}

async function isAuthed(request, env) {
  if (!env.ADMIN_SECRET) return false;
  const token = readCookie(request, COOKIE);
  if (!token) return false;
  const [exp, sig] = token.split('.');
  if (!exp || !sig) return false;
  if (Number(exp) < Date.now()) return false;
  return safeEqual(sig, await hmac(env.ADMIN_SECRET, exp));
}

const csvCell = (v) => {
  const s = v === null || v === undefined ? '' : String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

import { sendInquiryEmail, NOTIFY_DEFAULT_TO } from '../../_lib/notify.js';

export async function onRequest({ request, env, params }) {
  const seg = Array.isArray(params.path) ? params.path.join('/') : String(params.path || '');
  const route = seg.replace(/^\/+|\/+$/g, '');
  const url = new URL(request.url);
  const method = request.method;

  if (!env.ADMIN_PASSWORD || !env.ADMIN_SECRET) {
    return json({ ok: false, error: 'not_configured', message: 'ADMIN_PASSWORD / ADMIN_SECRET 未设置' }, 503);
  }

  if (route === 'login' && method === 'POST') {
    const body = await request.json().catch(() => ({}));
    if (!safeEqual(String(body.password || ''), env.ADMIN_PASSWORD)) {
      return json({ ok: false, error: 'bad_password' }, 401);
    }
    const token = await issueToken(env.ADMIN_SECRET);
    return json({ ok: true }, 200, {
      'set-cookie': `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${MAX_AGE}`,
    });
  }

  if (route === 'logout' && method === 'POST') {
    return json({ ok: true }, 200, {
      'set-cookie': `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`,
    });
  }

  if (!(await isAuthed(request, env))) return json({ ok: false, error: 'unauthorized' }, 401);
  if (!env.DB) return json({ ok: false, error: 'no_database', message: 'D1 数据库未绑定（变量名应为 DB）' }, 503);

  if (route === 'inquiries' && method === 'GET') {
    const status = url.searchParams.get('status') || '';
    const q = (url.searchParams.get('q') || '').trim();
    const limit = Math.min(Number(url.searchParams.get('limit') || 100) || 100, 300);

    const where = [];
    const binds = [];
    if (status && status !== 'all') {
      where.push('status = ?');
      binds.push(status);
    }
    if (q) {
      where.push('(name LIKE ? OR email LIKE ? OR company LIKE ? OR message LIKE ? OR country LIKE ?)');
      const like = `%${q}%`;
      binds.push(like, like, like, like, like);
    }
    const sql = `SELECT id, created_at, name, email, company, country, phone, message, source_page, lang, status, extra
                 FROM inquiries ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
                 ORDER BY created_at DESC LIMIT ?`;
    const { results } = await env.DB.prepare(sql).bind(...binds, limit).all();

    const counts = await env.DB.prepare('SELECT status, COUNT(*) AS n FROM inquiries GROUP BY status').all();
    const stats = { new: 0, replied: 0, archived: 0, total: 0 };
    for (const row of counts.results || []) {
      const key = row.status || 'new';
      if (key in stats) stats[key] = row.n;
      stats.total += row.n;
    }
    return json({ ok: true, items: results || [], stats });
  }

  if (route === 'update' && method === 'POST') {
    const body = await request.json().catch(() => ({}));
    const id = Number(body.id);
    const status = String(body.status || '');
    if (!Number.isInteger(id) || !['new', 'replied', 'archived'].includes(status)) {
      return json({ ok: false, error: 'bad_request' }, 400);
    }
    await env.DB.prepare('UPDATE inquiries SET status = ? WHERE id = ?').bind(status, id).run();
    return json({ ok: true });
  }

  // 删除单条（清理测试数据 / 垃圾询盘）。前端有二次确认。
  if (route === 'delete' && method === 'POST') {
    const body = await request.json().catch(() => ({}));
    const id = Number(body.id);
    if (!Number.isInteger(id) || id <= 0) return json({ ok: false, error: 'bad_request' }, 400);
    await env.DB.prepare('DELETE FROM inquiries WHERE id = ?').bind(id).run();
    return json({ ok: true });
  }

  if (route === 'export' && method === 'GET') {
    const status = url.searchParams.get('status') || '';
    const sql = `SELECT id, created_at, name, email, company, country, phone, message, source_page, lang, status
                 FROM inquiries ${status && status !== 'all' ? 'WHERE status = ?' : ''} ORDER BY created_at DESC`;
    const stmt = status && status !== 'all' ? env.DB.prepare(sql).bind(status) : env.DB.prepare(sql);
    const { results } = await stmt.all();
    const header = ['id', 'created_at', 'name', 'email', 'company', 'country', 'phone', 'message', 'source_page', 'lang', 'status'];
    const lines = [header.join(',')];
    for (const row of results || []) lines.push(header.map((h) => csvCell(row[h])).join(','));
    return new Response('\ufeff' + lines.join('\r\n'), {
      headers: {
        'content-type': 'text/csv; charset=utf-8',
        'content-disposition': `attachment; filename="dingdar-inquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
        'cache-control': 'no-store',
      },
    });
  }

  // 发一封测试通知邮件，用来验证 RESEND_API_KEY / NOTIFY_EMAIL 是否真的通了。
  // 有指定 id 就用那条询盘，否则取最新一条；库里空着就用内置样例。
  if (route === 'notify-test' && method === 'POST') {
    const body = await request.json().catch(() => ({}));
    const id = Number(body.id);
    let row = null;
    if (Number.isInteger(id) && id > 0) {
      row = await env.DB.prepare('SELECT * FROM inquiries WHERE id = ?').bind(id).first();
    } else {
      row = await env.DB.prepare('SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 1').first();
    }
    if (!row) {
      row = {
        id: 0,
        created_at: new Date().toISOString(),
        name: '测试联系人',
        email: 'test@example.com',
        company: 'Notify Test Co.',
        country: 'China',
        phone: '+86 138 0000 0000',
        message: '这是一封测试邮件，用于验证询盘通知链路是否可用。收到即说明配置正确。',
        source_page: 'https://dingdar.com/contact/',
        lang: 'en',
        extra: JSON.stringify({
          _subject: 'New inquiry from dingdar.com',
          product: 'Jaw crusher wear parts',
          quantity: '200 pcs / year',
          source_title: 'Contact page',
        }),
      };
    }
    let extra = {};
    try {
      extra = JSON.parse(row.extra || '{}');
    } catch {
      extra = {};
    }
    const r = await sendInquiryEmail(env, row, extra, row.created_at);
    const payload = {
      ok: r.ok,
      to: env.NOTIFY_EMAIL || NOTIFY_DEFAULT_TO,
      from: env.NOTIFY_FROM || 'DINGDAR Website <onboarding@resend.dev>',
      status: r.status || null,
      detail: r.detail || null,
    };
    if (r.skipped) {
      payload.skipped = true;
      payload.message = 'RESEND_API_KEY 未设置，发信通道还没启用';
    }
    return json(payload, r.ok ? 200 : 502);
  }

  return json({ ok: false, error: 'not_found' }, 404);
}
