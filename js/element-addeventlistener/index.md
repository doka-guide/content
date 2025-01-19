---
title: "`.addEventListener()`"
description: "Учим приложение реагировать на действия пользователя."
authors:
  - akellbl4
contributors:
  - nlopin
  - skorobaeus
  - vladislav149
related:
  - js/dom
  - js/events
  - tools/how-the-browser-creates-pages
tags:
  - doka
---

## Кратко

Добавляет элементу действие, которое будет выполнено после срабатывания [события](/js/events/). Например, на клик мышки или нажатие клавиши.

## Пример

Найдём первую кнопку на странице и будем выводить сообщение в консоль, когда произошёл клик по этой кнопке.

```js
const element = document.querySelector('button')

element.addEventListener('click', function (event) {
  console.log('Произошло событие', event.type)
})
```

## Как понять

При вызове функции, в неё передаётся специальный объект (в примере выше — `event`), который у разных типов событий разный. Например, у событий нажатия клавиши есть код клавиши, а у событий перемещения мыши — координаты.

Функция может быть объявлена ранее:

```js
const element = document.querySelector('button')

function handleClickFunction(event) {
  alert('Именованная функция')
}
element.addEventListener('click', handleClickFunction)
```

А может быть анонимной:

```js
element.addEventListener('click', function (event) {
  alert('Анонимная функция')
})
```

🤖 Заранее созданные функции обычно используют, когда функция содержит в себе много кода или к ней нужно ссылаться несколько раз. Например, когда нужно отписаться от события позже. Для отписки используется метод элемента [`Element.removeEventListener()`](/js/element-removeeventlistener/).

Второй способ отписки от события можно реализовать с помощью объекта AbortController.

Анонимные функции удобно использовать при быстрой разработке или когда обработчик создаётся в одном единственном месте и выносить его в отдельную именованную функцию — дольше, чем писать код самой этой функции. В этом случае очень часто используют короткую, стрелочную запись функции:

```js
element.addEventListener('click', (event) => {
  alert('Анонимная функция')
})
```

## Как пишется

Сигнатура функции выглядит следующим образом:

```js
element.addEventListener(eventType, handler, options)
```

- `element` — любой [HTMLElement](/js/element/) на странице.
- `eventType` — строка, содержащая название события. Наиболее популярные события [`'click'`](/js/element-click/), `'change'`, `'submit'`, [`'keydown'`](/js/element-keydown/), [`'keyup'`](/js/element-keyup/), `'mousemove'`, `'mouseenter'`, `'mouseleave'`.
- `handler` — функция, которая будет вызвана, когда событие произойдёт.
- `options/capture` — необязательный параметр, который описывает дополнительные свойства для срабатывания события.
  - `capture` — включает или выключает захват события элементом, на который установлен обработчик. Это значит, что событие сначала сработает на элементе и только потом сработает на всех вложенных элементах. Принимает значение `true` или `false`
  - `options: { capture: bool, passive: bool, once: bool, signal: AbortSignal }` — при передаче объекта аргумент будет распознан как объект настроек, так можно установить больше параметров.
    - `passive` – говорит о том, что внутри `handler` никогда не будет вызвана функция `event.preventDefault()`, если функция `event.preventDefault()` все-таки вызвана, браузер должен её игнорировать и выводить предупредительное сообщение в консоль.
    - `once` – включает автоматическую отписку от события после первого срабатывания.
    - `signal` - передаётся ссылка на объект сигнала `AbortSignal`, который позволяет отписаться от события.

Ниже приведено несколько вариантов вызова функции с разными параметрами:

```js
function handleMouseClick(event) {
  console.log('Вы нажали на элемент:', event.target)
}

window.addEventListener('click', handleMouseClick)
window.addEventListener('click', handleMouseClick, true)
window.addEventListener('click', handleMouseClick, false)
window.addEventListener('click', handleMouseClick, {
  passive: true,
  capture: false,
})

const abortController = new AbortController()
window.addEventListener('click', handleMouseClick, {
  signal: abortController.signal,
})
```

У объекта event есть специальные методы, такие как `preventDefault()` и `stopPropagation()`. Остальные методы практически не используются:

- `preventDefault()` позволяет заблокировать стандартное поведение браузера. Например, по клику на ссылке — заблокировать переход по этой ссылке.
- `stopPropagation()` позволяет остановить всплытие события по DOM-дереву.
