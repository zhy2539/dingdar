/**
 * 把 @astrojs/sitemap 生成的单一 sitemap 按语种拆成 5 个文件，
 * 再由 sitemap-index.xml 汇总。
 *
 * 目的：
 * 1. GSC 里可以按语种分别提交与查看收录覆盖率，英文站（主力询盘来源）单独成表。
 * 2. 每个 <url> 补齐 xhtml:link hreflang 声明（含 x-default），
 *    让 Google 明确知道 /about/、/es/about/、/fr/about/… 是同一页的多语言版本，
 *    而不是 5 个内容重复的独立页面。站点是 5 语种静态站，这一层信号靠 <head> 里的
 *    <link rel="alternate"> 传递较慢，sitemap 里再声明一次可以加速正确的国际收录。
 *
 * 不写 <lastmod>：静态站每次构建都会重写全部 HTML，用构建时间当 lastmod 会让
 * 所有页面在每次部署时都"变新"，反而降低该字段的可信度。等以后有按页面的
 * 真实更新时间来源（如内容数据里的 date 字段）再加。
 */
import { readFileSync, writeFileSync, readdirSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const SITE = 'https://dingdar.com';

const generated = readdirSync(dist).filter((name) => /^sitemap-\d+\.xml$/.test(name));
if (generated.length === 0) {
  console.error('[split-sitemap] no sitemap-<n>.xml found in dist, did astro build run?');
  process.exit(1);
}

const entries = [];
for (const name of generated) {
  const xml = readFileSync(join(dist, name), 'utf8');
  for (const match of xml.matchAll(/<url>[\s\S]*?<\/url>/g)) entries.push(match[0].trim());
}

const LOCALES = [
  ['es', /^\/es(\/|$)/],
  ['fr', /^\/fr(\/|$)/],
  ['pt', /^\/pt(\/|$)/],
  ['ru', /^\/ru(\/|$)/],
];
const LANGS = ['en', 'es', 'fr', 'pt', 'ru'];

const toPath = (loc) => (loc.startsWith(SITE) ? loc.slice(SITE.length) || '/' : loc);

// path -> { lang -> 该语种下的真实路径 }，用于生成同页的多语言互指关系
const byPath = new Map();
const buckets = { en: [], es: [], fr: [], pt: [], ru: [] };

for (const entry of entries) {
  const loc = entry.match(/<loc>(.*?)<\/loc>/)?.[1] ?? '';
  const path = toPath(loc);
  const hit = LOCALES.find(([, pattern]) => pattern.test(path));
  const lang = hit ? hit[0] : 'en';
  const key = lang === 'en' ? path : path.slice(lang.length + 1) || '/';
  buckets[lang].push(path);
  if (!byPath.has(key)) byPath.set(key, {});
  byPath.get(key)[lang] = path;
}

const writeUrlset = (code, paths) => {
  const rows = paths.map((path) => {
    const alternates = byPath.get(code === 'en' ? path : path.slice(code.length + 1) || '/') ?? {};
    const links = LANGS.filter((lang) => alternates[lang]).map(
      (lang) =>
        `    <xhtml:link rel="alternate" hreflang="${lang}" href="${SITE}${alternates[lang]}"/>`
    );
    if (alternates.en) {
      links.push(
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${alternates.en}"/>`
      );
    }
    return ['  <url>', `    <loc>${SITE}${path}</loc>`, ...links, '  </url>'].join('\n');
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...rows,
    '</urlset>',
    '',
  ].join('\n');
  writeFileSync(join(dist, `sitemap-${code}.xml`), xml, 'utf8');
};

for (const [code, paths] of Object.entries(buckets)) writeUrlset(code, paths);

const today = new Date().toISOString().slice(0, 10);
const index = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...Object.keys(buckets).map(
    (code) => `  <sitemap>\n    <loc>${SITE}/sitemap-${code}.xml</loc>\n    <lastmod>${today}</lastmod>\n  </sitemap>`
  ),
  '</sitemapindex>',
  '',
].join('\n');
writeFileSync(join(dist, 'sitemap-index.xml'), index, 'utf8');

for (const name of generated) unlinkSync(join(dist, name));

const summary = Object.entries(buckets)
  .map(([code, paths]) => `${code}=${paths.length}`)
  .join(' ');
const clustered = [...byPath.values()].filter((v) => Object.keys(v).length > 1).length;
console.log(
  `[split-sitemap] ${summary} total=${entries.length} hreflang-clusters=${clustered}`
);
