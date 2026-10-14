# -*- coding: utf-8 -*-
"""Verify i18n keys referenced in [lang] templates exist in the ES dict."""
import re, os, sys

ROOT = r"E:\豆包工作内容存放\丁达尔建站\site"
DICT = os.path.join(ROOT, "src", "i18n", "dict-es.ts")
TPL_DIR = os.path.join(ROOT, "src", "pages", "[lang]")

# 1. collect dict keys
keys = set()
with open(DICT, encoding="utf-8") as f:
    for line in f:
        m = re.match(r"\s*'([a-z][^']*)':", line)
        if m:
            keys.add(m.group(1))

# 2. helpers: prefix -> what they append
helpers = {
    "t(": "",            # full key inside quotes
    "prod(": "prod.",
    "pui(": "pui.",
    "ab(": "ab.",
    "pr(": "pr.",
    "fq(": "fq.",
    "ct(": "ct.",
    "sp(": "sp.",
    "rs(": "rs.",
    "pv(": "pv.",
    "home(": "home.",
    "common(": "common.",
    "nw(": "nw.",
}
# p('x') is dynamic with slug -> validate against a list of slugs separately

slugs = ["jaw-crusher-wear-parts", "cone-crusher-wear-parts", "impact-crusher-wear-parts",
         "hammer-crusher-wear-parts", "double-roll-crusher-wear-parts", "bucket-teeth-adapters",
         "custom-castings"]

missing = []
checked = 0

for root, dirs, files in os.walk(TPL_DIR):
    for fn in files:
        if not fn.endswith(".astro"):
            continue
        path = os.path.join(root, fn)
        with open(path, encoding="utf-8") as f:
            src = f.read()
        # dynamic p('slug.suffix') and t('p.slug.suffix') / t('nw.aN.suffix') / article('suffix')
        for m in re.finditer(r"(?:t|p|article)\(\s*'([^']+)'", src):
            key = m.group(1)
            checked += 1
            if key.startswith("nw.a") or key.startswith("p."):
                # t('p.slug.cardTitle') style - full key
                if key not in keys:
                    missing.append((fn, key))
                continue
            if "." in key:
                # segment prefix inside slug key e.g. p('q0.q') -> p.<slug>.q0.q
                for slug in slugs:
                    full = "p." + slug + "." + key
                    if full in keys:
                        break
                else:
                    missing.append((fn, "p.<slug>." + key))
            else:
                # article('b0') style handled separately
                pass
        # helper calls
        for m in re.finditer(r"([a-z]+)\(\s*'([^']+)'", src):
            hname, arg = m.group(1), m.group(2)
            if hname not in helpers:
                continue
            full = helpers[hname] + arg
            checked += 1
            if full not in keys:
                missing.append((fn, full))
        # arrays built from ['ct.opt0', ...].map(k => t(k))
        for m in re.finditer(r"'(?:ct|sp)\.opt\d+'", src):
            checked += 1
            if m.group(0).strip("'") not in keys:
                missing.append((fn, m.group(0).strip("'")))
        # ['sp.u0',...], ['rs.in0',...], ['ct.h0',...] style lists
        for m in re.finditer(r"'(?:sp|rs|ct|pv)\.(?:u|in|h|s)\d+(?:\.(?:title|body))?'", src):
            checked += 1
            if m.group(0).strip("'") not in keys:
                missing.append((fn, m.group(0).strip("'")))

print(f"checked {checked} references, missing {len(missing)}")
for fn, key in sorted(set(missing)):
    print(f"  MISSING {key}  ({fn})")
sys.exit(1 if missing else 0)
