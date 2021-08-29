---
title: "Селектор по классу"
authors:
  - ezhkov
editors:
  - tachisis
keywords:
  - селектор
  - класс
tags:
  - doka
---

## Кратко

Селектор по классу находит элемент на странице по значению атрибута [`class`](/html/class).

## Пример

```html
<h2 class="article-title">Нобелевская премия по физике 2020 года</h2>
<h3 class="article-title">Шнобелевская премия 2020</h3>
```

Селектор ниже _найдёт_ все элементы, значение атрибута `class` которых равно `article-title`.

```css
.article-title {
  margin-bottom: 1.6em;
}
```

## Как пишется

Самое важное — поставить точку перед значением атрибута `class` того элемента, к которому вы хотите применить стили. Селектор без точки в начале — [селектор по тегу](/css/tag-selector).

Вот так сработает:

```css
.class-value {
  color: red;
}
```

А вот так не сработает:

```css
class-value {
  color: red;
}
```

Стиль применится ко всем элементам с атрибутом `class="article-title"`.

```css
.article-title {
  margin-bottom: 1.6em;
}
```

Стиль применится ко всем заголовкам `<h2>` с атрибутом `class="article-title"`.

```css
h2.article-title {
  margin-bottom: 1.6em;
}
```

Стиль применится ко всем заголовкам `<h2>`, атрибут `class` которых содержит несколько значений, разделённых пробелом, и среди этих значений есть `"article-title"` и `"title-primary"`.

```css
h2.article-title.title-primary {
  text-decoration: underline;
}
```

:::callout ⚠️

Обратите внимание: селектор `.article-title` эквивалентен [селектору по атрибуту](/css/attribute-selector/) `[class~="article-title"]`.

:::

## Подсказки

Селектор по классу довольно прост в понимании, а особенности атрибута `class` дают большую гибкость в стилизации. Мы всегда можем придумать уникальное значение для атрибута `class` и по этому значению точечно применить нужные стили. Но также мы можем задать элементу любое количество классов, просто перечислив их через пробел. Благодаря этому мы можем переиспользовать некоторые стили на разных элементах.

```html
<label for="input" class="form-label text-invalid">Ваше имя:</label>
<input id="input" type="text" placeholder="Только кириллица">

<p class="text-invalid warning">Вы не заполнили все поля</p>

<h3 class="warning">Обратите внимание</h3>
```

```css
.form-label {
  display: block;
  font-size: 1em;
  color: #333333;
}
```

Если элементу добавить класс `.text-invalid`, то текст будет красным:

```css
.text-invalid {
  color: red;
}
```

Если элементу добавить класс `.warning`, то перед текстом будет иконка с жёлтым треугольником:

```css
.warning::before {
  content: "⚠️ ";
}
```

<iframe title="Название — Селектор по классу — Дока" src="demos/ezhkov-rNMwwRw/"></iframe>
