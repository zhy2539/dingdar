const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const dir = path.join(process.cwd(), 'public', 'images');
const src = path.join(dir, 'ank2026-01.webp');

(async () => {
  await sharp(src).resize({ width: 1600 }).webp({ quality: 76, effort: 5 }).toFile(path.join(dir, 'ank2026-hero.webp'));
  await sharp(src).resize({ width: 960 }).webp({ quality: 74, effort: 5 }).toFile(path.join(dir, 'ank2026-hero-960.webp'));
  await sharp(src).resize({ width: 800 }).webp({ quality: 74, effort: 5 }).toFile(path.join(dir, 'ank2026-hero-mobile.webp'));
  for (const n of ['ank2026-hero.webp', 'ank2026-hero-960.webp', 'ank2026-hero-mobile.webp']) {
    console.log(n, Math.round(fs.statSync(path.join(dir, n)).size / 1024) + 'KB');
  }
})();
