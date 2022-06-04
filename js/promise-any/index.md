---
title: "`Promise.any()`"
description: "Статический метод Promise.any используют, чтобы запустить несколько промисов параллельно и дождаться, когда один из них выполнится."
authors:
  - yarkovaleksei
tags:
  - doka
---

<aside>

💡 Эта документация связана с понятием [`Promise`](/js/promise/)

</aside>

## Кратко

Метод `any` — это один из статических методов объекта `Promise`. Метод `any` используют, когда нужно запустить несколько промисов параллельно и дождаться выполнения первого из них.

## Как пишется

`Promise.any()` принимает итерируемую коллекцию промисов (чаще всего — массив) и возвращает новый промис, который будет выполнен, когда будет выполнен первый из промисов, переданных в виде перечисляемого аргумента, или отклонён, если все из переданных промисов завершатся с ошибкой.

Метод `any` возвращает значение первого успешно выполнившегося промиса.

## Как понять

### Успешное выполнение нескольких промисов

Создадим несколько промисов

```js
const promise1 = new Promise(resolve => setTimeout(() => resolve(1), 5000))
const promise2 = new Promise(resolve => setTimeout(() => resolve(2), 1000))
```

Передадим массив из созданных промисов в `Promise.any()`:

```js
Promise.any([promise1, promise2])
  .then((result) => {
    console.log(result)
    // 2
  })
```

Если передать пустой массив, то `Promise.any()` упадёт с ошибкой.

### Один из промисов завершился ошибкой

Метод `Promise.any()` не завершится с ошибкой, если хотя бы один из промисов выполнится успешно.

В примере ниже, промис `promise2` завершается с ошибкой:

```js
const promise1 = new Promise(resolve => setTimeout(() => resolve(1), 5000))
const promise2 = new Promise((resolve, reject) => setTimeout(() => reject('error'), 1000))

Promise.any([promise1, promise2])
  .then((result) => {
    console.log(result)
    // 1
  })
  .catch(error => {
    console.error(error)
    // AggregateError: All promises were rejected
  })
```

В итоге обработчик `catch` будет проигнорирован, и будет выполняться код из обработчика ошибок `then`.

### Все промисы завершились ошибкой

Метод `Promise.any()` завершится с ошибкой, если все переданные промисы завершатся с ошибкой.

В примере ниже, все промисы завершаются с ошибкой:

```js
const promise1 = new Promise((resolve, reject) => setTimeout(() => reject('error1'), 5000))
const promise2 = new Promise((resolve, reject) => setTimeout(() => reject('error2'), 1000))

Promise.any([promise1, promise2])
  .then((result) => {
    console.log(result)
  })
  .catch(error => {
    console.error(error)
    // AggregateError: All promises were rejected
  })
```

В итоге обработчик `then` будет проигнорирован, и будет выполняться код из обработчика ошибок `catch`.

### Не промисы в массиве промисов

Если в `Promise.any()` передать не промисы, он вернёт переданные не промисы в результат выполнения как есть (под капотом при этом произойдёт его преобразование с помощью метода `Promise.resolve()`).

Передадим в `Promise.any()` промис `promise1`, число `number` и объект `obj`:

```js
const promise1 = new Promise(resolve => setTimeout(() => resolve(1), 5000))
const number = 2
const obj = {key: 'value'}

Promise.any([promise1, number, obj])
  .then((result) => {
    console.log(result)
    // 2
  })
```
