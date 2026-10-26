const sharp = require("sharp");
const names = ["prod-jaw","prod-cone","prod-impact","prod-hammer","prod-roll","prod-teeth","prod-custom",
"news-fire-worker","news-foundry-worker","news-furnace-worker","news-molten-steel","news-two-workers","news-welding-worker",
"quality-inspection","banner-cone","banner-hammer","about-steel-mill","factory-casting-workshop","factory-mill-head"];
(async () => {
  for (const n of names) {
    const src = "public/images/" + n + ".webp";
    const out = "public/images/" + n + "-og.webp";
    try {
      const info = await sharp(src).resize({ width: 1200, height: 630, fit: "cover", position: sharp.strategy.attention }).webp({ quality: 80 }).toFile(out);
      console.log(n, (info.size/1024).toFixed(0) + "KB");
    } catch (e) { console.log("ERR", n, e.message); }
  }
})();
