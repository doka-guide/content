---
title: "`grid-area`"
description: "Указываем грид-элементу где ему встать."
baseline:
  - group: grid
    features:
      - css.properties.grid-area
authors:
  - solarrust
editors:
  - tachisis
related:
  - css/grid-start-end
  - css/grid-guide
  - css/gap
tags:
  - doka
---

## Кратко

Двуличное свойство 🧐, которое может как указывать элементу, какую из именованных областей ему нужно занять, так и служить шорткатом для одновременного указания значений для четырёх свойств: [`grid-column-start`, `grid-column-end`, `grid-row-start` и `grid-row-end`](/css/grid-start-end/).

## Пример

Пример с указанием на именованную область: блок `item1` займёт область `content` внутри грид-сетки.

```css
.item1 {
  grid-area: content;
}
```

А теперь пример с указанием всех четырёх значений в строку. При таком указании значений есть скользкое место: значения указываются в следующем порядке `row-start / column-start / row-end / column-end`. То есть сначала указываем оба начала, а потом оба конца.

```css
.item2 {
  grid-area: 1 / col4-start / last-line / 6;
}
```

## Как пишется

Важно указывать значения в правильном порядке. Первая пара значений относится к начальной позиции: первое для `grid-row-start`, второе для `grid-column-start`. Вторая пара значений отвечает за конечные позиции: третье для `grid-row-end`, четвёртое для `grid-column-end`.

Используйте доступные значения свойств [`grid-column-start`, `grid-column-end`, `grid-row-start` и `grid-row-end`](/css/grid-start-end/), разделяя их слэшем.

Или напишите ключевое слово, указывающее на именованную область внутри грид-раскладки.

## Подсказки

<aside>

📝 Полный список свойств гридов можно посмотреть в [гайде по grid](/css/grid-guide/).

</aside>
