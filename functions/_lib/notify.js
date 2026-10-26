/**
 * 询盘邮件通知（Resend）。
 *
 * 需要的环境变量（Cloudflare Pages → Settings → Production → Variables and secrets）：
 *   RESEND_API_KEY   必填。Resend 后台创建的 API Key（Secret 类型）
 *   NOTIFY_EMAIL     选填。收件人，默认 zhy2539@126.com
 *   NOTIFY_FROM      选填。发件人。默认 'DINGDAR Website <onboarding@resend.dev>'
 *                    在 Resend 里验证过 dingdar.com 之后，可改成
 *                    'DINGDAR Website <inquiry@dingdar.com>'
 *
 * 设计原则：邮件只是「额外提醒」，不是主链路。
 * 发不出去也不影响入库与转发，接口不会因此报错，避免丢线索。
 */

export const NOTIFY_DEFAULT_TO = 'zhy2539@126.com';
const RESEND_ENDPOINT = 'https://api.resend.com/emails';

const esc = (s) =>
  String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/** 从 _subject 判断询盘类型，与后台看板的口径保持一致 */
export function kindOf(subject) {
  const s = String(subject || '').toLowerCase();
  if (s.includes('sample')) return '样品申请';
  if (s.includes('profile') || s.includes('download')) return '资料下载';
  return '产品询盘';
}

function whenText(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())} (UTC+8)`;
}

/** 生成邮件主题 / HTML / 纯文本三件套 */
export function buildEmail(record, ex, createdAt) {
  const extra = ex || {};
  const kind = kindOf(extra._subject);
  const when = whenText(createdAt || new Date().toISOString());
  const who = record.company || record.name || record.email;
  const subject = `【新询盘】${kind} · ${who}`;

  const rows = [];
  const row = (label, value) => {
    const v = String(value == null ? '' : value).trim();
    if (!v) return;
    rows.push(
      `<tr><td style="padding:4px 0;color:#64748b;font-size:13px;width:92px;vertical-align:top">${esc(label)}</td>` +
        `<td style="padding:4px 0;color:#0f172a;font-size:13px;word-break:break-word">${esc(v)}</td></tr>`
    );
  };
  row('姓名', record.name);
  row('公司', record.company);
  row('国家', record.country);
  row('邮箱', record.email);
  row('电话', record.phone);
  row('产品兴趣', extra.product);
  row('年用量/数量', extra.quantity);
  row('图纸/参考', extra.reference_url);
  row('来源页面', extra.source_title);
  row('路径', record.source_page);
  row('语种', record.lang);

  const replyHref = record.email
    ? `mailto:${record.email}?subject=${encodeURIComponent(`Re: ${kind} — ${who}`)}`
    : 'https://dingdar.com/admin/';

  const html = `<div style="margin:0;padding:22px;background:#f1f3f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Microsoft YaHei',sans-serif">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden">
    <div style="background:#c2410c;padding:16px 22px">
      <div style="color:#ffffff;font-size:15px;font-weight:700;letter-spacing:.2px">DINGDAR · 网站新询盘</div>
      <div style="color:rgba(255,255,255,.82);font-size:12px;margin-top:4px">${esc(kind)} · ${esc(when)}</div>
    </div>
    <div style="padding:20px 22px 8px">
      <div style="font-size:11px;font-weight:700;letter-spacing:.1em;color:#64748b;margin-bottom:8px">客户信息</div>
      <table style="width:100%;border-collapse:collapse">${rows.join('')}</table>
    </div>
    <div style="padding:0 22px">
      <div style="height:1px;background:#e2e8f0;margin:16px 0"></div>
      <div style="font-size:11px;font-weight:700;letter-spacing:.1em;color:#64748b;margin-bottom:8px">要什么</div>
      <div style="font-size:14px;line-height:1.75;color:#334155;white-space:pre-wrap">${esc(record.message) || '<span style="color:#94a3b8">（正文为空，请到后台查看）</span>'}</div>
    </div>
    <div style="padding:18px 22px 22px">
      <a href="${esc(replyHref)}" style="display:inline-block;background:#c2410c;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;padding:9px 18px;border-radius:9px">回复这位客户</a>
      <a href="https://dingdar.com/admin/" style="display:inline-block;margin-left:8px;color:#c2410c;text-decoration:none;font-size:13px;padding:9px 4px">打开询盘后台</a>
    </div>
    <div style="padding:11px 22px;background:#f8fafc;border-top:1px solid #e2e8f0;font-size:11px;color:#94a3b8;line-height:1.7">
      这条询盘已存进 Cloudflare 数据库，后台可标记状态、导出 CSV。此邮件由 dingdar.com 自动发送。
    </div>
  </div>
</div>`;

  const lines = [
    `【新询盘】${kind} · ${who}`,
    when,
    '',
    ...rows.map((r) => r.replace(/<[^>]+>/g, '|').replace(/\|+/g, ' | ').replace(/^ \| | \| $/g, '')),
    '',
    '要什么：',
    String(record.message || '（正文为空）'),
    '',
    `回复：${record.email || '见后台'}`,
    '后台：https://dingdar.com/admin/',
  ];

  return { subject, html, text: lines.join('\n') };
}

/**
 * 发送询盘通知。
 * @returns {{ok:boolean, skipped?:boolean, status?:number, detail?:string}}
 */
export async function sendInquiryEmail(env, record, ex, createdAt) {
  const apiKey = env && env.RESEND_API_KEY;
  const to = (env && env.NOTIFY_EMAIL) || NOTIFY_DEFAULT_TO;
  if (!apiKey) return { ok: false, skipped: true, detail: 'RESEND_API_KEY 未设置' };

  const { subject, html, text } = buildEmail(record, ex, createdAt);
  const from = (env && env.NOTIFY_FROM) || 'DINGDAR Website <onboarding@resend.dev>';

  const payload = { from, to: [to], subject, html, text };
  if (record.email) payload.reply_to = record.email;

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('resend failed', res.status, detail);
      return { ok: false, status: res.status, detail: detail.slice(0, 300) };
    }
    return { ok: true, status: res.status };
  } catch (err) {
    console.error('resend error', err);
    return { ok: false, detail: String(err && err.message ? err.message : err).slice(0, 300) };
  }
}
