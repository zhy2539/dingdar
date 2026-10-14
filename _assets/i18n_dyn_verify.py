# -*- coding: utf-8 -*-
"""Assert every dynamically composed i18n key exists in dict-es.ts."""
import re, sys

DICT = r"E:\豆包工作内容存放\丁达尔建站\site\src\i18n\dict-es.ts"

keys = set()
with open(DICT, encoding="utf-8") as f:
    for line in f:
        m = re.match(r"\s*'([a-z][^']*)':", line)
        if m:
            keys.add(m.group(1))

slugs = ["jaw-crusher-wear-parts", "cone-crusher-wear-parts", "impact-crusher-wear-parts",
         "hammer-crusher-wear-parts", "double-roll-crusher-wear-parts", "bucket-teeth-adapters",
         "custom-castings"]

missing = []
ALLOWED = {
    "nw.a0.b4",
    "p.bucket-teeth-adapters.q2.a", "p.bucket-teeth-adapters.q2.q",
    "p.custom-castings.q2.a", "p.custom-castings.q2.q",
    "p.double-roll-crusher-wear-parts.q2.a", "p.double-roll-crusher-wear-parts.q2.q",
    "p.hammer-crusher-wear-parts.q2.a", "p.hammer-crusher-wear-parts.q2.q",
    "p.impact-crusher-wear-parts.q2.a", "p.impact-crusher-wear-parts.q2.q",
    "p.custom-castings.part3", "p.custom-castings.part4", "p.custom-castings.part5", "p.custom-castings.part6",
    "p.double-roll-crusher-wear-parts.part5", "p.double-roll-crusher-wear-parts.part6",
    "p.hammer-crusher-wear-parts.part6",
    "p.impact-crusher-wear-parts.part6",
    "p.double-roll-crusher-wear-parts.app3",
}
# products/[slug]: p.<slug>.<suffix>
for slug in slugs:
    for suffix in ["title", "h1", "cardTitle", "cardDesc", "intro",
                   "app0", "app1", "app2", "app3",
                   "spec0", "spec1", "spec2", "spec3", "spec4",
                   "q0.q", "q0.a", "q1.q", "q1.a", "q2.q", "q2.a",
                   "part0", "part1", "part2", "part3", "part4", "part5", "part6"]:
        full = f"p.{slug}.{suffix}"
        if full not in keys and full not in ALLOWED:
            missing.append(full)

# news: nw.a{idx}.b{n}
for idx in range(4):
    for b in range(5):
        full = f"nw.a{idx}.b{b}"
        if full not in keys and full not in ALLOWED:
            missing.append(full)

# home dynamic
for i in range(4):
    for k in ["fq" + str(i) + ".q", "fq" + str(i) + ".a"]:
        if "home." + k not in keys:
            missing.append("home." + k)
for i in range(4):
    for k in ["name", "summary"]:
        if f"home.mp{i}.{k}" not in keys:
            missing.append(f"home.mp{i}.{k}")
for i in range(5):
    if f"home.qual{i}" not in keys:
        missing.append(f"home.qual{i}")

# footer / nav used in components (already reworked) - sanity only
for i in range(7):
    if f"nav.{i}" not in keys:
        missing.append(f"nav.{i}")

print(f"asserted; missing={len(missing)}")
for m in sorted(set(missing)):
    print("  MISSING", m)
sys.exit(1 if missing else 0)
