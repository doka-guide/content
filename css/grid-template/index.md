---
title: "`grid-template`"
description: "Короткий способ объявить все ряды и колонки внутри грид-контейнера одновременно."
baseline:
  - group: grid
    features:
      - css.properties.grid-template
authors:
  - solarrust
editors:
  - tachisis
related:
  - css/grid-template-rows
  - css/grid-template-columns
  - css/grid-guide
tags:
  - doka
---

## Кратко

Шорткат для свойств [`grid-template-rows`](/css/grid-template-rows/), [`grid-template-columns`](/css/grid-template-columns/). Позволяет записать все значения в одну строку. Главное, после этого не запутаться при чтении 😅

## Пример

Будет создано 4 ряда по 150 пикселей и три колонки: 1fr, 200 пикселей и 1fr по размерам:

```css
.container {
  display: grid;
  grid-template: repeat(4, 150px) / 1fr 200px 1fr;
}
```

## Как пишется

Можно прописать все колонки и ряды сразу, разделяя их слэшем `/`. Сперва идут ряды, а затем колонки, не перепутайте!

Используйте все доступные значения свойств [`grid-template-rows`](/css/grid-template-rows/) и [`grid-template-columns`](/css/grid-template-columns/), разделяя их слэшем.

## Подсказки

<aside>

📝 Полный список свойств гридов можно посмотреть в [гайде по grid](/css/grid-guide/).

</aside>
