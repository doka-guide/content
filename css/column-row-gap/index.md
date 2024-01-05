---
title: "`row-gap`, `column-gap`"
description: "Отдельные свойства для отступов между рядами и колонками в грид-раскладке."
baseline:
  - group: grid
    features:
      - css.properties.column-gap.grid_context
      - css.properties.row-gap.grid_context
authors:
  - solarrust
keywords:
  - отступы между грид-ячейками
related:
  - css/grid-guide
  - css/gap
  - css/flexbox-guide
tags:
  - doka
---

## Кратко

Задают отступы между рядами и колонками в грид-раскладке.

## Пример

```css
.container {
  display: grid;
  grid-template-columns: 1fr 350px 1fr;
  grid-template-rows: repeat(3, 150px);
  /* Отступы между рядами */
  row-gap: 50px;
  /* Отступы между колонками */
  column-gap: 20px;
}
```

![Пример реализации свойств row-gap и column-gap](images/1.png)

## Как пишется

Указывайте одно значение размера в любых единицах измерения.

## Подсказки

💡 В инспекторе отступы заштриховываются, так их можно отличить от грид-элементов.

<aside>

📝 Полный список свойств гридов можно посмотреть в [гайде по grid](/css/grid-guide/).

</aside>
