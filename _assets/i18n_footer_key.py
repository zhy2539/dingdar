# -*- coding: utf-8 -*-
import io
base = r"E:\豆包工作内容存放\丁达尔建站\site\src\i18n\\"
vals = {
    "dict-es.ts": "Enlaces rápidos",
    "dict-fr.ts": "Liens rapides",
    "dict-ru.ts": "Быстрые ссылки",
    "dict-pt.ts": "Links rápidos",
}
for f, v in vals.items():
    p = base + f
    s = io.open(p, encoding="utf-8").read()
    old = "  'footer.products': "
    new = "  'footer.quickLinks': '%s',\n%s" % (v, old)
    if "'footer.quickLinks'" in s:
        print("exists", f); continue
    if old not in s:
        print("!! anchor missing", f); continue
    s = s.replace(old, new, 1)
    io.open(p, "w", encoding="utf-8").write(s)
    print("patched", f)
