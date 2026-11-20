---
title: "`Promise.allSettled()`"
description: "Запускаем несколько промисов параллельно и ждём, когда они все завершатся."
baseline:
  - group: promise-allsettled
    features:
      - javascript.builtins.Promise.allSettled
authors:
  - vadymstebakov
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

Метод `allSettled()` — это один из статических методов объекта `Promise`. Его используют, когда нужно запустить несколько промисов параллельно и дождаться их выполнения.

`Promise.allSettled()` очень похож на метод [`Promise.all()`](/js/promise-all/), но работает по-другому. В отличие от [`Promise.all()`](/js/promise-all/#odin-iz-promisov-zavershilsya-oshibkoy), `Promise.allSettled()` ждёт выполнения всех промисов, при этом неважно, завершились они успешно или с ошибкой.

## Как пишется

`Promise.allSettled()` принимает итерируемую коллекцию промисов, чаще всего — [массив](/js/arrays/). После метод возвращает новый промис, который выполнится, когда выполнятся все переданные промисы. Полученный промис содержит массив результатов выполнения всех переданных промисов, сохраняя порядок оригинального массива, но не порядок выполнения.

## Как понять

Создадим массив промисов и передадим его в `Promise.allSettled()`. Один из созданных промисов завершится ошибкой:

```js
const promises = [
  new Promise(resolve => setTimeout(() => resolve(1), 3000)),
  new Promise((resolve, reject) => setTimeout(() => reject('error'), 2000)),
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

Если промис выполнился успешно, на выходе получаем объект с двумя свойствами `status` и `value`. `status` содержит строку `'fulfilled'`, а `value` — значение, которое передали при вызове `resolve` у промиса:

```js
{ status: 'fulfilled', value: значение }
```

Если промис выполнился с отказом, на выходе получаем объект с двумя свойствами — `status` и `reason`. `status` содержит строку `'rejected'`, а `reason` — значение, которое передали при вызове `reject` у промиса:

```js
{ status: 'rejected', reason: значение }
```
