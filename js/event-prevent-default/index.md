---
title: "preventDefault"
description: "Отменяет действие по умолчанию для события."
authors:
  - G-Milevski
related:
  - js/events
tags:
  - doka
---

## Кратко

Когда мы нажимаем на какой либо элемент браузер создаёт [событие](/js/events/). Событие это по сути объект который имеет набор свойств и методов для взаимодействия с ним. Один из таких методов `preventDefault`. Событие приводит к каким-то действиям по умолчанию, например при нажатии на ссылку, мы переходим по адресу этой ссылки. Но мы можем отменить эти действия при помощи вызова данного метода.

## Как пишется
```js
const link = document.querySelector('a'); // находим в DOM элемент ссылки
a.addEventListener('click', (event) => { // добовляем обработчик на нажатие мыши.
  event.preventDefault(); // отменяем действие по умолчанию, тоесть мы не перейдем по ссылке.
})
```

## Пример
<iframe title="Всплытие событий — События — Дока" src="demos/input-focus-delay" height="460"></iframe>

## Как понять

Давай те разберём код из примера выше.

```js
  const runTimer = (inputElement) => {
    setTimetout(() => {
      inputElement.focus()
    }, 5000);
  }
  const inputElement = document.querySelector('.input');
  inputElement.addEventListener('mousedown', (event) => {
      event.preventDefault();
      runTimer(inputElement)
  });
```
Когда мы курсором мыши нажимаем на инпут элемент, генерируется цепочка событий в следующем порядке: `mousedown -> mouseup -> click`.
Поведение по умолчанию, когда произошло событие `mousedown`, инпут становится в фокусе. Но в примере мы при помощи `event.preventDefault` метода отменили это поведение и запустили таймер, который через 5 секунд, вызовет метод `focus` который установит фокус в инпут.