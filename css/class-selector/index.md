---
title: "Селектор по классу"
description: "Удобный способ выбрать из HTML-разметки элементы только с нужным классом. И применить к ним стили."
authors:
  - ezhkov
contributors:
  - skorobaeus
editors:
  - tachisis
keywords:
  - селектор
  - класс
related:
  - html/class
  - css/tag-selector
  - js/query-selector
tags:
  - doka
---

## Кратко

Селектор по классу находит элемент на странице по значению атрибута [`class`](/html/class/).

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

Самое важное — поставить точку перед значением атрибута `class` того элемента, к которому вы хотите применить стили. Селектор без точки в начале — [селектор по тегу](/css/tag-selector/).

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

<aside>

⚠️ Обратите внимание: селектор `.article-title` эквивалентен [селектору по атрибуту](/css/attribute-selector/) `[class~="article-title"]`.

</aside>

## Подсказки

Селектор по классу довольно прост в понимании, а особенности атрибута `class` дают большую гибкость в стилизации. Мы всегда можем придумать уникальное значение для атрибута `class` и по этому значению точечно применить нужные стили. Но также мы можем задать элементу любое количество классов, просто перечислив их через пробел. Благодаря этому мы можем переиспользовать некоторые стили на разных элементах.

```html
<blockquote class="color" cite="Эрих Мария Ремарк">Зима пробуждает аппетит...</blockquote>
<blockquote class="author" cite="Эрих Мария Ремарк">Зима пробуждает аппетит...</blockquote>
<blockquote class="author color" cite="Эрих Мария Ремарк">Зима пробуждает аппетит...</blockquote>
```

```css
blockquote {
  position: relative;
  background-color: white;
  color: #123E66;
}
```

Если цитате добавить класс `.color`, то фоновый цвет сменится на голубой:

```css
.color {
  background-color: blue;
  color: black;
}
```

Если элементу добавить класс `.author`, то перед текстом цитаты будет декоративная кавычка, а после — имя автора:

```css
.author::before {
  content: "“";
  position: absolute;
}

.author::after {
  content: attr(cite);
  display: block;
  font-style: italic;
}
```

<iframe title="Несколько классов" src="demos/several-classes/" height="820"></iframe>
