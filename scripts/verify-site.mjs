import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const failures = [];

const text = (path) => readFileSync(path, 'utf8');
const stripTags = (value) => value.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
const pageFile = (url) => {
  const pathname = new URL(url).pathname;
  return pathname.endsWith('/')
    ? join(dist, pathname, 'index.html')
    : join(dist, pathname + '.html');
};

// 站点地图按语种拆分：汇总 sitemap-en.xml / sitemap-es.xml ... （排除 sitemap-index.xml）
const sitemapFiles = existsSync(dist)
  ? readdirSync(dist).filter((name) => /^sitemap-(?!index).*\.xml$/.test(name))
  : [];
if (sitemapFiles.length === 0) failures.push('No language sitemaps found in dist');
const sitemap = sitemapFiles.map((name) => text(join(dist, name))).join('\n');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);

for (const url of urls) {
  const file = pageFile(url);
  if (!existsSync(file)) {
    failures.push(`Sitemap target has no HTML file: ${url}`);
    continue;
  }
  const html = text(file);
  const title = stripTags(html.match(/<title>(.*?)<\/title>/s)?.[1] || '');
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1]?.trim() || '';
  const h1s = [...html.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gs)].map((match) => stripTags(match[1])).filter(Boolean);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] || '';
  if (!title) failures.push(`Empty title: ${url}`);
  if (!description) failures.push(`Empty meta description: ${url}`);
  if (h1s.length !== 1) failures.push(`Expected one non-empty H1, found ${h1s.length}: ${url}`);
  if (canonical !== url) failures.push(`Canonical mismatch: ${url} -> ${canonical || '(missing)'}`);
}

const unpublishedSlugs = [
  'cone-crusher-liners-mantle-concave-guide',
  'blow-bars-manganese-vs-high-chrome',
  'ball-mill-liners-mn18cr2-guide',
  'mn13-jaw-plates-guide',
];
for (const lang of ['es', 'fr', 'ru', 'pt']) {
  for (const slug of unpublishedSlugs) {
    const path = join(dist, lang, 'news', slug, 'index.html');
    if (existsSync(path)) failures.push(`Untranslated article was generated: /${lang}/news/${slug}/`);
    const localizedUrl = `https://dingdar.com/${lang}/news/${slug}/`;
    if (urls.includes(localizedUrl)) failures.push(`Untranslated article is listed in sitemap: ${localizedUrl}`);
  }
}

for (const slug of unpublishedSlugs) {
  const englishPath = join(dist, 'news', slug, 'index.html');
  if (!existsSync(englishPath)) continue;
  const html = text(englishPath);
  for (const lang of ['es', 'fr', 'ru', 'pt']) {
    const localizedUrl = `https://dingdar.com/${lang}/news/${slug}/`;
    if (html.includes(localizedUrl)) failures.push(`Untranslated article is advertised as hreflang: ${localizedUrl}`);
  }
}

const jawQuotePages = [
  ['products/jaw-crusher-wear-parts/index.html', 'Jaw Plate Quote Checklist'],
  ['es/products/jaw-crusher-wear-parts/index.html', 'Datos para cotizar placas de mandíbula'],
  ['fr/products/jaw-crusher-wear-parts/index.html', 'Informations pour le devis de plaques de mâchoire'],
  ['ru/products/jaw-crusher-wear-parts/index.html', 'Данные для расчёта стоимости щёковых плит'],
  ['pt/products/jaw-crusher-wear-parts/index.html', 'Dados para cotar placas de mandíbula'],
];
for (const [relativePath, heading] of jawQuotePages) {
  const path = join(dist, relativePath);
  if (!existsSync(path)) {
    failures.push(`Missing jaw plate quote checklist page: ${relativePath}`);
    continue;
  }
  if (!text(path).includes(heading)) failures.push(`Missing localized jaw quote checklist heading: ${relativePath}`);
}

if (urls.some((url) => url.includes('/thank-you/') || url.includes('/oem-casting') || url.includes('/certifications'))) {
  failures.push('Sitemap contains a utility or redirect URL');
}

if (failures.length) {
  console.error(`Site verification failed with ${failures.length} issue(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Site verification passed: ${urls.length} indexable pages checked.`);
