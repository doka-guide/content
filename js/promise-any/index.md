---
title: "`Promise.any()`"
description: "Запускаем несколько промисов параллельно и дожидаемся первого успешного."
baseline:
  - group: promise-any
    features:
      - javascript.builtins.Promise.any
authors:
  - yarkovaleksei
related:
  - tools/api
  - js/fetch
  - js/async-in-js
tags:
  - doka
---

<aside>

💡 Эта документация связана с понятием [`Promise`](/js/promise/).

</aside>

## Кратко

Метод `any` — один из статических методов объекта `Promise`. Его используют, когда нужно запустить несколько промисов параллельно и дождаться первого успешного разрешённого.

## Как пишется

`Promise.any()` принимает [итерируемую](/js/iterator/) коллекцию промисов, чаще всего — [массив](/js/arrays/). Метод возвращает новый промис, который выполнится, когда выполнится первый из промисов, переданных в виде перечисляемого аргумента. Промис может быть отклонён, если все из переданных промисов завершатся с ошибкой.

Возвращает значение первого успешно выполнившегося промиса.

## Как понять

Метод полезен, когда нужно вернуть первый исполненный промис. После того как один из промисов будет исполнен, метод не будет дожидаться исполнения остальных.

В отличие от [`Promise.all()`](/js/promise-all/), который содержит массив значений исполненных промисов, `Promise.any()` содержит только одно значение при условии, что хотя бы один из промисов исполнен успешно. Такой подход полезен, когда нужно, чтобы выполнился только один промис, неважно какой.

Также `Promise.any()` отличается от [`Promise.race()`](/js/promise-race/). Метод `Promise.race()` возвращает промис, содержащий значение первого завершённого (`resolved` или `rejected`). Метод `Promise.any()` возвращает промис, содержащий значение первого успешно выполненного (`resolved`) промиса. `Promise.any()` проигнорирует исполнение промисов с ошибкой (`rejection`) до первого исполненного успешного (`resolved`).

Можете использовать `Promise.any()`, когда есть две картинки и надо отобразить ту, которая загрузится быстрее:

```js
function fetchAndDecode(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      } else {
        return response.blob()
      }
    })
}

const coffee = fetchAndDecode('coffee.jpg')
const tea = fetchAndDecode('tea.jpg')

Promise.any([coffee, tea])
  .then((value) => {
    const objectURL = URL.createObjectURL(value)
    const image = document.createElement('img')

    image.src = objectURL
    document.body.appendChild(image)
  })
  .catch((error) => {
    console.error(error)
  })
```

**Успешное выполнение нескольких промисов**. Создадим два промиса, второй выполнится раньше:

```js
const promise1 = new Promise(resolve => setTimeout(() => resolve(1), 5000))
const promise2 = new Promise(resolve => setTimeout(() => resolve(2), 1000))
```

Передадим массив из созданных промисов в `Promise.any()`:

```js
Promise.any([promise1, promise2])
  .then((result) => {
    console.log(result)
  })
// 2
```

**Пустой массив промисов**. Передадим пустой массив в `Promise.any()`:

```js
Promise.any([])
  .then((result) => {
    console.log(result)
  })
  .catch(error => {
    console.error(error)
  })
```

В итоге обработчик [`then()`](/js/promise-then/) будет проигнорирован, и будет выполняться код из обработчика ошибок [`catch`](/js/promise-catch/).

**Один из промисов завершился ошибкой**. Метод `Promise.any()` не завершится с ошибкой, если хотя бы один из промисов выполнится успешно.

В примере промис `promise2` завершается с ошибкой:

```js
const promise1 = new Promise(
  resolve => setTimeout(() => resolve(1), 5000)
)
const promise2 = new Promise(
  (resolve, reject) => setTimeout(() => reject('error'), 1000)
)

Promise.any([promise1, promise2])
  .then((result) => {
    console.log(result)
    // 1
  })
  .catch(error => {
    console.error(error)
  })
```

В итоге обработчик `catch()` проигнорируется и выполнится код из обработчика `then()` со значением `1` в переменной `result`.

**Все промисы завершились ошибкой**. Метод `Promise.any()` завершится с ошибкой, если все переданные промисы завершатся с ошибкой.

```js
const promise1 = new Promise(
  (resolve, reject) => setTimeout(() => reject('error1'), 5000)
)
const promise2 = new Promise(
  (resolve, reject) => setTimeout(() => reject('error2'), 1000)
)

Promise.any([promise1, promise2])
  .then((result) => {
    console.log(result)
  })
  .catch(error => {
    console.error(error)
    // AggregateError: All promises were rejected
    console.log(error.errors)
    // ['error1', 'error2']
  })
```

В итоге обработчик `then()` проигнорируется и выполнится код из обработчика ошибок `catch()`. В этом случае `error` это экземпляр класса `AggregateError`. Объект `AggregateError` содержит ошибки от обоих промисов в массиве `errors`.
☝️ Порядок в массиве ошибок определяется очерёдностью промисов в исходной коллекции.

**Непромисы в массиве промисов**. Если в `Promise.any()` передать что-то помимо промисов, метод вернёт промис, содержащий **первый** переданный аргумент любого типа как результат выполнения. Под капотом при этом произойдёт его преобразование с помощью метода `Promise.resolve()`.

Передадим в `Promise.any()` массив значений, которые не являются промисами:

```js
const number = 2
const obj = {key: 'value'}
const func = () => true
const bool = false
const nulled = null
const undef = undefined

Promise.any([number, obj, func, bool, nulled, undef])
  .then((result) => {
    console.log(result)
    // 2
  })

Promise.any([obj, func, bool, nulled, undef, number])
  .then((result) => {
    console.log(result)
    // {key: 'value'}
  })

Promise.any([func, bool, nulled, undef, number, obj])
  .then((result) => {
    console.log(result)
    // () => true
  })

Promise.any([bool, nulled, undef, number, obj, func])
  .then((result) => {
    console.log(result)
    // false
  })

Promise.any([nulled, undef, number, obj, func, bool])
  .then((result) => {
    console.log(result)
    // null
  })

Promise.any([undef, number, obj, func, bool, nulled])
  .then((result) => {
    console.log(result)
    // undefined
  })
```
