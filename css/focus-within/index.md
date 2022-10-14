---
title: "`:focus-within`"
description: "Выделяем элементы в фокусе и их родителей."
authors:
  - starhamster
related:
  - css/focus
  - css/pseudoclasses
  - css/hover
tags:
  - doka
---

## Кратко

Псевдокласс `:focus-within` применяется к элементам, которые либо сами находятся в фокусе, либо имеют дочерние элементы в фокусе.

## Пример

```css
form:focus-within {
  background-color: #282A2E;
}
```

<iframe title="Форма со стилизованным состоянием фокуса" src="demos/form/" height="340"></iframe>

## Как пишется

После любого селектора ставим двоеточие и пишем ключевое слово `focus-within`:

```css
.input:focus-within {
  outline: 2px solid hotpink;
}
```

## Как понять

Псевдокласс `:focus-within` используется в двух случаях:

- если к этому элементу применяется псевдокласс [`:focus`](/css/focus/);
- если к потомку этого элемента применяется псевдокласс `:focus`.

Причём потомок не обязательно должен быть прямым. Например, в примере с формой все теги [`<input>`](/html/input/) были сначала вложены в [`<div>`](/html/div/) и только потом — в [`<form>`](/html/form/). Несмотря на это, `:focus-within` применился к форме.
