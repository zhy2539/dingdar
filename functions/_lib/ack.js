/**
 * 客户自动确认邮件。
 *
 * 访客提交询盘后，立刻回一封确认信给他本人：
 *   1) 让他确认「信送到了」，减少二次重复提交和直接跑去 WhatsApp 追问；
 *   2) 把「谁来处理、多久回」讲清楚，把等待预期压到 12–24 小时；
 *   3) 附上他自己写的内容，方便他核对有没有漏说。
 *
 * 与 notify.js 的分工：notify.js 发给老板（内部提醒），本文件发给客户（对外确认）。
 * 失败绝不影响主链路，接口照常返回成功。
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

// 兜底回复地址：客户直接回这封信时落到这里，而不是落到 no-reply
export const ACK_REPLY_TO = 'hugo@dingdar.com';

const esc = (s) =>
  String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const COPY = {
  en: {
    subject: 'We received your inquiry — DINGDAR',
    hi: 'Dear',
    thanks: 'Thank you for contacting DINGDAR. Your inquiry has been received and logged.',
    next: 'An engineer from our project team will review the drawing, part number or working conditions you described, and reply with a technical response and quotation within 12–24 hours (Mon–Sat, UTC+8).',
    urgent: 'If it is urgent, reach us directly on WhatsApp:',
    your: 'What you sent us',
    need: 'If you can share the equipment model, part number or a drawing, we can usually come back faster with a price.',
    sign: 'DINGDAR Machinery — Wear Parts & Custom Castings',
  },
  es: {
    subject: 'Hemos recibido su consulta — DINGDAR',
    hi: 'Estimado/a',
    thanks: 'Gracias por contactar con DINGDAR. Hemos recibido y registrado su consulta.',
    next: 'Un ingeniero de nuestro equipo técnico revisará el plano, número de pieza o condiciones de trabajo que nos indicó, y le responderá con una valoración técnica y una cotización en 12–24 horas (lun–sáb, UTC+8).',
    urgent: 'Si es urgente, escríbanos directamente por WhatsApp:',
    your: 'Lo que nos ha enviado',
    need: 'Si puede compartir el modelo del equipo, el número de pieza o un plano, normalmente podemos darle un precio antes.',
    sign: 'DINGDAR Machinery — Piezas de desgaste y fundición a medida',
  },
  fr: {
    subject: 'Nous avons bien reçu votre demande — DINGDAR',
    hi: 'Bonjour',
    thanks: 'Merci d’avoir contacté DINGDAR. Votre demande a bien été reçue et enregistrée.',
    next: 'Un ingénieur de notre équipe technique examinera le plan, la référence ou les conditions de travail que vous nous avez indiqués, et vous répondra avec une analyse technique et un devis sous 12 à 24 heures (lun–sam, UTC+8).',
    urgent: 'En cas d’urgence, contactez-nous directement sur WhatsApp :',
    your: 'Ce que vous nous avez envoyé',
    need: 'Si vous pouvez nous transmettre le modèle de la machine, la référence de la pièce ou un plan, nous pourrons généralement chiffrer plus vite.',
    sign: 'DINGDAR Machinery — Pièces d’usure et pièces coulées sur mesure',
  },
  pt: {
    subject: 'Recebemos sua consulta — DINGDAR',
    hi: 'Prezado(a)',
    thanks: 'Obrigado por entrar em contato com a DINGDAR. Sua consulta foi recebida e registrada.',
    next: 'Um engenheiro da nossa equipe técnica vai analisar o desenho, o código da peça ou as condições de trabalho que você descreveu, e responder com uma avaliação técnica e cotação em 12 a 24 horas (seg–sáb, UTC+8).',
    urgent: 'Se for urgente, fale com a gente direto no WhatsApp:',
    your: 'O que você nos enviou',
    need: 'Se puder compartilhar o modelo do equipamento, o código da peça ou um desenho, normalmente conseguimos responder com preço mais rápido.',
    sign: 'DINGDAR Machinery — Peças de desgaste e fundidos sob medida',
  },
  ru: {
    subject: 'Мы получили ваш запрос — DINGDAR',
    hi: 'Здравствуйте,',
    thanks: 'Спасибо за обращение в DINGDAR. Ваш запрос получен и зарегистрирован.',
    next: 'Инженер нашей технической группы изучит чертёж, номер детали или условия работы, которые вы описали, и в течение 12–24 часов (пн–сб, UTC+8) направит технический ответ и коммерческое предложение.',
    urgent: 'Если вопрос срочный, напишите нам напрямую в WhatsApp:',
    your: 'Что вы нам отправили',
    need: 'Если пришлёте модель оборудования, номер детали или чертёж, мы обычно сможем ответить с ценой быстрее.',
    sign: 'DINGDAR Machinery — быстроизнашивающиеся детали и литьё по чертежам',
  },
};

const pickLang = (lang) => {
  const key = String(lang || 'en').slice(0, 2).toLowerCase();
  return COPY[key] ? key : 'en';
};

export function buildAck(record, ex) {
  const c = COPY[pickLang(record.lang)];
  const extra = ex || {};
  const name = String(record.name || '').trim();
  const wa = 'https://wa.me/8619337861987?text=' + encodeURIComponent('Hello DINGDAR, I just sent an inquiry through your website.');
  const what = String(record.message || '').trim();
  const product = String(extra.product || '').trim();

  const ctx = [];
  if (product) ctx.push(product);
  if (what) ctx.push(what);
  const quoted = ctx.join('\n\n') || '—';

  const html = `<div style="margin:0;padding:22px;background:#f1f3f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Microsoft YaHei',sans-serif">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden">
    <div style="background:#0f172a;padding:18px 22px">
      <div style="color:#ffffff;font-size:15px;font-weight:700;letter-spacing:.2px">DINGDAR</div>
      <div style="color:rgba(255,255,255,.7);font-size:12px;margin-top:4px">Henan Dingdar Machinery Equipment Manufacture Co., Ltd.</div>
    </div>
    <div style="padding:22px">
      <p style="margin:0 0 12px;font-size:15px;color:#0f172a">${esc(c.hi)} ${esc(name) || ''}</p>
      <p style="margin:0 0 12px;font-size:14px;line-height:1.75;color:#334155">${esc(c.thanks)}</p>
      <p style="margin:0 0 12px;font-size:14px;line-height:1.75;color:#334155">${esc(c.next)}</p>
      <p style="margin:0 0 16px;font-size:14px;line-height:1.75;color:#334155">${esc(c.urgent)} <a href="${wa}" style="color:#c2410c;font-weight:600;text-decoration:none">+86 193 3786 1987</a></p>
      <div style="height:1px;background:#e2e8f0;margin:18px 0"></div>
      <div style="font-size:11px;font-weight:700;letter-spacing:.1em;color:#64748b;margin-bottom:8px">${esc(c.your)}</div>
      <div style="font-size:13px;line-height:1.7;color:#475569;white-space:pre-wrap;background:#f8fafc;border:1px solid #e2e8f0;border-radius:9px;padding:12px 14px">${esc(quoted)}</div>
      <p style="margin:16px 0 0;font-size:13px;line-height:1.7;color:#64748b">${esc(c.need)}</p>
    </div>
    <div style="padding:12px 22px;background:#f8fafc;border-top:1px solid #e2e8f0;font-size:11px;color:#94a3b8;line-height:1.7">
      ${esc(c.sign)}<br>dingdar.com · hugo@dingdar.com · WhatsApp +86 193 3786 1987
    </div>
  </div>
</div>`;

  const text = [
    `${c.hi} ${name}`,
    '',
    c.thanks,
    c.next,
    '',
    `${c.urgent} +86 193 3786 1987`,
    '',
    `${c.your}:`,
    quoted,
    '',
    c.need,
    '',
    c.sign,
    'dingdar.com · hugo@dingdar.com',
  ].join('\n');

  return { subject: c.subject, html, text };
}

/**
 * 给客户发确认信。
 * @returns {{ok:boolean, skipped?:boolean, status?:number, detail?:string}}
 */
export async function sendBuyerAck(env, record, ex) {
  const apiKey = env && env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, skipped: true, detail: 'RESEND_API_KEY 未设置' };
  const to = String((record && record.email) || '').trim();
  if (!to || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(to)) {
    return { ok: false, skipped: true, detail: '客户邮箱无效' };
  }

  const { subject, html, text } = buildAck(record, ex);
  const from = (env && env.NOTIFY_FROM) || 'DINGDAR Website <onboarding@resend.dev>';

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
      body: JSON.stringify({ from, to: [to], subject, html, text, reply_to: (env && env.NOTIFY_EMAIL) || ACK_REPLY_TO }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('buyer ack failed', res.status, detail);
      return { ok: false, status: res.status, detail: detail.slice(0, 300) };
    }
    return { ok: true, status: res.status };
  } catch (err) {
    console.error('buyer ack error', err);
    return { ok: false, detail: String(err && err.message ? err.message : err).slice(0, 300) };
  }
}
