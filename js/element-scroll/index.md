---
title: "`scroll`"
description: "Событие, когда что-то прокручивается."
authors:
  - nlopin
contributors:
  - skorobaeus
  - inventoris
related:
  - js/dom
  - js/event
  - js/events
tags:
  - doka
---

## Кратко

`scroll` — это [событие](/js/events/), когда пользователь прокручивает страницу или элемент в любой плоскости. Способами прокрутки могут быть: колесо мыши, кнопки клавиатуры, полосы прокрутки на экране.

<aside>

👾 Существует похожее на `scroll` событие [`wheel`](/js/element-wheel/). Оно происходит, когда пользователь прокручивает колесо мыши, при этом реального прокручивания может и не происходить.

</aside>

## Как пишется

Современный способ с [addEventListener](/js/element-addeventlistener/):

```js
document.addEventListener('scroll', function(event) {
  console.log(event)
})
```

Также можно обработать событие через [встроенный обработчик событий](/js/element/#vstroennye-obrabotchiki-sobytiy), но этот способ считается устаревшим.

```js
document.onscroll = function(event) {
  console.log(event)
}
```

## Как понять

Событие `scroll` возникает только при прокрутке. Попробуйте листать текст в демо ниже:

<iframe title="Событие scroll" src="demos/basic/" height="420"></iframe>

`scroll` использует [базовый элемент события](/js/event/), в котором отсутствует информация о скорости прокрутки и направлении.

Чтобы понять, насколько прокрутилась страница или элемент, этот элемент получают из DOM-дерева или ключевого слова [`this`](/js/function-context/) и запрашивают свойства `scrollTop` или `scrollLeft`.

```js
document.addEventListener('scroll', function() {
  // Получаем высоту элемента,
  // на котором произошло событие
  console.log(this.scrollTop)
})
```
