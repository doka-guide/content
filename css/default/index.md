---
title: "`:default`"
description: "Псевдокласс для стилизации элементов, которые используются по умолчанию в группе аналогичных элементов."
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

Псевдокласс `:default` применяется к элементам, которые используются по умолчанию в группе аналогичных элементов.

## Пример

```css
option:default {
  background-color: #F498AD;
}

input:default {
  border-color: #F498AD;
}

button:default {
  background-color: #F498AD;
}
```

<iframe title="Форма со стилизованным элементами по умолчанию" src="demos/form/" height="590"></iframe>

## Как пишется

После селектора ставим двоеточие и пишем ключевое слово `default`:

```css
.input:default {
  outline: 2px solid hotpink;
}
```

## Как понять

Этот псевдокласс можно применить к следующим элементам:

- теги [`<option>`](/html/option/) с атрибутом `selected`;
- радиокнопки и чекбоксы [`<input>`](/html/input/) с атрибутом `selected`;
- первая кнопка отправки формы. Такой кнопкой может быть первый тег [`<button>`](/html/button/) или первый тег `<input>` с типом `image` или `submit`.
