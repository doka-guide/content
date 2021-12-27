---
title: "`grid-template`"
authors:
  - solarrust
editors:
  - tachisis
keywords:
  - шорткат
tags:
  - doka
---

## Кратко

Свойство-шорткат для свойств `grid-template-rows`, `grid-template-columns`. Позволяет записать все значения в одну строку. Главное, после этого не запутаться при чтении 😅

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
