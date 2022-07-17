---
title: "`column-rule`"
description: "Можно задать декоративную линию между колонками, если текст свёрстан как в газете."
authors:
  - xpleesid
related:
  - css/border
  - css/columns
  - css/column-count
tags:
  - doka
---

## Кратко

Свойство `column-rule` отвечает за внешний вид линии между колонками в многоколоночной вёрстке.

## Как понять

Свойство `column-rule` является шорткатом для свойств:

- [`column-rule-width`](/css/column-rule-width/)
- [`column-rule-style`](/css/column-rule-style/)
- [`column-rule-color`](/css/column-rule-color/)

Можно писать значения в любом порядке, разделяя пробелами, браузер сам поймёт, что мы от него хотим. Но общепринятым форматом является вид «ширина → стиль → цвет»‎: `column-rule-width` → `column-rule-style` → `column-rule-color`. Можно не указывать ширину и цвет, но стиль линии указывается обязательно – у `column-rule-style` нет значения по умолчанию и браузер не поймёт, какую линию нужно нарисовать.

## Как пишется

Для того чтобы задать между колонками красную пунктирную линию шириной 2 px, мы напишем:

```css
p {
  column-rule: 2px dashed red;
}
```

Прослеживается сходство со свойством [`border`](/css/border/). Действительно, межколоночная линия описывается так же, как и рамка.

## Пример

В примере ниже вы можете поменять внешний вид у линии между колонками. По умолчанию заданы такие стили:

```css
.text-wrapper {
  column-count: 3;
  column-rule: 3px solid red;
  column-gap: 25px;
}
```

<iframe title="Варианты значений column-rule" src="demos/multiple-values/" height="520"></iframe>
