// 站点全局配置：公司信息、联系方式、导航、统计
export const SITE = {
  name: 'DINGDAR',
  legalName: 'Henan Dingdar Machinery Equipment Manufacture Co., Ltd',
  // 站点正式域名；已绑定 dingdar.com（2026-10-14），DNS/自定义域生效后以正式域访问。
  domain: 'https://dingdar.com',
  tagline: 'Casting manufacturer for mining, quarrying and heavy equipment',
  description:
    'Crusher wear parts, bucket teeth and custom castings produced by an integrated Chinese foundry since 1986. OEM and drawing-based manufacturing for mining, quarrying and construction.',
  location: 'Henan, China',
  since: 1986,
  email: 'hugo@dingdar.com',
  engineeringEmail: 'hugo@dingdar.com',
  qualityEmail: 'hugo@dingdar.com',
  whatsapp: '+86 19337861987',
  whatsappTel: '+8619337861987',
  responsePromise: 'Technical feedback within 12–24 hours',
  // 询盘表单端点：留空时页面展示直达联系方式（邮件/WhatsApp）。
  // 上线前填入 Formspree 端点（如 https://formspree.io/f/xxxx）或自有 Worker 端点。
  formEndpoint: 'https://formspree.io/f/mwlvryqb',
  // Google Analytics 4 衡量 ID（数据流 DINGDAR Casting Site，2026-10-14 创建）
  gaId: 'G-LVB325JZGL',
};

export const STATS = [
  { value: '1986', label: 'Casting experience since' },
  { value: '180,000 m²', label: 'Production plant' },
  { value: '720+', label: 'Employees' },
  { value: '5,400+', label: 'Part types produced' },
];

export const CAPABILITY_STATS = [
  { value: '52', label: 'Engineers & R&D staff' },
  { value: '12,000 m²', label: 'Office & R&D building' },
  { value: '4', label: 'In-house casting routes' },
];

export const MATERIALS = [
  {
    name: 'High-Manganese Steel',
    grades: 'Mn13, Mn18 and variants',
    use: 'Jaw plates, cone mantles & concaves, hammer heads — impact and abrasion duty',
  },
  {
    name: 'High-Chromium Cast Iron',
    grades: 'Cr15–Cr26 families',
    use: 'Blow bars, impact plates and other high-wear impact applications',
  },
  {
    name: 'Alloy Steel',
    grades: 'Low-alloy and heat-treatable grades',
    use: 'Custom structural castings, housings, wear plates and machined components',
  },
  {
    name: 'Ductile Iron',
    grades: 'GGG40/50/60 and similar',
    use: 'Housings, frames and components needing strength and machinability',
  },
];

export const PROCESSES = [
  {
    slug: 'green-sand',
    name: 'Green Sand Casting',
    summary:
      'The workhorse route for medium and large castings at competitive cost. Wide size and material range, fast tooling.',
    bestFor: 'Large wear parts and structural castings in batches',
  },
  {
    slug: 'shell-moulding',
    name: 'Shell Moulding',
    summary:
      'Resin-coated sand shells give better surface finish and dimensional consistency for repeatable series production.',
    bestFor: 'Medium parts where consistency and finish matter',
  },
  {
    slug: 'lost-foam',
    name: 'Lost Foam Casting',
    summary:
      'Near-net-shape casting with complex geometry, generous draft freedom and reduced machining stock.',
    bestFor: 'Complex geometries and low-to-mid volume projects',
  },
  {
    slug: 'investment',
    name: 'Investment Casting',
    summary:
      'Highest precision and surface finish in the family, suited to smaller components with tight tolerances.',
    bestFor: 'Small parts with fine detail and tight tolerances',
  },
];

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/products/', label: 'Products' },
  { href: '/processes/', label: 'Processes' },
  { href: '/news/', label: 'News' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
  { href: '/faq/', label: 'FAQ' },
];

// 首页资质速览条（满意即可：10 秒过及格线）
export const QUALIFICATIONS = [
  { value: '1986', label: 'Casting experience since' },
  { value: '4', label: 'In-house casting routes' },
  { value: '720+', label: 'Employees' },
  { value: '52', label: 'Engineers & R&D staff' },
  { value: '180,000 m²', label: 'Production plant' },
];

// 首页异议处理区块（信息不对称：主动说出买家担心并回答）
export const BUYER_CONCERNS = [
  {
    title: 'How do I know the quality stays consistent?',
    answer:
      'Material grades, inspection records and release evidence are agreed before production for every order. Material certificates, dimensional inspection reports, hardness records and visual inspection records can ship with the order as specified.',
  },
  {
    title: 'How can I verify you are a real foundry?',
    answer:
      'An integrated plant since 1986 with four in-house casting routes, heat treatment, machining and inspection under one roof. Plant address, production data and process details are confirmed during review, and factory visits or third-party audits can be arranged.',
  },
  {
    title: 'What if there is a problem with my order?',
    answer:
      'Inspection scope, acceptance criteria and release documents are defined before production, and third-party inspection can be arranged when specified. Any non-conformance is addressed with corrective action and replacement per the agreed terms.',
  },
];

// 合规与验证（信号理论：可验证的证据优先；证书编号按事实在评审中提供，不虚构）
export const COMPLIANCE = {
  materials: [
    { name: 'High-Manganese Steel', grades: 'Mn13, Mn18 and variants', detail: 'Work-hardening under impact — jaw plates, mantles, concaves and hammers.', standard: 'ASTM A128-series (Hadfield), DIN/GB equivalents' },
    { name: 'High-Chromium Cast Iron', grades: 'Cr15–Cr26 families', detail: 'High abrasion resistance for blow bars and impact wear parts.', standard: 'ASTM A532 / BS 4844 series, DIN/GB equivalents' },
    { name: 'Alloy Steel', grades: 'Low-alloy, heat-treatable grades', detail: 'Structural castings, housings and machined components.', standard: 'ASTM/ISO/DIN alloy steel series, GB equivalents' },
    { name: 'Ductile Iron', grades: 'GGG40/50/60 and similar', detail: 'Strength with machinability for frames and housings.', standard: 'ISO 1083 (EN-GJS), ASTM A536, GB 1348 equivalents' },
  ],
  inspection: [
    'Material certificates (heat / melt analysis)',
    'Dimensional inspection reports',
    'Hardness records',
    'Visual inspection records',
    'NDT or third-party inspection when specified',
  ],
  verify: [
    { k: 'Registered entity', v: 'Henan Dingdar Machinery Equipment Manufacture Co., Ltd.' },
    { k: 'Unified Social Credit Code', v: '91410329MADUMDDKX4' },
    { k: 'Registration status', v: 'Active (存续) — verified via public business registry' },
    { k: 'Registration authority', v: 'Yichuan County Market Supervision Administration, Luoyang, Henan, China' },
    { k: 'Casting since', v: '1986' },
    { k: 'Location', v: 'Henan, China — plant tours can be arranged' },
    { k: 'Public channels', v: 'Website dingdar.com · Email hugo@dingdar.com · WhatsApp +86 19337861987' },
  ],
  verifyLinks: [
    { label: 'Check registration in the public registry', url: 'https://m.qcc.com/firm/7b73b25159683b57cc46a23e613071a8.html', note: 'Qichacha public record — search the company name or credit code' },
    { label: 'National Enterprise Credit Information Publicity System', url: 'https://www.gsxt.gov.cn', note: 'Official registry (gsxt.gov.cn) — search by company name or credit code' },
  ],
  note: 'Certificates, test reports and compliance documents are provided with the order as agreed. Current certification scope is confirmed during the technical review — tell us the standard your project requires.',
};

// OEM 定制服务（承诺一致性：从评审到批量的台阶；MOQ/交期在技术评审确认，不虚构）
export const OEM_STEPS = [
  { step: '1', name: 'Requirement Review', time: '1–3 working days', desc: 'Drawing, sample, part number or equipment model — geometry, material, machining and inspection scope are defined together.' },
  { step: '2', name: 'Quotation & Confirmation', time: 'Within 1 week', desc: 'Price, tooling, MOQ, lead time and acceptance criteria are confirmed in writing before production starts.' },
  { step: '3', name: 'Tooling & Samples', time: 'Agreed per project', desc: 'Pattern or tooling prepared; samples or pre-production parts reviewed where required by the agreement.' },
  { step: '4', name: 'Casting & Heat Treatment', time: 'Per production plan', desc: 'Process-matched casting with in-process checks and traceability.' },
  { step: '5', name: 'Machining & Finishing', time: 'Per production plan', desc: 'Machined surfaces, marking and finish completed to the agreed scope.' },
  { step: '6', name: 'Inspection & Delivery', time: 'Per production plan', desc: 'Final release, required documents and export packing before shipment.' },
];

export const OEM_CUSTOMIZABLE = [
  'Dimensions & geometry (to drawing)',
  'Material grade & hardness',
  'Machining & finishing scope',
  'Branding / part marking',
  'Packaging & export marks',
  'Inspection & documentation scope',
];
