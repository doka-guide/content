---
title: "Element.innerHTML"
tags:
  - doka
authors:
  - Windrushfarer
---

## Кратко

Свойство `Element.outerHTML` позволяет получить HTML-элемент, включая его содержимое, в виде HTML-строки или заменить элемент на новый HTML.

Новое значение HTML передаётся в виде строки и оно полностью заменит весь элемент. В `Element.outerHTML` нельзя передать DOM-элемент, только строку.

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

console.log(form.outerHTML)
```

В таком случае выведется весь HTML, включая сам элемент:

```html
<section><h1>Введение</h1><p>Параграф с текстом</p><p>Второй параграф с текстом</p></section>
```

Если теперь заменить содержимое новым HTML

```html
section.outerHTML = '<h2>Второй заголовок</h2>'
```

HTML после изменения будет:

```html
<h2>Второй заголовок</h2>
```

<iframe title="Element.outerHTML" src="demos/index.html"></iframe>

## Как понять

`Element.outerHTML` проще понять в сравнении с другим похожим свойством – [Element.innerHTML](/js/element-innerhtml). 

`Element.innerHTML` позволяет получить только **содержимое** элемента как HTML-строку. В то время как `Element.outerHTML` делает тоже самое, но при этом возвращает и HTML самого элемента. Можно сказать, что вывод будет идентичен `Element.innerHTML`, только в строке будет содержаться открывающий и закрывающий тег самого элемента, у которого было вызвано свойство.

Так же как и `Element.innerHTML`, если в `Element.outerHTML` присвоить новое значение, то это приводит к [перерисовке страницы](/js/how-the-browser-creates-pages).

## Как пишется

Обращение к свойству `Element.outerHTML` вернёт элемент и его содержимое виде HTML-строки. Просмотреть можно любой элемент, но изменить можно любой, кроме `<html>`.

Присвоение нового значения к свойству полностью удалит элемент и заменит его новым HTML.

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

::: callout ☝️

Браузер позволит присвоить новое значение `Element.outerHTML` в `<body>`, но не удалит сам элемент. Вместо этого новое значение будет вставлено внутрь `<body>`, аналогично вызову `Element.innerHTML`.

:::

```js
document.body.outerHTML = '<h1>Я новое содержмое страницы<h1>'
```

В результате в документ будет такой HTML:

```html
<body>
  <h1>Я новое содержмое страницы<h1>
</body>
```

`<body>` остался на странице, а новое значение стало содержимым элемента.

Если попробовать изменить `Element.outerHTML` у `<html>`, то браузер выбросит ошибку.

```js
const html = document.querySelector('html')

html.outerHTML = '<div>Я новый HTML</div>'
// Uncaught DOMException: Failed to set the 'outerHTML' property on 'Element'
```
