---
title: "`.getElementById()`"
description: "Получаем DOM-элементы по атрибуту `id`."
authors:
  - nlopin
related:
  - js/dom
  - tools/how-the-browser-creates-pages
  - js/events
tags:
  - doka
---

## Кратко

Метод объекта `document`, который позволяет найти элемент на веб-странице по его идентификатору ([атрибут `id`](/html/global-attrs/#id)). Возвращает [`Element`](/js/element/) или [`null`](/js/null-primitive/), если ничего не нашлось.

## Пример

```html
<html>
  <head></head>
  <body>
    <h1 id="title">Привет, незнакомец!</h1>
    <script>
      let title = document.getElementById("title")
      console.log(title.textContent)
      // напечатает "Привет, незнакомец!"
    </script>
  </body>
</html>
```

Живой пример:

<iframe title="Название — getElementById() — Дока" src="demos/Lopinopulos-XwKRaZ/" height="150"></iframe>

## Как понять

Метод работает с DOM, который связан с HTML-разметкой. Если в HTML есть тег с атрибутом `id`, то его можно получить из JavaScript с помощью метода `getElementById()`.

Спецификация HTML требует, чтобы в рамках одной страницы значения атрибутов `id` были уникальными. За счёт этого и работает метод `getElementById()` — элемент с искомым идентификатором или один, или его нет. Такой поиск работает очень быстро.
