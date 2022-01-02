---
title: "`.getElementsByClassName()`"
authors:
  - nlopin
tags:
  - doka
---

## Кратко

Метод определён для объекта `document` и любого HTML-элемента ([`Element`](/js/element/)) страницы. Позволяет найти все элементы с заданным классом или классами среди дочерних.

Метод принимает один параметр — название класса или список классов в виде строки. Если передаёшь список классов, то раздели их названия пробелами `class1 class2`. Элемент подходит, если у него есть все классы из перечисленных.

Возвращает похожую на массив HTMLCollection с найденными элементами. Если элементов не нашлось, то коллекция будет пустая, то есть с размером 0.

## Пример

```html
<html>
  <head></head>
  <body>
    <div id="title">
      <h1>Привет, незнакомец!</h1>
      <div class="paragraph subtitle">Div с классом paragraph и subtitle</div>
    </div>
    <p class="paragraph">Параграф с классом paragraph</p>
    <script>
      let paragraphs = document.getElementsByClassName("paragraph")
      console.log(paragraphs.length) // напечатает 2, так как поиск ведется по всей странице

      let divEl = document.getElementById("title")
      // ищем параграфы внутри div:
      let paragraphsFromDiv = document.getElementsByClassName("paragraph")
      console.log(paragraphsFromDiv.length) // напечатает 1, так как внутри div только один элемент с классом paragraph

      let subtitleParagraphs = document.getElementsByClassName(
        "paragraph subtitle"
      )
      console.log(subtitleParagraphs.length) // напечатает 1, так как на странице только один элемент, у которого есть и класс paragraph, и класс subtitle

      // ищем несуществующий элемент
      let spanFromBody = document.getElementsByClassName("hello")
      console.log(spanFromBody.length) // напечатает 0
    </script>
  </body>
</html>
```

## Как это понять

Метод работает с DOM, который связан с HTML-разметкой. Каждый HTML-элемент имеет родительские и дочерние элементы:

- Родительские элементы — это элементы, внутри которых находится элемент. В примере выше у элемента `h1` есть два родительских элемента — `div` и `body`.
- Дочерние элементы — это элементы, которые содержит текущий элемент. Они могут быть, а могут не быть. Например, для тега `body` все элементы страницы дочерние. У `h1` дочерний элемент — текст внутри тега.

Если работаешь с корнем страницы, объектом `document`, то поиск идёт по всем элементам страницы (т.е. от `body`), если от конкретного элемента, то поиск идёт только по всем дочерним.

Так как мы заранее не знаем, сколько элементов с искомым тегом найдётся, то метод возвращает коллекцию элементов.

Каждый элемент HTML может иметь класс или несколько классов. Когда пользуешься `getElementsByClassName`, поиск идёт только по классам (атрибут `class`). Названия тегов и все остальные атрибуты игнорируются.
