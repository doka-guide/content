---
title: "`HTMLCollection` и `NodeList`"
authors:
  - nlopin
tags:
  - doka
---

## Кратко

`HTMLCollection` и `NodeList` — это очень похожие на массив коллекции. Они хранят элементы веб-страницы. К элементам коллекций можно обращаться по индексу, но у них нет привычных [методов массива](/js/arrays/).

`HTMLCollection` возвращают методы [`getElementsByTagName`](/js/getelementsbytagname/) и [`getElementsByClassName`](/js/getelementsbyclassname/).

`NodeList` возвращает метод `querySelectorAll`.

## Как понять

`HTMLCollection` возвращают методы, которые работают с DOM — представлением HTML-кода страницы в JavaScript.

Полученная один раз коллекция всегда остаётся актуальной — JavaScript будет обновлять её в случае, если на странице появляется подходящий элемент. Поэтому `HTMLCollection` называют «живой» коллекцией.

Например, единожды получив коллекцию мы можем не заботиться о её поддержке:

<iframe title="Название — HTMLCollection и NodeList — Дока" src="demos/Lopinopulos-xNOBow/"></iframe>

`NodeList` работает так же, как и `HTMLCollection`. Разница только в том, что `NodeList` не живая коллекция — она не обновляется при появлении на странице новых элементов.
