const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(process.cwd(), 'public', 'images');
const files = fs.readdirSync(dir).filter((n) => n.endsWith('.webp'));
// skip files that already are derivatives
const isDerivative = (n) => /-\d{3,4}\.webp$/.test(n) || /-mobile\.webp$/.test(n);

(async () => {
  let made = 0, skipped = 0, failed = [];
  for (const n of files) {
    if (isDerivative(n)) continue;
    const src = path.join(dir, n);
    const size = fs.statSync(src).size;
    if (size < 60 * 1024) { skipped++; continue; }
    const base = n.replace(/\.webp$/, '');
    let meta;
    try { meta = await sharp(src).metadata(); } catch (e) { failed.push(n + ' ' + e.message); continue; }
    for (const w of [480, 960]) {
      if (!meta.width || meta.width <= w + 40) continue;
      const out = path.join(dir, base + '-' + w + '.webp');
      if (fs.existsSync(out)) continue;
      try {
        await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: 72, effort: 5 }).toFile(out);
        made++;
      } catch (e) {
        failed.push(n + '@' + w + ' ' + e.message);
      }
    }
  }
  console.log('variants created:', made, 'skipped(small):', skipped, 'failed:', failed.length);
  if (failed.length) console.log(failed.slice(0, 5).join('\n'));
})();
