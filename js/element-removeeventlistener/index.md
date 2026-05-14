---
title: "`.removeEventListener()`"
description: "Перестаём слушать события браузера."
authors:
  - akellbl4
contributors:
  - nlopin
  - skorobaeus
  - lira_bazh
related:
  - js/events
  - js/dom
  - js/typecasting
tags:
  - doka
---

## Кратко

Удаляет обработчик события с элемента, установленный с помощью [`addEventListener()`](/js/element-addeventlistener/).

## Как пишется

Добавим обработчик на элемент, а затем удалим его.

Например, будем обрабатывать клики на любое место на странице, а затем удалим обработчик, передав в `removeEventListener()` те же аргументы, что и при добавлении:

```js
function handleMouseClick(event) {
  console.log('Вы нажали на элемент:', event.target)
}

// Добавляем обработчик события
window.addEventListener('click', handleMouseClick)

// Убираем обработчик события
window.removeEventListener('click', handleMouseClick)
```

<iframe title="Удаление обработчика событий" src="demos/index/" height="350"></iframe>

Метод `removeEventListener()` принимает три аргумента. Первые два обязательные:

- название события строкой;
- функция-обработчик, которую нужно убрать с указанного события.

Третий аргумент необязательный — это объект с настройками, в котором могут содержаться свойства `capture` и `passive` с булевыми значениями `true` либо `false`. Точно такие же опции можно передать и в `.addEventListener()`.

```js
window.addEventListener('click', handleMouseClick, {
  capture: true,
  passive: true
})

// Аналогичные опции при удалении обработчика
window.removeEventListener('click', handleMouseClick, {
  capture: true,
  passive: true
})
```

Переданные настройки влияют на удаление обработчика события. Мы рекомендуем повторять в точности те же параметры, которые использовались в `.addEventListener()`, чтобы браузер точно знал какой обработчик нужно удалить.

Например, создадим обработчик события и передадим третьим аргументом в опциях значение `true`. Если попробовать убрать событие, но ничего не передать в опциях в `.removeEventListener()`, то событие не уберётся.

```js
function handleMouseClick(event) {
  console.log('Вы нажали на элемент:', event.target)
}

window.addEventListener('click', handleMouseClick, true)

// Ничего не передаем в опциях в третьем аргументе
window.removeEventListener('click', handleMouseClick)
```

Аналогичная ситуация, если сделать наоборот.

## Как понять

Браузер даёт возможность не только устанавливать обработчики событий, но и убирать их.

Очищать обработчики событий важно, потому что каждый обработчик занимает место в памяти и выполняется всякий раз, когда срабатывает событие. Если не убирать неиспользуемые обработчики событий, то можно столкнуться с неожиданным поведением. Например, один из старых обработчиков будет мешать всплытию события наверх, и другой обработчик не будет работать.

<aside>

👇 Хорошим тоном считается убирать обработчик сразу же, как он перестал быть нужен.

</aside>

Будет ли на самом деле удалён обработчик события зависит от того, какую функцию и какие опции передали вторым и третьим аргументами в `.removeEventListener()`.

Функции относятся к [ссылочным типам данных](/js/ref-type-vs-value-type/), а, значит, две одинаково написанные функции будут считаться различными. Поэтому, если ранее в `.addEventListener()` использовалась анонимная функция, то убрать обработчик с помощью `.removeEventListener()` не получится.

```js
window.addEventListener('click', (event) => {
  console.log('Клик!')
})

// Обработчик не будет удалён!
window.removeEventListener('click', (event) => {
  console.log('Клик!')
})
```

Всегда сохраняйте функцию-обработчик в переменную, чтобы позже убрать обработчик. Делать это необязательно, только если вы делаете быстрый прототип или проверяете свою идею прямо в браузере.

Браузер идентифицирует обработчик события по [трём параметрам](/js/element-addeventlistener/#identifikaciya-obrabotchikov-sobytiy), поэтому при удалении нужно указать всё то же самое, что и при добавлении. Если ошибиться в `capture` — обработчик не удалится.

```js
function handleMouseClick(event) {
  console.log('Вы нажали на элемент:', event.target)
}

// неявно { capture: true }
window.addEventListener('click', handleMouseClick, true)

//неявно capture = false, поэтому обработчик не удалится
window.removeEventListener('click', handleMouseClick)
```
