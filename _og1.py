import io, re

# 1) product pages: pass og image from heroImg
p = "src/pages/products/[slug].astro"
s = io.open(p, encoding="utf-8").read()
old = "<BaseLayout title={cat.title} description={cat.cardDesc} path={path} jsonLd={[breadcrumbLd, productLd, faqLd]} preloadImages={[cat.bannerImg]}>"
new = "<BaseLayout title={cat.title} description={cat.cardDesc} path={path} image={cat.heroImg.replace('.webp', '-og.webp')} jsonLd={[breadcrumbLd, productLd, faqLd]} preloadImages={[cat.bannerImg]}>"
assert old in s
io.open(p, "w", encoding="utf-8", newline="\n").write(s.replace(old, new))

# 2) news pages
p2 = "src/pages/news/[slug].astro"
s2 = io.open(p2, encoding="utf-8").read()
m = re.search(r"<BaseLayout[^>]*>", s2)
assert m, "no BaseLayout in news"
tag = m.group(0)
assert "image=" not in tag
tag2 = tag[:-1] + " image={cover.replace('.webp', '-og.webp')}>"
s2 = s2.replace(tag, tag2, 1)
io.open(p2, "w", encoding="utf-8", newline="\n").write(s2)
print("product+news patched")
print(tag2[:160])
