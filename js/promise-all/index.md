---
title: "`Promise.all()`"
description: "Запускаем несколько промисов параллельно и ждём, когда они все выполнятся."
baseline:
  - group: promise
    features:
      - javascript.builtins.Promise.all
authors:
  - yurlovr
editors:
  - tachisis
related:
  - tools/api
  - tools/nodejs
  - js/fetch
tags:
  - doka
---

<aside>

💡 Эта документация связана с понятием [`Promise`](/js/promise/).

</aside>

## Кратко

Метод `all()` — это один из статических методов объекта `Promise`. Метод `all()` используют, когда нужно запустить несколько промисов параллельно и дождаться их выполнения.

## Как пишется

`Promise.all()` принимает итерируемую коллекцию промисов (чаще всего — массив) и возвращает новый промис, который будет выполнен, когда будут выполнены все промисы, переданные в виде перечисляемого аргумента, или отклонён, если хотя бы один из переданных промисов завершится с ошибкой.

Метод `Promise.all()` возвращает массив значений всех переданных промисов, при этом сохраняя порядок оригинального (переданного) массива, но не порядок выполнения.

## Как понять

### Успешное выполнение нескольких промисов

Создадим несколько промисов:

```js
const promise1 = new Promise(resolve => setTimeout(() => resolve(1), 5000))
const promise2 = new Promise(resolve => setTimeout(() => resolve(2), 2000))
const promise3 = new Promise(resolve => setTimeout(() => resolve(3), 1000))
```

Передадим массив из созданных промисов в `Promise.all()`:

```js
Promise.all([promise1, promise2, promise3])
  .then(([response1, response2, response3]) => {
    console.log(response1)
    // 1
    console.log(response2)
    // 2
    console.log(response3)
    // 3
  })
```

Если передать пустой массив, то `Promise.all()` будет выполнен немедленно.

### Один из промисов завершился ошибкой

Если хотя бы один промис из переданного массива завершится с ошибкой, то `Promise.all()` тоже завершится с этой ошибкой. Метод уже не будет следить за выполнением оставшихся промисов, которые рано или поздно все-таки выполнятся, и их результаты будут просто проигнорированы.

В примере ниже, промис `promise2` завершается с ошибкой:

```js
const promise1 = new Promise(
  resolve => setTimeout(() => resolve(1), 5000)
)
const promise2 = new Promise(
  (resolve, reject) => setTimeout(() => reject('error'), 2000)
)
const promise3 = new Promise(
  resolve => setTimeout(() => resolve(3), 1000)
)

Promise.all([promise1, promise2, promise3])
  .then(([response1, response2, response3 ]) => {
    console.log(response1)
    console.log(response2)
    console.log(response3)
  })
  .catch(error => {
    console.error(error)
    // error
  })
```

В итоге обработчик [`then()`](/js/promise-then/) будет проигнорирован, и будет выполняться код из обработчика ошибок [`catch()`](/js/promise-catch/).

### Не промисы в массиве промисов

Если в `Promise.all()` передать не промисы, он вернёт переданные не промисы в массив результатов как есть (под капотом при этом произойдёт его преобразование с помощью метода `Promise.resolve()`).

Передадим в `Promise.all()` промис `promise1`, [число `number`](/js/number/) и [объект `obj`](/js/object/):

```js
const promise1 = new Promise(resolve => setTimeout(() => resolve(1), 5000))
const number = 2
const obj = {key: 'value'}

Promise.all([promise1, number, obj])
  .then(([response1, response2, response3]) => {
    console.log(response1)
    // 1
    console.log(response2)
    // 2
    console.log(response3.key)
    // 'value'
  })
```
