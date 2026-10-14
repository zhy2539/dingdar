# -*- coding: utf-8 -*-
"""Trim over-long i18n titles (multi-lang pages) + English news titles."""
import io, re, os

D = r"E:\豆包工作内容存放\丁达尔建站\site\src\i18n"
NEWS = r"E:\豆包工作内容存放\丁达尔建站\site\src\data\news.ts"

# per-language replacement: (key, old_value, new_value)
REPL = {
    "dict-es.ts": [
        ("meta.products.title",
         "Piezas de desgaste para trituradoras y categorías de fundición | DINGDAR",
         "Piezas de desgaste para trituradoras y categorías | DINGDAR"),
        ("p.jaw-crusher-wear-parts.title",
         "Piezas de desgaste para trituradora de mandíbula | Placas de mandíbula | DINGDAR",
         "Piezas de desgaste para trituradora de mandíbula | DINGDAR"),
        ("p.cone-crusher-wear-parts.title",
         "Piezas de desgaste para trituradora de cono | Mantos y cóncavas | DINGDAR",
         "Piezas de desgaste para trituradora de cono | DINGDAR"),
        ("p.impact-crusher-wear-parts.title",
         "Piezas de desgaste para trituradora de impacto | Barras de impacto | DINGDAR",
         "Piezas de desgaste para trituradora de impacto | DINGDAR"),
        ("nw.a1.title",
         "Cómo elegir el material de las placas de mandíbula: Mn13, Mn18 y más",
         "Cómo elegir el material de placas de mandíbula"),
        ("nw.a2.title",
         "MOQ, utillaje y plazo para piezas de desgaste de trituradora: lo que deben saber los compradores",
         "MOQ, utillaje y plazo para piezas de desgaste"),
        ("nw.a3.title",
         "Moldeo en arena verde vs. microfusión: ¿qué ruta encaja con tu pieza?",
         "Moldeo en arena verde vs. microfusión: cómo elegir"),
    ],
    "dict-fr.ts": [
        ("p.jaw-crusher-wear-parts.title",
         "Pièces d\\'usure de concasseur à mâchoires | Plaques de mâchoire | DINGDAR",
         "Pièces d\\'usure de concasseur à mâchoires | DINGDAR"),
        ("p.cone-crusher-wear-parts.title",
         "Pièces d\\'usure de concasseur à cône | Manteaux et côncaves | DINGDAR",
         "Pièces d\\'usure de concasseur à cône | DINGDAR"),
        ("p.impact-crusher-wear-parts.title",
         "Pièces d\\'usure de concasseur à impact | Barres de choc | DINGDAR",
         "Pièces d\\'usure de concasseur à impact | DINGDAR"),
        ("p.custom-castings.title",
         "Pièces moulées sur mesure | Revue de plan et d\\'échantillon | DINGDAR",
         "Pièces moulées sur mesure | DINGDAR"),
        ("nw.a1.title",
         "Comment choisir le matériau des plaques de mâchoire : Mn13, Mn18 et au-delà",
         "Comment choisir le matériau des plaques de mâchoire"),
        ("nw.a2.title",
         "MOQ, outillage et délai pour les pièces d\\'usure de concasseurs : ce que les acheteurs doivent savoir",
         "MOQ, outillage et délai pour pièces d\\'usure"),
        ("nw.a3.title",
         "Moulage sable à vert vs moulage de précision : quelle voie pour votre pièce ?",
         "Moulage sable à vert vs précision : comment choisir"),
    ],
    "dict-ru.ts": [
        ("p.jaw-crusher-wear-parts.title",
         "Износостойкие детали щёковой дробилки | Щёковые плиты | DINGDAR",
         "Износостойкие детали щёковой дробилки | DINGDAR"),
        ("p.cone-crusher-wear-parts.title",
         "Износостойкие детали конусной дробилки | Брони | DINGDAR",
         "Износостойкие детали конусной дробилки | DINGDAR"),
        ("p.impact-crusher-wear-parts.title",
         "Износостойкие детали роторной дробилки | Била | DINGDAR",
         "Износостойкие детали роторной дробилки | DINGDAR"),
        ("p.custom-castings.title",
         "Индивидуальное литьё | Рассмотрение чертежа и образца | DINGDAR",
         "Индивидуальное литьё | DINGDAR"),
        ("nw.a1.title",
         "Как выбрать материал щёковых плит: Mn13, Mn18 и далее",
         "Как выбрать материал щёковых плит"),
        ("nw.a2.title",
         "MOQ, оснастка и сроки для износных деталей дробилок: что нужно знать покупателям",
         "MOQ, оснастка и сроки для износных деталей"),
        ("nw.a3.title",
         "Литьё в сырые песчаные формы или по выплавляемым моделям: какой маршрут для вашей детали?",
         "Литьё в сырые формы или по выплавляемым моделям: как выбрать"),
    ],
    "dict-pt.ts": [
        ("p.jaw-crusher-wear-parts.title",
         "Peças de desgaste para britador de mandíbulas | Placas de mandíbula | DINGDAR",
         "Peças de desgaste para britador de mandíbulas | DINGDAR"),
        ("p.cone-crusher-wear-parts.title",
         "Peças de desgaste para britador cônico | Mantos e côncavos | DINGDAR",
         "Peças de desgaste para britador cônico | DINGDAR"),
        ("p.impact-crusher-wear-parts.title",
         "Peças de desgaste para britador de impacto | Barras de impacto | DINGDAR",
         "Peças de desgaste para britador de impacto | DINGDAR"),
        ("p.custom-castings.title",
         "Fundidos personalizados | Revisão de desenho e amostra | DINGDAR",
         "Fundidos personalizados | DINGDAR"),
        ("nw.a1.title",
         "Como escolher o material das placas de mandíbula: Mn13, Mn18 e além",
         "Como escolher o material das placas de mandíbula"),
        ("nw.a2.title",
         "MOQ, ferramental e prazo para peças de desgaste de britadores: o que os compradores precisam saber",
         "MOQ, ferramental e prazo para peças de desgaste"),
        ("nw.a3.title",
         "Areia verde vs fundição de precisão: qual rota para sua peça?",
         "Areia verde vs fundição de precisão: como escolher"),
    ],
}

def patch(fname, pairs):
    path = os.path.join(D, fname)
    with io.open(path, encoding="utf-8") as f:
        txt = f.read()
    for key, old, new in pairs:
        line_old = "  '" + key + "': '" + old + "',"
        line_new = "  '" + key + "': '" + new + "',"
        if line_old not in txt:
            print("!! NOT FOUND", fname, key)
            continue
        txt = txt.replace(line_old, line_new)
        print("patched", fname, key)
    with io.open(path, "w", encoding="utf-8") as f:
        f.write(txt)

for fn, pairs in REPL.items():
    patch(fn, pairs)

# English news titles
with io.open(NEWS, encoding="utf-8") as f:
    ntxt = f.read()
news_pairs = [
    ("MOQ, Lead Time and Tooling for Crusher Wear Parts: What Buyers Need to Know",
     "MOQ, Lead Time and Tooling for Crusher Wear Parts"),
    ("Green Sand vs Investment Casting: Which Route Fits Your Part?",
     "Green Sand vs Investment Casting: Which Route?"),
]
for old, new in news_pairs:
    if old in ntxt:
        ntxt = ntxt.replace(old, new)
        print("patched news.ts:", new)
    else:
        print("!! news.ts NOT FOUND:", old)
with io.open(NEWS, "w", encoding="utf-8") as f:
    f.write(ntxt)
print("done")
