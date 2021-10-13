---
title: "`HTMLCollection` и `NodeList`"
authors:
  - nlopin
tags:
  - doka
---

## Кратко

`HTMLCollection` и `NodeList` — это очень похожие на массив коллекции. Они хранят элементы веб-страницы ( узлы DOM ). `NodeList` может хранить любые типы узлов, а `HTMLCollection` - только HTML элементы. К элементам коллекций можно обращаться по индексу, но у них нет привычных [методов массива](/js/arrays/).

`HTMLCollection` возвращают методы [`document.getElementsByTagName`](/js/getelementsbytagname/), [`document.getElementsByClassName`](/js/getelementsbyclassname/) и `parentNode.children`.

`NodeList` возвращают методы `document.querySelectorAll`, `document.getElementsByName` и `parentNode.childNodes`.

## Как понять

`HTMLCollection` возвращают методы, которые работают с DOM — представлением HTML-кода страницы в JavaScript.

Полученная один раз коллекция всегда остаётся актуальной — JavaScript будет обновлять её в случае, если на странице появляется подходящий элемент. Поэтому `HTMLCollection` называют «живой» коллекцией.

Например, единожды получив коллекцию мы можем не заботиться о её поддержке:

<iframe title="Название — HTMLCollection и NodeList — Дока" src="demos/Lopinopulos-xNOBow/" height="350"></iframe>

`NodeList` работает почти так же, как и `HTMLCollection`. 

Разница только в том, что `NodeList` может быть не только «живой» коллекцией, но и статической. Такая коллекция не обновляется при появлении на странице новых элементов. 

«Живой» `NodeList` возвращают методы `document.getElementsByName` и `parentNode.childNodes`.

Статический `NodeList` возвращает метод `document.querySelectorAll`.
