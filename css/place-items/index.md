---
title: "`place-items`"
description: "Шорткат для выравнивания грид-элемента по обеим осям."
baseline:
  - group: grid
    features:
      - css.properties.place-items.grid_context
authors:
  - solarrust
keywords:
  - выравнивание в гридах
  - шорткат
related:
  - css/grid-guide
  - css/align-items
  - css/justify-content
tags:
  - doka
---

## Кратко

Шорткат для указания значений сразу и для [`align-items`](/css/align-items/) и для [`justify-items`](/css/justify-items/). Указывать нужно именно в таком порядке.

## Пример

```css
.container {
  display: grid;
  place-items: stretch end;
}
```

## Как пишется

Пишутся два доступных значения для свойств `align-items` и `justify-items`, разделённые пробелом.

## Подсказки

<aside>

📝 Полный список свойств гридов можно посмотреть в [гайде по grid](/css/grid-guide/).

</aside>
