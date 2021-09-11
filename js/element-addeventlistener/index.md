---
title: "Element.addEventListener()"
authors:
  - vindi-r
  - akellbl4
contributors:
  - nlopin
  - skorobaeus
tags:
  - doka
---

## Кратко

Добавляет элементу действие которое будет выполено после срабатывания события, например на клик мышки или нажатие клавиши.

## Пример

Найдем первую кнопку на странице и будем выводить сообщение в консоль когда произошел клик по этой кнопке.

```js
const element = document.querySelector("button")

element.addEventListener("click", (event) => {
  console.log("произошло событие", event.type)
})
```

## Как это понять

При вызове функции в неё передаётся специальный объект (в примере выше — `event`), который у разных типов событий разный. Например у событий нажатия клавиши есть код клавиши, а у событий перемещения мыши — координаты.

Функция может быть объявлена ранее, а может быть и анонимной:

```js
const element = document.querySelector("button")

function handleClickFunction(event) {
  alert("Именованая функция")
}

// Добавление функции handleClickFunction как обработчика события click
element.addEventListener("click", handleClickFunction)

// Добавление анонимной функции как обработчика события click
element.addEventListener("click", (event) => {
  alert("Анонимная функция")
})
```

🤖 Заранее созданные функции обычно используют, когда функция содержит в себе много кода или к ней нужно ссылаться несколько раз. Например когда нужно отписаться от события позже. Для отписки используется метод элемента [`Element.removeEventListener`](/js/element-removeeventlistener)

Анонимные функции удобно использовать при быстрой разработке или когда обработчик создаётся в одном единственном месте и выносить его в отдельную именованную функцию — дольше чем писать код самой этой функции. 

## Как пишется

Сигнатура функции выглядит следующим образом

```js
element.addEventListener(eventType, handler, options)
```

- `element` – любой HTMLElement на странице
- `eventType` - строка содержащая название события. Наиболее популярные события 'click', 'change', 'submit', 'mousemove', 'mouseenter', 'mouseleave'
- `handler` – функция которая будет вызвана при срабатывании события
- `options/capture` – не обязательный параметр, который описывает дополнительные свойства для срабатывания события.
  - `capture: bool` - влючается или выключает захват события элементом на который установлен обработчик. Это значит что событие сначала сработает на элементе и только потом сработает на всех вложенных элементах.
  - `options: { capture: bool, passive: bool }` – при передаче объекта аргумент будет распознан как options и можно установить больще параметров
    - `passive` – говорит о том что внутри `handler` никогда не будет вызвана функция `event.preventDefault()`, если функция `event.preventDefault()` все таки вызвана, браузер должен ее игнорировать и выводить предупредительное сообщение в консоль.



::: callout ❗️

Надо быть внимательными с третьим аргументом `options/capture` так как старые браузеры такие как Internet Explorer и первые версии EDGE не поддерживают передачу объекта и будут восприняты как `capture: true`

:::


Ниже приведено несколько вариантов вызова функции с разными параметрами:

```js
function handleMouseClick(event) {
  console.log('Вы нажали на элемент:', event.target)
}

// Добавляем обработчик события
window.addEventListener('click', handleMouseClick)
window.addEventListener('click', handleMouseClick, true)
window.addEventListener('click', handleMouseClick, false)
window.addEventListener('click', handleMouseClick, { passive: true, capture: false })
```

У объекта event есть специальные методы, такие как `preventDefault()` и `stopPropagation()`. Остальные методы практически не используются:

- `preventDefault` позволяет заблокировать стандартное поведение браузера. Например, по клику на ссылке — заблокировать переход по этой ссылке;
- `stopPropagation` позволяет остановить всплытие события по DOM дереву.
