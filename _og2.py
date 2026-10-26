import io
p = "src/pages/news/[slug].astro"
s = io.open(p, encoding="utf-8").read()
s = s.replace("""  path={`/news/${slug}/`}
  alternateLangs={alternateLangs}""", """  path={`/news/${slug}/`}
  image={cover.replace('.webp', '-og.webp')}
  alternateLangs={alternateLangs}""", 1)
s = s.replace("""  }}
 image={cover.replace('.webp', '-og.webp')}>""", """  }}>""", 1)
io.open(p, "w", encoding="utf-8", newline="\n").write(s)
print("tidied")
