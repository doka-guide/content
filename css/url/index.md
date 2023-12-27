---
title: "`url()`"
description: "Функция `url()` для вставки в CSS файлов по ссылке."
authors:
  - bellabzhu
keywords:
  - аттач
related:
  - css/import
  - html/a
  - html/link
tags:
  - doka
---

## Кратко

CSS-функция `url()` вставляет файл с указанной ссылки.

## Пример

`url()` может добавить элементу изображение на фон:

```css
div {
  background-image: url('carpet.png');
}
```

Импортировать шрифт:

```css
@font-face {
  font-family: 'Roboto Mono';
  src: url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');
}
```

Или стиль:

```css
@import url(style.css);
```

Быть параметром другой функции:

```css
div {
  mask-image: image(url('mask.png'), red, radial-gradient(rgba(0, 0, 0, 1.0), transparent));
}
```

<details>
  <summary>Список свойств, где используется `url()`</summary>

  - [`background`](/css/background/);
  - [`background-image`](/css/background-image/);
  - [`border`](/css/border/);
  - [`border-image`](/css/border-image/);
  - `border-image-source`;
  - [`content`](/css/content/);
  - [`cursor`](/css/cursor/);
  - [`filter`](/css/filter/);
  - [`list-style`](/css/list-style/);
  - [`list-style-image`](/css/list-style-image/);
  - `mask`;
  - `mask-image`;
  - `offset-path`;
  - `src` как часть [`@font-face`](/css/font-face/);
  - `@counter-style`;

</details>

## Как понять

У функции крайне широкое применение, практически все файлы в CSS вставляются через неё.

## Как пишется

На вход функция принимает строку — ссылку на файл. Она может быть абсолютной, относительной или являться data URI.

Если в тексте самой ссылки нет кавычек, скобок и пробелов, то можно не заключать ссылку в кавычки.

Например, все эти записи корректны:

```css
div {
  background-image: url("image.png");
}
```

```css
div {
  background-image: url('image.png');
}
```

```css
div {
  background-image: url(image.png);
}
```
