---
title: "`<map>`"
description: "Уютный контейнер для `<area>`."
baseline:
  - group: image-maps
    features:
      - html.elements.map
authors:
  - inventoris
contributors:
  - skorobaeus
related:
  - html/area
  - html/img
  - html/a
tags:
  - doka
---

## Кратко

Тег `<map>` — это обёртка для тега [`<area>`](/html/area/), он нужен для связи с картинкой.

## Пример

```html
<map name="doka-label">
  <area
  shape="rect"
  coords="40,20,420,130"
  href="/html/"
  alt="Раздел HTML">
</map>
<img
  src="../../images/doka-map.svg"
  usemap="#doka-label"
  alt="Мордочка собаки с ушами, носом, ртом и сердечками вместо глаз."
>
```

<iframe title="Базовый пример" src="demos/basic/" height="300"></iframe>

## Как пишется

У тега `<map>` должен быть атрибут `name` с уникальным именем, на которое мы будем ссылаться в атрибуте `usemap` картинки. А внутри тега может быть сколько угодно `<area>` — они размечают на картинке области-ссылки.

## Как понять

Поскольку тегов `<area>` может быть очень много, например на картинке с навигацией, без `<map>` пришлось бы связывать каждый `<area>` с единственной картинкой. К счастью, `<map>` служит удобной обёрткой, и ссылаться нужно только на него 😉

## Подсказки

💡 Чтобы связь установилась верно, не забудьте поставить знак `#` перед именем внутри `usemap`.
