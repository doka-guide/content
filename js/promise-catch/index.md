---
title: "`.catch()`"
description: "Обрабатываем ситуации, когда обещали, но не выполнили."
authors:
  - nlopin
keywords:
  - промис
  - кэтч катч кеч
related:
  - js/api
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

Метод _принимает_ один аргумент:

- `onReject` — функция-колбэк, которая будет вызвана при переходе промиса в состояние «ошибка» `rejected`. Функция имеет один параметр, в который передаётся информация об ошибке.

_Возвращает_ промис.

## Как пишется

```js
// getPasswords() — асинхронная функция, которая возвращает промис
getPasswords()
  .then(function (result) {
    // выполнится, если операция успешна
  })
  .catch(function (err) {
    // колбэк выполнится, если getPassword завершится ошибкой
    alert(err.message)
  })
```

## Как понять

`catch()` выполняет переданный ему колбэк когда асинхронная операция:

- вызывает функцию `reject()` внутри промиса.

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

- выбрасывает ошибку с помощью `throw`.

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

🔧 Техническая деталь

Под капотом `catch()` содержит вызов [`then()`](/js/promise-then/), где первый колбэк установлен в [`undefined`](/js/undefined/): `catch(onReject)` → `then(undefined, onReject)`.
