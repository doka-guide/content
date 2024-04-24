---
title: "`.getElementsByClassName()`"
description: "Получаем список элементов с заданным классом."
authors:
  - nlopin
related:
  - tools/how-the-browser-creates-pages
  - js/events
  - html/class
tags:
  - doka
---

## Кратко

Метод определён для объекта `document` и любого HTML-элемента ([`Element`](/js/element/)) страницы. Позволяет найти все элементы с заданным [классом](/html/class/) или классами среди дочерних.

Метод принимает один параметр — название класса или список классов в виде строки. Если передаёте список классов, разделите их названия пробелами: `class1 class2`. Элемент подходит, если у него есть все классы из перечисленных.

Возвращает похожую на массив [`HTMLCollection`](/js/htmlcollection-and-nodelist/) с найденными элементами. Если элементов не нашлось, то коллекция будет пустая, то есть с размером 0.

## Пример

```html
<body>
  <div id="title">
    <h1>Привет, незнакомец!</h1>
    <div class="paragraph subtitle">
      div с классом paragraph и subtitle
    </div>
  </div>
  <p class="paragraph">
    Параграф с классом paragraph
  </p>
</body>
```

```js
const paragraphs = document.getElementsByClassName('paragraph')
console.log(paragraphs.length)
// 2

const divEl = document.getElementById('title')
// Ищем параграфы внутри <div>
const paragraphsFromDiv = divEl.getElementsByClassName('paragraph')
console.log(paragraphsFromDiv.length)
// 1, так как внутри <div> только один элемент с классом paragraph

const subtitleParagraphs = document.getElementsByClassName(
  'paragraph subtitle'
)
console.log(subtitleParagraphs.length)
// 1, так как на странице только один элемент,
// у которого есть и класс paragraph, и класс subtitle

// Ищем несуществующий элемент
const spanFromBody = document.getElementsByClassName('hello')
console.log(spanFromBody.length)
// 0
```

## Как понять

Метод работает с [DOM](/js/dom/), который связан с HTML-разметкой. Каждый HTML-элемент имеет родительские и дочерние элементы.

Родительские элементы — это элементы, внутри которых находится элемент. В примере выше у элемента `<h1>` есть два родительских элемента — [`<div>`](/html/div/) и [`<body>`](/html/body/).

Дочерние элементы — это элементы, которые содержит текущий элемент. Они могут быть, а могут не быть. Например, для тега `<body>` все элементы страницы дочерние. У `<h1>` дочерний элемент — текст внутри тега.

Если работаете с корнем страницы, объектом `document`, поиск идёт по всем элементам страницы, то есть от `<body>`. Если поиск от конкретного элемента, он идёт только по его дочерним элементам.

Так как мы заранее не знаем, сколько элементов с искомым тегом найдётся, метод возвращает коллекцию элементов.

У каждого HTML-элемента может быть один или несколько классов. Когда пользуетесь `getElementsByClassName()`, поиск идёт только по классам (атрибуту `class`). Названия тегов и все остальные атрибуты игнорируются.
