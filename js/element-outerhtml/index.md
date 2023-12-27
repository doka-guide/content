---
title: "`.outerHTML`"
description: "Читаем и заменяем HTML-элемент и всё его содержание на новое."
authors:
  - windrushfarer
related:
  - js/dom
  - tools/web-security
  - js/element
tags:
  - doka
---

## Кратко

Свойство `outerHTML` позволяет получить [HTML-элемент](/js/element/), включая его содержимое, в виде HTML-строки или заменить элемент на новый HTML.

Новое значение HTML передаётся в виде строки и оно полностью заменит весь элемент. В `outerHTML` нельзя передать DOM-элемент, только строку.

## Пример

```html
<section>
  <h1>Введение</h1>
  <p>Параграф с текстом</p>
  <p>Второй параграф с текстом</p>
</section>
```

```js
const section = document.querySelector('section')

console.log(section.outerHTML)
```

В таком случае выведется весь HTML, включая сам элемент:

```html
<section><h1>Введение</h1><p>Параграф с текстом</p><p>Второй параграф с текстом</p></section>
```

Если теперь заменить содержимое новым HTML

```js
section.outerHTML = '<h2>Второй заголовок</h2>'
```

HTML после изменения будет:

```html
<h2>Второй заголовок</h2>
```

<iframe title="Element.outerHTML — Element.outerHTML — Дока" src="demos/index/" height="650"></iframe>

## Как понять

Свойство `outerHTML` проще понять в сравнении с другим похожим свойством – [`innerHTML`](/js/element-innerhtml/).

Свойство `innerHTML` позволяет получить только **содержимое** элемента как HTML-строку. В то время как `outerHTML` делает то же самое, но при этом возвращает и HTML самого элемента. Можно сказать, что вывод будет идентичен `innerHTML`, только в строке будет содержаться открывающий и закрывающий тег самого элемента, у которого было вызвано свойство.

Так же как и `innerHTML`, если в `outerHTML` присвоить новое значение, то это приводит к [перерисовке страницы](/tools/how-the-browser-creates-pages/).

## Как пишется

Обращение к свойству `outerHTML` вернёт элемент и его содержимое виде HTML-строки. Просмотреть можно любой элемент, но изменить можно любой, кроме [`<html>`](/html/html/).

Присвоение нового значения к свойству полностью удалит элемент и заменит его новым HTML:

```html
<header>Название сайта</header>
```

```js
const header = document.querySelector('header')

header.outerHTML = '<span class="logo"></span>'
```

HTML после изменения будет:

```html
<span class="logo"></span>
```

Новый элемент полностью заменит `<header>`.

<aside>

☝️ Браузер позволит присвоить новое значение `outerHTML` в [`<body>`](/html/body/), но не удалит сам элемент. Вместо этого новое значение будет вставлено внутрь `<body>`, аналогично вызову `innerHTML`.

</aside>

```js
document.body.outerHTML = '<h1>Я новое содержимое страницы<h1>'
```

В результате в документ будет такой HTML:

```html
<body>
  <h1>Я новое содержимое страницы<h1>
</body>
```

`<body>` остался на странице, а новое значение стало содержимым элемента.

Если попробовать изменить `outerHTML` у `<html>`, то браузер выбросит ошибку.

```js
const html = document.querySelector('html')

html.outerHTML = '<div>Я новый HTML</div>'
// Uncaught DOMException: Failed to set the 'outerHTML' property on 'Element'
```
