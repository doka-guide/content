---
title: "getElementById()"
tags:
  - doka
authors:
  - nlopin
---

## Кратко

Метод объекта `document`, который позволяет найти элемент на веб-странице по его идентификатору(`id`). Возвращает [`Element`](/js/doka/element/) или `null`, если ничего не нашлось.

## Пример

```html
<html>
  <head></head>
  <body>
    <h1 id="title">Привет, незнакомец!</h1>
    <script>
      let title = document.getElementById("title")
      console.log(title.textContent) // напечатает "Привет, незнакомец!"
    </script>
  </body>
</html>
```

Живой пример:

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="Lopinopulos" data-slug-hash="XwKRaZ" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="XwKRaZ">
  <span>See the Pen <a href="https://codepen.io/Lopinopulos/pen/XwKRaZ">
  XwKRaZ</a> by Nikolai Lopin (<a href="https://codepen.io/Lopinopulos">@Lopinopulos</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Как это понять

Метод работает с DOM, который связан с HTML разметкой. Если в HTML есть тег с атрибутом `id`, то его можно получить из JavaScript с помощью метода `getElementById`.

Спецификация HTML требует, чтобы в рамках одной страницы значения атрибутов `id` были уникальными. За счёт этого и работает метод `getElementById` — элемент с искомым идентификатором или один, или его нет. Такой поиск работает очень быстро.
