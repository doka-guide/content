---
title: "`place-self`"
description: "Шорткат для выравнивания отдельного элемента внутри грид-контейнера."
baseline:
  - group: grid
    features:
      - css.properties.place-self.grid_context
authors:
  - solarrust
keywords:
  - выравнивание грид-элемента
  - шорткат
related:
  - css/grid-guide
  - css/justify-self
  - css/align-self
tags:
  - doka
---

## Кратко

Шорткат для одновременного указания значений для свойств [`justify-self`](/css/justify-self/) и [`align-self`](/css/align-self/).

## Пример

Элемент с классом `.item1` прижмётся к верхней горизонтальной границе и правой вертикальной границе ячейки:

```css
.container {
  justify-items: stretch;
}

.item1 {
  place-self: start end;
}
```

## Как пишется

- `auto` (значение по умолчанию) — стандартное значение, можно использовать для сброса ранее заданных значений.
- `align-self justify-self` — первое значение указывает на значение свойства `align-self`, второе значение устанавливает значение свойства `justify-self`. Если указано всего одно значение, то оно устанавливается в качестве значения для обоих свойств. Например, `place-self: center` выровняет элемент по центру по горизонтальной и по вертикальной осям одновременно.

## Подсказки

<aside>

📝 Полный список свойств гридов можно посмотреть в [гайде по grid](/css/grid-guide/).

</aside>
