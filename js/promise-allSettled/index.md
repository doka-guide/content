---
title: "`Promise.allSettled()`"
description: "Статический метод Promise.allSettled используют, чтобы запустить несколько промисов параллельно и дождаться, когда они все выполнятся."
authors:
  - vadymstebakov
tags:
  - doka
---

<aside>

💡 Эта документация связана с понятием [`Promise`](/js/async-in-js/)

</aside>

## Кратко

Метод `allSettled` — это один из статических методов объекта `Promise`. Метод `allSettled` используют, когда нужно запустить несколько промисов параллельно и дождаться их выполнения.

## Как пишется

Метод `allSettled`, очень похож на метод [`all`](/js/promise-all/), но работает немного по-другому. Метод `allSettled` в отличии от метода [`all`](/js/promise-all/#odin-iz-promisov-zavershilsya-oshibkoy), ждёт выполнения всех промисов, не важно завершились они успешно или с ошибкой.

Метод `allSettled` возвращает массив значений всех переданных промисов, при этом сохраняя порядок оригинального (переданного) массива, но не порядок выполнения.

## Как понять

Создадим массив промисов и передадим его в `Promise.allSettled()`. Один из созданных промисов завершится ошибкой:

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

Если промис выполнился успешно, то на выходе получаем объект с двумя свойствами — `status` и `value`. `status` будет содержать строку `'fulfilled'`, а `value` — значение, которое передали при вызове `resolve` у промиса:

```js
{ status: 'fulfilled', value: значение }
```

Если промис выполнился с отказом, то на выходе получаем объект с двумя свойствами — `status` и `reason`. `status` будет содержать строку `'rejected'`, а `reason` — значение, которое передали при вызове `reject` у промиса:

```js
{ status: 'rejected', reason: значение }
```
