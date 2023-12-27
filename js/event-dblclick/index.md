---
title: "dblclick"
description: Что такое событие «dblclick» и чем оно отличается от «click»?"
authors:
  - ko1p
related:
  - html/button
  - js/element-addeventlistener
  - js/dom
tags:
  - doka
  - placeholder
---

## Кратко

[Событие](/js/events/) двойного клика на HTML-элементе происходит, когда пользователь в течение короткого времени дважды кликает один элемент. Временной промежуток между кликами должен быть небольшим, иначе браузер интерпретирует его не как `dblclick`, а как несколько отдельных `click` событий.


## Как пишется

На событие `dblclick` можно подписаться и информировать пользователя, например:

```js
document.addEventListener('dblclick', event => {
  alert('На странице зафиксирован двойной клик!')
})
```

Также можно отслеживать двойные клики по любым элементам на странице:

```js
const card = document.querySelector('.card')

// установим обработчик на событие двойного клика
card.addEventListener('dblclick', function () {
  alert('Вы дважды кликнули по карточке!')
})
```

В функцию-обработчик можно передать объект события, который содержит поля с информацией о клике, например:

- `target` — ссылка на целевой DOM-элемент, на котором произошло событие.
- `type` — тип события.

Чтобы получить доступ к объекту события, функция-обработчик должна принимать его в качестве параметра:

```js
card.addEventListener('dblclick', function (event) {
  alert(event.target.classList) // отображает название класса элемента, по которому дважды кликнули
})
```

В примере ниже двойной клик по карточке меняет её размер:

```js
const card = document.querySelector('.card')

card.addEventListener('dblclick', function () {
  card.classList.toggle('card_enlarged') // модификатор увеличивает размер карточки
})
```

<iframe title="Название — Element.dblclick — Дока" src="demos/dblclicking/" height="350"></iframe>
