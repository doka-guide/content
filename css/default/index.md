---
title: "`:default`"
description: "Псевдокласс для стилизации элементов по умолчанию."
authors:
  - starhamster
related:
  - css/pseudoclasses
  - html/input
  - html/form
tags:
  - doka
---

## Кратко

Псевдокласс CSS `:default` применяется к элементам формы, которые используются по умолчанию.

## Пример

```css
.option:default {
  background-color: #F498AD;
}

.input:default {
  border-color: #F498AD;
}

.button:default {
  background-color: #F498AD;
}
```

<iframe title="Форма со стилизованным элементами по умолчанию" src="demos/form/" height="590"></iframe>

## Как пишется

После любого селектора ставим двоеточие и пишем ключевое слово `default`:

```css
.input:default {
  outline: 2px solid hotpink;
}
```

## Как понять

Этому селектору соответствуют следующие элементы:

- теги [`<option>`](/html/option/) с атрибутом `selected`;
- радиокнопки и чекбоксы [`<input>`](/html/input/) с атрибутом `selected`;
- первая кнопка отправки формы. Такой кнопкой может быть первый тег [`<button>`](/html/button/) или первый тег `<input>` с типом `image` или `submit`.
