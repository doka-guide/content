---
title: "`Promise.allSettled()`"
authors:
  - vadymstebakov
tags:
  - doka
---

<aside>

💡 Эта документация связана с понятием [`Promise`](/js/async-in-js/)

</aside>

## Кратко

Метод `allSettled` — это один из статических методов объекта `Promise`, очень похож на метод [`all`](/js/promise-all/). Метод `allSettled` используют, когда нужно запустить несколько промисов параллельно и дождаться их выполнения, но в отличии от метода [`all`](/js/promise-all/#odin-iz-promisov-zavershilsya-oshibkoy), он ждёт выполнения всех промисов, будь то статус _fulfilled/rejected_.

Метод `allSettled` возвращает массив значений всех переданных промисов, при этом сохраняя порядок оригинального (переданного) массива, но не порядок выполнения.

## Как понять

Создадим массив промисов и передадим его в `Promise.allSettled()`:

```js
const promises = [
  new Promise(resolve => setTimeout(() => resolve(1), 3000)),
  new Promise((resolve, reject) => setTimeout(() => reject('error'), 2000)),
  new Promise(resolve => setTimeout(() => resolve(3), 1000))
];

Promise.allSettled(promises)
  .then(([response1, response2, response3]) => {
    console.log(response1)
    // { status: 'fulfilled', value: 3 }
    console.log(response2)
    // { status: 'rejected', reason: 'error' }
    console.log(response3)
    // { status: 'fulfilled', value: 1 }
})
```

Если промис выполнился успешно, то мы на выходе получаем объект следующего вида (где `value` - это значение, которое передали в `resolve`):

```js
{ status: 'fulfilled', value: <someValue> }
```

Если промис выполнился с отказом, то мы на выходе получаем объект следующего вида (где `reason` - это значение, которое передали в `reject`):

```js
{ status: 'rejected', reason: <someValue> }
```
