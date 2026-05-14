---
title: "`.addEventListener()`"
description: "Учим приложение реагировать на действия пользователя."
authors:
  - akellbl4
contributors:
  - nlopin
  - skorobaeus
  - vladislav149
  - lira_bazh
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

## Как пишется

Сигнатура функции выглядит следующим образом:

```js
element.addEventListener(eventType, handler, options)
```

- `element` — любой [HTMLElement](/js/element/) на странице;
- `eventType` — строка, содержащая название события. Наиболее популярные события [`'click'`](/js/element-click/), [`'change'`](/js/event-change/), [`'submit'`](/js/event-submit/), [`'keydown'`](/js/element-keydown/), [`'keyup'`](/js/element-keyup/), `'mousemove'`, `'mouseenter'`, `'mouseleave'`;
- `handler` — функция, которая будет вызвана, когда событие произойдёт;
- `options/capture` — необязательный параметр, который определяет дополнительные характеристики обработки события;
  - `capture` — включает или выключает [обработку события в фазе погружения](/js/element-addeventlistener/#obrabotka-sobytiya-v-faze-pogruzheniya). Принимает значение `true` или `false`, по умолчанию `false`;
  - `options: { capture: bool, passive: bool, once: bool, signal: AbortSignal }` — при передаче объекта аргумент будет распознан как объект настроек, так можно установить больше параметров;
    - `passive` — значение `true` означает что внутри `handler` никогда не будет вызвана функция `event.preventDefault()`, если функция `event.preventDefault()` всё-таки вызвана, браузер должен её игнорировать и выводить предупредительное сообщение в консоль;
    - `once` — включает автоматическую отписку от события после первого срабатывания;
    - `signal` — передаётся ссылка на объект сигнала [`AbortSignal`](/js/abort-controller/), который позволяет отписаться от события.

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
  capture: false
})

const abortController = new AbortController()

window.addEventListener('click', handleMouseClick, {
  signal: abortController.signal
})
```

У объекта `event` есть специальные методы, такие как [`preventDefault()`](/js/event-prevent-default/) и `stopPropagation()`. Остальные методы практически не используются:

- [`preventDefault()`](/js/event-prevent-default/) позволяет заблокировать стандартное поведение браузера. Например, по клику на ссылке — заблокировать переход по этой ссылке.
- `stopPropagation()` позволяет остановить [распространение события](/js/events/#rasprostranenie-sobytiy) по DOM-дереву.

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

Альтернативный способ отписки от события можно реализовать с помощью объекта `AbortController`. Подробнее о нём читайте в разделе [«На практике»](/js/element-addeventlistener/#okenchic-vladislav-sovetuet).

Анонимные функции удобно использовать при быстрой разработке или когда обработчик создаётся в одном единственном месте и выносить его в отдельную именованную функцию — дольше, чем писать код самой этой функции. В этом случае очень часто используют короткую, стрелочную запись функции:

```js
element.addEventListener('click', (event) => {
  alert('Анонимная функция')
})
```

### Обработка события в фазе погружения

[Фаза погружения](/js/events/#zahvat-sobytiy) — это первый этап жизни события, когда оно движется от корня документа (window → document → html → ...) к целевому элементу.

Добавить обработчик, который будет отрабатывать на этой фазе, просто:

```js
element.addEventListener('click', handler, true);
// или
element.addEventListener('click', handler, { capture: true });
```

Третий аргумент `addEventListener` может быть либо булевым значением, либо объектом. Булевое значение `true` автоматически интерпретируется как `{ capture: true }`, а его отсутствие или `false` — как `{ capture: false }`.

Это сделано для обратной совместимости, т.к. изначально существовал только булевый параметр `useCapture`. Когда спецификация эволюционировала и появилась необходимость добавлять другие опции (например, `once`, `passive`), разработчики ввели объектный синтаксис. Чтобы не сломать миллионы существующих сайтов, старый синтаксис оставили, но внутри браузера он приводится к новому.

### Идентификация обработчиков событий

Если добавить один и тот же обработчик несколько раз с одинаковыми параметрами `capture` — новые копии не добавятся. Будет обработан только первый добавленный обработчик, остальные удалять не нужно.

Уникальность обработчика определяется тремя параметрами:

- тип события (например, `'click'` или `'mousedown'`);
- ссылка на функцию-обработчик;
- флаг фазы (`capture: true` или `capture: false`).

В этом примере добавится только один обработчик события:

```js
function handlerClick () {
  console.log('click')
}

// неявно { capture: true }
document.addEventListener('click', handlerClick, true)
// второй обработчик для той же фазы не добавится
document.addEventListener('click', handlerClick, { once: true, capture: true })
```

В этом примере добавится сразу два обработчика событий (один будет срабатывать на фазе погружения, другой на фазе всплытия):

```js
function handlerClick () {
  console.log('click')
}

document.addEventListener('click', handlerClick, true)
document.addEventListener('click', handlerClick, { passive: true, capture: false })
```

### Улучшение производительности скролла

В JavaScript существуют отменяемые события ([cancelable event](https://developer.mozilla.org/en-US/docs/Web/API/Event/cancelable)) - это события, в которых с помощью [`preventDefault()`](/js/event-prevent-default/) можно отменить действие по умолчанию (клик, прокрутку, переход по ссылке и т. п.). В таких событиях выполнение действия по-умолчанию откладывается до завершения работы обработчиков. Браузер ждёт выполнения всех обработчиков события, чтобы убедиться, что ни один из них не вызывает [`preventDefault()`](/js/event-prevent-default/).

Из-за этой особенности при обработке событий, связанных с прокруткой страницы ([`touchmove`](/js/element-touch/), [`touchstart`](/js/element-touch/), [`wheel`](/js/element-wheel/) и `mousewheel`), может возникать заметная задержка при прокрутке, особенно на мобильных устройствах.

Флаг `{ passive: true }` решает эту проблему. Вы говорите браузеру: «Обещаю, я не буду вызывать [`preventDefault()`](/js/event-prevent-default/) внутри этого обработчика». Получив такое обещание, браузер больше не ждёт и начинает прокручивать немедленно, параллельно выполняя ваш код. Такой обработчик событий также называется «пассивный слушатель».

```js
element.addEventListener('wheel', handleScroll, { passive: true });
```

Чтобы не было задержки, все обработчики таких событий на элементе и его родителях должны быть пассивными слушателями.

💡 Если вы укажете `{ passive: true }`, но попытаетесь вызвать [`preventDefault()`](/js/event-prevent-default/), браузер:

- проигнорирует вызов (в консоли может быть предупреждение);
- скролл всё равно произойдёт.

💡 Также для события `scroll` флаг `{ passive: true }` устанавливать не нужно, т.к. `scroll` — это уже результат прокрутки, он не может блокировать прокрутку страницы, в отличие от [`touchmove`](/js/element-touch/), [`touchstart`](/js/element-touch/), [`wheel`](/js/element-wheel/) и `mousewheel`.

💡 Начиная с Chrome 56 (2017 год), браузеры включили это поведение по умолчанию для [`touchstart`](/js/element-touch/), [`touchmove`](/js/element-touch/) и [`wheel`](/js/element-wheel/) событий на глобальных объектах (window, document, body)

То есть, если вы пишете:

```js
window.addEventListener('touchstart', handler);
```

Современный Chrome обработает его так, как если бы вы явно указали `{ passive: true }`.
