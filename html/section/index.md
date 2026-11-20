---
title: "`<section>`"
description: "Логические блоки сайта принято оборачивать в этот тег."
baseline:
  - group: section
    features:
      - html.elements.section
cover:
  author: kirakusto
  desktop: 'images/covers/desktop.svg'
  mobile: 'images/covers/mobile.svg'
  alt: 'Книга из которой выглядывают закладки: tools, docs'
authors:
  - doka-dog
contributors:
  - solarrust
editors:
  - tachisis
keywords:
  - секция
related:
  - html/body
  - html/h1-h6
  - html/header
tags:
  - doka
---

## Кратко

Тег `<section>` создаёт независимый блок — например, блок новостей, блок с контактами или просто абзац с заголовком.

## Пример

```html
<section>
  <h1>Заголовок первого блока</h1>
  <p>Съешь ещё этих мягких французских булок, да выпей чаю.</p>
</section>

<section>
  <h1>Заголовок второго блока</h1>
  <p>Съешь ещё этих мягких французских булок, да выпей же чаю.</p>
</section>
```

## Как понять

В `<section>` помещаются важные для поисковика элементы, для которых не нашлось подходящего тега вроде [`<img>`](/html/img/) или [`<header>`](/html/header/).

## Как пишется

Тег `<section>` всегда закрывается при помощи парного тега `</section>`.

Внутри `<section>` обязательно должен быть заголовок [`<h1>`...`<h6>`](/html/h1-h6/).

Контейнеры `<section>` можно вкладывать друг в друга, как матрёшку.

## Атрибуты

Можно применить все [глобальные атрибуты](/html/global-attrs/).

## Подсказки

💡 Если вы хотите просто объединить и стилизовать второстепенные элементы, которые не так важны для поисковика, лучше использовать [`<div>`](/html/div/).
