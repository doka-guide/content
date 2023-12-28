---
title: "`gap`"
description: "Удобный способ задать отступы между элементами внутри гридов и флексбоксов."
baseline:
  - group: grid
    features:
      - css.properties.gap.grid_context
      - css.properties.gap.grid_context.calc_values
      - css.properties.gap.grid_context.percentage_values
authors:
  - solarrust
editors:
  - tachisis
contributors:
  - parabolabam
keywords:
  - отступы между грид-ячейками
  - отступы в флексбоксе
  - шорткат
related:
  - css/numeric-types
  - css/grid-guide
  - css/flexbox-guide
tags:
  - doka
---

## Кратко

Шорткат для записи значений свойств `row-gap` и `column-gap`. Значения разделяются пробелом. Работает как с [гридами](/css/grid-guide/), так и с [флексбоксами](/css/flexbox-guide/).

## Как пишется

Указываете два значения размера в любых [единицах измерения](/css/numeric-types/#edinicy-izmereniya-dliny-ili-rasstoyaniya), разделяя их пробелом. Первым указывается значение отступа для рядов, за ним значение отступа для колонок.

Не обязательно указывать два значения. Браузер поймёт, даже если будет одно — оно задаст `row-gap` и `column-gap`.

## Пример c гридами

```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px 10px;
}
```

<iframe title="Свойство gap с display: grid" src="demos/grid-gap/" height="330"></iframe>

## Пример с флексами

```css
.flex-container {
  display: flex;
  gap: 50px 10px;
}
```

<iframe title="Свойство gap с display: flex" src="demos/flex-gap/" height="330"></iframe>

## Подсказки

<aside>

📝 Полный список свойств гридов можно посмотреть в [гайде по grid](/css/grid-guide/).

Полный список свойств флексов можно посмотреть в [гайде по flexbox](/css/flexbox-guide/).

</aside>
