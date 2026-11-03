---
title: "`grid-column`, `grid-row`"
description: "Где начнётся и где закончится грид-элемент?"
baseline:
  - group: grid
    features:
      - css.properties.grid-column
      - css.properties.grid-row
authors:
  - solarrust
editors:
  - tachisis
keywords:
  - грид-колонка
  - грид-полоса
related:
  - css/grid-guide
  - css/grid-template
  - css/grid-area
tags:
  - doka
---

## Кратко

Свойства-шорткаты для `grid-column-start` + `grid-column-end` и `grid-row-start` + `grid-row-end` соответственно. [Статья про эти свойства](/css/grid-start-end/).

Значения для `*-start` и `*-end` разделяются слэшем.

Можно использовать ключевое слово `span`, буквально говорящее «растянись на столько-то». А на сколько, указывает стоящая за ним цифра.

## Пример

Элемент начинается с третьей линии по вертикали и растягивается на 2 ячейки. По горизонтали элемент начинается от третьей линии и заканчивается у четвёртой линии:

```css
.item1 {
  grid-column: 3 / span 2;
  grid-row: 3 / 4;
}
```

![Пример реализации свойств-шорткатов grid-column, grid-row.](images/1.png)

## Как пишется

Используйте доступные значения свойств [`grid-column-start`, `grid-column-end`, `grid-row-start` и `grid-row-end`](/css/grid-start-end/), разделяя их слэшем.

## Подсказки

💡 Если опустить слэш и второе значение, то элемент будет размером в одну ячейку.

<aside>

📝 Полный список свойств гридов можно посмотреть в [гайде по grid](/css/grid-guide/).

</aside>
