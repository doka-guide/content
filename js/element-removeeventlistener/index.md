---
title: "`.removeEventListener()`"
description: "Перестаём слушать события браузера."
baseline:
  - group: events
    features:
      - api.EventTarget.removeEventListener
authors:
  - akellbl4
contributors:
  - nlopin
  - skorobaeus
  - lira-bazh
  - solarrust
related:
  - js/events
  - js/dom
  - js/typecasting
tags:
  - doka
---

## Кратко

Удаляет обработчик события с элемента или другого объекта, например `window`. Обработчик должен быть установлен с помощью [`addEventListener()`](/js/element-addeventlistener/).

## Пример

Будем показывать нажатую клавишу, а по нажатию <kbd>Esc</kbd> удалим обработчик:

```js
const output = document.getElementById('output')

function handleKey(event) {
  output.textContent = event.key

  if (event.key === 'Escape') {
    window.removeEventListener('keydown', handleKey)
  }
}

window.addEventListener('keydown', handleKey)
```

<iframe title="Удаление обработчика событий" src="demos/index/" height="350"></iframe>

## Как пишется

Чтобы убрать обработчик, передайте в `removeEventListener()` те же аргументы, что и в `addEventListener()`:

```js
function handleMouseClick(event) {
  console.log('Вы нажали на элемент:', event.target)
}

window.addEventListener('click', handleMouseClick)

// Позже, когда обработчик больше не нужен
window.removeEventListener('click', handleMouseClick)
```

Метод `removeEventListener()` принимает три аргумента. Первые два обязательные:

- название события строкой;
- функция-обработчик, которую нужно убрать.

Третий аргумент необязательный. Это те же настройки, что в `addEventListener()`: объект или просто `true` или `false` для параметра `capture`. При удалении важен только `capture`, остальные настройки можно не передавать. Почему это важно, разберём ниже.

```js
window.addEventListener('click', handleMouseClick, {
  capture: true,
  passive: true
})

// Для удаления хватит capture
window.removeEventListener('click', handleMouseClick, {
  capture: true
})
```

## Как понять

Очищать обработчики событий важно, потому что каждый обработчик занимает место в памяти и выполняется всякий раз, когда срабатывает событие. Если не убирать неиспользуемые обработчики событий, то можно столкнуться с неожиданным поведением. Например, старый обработчик вызывает `stopPropagation()` и не даёт событию [всплыть](/js/events/#vsplytie-sobytiy) до другого обработчика.

<aside>

👇 Убирайте обработчик сразу, как только он стал не нужен.

</aside>

Удалит ли браузер обработчик, зависит от того, какую функцию и какие настройки передали вторым и третьим аргументами в `removeEventListener()`.

Функции относятся к [ссылочным типам данных](/js/ref-type-vs-value-type/), а значит, две одинаково написанные функции будут считаться различными. Браузер ищет обработчик по ссылке на функцию. Если в `addEventListener()` передали анонимную функцию, ссылки на неё не осталось, и убрать обработчик с помощью `removeEventListener()` не получится.

```js
window.addEventListener('click', (event) => {
  console.log('Клик!')
})

// Обработчик не удалится!
window.removeEventListener('click', (event) => {
  console.log('Клик!')
})
```

Чтобы потом убрать обработчик, сохраните функцию в переменную или объявите её с именем, как в примерах выше.

Браузер различает обработчик события по [трём параметрам](/js/element-addeventlistener/#identifikaciya-obrabotchikov-sobytiy), поэтому при удалении важно указать тот же параметр `capture`, что и при добавлении обработчика. Если ошибиться в `capture`, обработчик не удалится. Ошибки при этом не будет: метод просто ничего не сделает.

```js
function handleMouseClick(event) {
  console.log('Вы нажали на элемент:', event.target)
}

// То же, что { capture: true }
window.addEventListener('click', handleMouseClick, true)

// То же, что { capture: false }, поэтому обработчик не удалится
window.removeEventListener('click', handleMouseClick)
```

Убрать обработчик можно и без `removeEventListener()`, через [`AbortController`](/js/abort-controller/). Передайте его `signal` в настройках `addEventListener()`. Потом вызовите `abort()`, и браузер уберёт все обработчики с этим сигналом, даже анонимные:

```js
const controller = new AbortController()

window.addEventListener('click', () => {
  console.log('Клик!')
}, { signal: controller.signal })

window.addEventListener('keydown', (event) => {
  console.log('Нажата клавиша:', event.key)
}, { signal: controller.signal })

// Убираем оба обработчика
controller.abort()
```

Контроллер одноразовый: после `abort()` с его сигналом новый обработчик не добавится. Чтобы снова добавить обработчики, создайте новый `AbortController`.
