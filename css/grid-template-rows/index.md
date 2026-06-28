---
title: "`grid-template-rows`"
description: "Задаём количество и размер грид-рядов."
baseline:
  - group: grid
    features:
      - css.properties.grid-template-rows
      - css.properties.grid-template-rows.fit-content
      - css.properties.grid-template-rows.minmax
      - css.properties.grid-template-rows.repeat
      - css.properties.grid-template-rows.animation
  - group: subgrid
    features:
      - css.properties.grid-template-rows.subgrid
authors:
  - solarrust
editors:
  - tachisis
keywords:
  - размер и количество рядов
  - грид-ряд
related:
  - css/grid-guide
  - css/grid-template-columns
  - css/grid-template
tags:
  - doka
---

## Кратко

Свойство, задающее размеры и количество рядов грид-раскладки.

## Пример

Внутри блока `.container` будет создано 3 ряда:

```css
.container {
  display: grid;
  grid-template-rows: 250px 5vw 15rem;
}
```

## Как понять

Свойство `grid-template-rows` _командует_ браузеру, во сколько рядов выстраивать вложенные элементы. И какого размера должны быть эти ряды.

## Как пишется

В качестве значения указывается то количество размеров, какое количество рядов необходимо. Размеры могут указываться в любых доступных единицах измерения. Размеры перечисляются через пробел.

```css
.container {
  display: grid;
  grid-template-rows: 5px 50px 40% 14rem 8em 1fr;
}
```

Специальное значение `subgrid` позволяет дочернему грид-контейнеру наследовать ряды родителя вместо создания собственных. Ряды дочернего элемента будут совпадать с рядами родительского грида.

```css
.parent {
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.child {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;
}
```

Это позволяет выровнять содержимое вложенных элементов (например, шапку, тело и подвал карточек) по общим рядам родительского грида.

## Подсказки

💡 Можно использовать функцию `repeat()` для создания рядов одного размера.

💡 Удобно использовать единицу измерения `fr`, чтобы указать, в каких соотношениях ряды разделят свободное место.

💡 Кроме непосредственного количества рядов и их размеров можно задавать и имена для грид-линий, ограничивающих эти ряды:

```css
.container {
  display: grid;
  grid-template-rows: [row1-start] 25rem [row1-end] 10vh [last];
}
```

<aside>

📝 Полный список свойств гридов можно посмотреть в [гайде по grid](/css/grid-guide/).

</aside>
