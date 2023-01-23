---
title: "`Promise.race()`"
description: "Запускаем несколько промисов и дожидаемся того, который выполнится быстрее."
authors:
  - agarkov
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

Метод `race()` — это один из статических методов объекта `Promise`. Его используют, чтобы запустить несколько промисов и дождаться того, который выполнится быстрее.

## Как пишется

`Promise.race()` принимает итерируемую коллекцию промисов (чаще всего — [массив](/js/arrays/)) и возвращает новый промис.
Он завершится, когда завершится самый быстрый из всех переданных. Остальные промисы будут проигнорированы.

## Как понять

### Самый быстрый промис завершается успешно

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

### Самый быстрый промис завершается с ошибкой

Создадим несколько промисов, где `theFastest` завершается с ошибкой.

```js
const slow = new Promise(resolve => setTimeout(() => resolve(1), 6000))
const fast = new Promise(resolve => setTimeout(() => resolve(2), 3000))
const theFastest = new Promise((resolve, reject) => setTimeout(() => reject('Some error'), 1000))
```

Передадим массив из созданных промисов в `Promise.race()`:

```js
Promise.race([slow, fast, theFastest])
  .then((value) => {
    console.log(value)
    // эта часть будет проигнорирована, так как быстрее всех завершился промис с ошибкой
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

### Отличие от `Promise.any()`

Как мы уже знаем, `Promise.race()` завершится, когда завершится самый быстрый из всех переданных промисов. Даже если он завершается _с ошибкой_.

[`Promise.any()`](/js/promise-any/) завершится, когда _без ошибки_ завершится самый быстрый из всех переданных промисов.

Создадим ещё раз несколько промисов, где `theFastest` завершается с ошибкой:

```js
const slow = new Promise(resolve => setTimeout(() => resolve(1), 6000))
const fast = new Promise(resolve => setTimeout(() => resolve(2), 3000))
const theFastest = new Promise((resolve, reject) => setTimeout(() => reject('Some error'), 1000))
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
    // в эту часть кода мы не попадём
  })
```

В консоль запишется результат выполнения `fast`, так как он выполнился быстрее всех и без ошибки. Этот же пример, но с использованием `Promise.race()` попадает в [`catch()`](/js/promise-catch/).
