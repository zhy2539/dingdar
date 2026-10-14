# -*- coding: utf-8 -*-
import io
p = r"E:\豆包工作内容存放\丁达尔建站\site\src\data\news.ts"
s = io.open(p, encoding="utf-8").read()
s = s.replace(
    "title: 'How to Choose Jaw Plate Material: Mn13, Mn18 and Beyond',",
    "title: 'How to Choose Jaw Plate Material: Mn13 and Mn18',",
)
s = s.replace(
    "title: 'MOQ, Tooling and Lead Time for Crusher Wear Parts: What Buyers Should Know',",
    "title: 'MOQ, Tooling and Lead Time for Crusher Wear Parts',",
)
io.open(p, "w", encoding="utf-8").write(s)
print("ok")
