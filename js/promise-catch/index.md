---
title: "`.catch()`"
description: "Обрабатываем ситуации, когда обещали, но не выполнили."
baseline:
  - group: promise
    features:
      - javascript.builtins.Promise.catch
authors:
  - nlopin
keywords:
  - кэтч
  - катч
  - кеч
related:
  - tools/api
  - js/async-in-js
  - js/try-catch
tags:
  - doka
---

<aside>

💡 Эта статья связана с понятием [Promise](/js/promise/).

</aside>

## Кратко

Метод `catch()` используют для обработки ошибки при выполнении асинхронной операции.

Метод _принимает_ один аргумент — `onReject`. Это функция-колбэк, которая вызовется при переходе промиса в состояние «ошибка» `rejected`. Имеет один параметр, в который передаётся информация об ошибке.

_Возвращает_ промис.

## Как пишется

```js
// Асинхронная функция, которая возвращает промис
getPasswords()
  .then(function (result) {
    // Выполнится, если операция успешна
  })
  .catch(function (err) {
    // Колбэк выполнится, если функция завершилась ошибкой
    alert(err.message)
  })
```

## Как понять

`catch()` выполняет переданный ему колбэк в нескольких случаях.

Асинхронная операция вызывает функцию `reject()` внутри промиса:

```js
const rejectInSecond = new Promise(function (resolve, reject) {
  setTimeout(function () {
    reject(new Error('время истекло'))
  }, 1000)
})

rejectInSecond.catch(function (err) {
  console.error(err.message)
  // 'время истекло'
})
```

Асинхронная операция выбрасывает ошибку с помощью `throw`:

```js
const throwInSecond = new Promise(function (resolve, reject) {
  setTimeout(function () {
    throw new Error('время истекло')
  }, 1000)
})

throwInSecond.catch(function (err) {
  console.error(err.message)
  // 'время истекло'
})
```

<aside>

🔧 `catch()` под капотом содержит вызов [`then()`](/js/promise-then/). Первый колбэк установлен в [`undefined`](/js/undefined/): `catch(onReject)` → `then(undefined, onReject)`.

</aside>
