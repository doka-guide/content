---
title: "`url()`"
description: "Функция `url()` для вставки файлов в документ по ссылке в CSS."
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
  - placeholder
---

## Кратко

CSS-функция `url()` вставляет файл с указанной ссылки.

## Пример

`url()` может добавить элементу изображение на фон:

```css
div {
  background-image: url("carpet.png");
}
```

Импортировать шрифт:

```css
@font-face {
  font-family: "Roboto Mono";
  src: url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");
}
```

Или стиль:

```css
@import url(style.css);
```

Быть параметром другой функции:

```css
div {
  mask-image: image(url("mask.png"), red, radial-gradient(rgba(0, 0, 0, 1.0), transparent));
}
```

<details>
  <summary>Список свойств, где используется `url()`</summary>

  - `background`;
  - `background-image`;
  - `border`;
  - `border-image`;
  - `border-image-source`;
  - `content`;
  - `cursor`;
  - `filter`;
  - `list-style`;
  - `list-style-image`;
  - `mask`;
  - `mask-image`;
  - `offset-path`;
  - `src` как часть `@font-face`;
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

Но всё же рекомендуем их ставить для единообразия [стиля кода](/tools/code-style/).
