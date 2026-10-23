const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const out = path.join(process.cwd(), 'public', 'images');
const items = [
  { id: 'ank2026-01', url: 'https://sc02.alicdn.com/kf/Hdc8bd7638e484d2fba9f07ac1daeddbcr.jpg' },
  { id: 'ank2026-02', url: 'https://sc02.alicdn.com/kf/H864ea8e4232741dba8f1d87324fadf20g.jpg' },
  { id: 'ank2026-03', url: 'https://sc02.alicdn.com/kf/H54c2fcb674e742708138229af851b2e5Q.jpg' },
  { id: 'ank2026-04', url: 'https://sc02.alicdn.com/kf/Hcb1e8a55cf32444ea6b7bc660fb1344dm.jpg' },
  { id: 'ank2026-05', url: 'https://sc02.alicdn.com/kf/H9e6e861b58b54dbeae21504f7be9eabd9.jpg' },
  { id: 'ank2026-06', url: 'https://sc02.alicdn.com/kf/H67fce4f200074300a19632dd13f07af79.jpg' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const f = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode !== 200) { reject(new Error('HTTP ' + res.statusCode)); return; }
      res.pipe(f);
      f.on('finish', () => f.close(() => resolve()));
    }).on('error', reject);
  });
}

(async () => {
  for (const it of items) {
    const tmp = path.join(out, it.id + '.src.jpg');
    try {
      await download(it.url, tmp);
      const meta = await sharp(tmp).metadata();
      await sharp(tmp).webp({ quality: 78, effort: 5 }).toFile(path.join(out, it.id + '.webp'));
      for (const w of [480, 960]) {
        if (meta.width && meta.width > w + 40) {
          await sharp(tmp).resize({ width: w, withoutEnlargement: true }).webp({ quality: 74, effort: 5 }).toFile(path.join(out, it.id + '-' + w + '.webp'));
        }
      }
      fs.unlinkSync(tmp);
      const main = fs.statSync(path.join(out, it.id + '.webp')).size;
      console.log(it.id, meta.width + 'x' + meta.height, Math.round(main / 1024) + 'KB');
    } catch (e) {
      console.log(it.id, 'FAILED', e.message);
    }
  }
})();
