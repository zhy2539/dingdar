/**
 * 把 @astrojs/sitemap 生成的单一 sitemap 按语种拆成 5 个文件，
 * 再由 sitemap-index.xml 汇总。
 *
 * 目的：GSC 里可以按语种分别提交与查看收录覆盖率，
 * 英文站（主力询盘来源）单独成表，便于后续只提交英文表集中抓取权重。
 * 索引文件地址保持不变（/sitemap-index.xml），已提交的记录不会失效。
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

const buckets = { en: [], es: [], fr: [], pt: [], ru: [] };
for (const entry of entries) {
  const loc = entry.match(/<loc>(.*?)<\/loc>/)?.[1] ?? '';
  const path = loc.startsWith(SITE) ? loc.slice(SITE.length) || '/' : loc;
  const hit = LOCALES.find(([, pattern]) => pattern.test(path));
  buckets[hit ? hit[0] : 'en'].push(entry);
}

const writeUrlset = (code, rows) => {
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...rows,
    '</urlset>',
    '',
  ].join('\n');
  writeFileSync(join(dist, `sitemap-${code}.xml`), xml, 'utf8');
};

const today = new Date().toISOString().slice(0, 10);
for (const [code, rows] of Object.entries(buckets)) writeUrlset(code, rows);

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
  .map(([code, rows]) => `${code}=${rows.length}`)
  .join(' ');
console.log(`[split-sitemap] ${summary} total=${entries.length}`);
