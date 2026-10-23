const sharp = require("sharp");
const files = ["ank2026-01.webp","ank2026-02.webp","ank2026-03.webp","ank2026-04.webp","ank2026-05.webp","ank2026-06.webp","ank2026-01-960.webp","ank2026-01-1440.webp","ank2026-hero-960.webp"];
(async () => {
  for (const f of files) {
    try {
      const m = await sharp("public/images/" + f).metadata();
      console.log(f, m.width + "x" + m.height);
    } catch (e) { console.log(f, "ERR", e.message); }
  }
})();
