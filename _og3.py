import io
mapping = {
  "src/pages/industries/mining.astro": "/images/banner-cone-og.webp",
  "src/pages/industries/cement.astro": "/images/banner-hammer-og.webp",
  "src/pages/materials.astro": "/images/about-steel-mill-og.webp",
  "src/pages/about.astro": "/images/factory-casting-workshop-og.webp",
  "src/pages/quality.astro": "/images/quality-inspection-og.webp",
  "src/pages/ball-mill-liners.astro": "/images/factory-mill-head-og.webp",
}
for path, img in mapping.items():
    s = io.open(path, encoding="utf-8").read()
    assert "<BaseLayout" in s, path
    if 'image="' in s.split("<BaseLayout")[1][:400]:
        print("skip (already)", path); continue
    s = s.replace("<BaseLayout", '<BaseLayout\n  image="%s"' % img, 1)
    io.open(path, "w", encoding="utf-8", newline="\n").write(s)
    print("ok", path)
