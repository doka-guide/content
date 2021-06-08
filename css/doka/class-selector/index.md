---
title: ".class"
authors:
  - ezhkov
summary:
  - селектор
  - класс
---

## Кратко

Селектор по классу находит элемент на странице по значению атрибута `class`.

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

/* Если элементу добавить класс "text-invalid", то текст будет красным  */
.text-invalid {
  color: red;
}

/* Если элементу добавить класс "warning", то перед текстом будет иконка с жёлтым треугольником */
.warning::before {
  content: "⚠️ ";
}
```

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="html,result" data-user="ezhkov" data-slug-hash="rNMwwRw" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Class selector">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/rNMwwRw">
  Class selector</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
