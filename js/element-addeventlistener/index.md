---
title: "`.addEventListener()`"
description: "Учим приложение реагировать на действия пользователя."
baseline:
  - group: events
    features:
      - api.EventTarget.addEventListener
authors:
  - akellbl4
contributors:
  - nlopin
  - skorobaeus
  - vladislav149
  - solarrust
  - lira-bazh
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

Так выглядит сигнатура:

```js
element.addEventListener(eventType, handler, options)
```

- `element` — любой [элемент](/js/element/) на странице, а также `window`, `document`, `AbortSignal` и другие объекты с интерфейсом `EventTarget`;
- `eventType` — строка, содержащая название события. Самые популярные события [`'click'`](/js/element-click/), [`'change'`](/js/event-change/), [`'submit'`](/js/event-submit/), [`'keydown'`](/js/element-keydown/), [`'keyup'`](/js/element-keyup/), `'mousemove'`, `'mouseenter'`, `'mouseleave'`;
- `handler` — функция, которая будет вызвана, когда событие произойдёт;
- `options/capture` — необязательный параметр с настройками обработки события;
  - `capture` — включает или выключает [обработку события в фазе погружения](/js/element-addeventlistener/#obrabotka-sobytiya-v-faze-pogruzheniya). Принимает значение `true` или `false`, по умолчанию `false`;
  - `options: { capture: bool, passive: bool, once: bool, signal: AbortSignal }` — объект настроек. Через него можно задать больше параметров;
    - `passive` — значение `true` означает, что `handler` никогда не вызовет [`event.preventDefault()`](/js/event-prevent-default/). Если вызов всё же будет, браузер его проигнорирует и может вывести предупреждение в консоль;
    - `once` — включает автоматическую отписку от события после первого срабатывания;
    - `signal` — объект [`AbortSignal`](/js/abort-controller/), через который можно отписаться от события.

Ниже несколько вариантов вызова с разными параметрами. Это отдельные варианты, а не код подряд: повторный вызов с тем же событием, функцией и `capture` обработчик не добавит. Подробнее — в разделе [«Идентификация обработчиков событий»](/js/element-addeventlistener/#identifikaciya-obrabotchikov-sobytiy).

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

У объекта `event` есть специальные методы. Чаще всего нужны два:

- `preventDefault()` позволяет заблокировать стандартное поведение браузера. Например, по клику на ссылке — заблокировать переход по этой ссылке.
- `stopPropagation()` позволяет остановить [распространение события](/js/events/#rasprostranenie-sobytiy) по DOM-дереву.

## Как понять

Браузер передаёт в функцию специальный объект (в примере выше — `event`), который у разных типов событий разный. Например, у событий нажатия клавиши есть значение клавиши, а у событий перемещения мыши — координаты.

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

🤖 Заранее созданные функции обычно используют, когда в функции много кода или на неё нужно ссылаться несколько раз. Например, когда нужно отписаться от события позже. Для отписки используют метод [`removeEventListener()`](/js/element-removeeventlistener/).

Анонимные функции удобны, когда обработчик нужен только в одном месте. Выносить его в именованную функцию дольше, чем написать сам код. Здесь часто используют стрелочную функцию:

```js
element.addEventListener('click', (event) => {
  alert('Анонимная функция')
})
```

От анонимной функции через `removeEventListener()` не отписаться. Для этого используют `AbortController`. Подробнее — в разделе [«На практике»](/js/element-addeventlistener/#okenchic-vladislav-sovetuet).

### Обработка события в фазе погружения

[Фаза погружения](/js/events/#zahvat-sobytiy) — это первый этап жизни события, когда оно движется от корня документа (window → document → html → ...) к целевому элементу.

Добавить обработчик, который будет срабатывать на этой фазе, просто:

```js
element.addEventListener('click', handler, true)
// или
element.addEventListener('click', handler, { capture: true })
```

Третий аргумент `addEventListener` может быть булевым значением или объектом. `true` — короткая форма `{ capture: true }`, а `false` или пропущенный аргумент — `{ capture: false }`. Сначала третьим аргументом был только флаг `useCapture`. Объект с настройками появился позже, а старую запись оставили, чтобы не сломать существующие сайты.

### Идентификация обработчиков событий

Если добавить один и тот же обработчик несколько раз с одинаковыми параметрами `capture`, новые копии не добавятся. Сработает только первый обработчик, остальные удалять не нужно.

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
document.addEventListener('click', handlerClick, {
  once: true,
  capture: true
})
```

В этом примере добавится сразу два обработчика событий (один будет срабатывать на фазе погружения, другой на фазе всплытия):

```js
function handlerClick () {
  console.log('click')
}

document.addEventListener('click', handlerClick, true)
document.addEventListener('click', handlerClick, {
  passive: true,
  capture: false
})
```

### Улучшение производительности скролла

Среди событий есть отменяемые ([cancelable event](https://developer.mozilla.org/en-US/docs/Web/API/Event/cancelable)) — это события, в которых с помощью `preventDefault()` можно отменить действие по умолчанию. Среди них [`touchstart` и `touchmove`](/js/element-touch/), а также [`wheel`](/js/element-wheel/): их действие по умолчанию — прокрутка.

Прокрутку браузер выполняет в отдельном потоке, а обработчики событий — в главном. Если на событие подписан обычный обработчик, прокрутка ждёт, пока главный поток его выполнит и станет ясно, вызван ли `preventDefault()`. Когда главный поток занят другой работой, прокрутка ждёт ещё дольше, даже если сам обработчик пустой. Особенно заметна такая задержка на мобильных устройствах.

Флаг `{ passive: true }` решает эту проблему. Вы говорите браузеру: «Обещаю, я не буду вызывать `preventDefault()` внутри этого обработчика». Получив такое обещание, браузер больше не ждёт и начинает прокручивать немедленно, параллельно выполняя ваш код. Такой обработчик событий также называется «пассивный слушатель».

```js
element.addEventListener('wheel', handleScroll, { passive: true })
```

Чтобы не было задержки, все обработчики таких событий на элементе и его родителях должны быть пассивными слушателями.

💡 Если вы укажете `{ passive: true }`, но попытаетесь вызвать `preventDefault()`, браузер:

- проигнорирует вызов (в консоли может быть предупреждение);
- прокрутка всё равно произойдёт.

💡 Для события `scroll` флаг `{ passive: true }` не нужен. `scroll` срабатывает уже после прокрутки и не может её заблокировать, в отличие от `touchmove`, `touchstart` и `wheel`.

💡 Нестандартное событие `mousewheel` не используйте: его заменило `wheel`.

💡 Браузеры по умолчанию считают пассивными обработчики событий `touchstart`, `touchmove` и `wheel` на `window`, `document`, `<html>` и `<body>`.

Например, вот такой обработчик:

```js
window.addEventListener('touchstart', handler)
```

Браузер обработает его так, как если бы вы явно указали `{ passive: true }`.

Если нужен `preventDefault()`, например, для своего жеста, передайте `{ passive: false }` явно. Вешайте такой обработчик на конкретный элемент, а не на `window`. Иначе задержка прокрутки вернётся на всей странице.

Для касаний есть другой способ: задайте элементу CSS-свойство [`touch-action`](/css/touch-action/), например `touch-action: pan-y`. Не отключайте жесты на всей странице: пользователь не сможет прокрутить её или увеличить пальцами.
