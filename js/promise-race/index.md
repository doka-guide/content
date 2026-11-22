---
title: "`Promise.race()`"
description: "Запускаем несколько промисов и дожидаемся того, который выполнится быстрее."
baseline:
  - group: promise
    features:
      - javascript.builtins.Promise.race
authors:
  - agarkov
contributors:
  - vitya-ne
related:
  - tools/api
  - js/async-in-js
  - js/fetch
tags:
  - doka
---

<aside>

💡 Эта документация связана с понятием [`Promise`](/js/promise/).

</aside>

## Кратко

Метод `race()` — это один из статических методов объекта `Promise`. Его используют, чтобы запустить несколько промисов и получить результат того, который выполнится быстрее.

## Как пишется

`Promise.race()` принимает итерируемую коллекцию промисов, чаще всего — [массив](/js/arrays/).

Метод возвращает новый промис, который завершится, когда будет получен первый результат или ошибка от переданных промисов. Результаты или ошибки остальных промисов будут проигнорированы.

## Как понять

### Гонка промисов с успехом

Создадим несколько промисов, завершающихся без ошибок.

```js
const slow = new Promise(resolve => setTimeout(() => resolve(1), 6000))
const fast = new Promise(resolve => setTimeout(() => resolve(2), 3000))
const theFastest = new Promise(resolve => setTimeout(() => resolve(3), 1000))
```

Передадим массив из созданных промисов в `Promise.race()`:

```js
Promise.race([slow, fast, theFastest])
  .then((value) => {
    console.log(value)
    // 3
  })
```

В консоль запишется результат выполнения `theFastest`, так как он выполнился быстрее всех.

### Гонка промисов с ошибкой

Создадим несколько промисов, где `theFastest` завершается с ошибкой.

```js
const slow = new Promise(
  resolve => setTimeout(() => resolve(1), 6000)
)
const fast = new Promise(
  resolve => setTimeout(() => resolve(2), 3000)
)
const theFastest = new Promise(
  (resolve, reject) => setTimeout(() => reject('Some error'), 1000))
```

Передадим массив из созданных промисов в `Promise.race()`:

```js
Promise.race([slow, fast, theFastest])
  .then((value) => {
    console.log(value)
    // Промис с ошибкой завершился быстрее —
    // эта часть проигнорируется
  })
  .catch((error) => {
    console.log(error)
    // 'Some error'
  })
```

В консоль запишется результат выполнения `theFastest`, так как он завершился быстрее всех.

### Пустой список промисов

Если передать в `Promise.race()` пустой список, то промис навсегда зависнет в состоянии `pending`:

```js
Promise.race([])
  .then((value) => {
    console.log(value)
    // then никогда не сработает
  })
  .catch((error) => {
    console.log(error)
    // catch никогда не сработает
  })
```

### Непромисы в массиве промисов

Создадим массив, где `theFastest` — завершённый промис, а `3` — элемент, не являющийся промисом.

```js
const slow = new Promise(
  resolve => setTimeout(() => resolve(1), 6000)
)
const theFastest = Promise.resolve(2)

const promises = [slow, theFastest, 3]
```

Передадим массив из созданных промисов в `Promise.race()`:

```js
Promise.race(promises)
  .then((value) => {
    console.log(value)
    // 2
  })
```

В консоль запишется результат выполнения `theFastest`, так как в массиве он был первым завершённым промисом. Если поменять порядок элементов, результат изменится:

```js
const promises = [slow, 3, theFastest]

Promise.race(promises)
  .then((value) => {
    console.log(value)
    // 3
  })
```

### Отличие от `Promise.any()`

Как мы уже знаем, `Promise.race()` вернёт промис, который завершится, когда получен первый (самый быстрый) результат или _ошибка_ из всех переданных промисов.

[`Promise.any()`](/js/promise-any/) вернёт промис, который завершится, когда получен первый (самый быстрый) результат (_без ошибки_) из всех переданных промисов.

Создадим ещё раз несколько промисов, где `theFastest` завершается с ошибкой:

```js
const slow = new Promise(
  resolve => setTimeout(() => resolve(1), 6000)
)
const fast = new Promise(
  resolve => setTimeout(() => resolve(2), 3000)
)
const theFastest = new Promise(
  (resolve, reject) => setTimeout(() => reject('Some error'), 1000)
)
```

Передадим массив из созданных промисов в `Promise.any()`:

```js
Promise.any([slow, fast, theFastest])
  .then((value) => {
    console.log(value)
    // 2
  })
  .catch((error) => {
    console.log(error)
    // Сюда мы не попадём
  })
```

В консоль запишется результат выполнения `fast`, так как он выполнился быстрее всех и без ошибки. Этот же пример, но с использованием `Promise.race()` попадает в [`catch()`](/js/promise-catch/).
