const fs = require('fs');
const f = 'src/pages/about.astro';
let s = fs.readFileSync(f, 'utf8');
let n = 0;

const pairs = [
  ['/images/foundry-pouring.webp', 'Casting pouring operation'],
  ['/images/factory-machined-parts.webp', 'Machined casting parts'],
  ['/images/quality-inspection.webp', 'Quality inspection'],
];

for (const [src, alt] of pairs) {
  const re = new RegExp('<img src="' + src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"[^>]*/>');
  if (re.test(s)) {
    s = s.replace(
      re,
      '<OptImg src="' + src + '" alt="' + alt + '" width={900} height={450} sizes="(max-width: 768px) 92vw, 30vw" class="about-shot" />'
    );
    n++;
  }
}

if (!s.includes("import OptImg")) {
  s = s.replace(/^---\r?\n/, '---\nimport OptImg from \'../components/OptImg.astro\';\n');
}

fs.writeFileSync(f, s);
console.log('replaced', n);
