---
title: "`column-rule-width`"
description: "Хочется сделать линию между колонками пожирнее? Используйте это свойство!"
authors:
  - xpleesid
related:
  - css/numeric-types
  - css/border-width
  - css/column-rule
tags:
  - doka
---

## Кратко

Свойство `column-rule-width` отвечает за ширину линии между колонками в многоколоночной вёрстке.

## Как понять

Можно использовать любые [единицы измерения](/css/numeric-types/), доступные в вебе, кроме процентов. По умолчанию установлено значение [`medium`](/css/border-width/). Более подробно можно прочесть в описании [`border-width`](/css/border-width/), ширина межколоночной линии описывается и вычисляется так же, как и ширина рамки.

## Как пишется

Чтобы задать межколоночной линии ширину 2 px, мы напишем:

```css
p {
  column-count: 3;
  column-rule: 2px;
}
```

Также `column-rule-width` — это первое значение в свойстве [`column-rule`](/css/column-rule/).

## Пример

В примере ниже вы можете поменять ширину линии между колонками. По умолчанию заданы такие стили:

```css
.text-wrapper {
  column-count: 3;
  column-rule: 3px solid #ffd829;
  column-gap: 25px;
}
```

<iframe title="Варианты значений column-rule-width" src="demos/multiple-values/" height="400"></iframe>
