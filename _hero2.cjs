const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const dir = path.join(process.cwd(), 'public', 'images');
const src = path.join(dir, 'ank2026-01.webp');

(async () => {
  await sharp(src).resize({ width: 1440 }).webp({ quality: 80, effort: 5 }).toFile(path.join(dir, 'ank2026-01-1440.webp'));
  // 抬高 960 变体质量，避免大尺寸展示时发虚
  for (const id of ['ank2026-01', 'ank2026-02', 'ank2026-03', 'ank2026-04', 'ank2026-05', 'ank2026-06']) {
    const s = path.join(dir, id + '.webp');
    if (!fs.existsSync(s)) continue;
    await sharp(s).resize({ width: 960, withoutEnlargement: true }).webp({ quality: 82, effort: 5 }).toFile(path.join(dir, id + '-960.webp'));
  }
  for (const n of ['ank2026-01-1440.webp', 'ank2026-01-960.webp', 'ank2026-05-960.webp']) {
    console.log(n, Math.round(fs.statSync(path.join(dir, n)).size / 1024) + 'KB');
  }
})();
