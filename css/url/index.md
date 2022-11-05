---
title: "Функция `url()`"
description: "Функция url() для вставки файлов в документ по ссылке в CSS"
authors:
  - bellabzhu
keywords:
  - аттач
related:
  - css/import
  - html/a
tags:
  - doka
  - placeholder
---

## Кратко

CSS-функция [`url()`](https://developer.mozilla.org/en-US/docs/Web/CSS/url) вставляет файл с указанной ссылки. 

## Пример

`url()` может добавить элементу изображение на фон:

```css
background-image: url("carpet.png");
```

Импортировать шрифт:
```css
@font-face {
  font-family: "Roboto Mono", monospace;
  src: url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");
}
```

Или стиль:

```css
@import url(style.css);
```

Быть параметром другой функции:

```css
mask-image: image(url("mask.png"), red, radial-gradient(rgba(0, 0, 0, 1.0), transparent));
```


<details>
  <summary>Полный список CSS-свойств, где используется url()</summary>

- background;
- background-image;
- border;
- border-image;
- border-image-source;
- content;
- cursor;
- filter;
- list-style;
- list-style-image;
- mask;
- mask-image;
- offset-path;
- src как часть @font-face;
- @counter-style/symbol;

</details>

## Как понять

У функции крайне широкое применение, практически все файлы в CSS вставляются через нее. 

## Как пишется

На вход функция принимает строку - ссылку на файл. Она может быть абсолютной, относительной или являться data URI. 

Если в тексте самой ссылки нет кавычек, скобок и пробелов, то можно не заключать ссылку в кавычки. 

Например, все эти записи корректны:

```css
background-image: url("image.png");
```

```css
background-image: url('image.png');
```

```css
background-image: url(image.png);
```

Но все же рекомендуем их ставить для единообразия [`код-стайла`](/js/code-style/).