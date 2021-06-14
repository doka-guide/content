---
title: "HTMLCollection и NodeList"
tags:
  - doka
authors:
  - nlopin
---

## Кратко

`HTMLCollection` и `NodeList` — это очень похожие на массив коллекции. Они хранят элементы веб-страницы. К элементам коллекций можно обращаться по индексу, но у них нет привычных [методов массива](/js/arrays/).

`HTMLCollection` возвращают методы [`getElementsByTagName`](/js/getelementsbytagname/) и [`getElementsByClassName`](/js/getelementsbyclassname/).

`NodeList` возвращает метод `querySelectorAll`.

## Как понять

`HTMLCollection` возвращают методы, которые работают с DOM — представлением HTML-кода страницы в JavaScript.

Полученная один раз коллекция всегда остаётся актуальной — JavaScript будет обновлять её в случае, если на странице появляется подходящий элемент. Поэтому `HTMLCollection` называют «живой» коллекцией.

Например, единожды получив коллекцию мы можем не заботиться о её поддержке:

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="Lopinopulos" data-slug-hash="xNOBow" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="xNOBow">
  <span>See the Pen <a href="https://codepen.io/Lopinopulos/pen/xNOBow">
  xNOBow</a> by Nikolai Lopin (<a href="https://codepen.io/Lopinopulos">@Lopinopulos</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

`NodeList` работает так же, как и `HTMLCollection`. Разница только в том, что `NodeList` не живая коллекция — она не обновляется при появлении на странице новых элементов.
