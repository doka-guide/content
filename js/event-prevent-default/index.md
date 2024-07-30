---
title: "`.preventDefault()`"
description: "Отменяет действие по умолчанию для события."
authors:
  - g-milevski
related:
  - js/events
  - css/pseudoclasses
  - js/dom
tags:
  - doka
---

## Кратко

На каждое действие пользователя на сайте браузер создаёт [события](/js/events/). Это главный способ понимать в коде, что происходит на странице. Событие — это объект, который имеет набор свойств и методов для взаимодействия с ним.

`preventDefault()` — метод [события](/js/event/). Этот метод отменяет поведение браузера по умолчанию, которое происходит при обработке события.

Например, при нажатии на ссылку мы переходим по адресу этой ссылки. Вызов `preventDefault()` отменит это поведение.

## Как пишется

Отменим переход по ссылке для всех тегов [`<a>`](/html/a/) на странице. Для этого получим все ссылки с помощью [`querySelector()`](/js/query-selector/), подпишемся на событие [`'click'`](/js/element-click/) и вызовем `preventDefault()`:

```js
const links = document.querySelector('a')

links.addEventListener('click', (event) => {
  // Отменяем действие по умолчанию.
  // Перехода по ссылке не будет
  event.preventDefault()
})
```

## Пример

<iframe title="Как работает метод" src="demos/input-focus-delay" height="250"></iframe>

## Как понять

Давайте разберём код из интерактивного примера:

```js
const runTimer = (inputElement) => {
  setTimetout(() => {
    inputElement.focus()
  }, 5000)
}

const inputElement = document.querySelector('.input')
inputElement.addEventListener('mousedown', (event) => {
  event.preventDefault()
  runTimer(inputElement)
})
```

Когда пользователь нажимает на элемент с классом `input`,  генерируется цепочка событий в следующем порядке: `mousedown` → `mouseup` → `click`.

Когда происходит событие `mousedown`, браузер устанавливает [фокус](/css/focus/) на поле ввода. Вызовом `event.preventDefault()` мы отменили это поведение. Затем мы запустили [таймер](/js/settimeout/), который установит фокус на элементе через 5 секунд с помощью вызова метода [`focus()`](/js/element-focus/).
