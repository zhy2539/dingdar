import io
# localized product pages
p = "src/pages/[lang]/products/[slug].astro"
s = io.open(p, encoding="utf-8").read()
old = "<BaseLayout title={p('title')} description={p('cardDesc')} path={path} lang={lang}"
new = "<BaseLayout image={cat.heroImg.replace('.webp', '-og.webp')} title={p('title')} description={p('cardDesc')} path={path} lang={lang}"
assert old in s
io.open(p, "w", encoding="utf-8", newline="\n").write(s.replace(old, new, 1))

# localized news
p2 = "src/pages/[lang]/news/[slug].astro"
s2 = io.open(p2, encoding="utf-8").read()
old2 = """  description={excerpt}
  path={langPath(lang as Lang, '/news/' + slug + '/')}"""
new2 = """  description={excerpt}
  path={langPath(lang as Lang, '/news/' + slug + '/')}
  image={cover.replace('.webp', '-og.webp')}"""
assert old2 in s2
io.open(p2, "w", encoding="utf-8", newline="\n").write(s2.replace(old2, new2, 1))
print("localized templates patched")
