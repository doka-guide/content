---
title: "`grid-template-columns`"
description: "Задаём количество и размер грид-колонок."
baseline:
  - group: grid
    features:
      - css.properties.grid-template-columns
      - css.properties.grid-template-columns.fit-content
      - css.properties.grid-template-columns.minmax
      - css.properties.grid-template-columns.repeat
      - css.properties.grid-template-columns.animation
  - group: subgrid
    features:
      - css.properties.grid-template-columns.subgrid
authors:
  - solarrust
editors:
  - tachisis
keywords:
  - размер и количество колонок
  - грид-колонка
related:
  - css/grid-guide
  - css/grid-template-rows
  - css/grid-template
tags:
  - doka
---

## Кратко

С помощью `grid-template-columns` задают, сколько колонок будет в грид-раскладке и какого они размера.

## Пример

Внутри блока `.container` будет создано 3 колонки:

```css
.container {
  display: grid;
  grid-template-columns: 40px auto 40%;
}
```

## Как пишется

Указывают столько размеров, сколько колонок нужно. Размеры можно задавать в любых единицах измерения и перечислять через пробел.

```css
.container {
  display: grid;
  grid-template-columns: 5px 50px 40% 14rem 8em 1fr;
}
```

Специальное значение `subgrid` позволяет дочернему грид-контейнеру наследовать треки родителя вместо создания собственных. Колонки дочернего элемента будут совпадать с колонками родительского грида.

```css
.parent {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
}

.child {
  display: grid;
  grid-column: span 3;
  grid-template-columns: subgrid;
}
```

Это удобно для карточек с разным содержимым: когда нужно, чтобы заголовки и описания из разных карточек выравнивались по общей сетке, не требуя одинаковой высоты блоков.

## Как понять

Свойство `grid-template-columns` _командует_ браузеру, во сколько колонок выстраивать вложенные элементы. И какого размера должны быть колонки.

## Подсказки

💡 Можно использовать функцию `repeat()` для создания колонок одного размера.

💡 Удобно использовать единицу измерения `fr`, чтобы указать, в каких соотношениях колонки разделят свободное место.

💡 Кроме непосредственного количества колонок и их размеров можно задавать и имена для грид-линий, ограничивающих эти колонки:

```css
.container {
  display: grid;
  grid-template-columns: [start] 140px [line2] 250px [line3] 40px [end];
}
```

<aside>

📝 Полный список свойств гридов можно посмотреть в [гайде по grid](/css/grid-guide/).

</aside>
