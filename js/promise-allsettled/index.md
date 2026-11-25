---
title: "`Promise.allSettled()`"
description: "Ждём, когда завершатся все промисы, и успешные, и с ошибкой."
baseline:
  - group: promise-allsettled
    features:
      - javascript.builtins.Promise.allSettled
authors:
  - vadymstebakov
contributors:
  - solarrust
related:
  - tools/api
  - js/deal-with-forms
  - js/fetch
tags:
  - doka
---

<aside>

💡 Эта документация связана с понятием [`Promise`](/js/promise/).

</aside>

## Кратко

Метод `allSettled()` — это один из статических методов объекта `Promise`. Его используют, когда нужно дождаться результата нескольких асинхронных операций, даже если часть из них завершится ошибкой.

Метод похож на [`Promise.all()`](/js/promise-all/#odin-iz-promisov-zavershilsya-oshibkoy), но не отклоняется на первой ошибке, а дожидается завершения всех промисов.

## Пример

Создадим массив промисов и передадим его в `Promise.allSettled()`. Один из промисов завершится ошибкой:

```js
const promises = [
  new Promise(resolve => setTimeout(() => resolve(1), 3000)),
  new Promise((resolve, reject) => {
    setTimeout(() => reject('error'), 2000)
  }),
  new Promise(resolve => setTimeout(() => resolve(3), 1000))
]

Promise.allSettled(promises)
  .then(([response1, response2, response3]) => {
    console.log(response1)
    // { status: 'fulfilled', value: 1 }
    console.log(response2)
    // { status: 'rejected', reason: 'error' }
    console.log(response3)
    // { status: 'fulfilled', value: 3 }
  })
```

Третий промис завершился первым, но в результате он всё равно третий.

## Как пишется

`Promise.allSettled()` принимает [итерируемую коллекцию](/js/iterator/) промисов, чаще всего — [массив](/js/arrays/). Метод возвращает новый промис. Он выполнится, когда завершатся все переданные промисы.

Результат — массив объектов, по одному на каждый промис. Порядок в нём такой же, как в исходной коллекции, а не порядок завершения.

Что ещё важно знать:

- Метод ничего не запускает. Операции стартуют, когда создаются промисы, а `allSettled()` только ждёт их результатов.
- Ошибка одного из промисов не отклоняет общий промис. Она попадёт в результат как `rejected`.
- Общий промис отклоняется, если аргумент не итерируемый: например, число или `undefined`. Тогда в `catch()` придёт ошибка `TypeError`.
- Обычное значение вместо промиса попадёт в результат как `fulfilled`.
- Если передать пустой массив, промис выполнится с пустым массивом `[]`.
- Если один из промисов не завершится никогда, общий промис тоже будет ждать вечно. Для сетевых запросов задайте таймаут, например через [`AbortSignal.timeout()`](/js/abort-controller/).

## Как понять

Каждый объект в результате описывает, чем закончился промис.

Если промис выполнился, в `status` будет `'fulfilled'`, а в `value` его значение:

```js
{ status: 'fulfilled', value: значение }
```

Если промис отклонился, в `status` будет `'rejected'`, а в `reason` причина: значение из `reject()` или выброшенная ошибка:

```js
{ status: 'rejected', reason: значение }
```
