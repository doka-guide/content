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

Метод `any` — это один из статических методов объекта `Promise`. Его используют, когда нужно запустить несколько промисов параллельно и дождаться выполнения первого из них.

## Как пишется

`Promise.any()` принимает [итерируемую](/js/iterator/) коллекцию промисов (чаще всего — [массив](/js/arrays/)) и возвращает новый промис, который будет выполнен, когда будет выполнен первый из промисов, переданных в виде перечисляемого аргумента, или отклонён, если все из переданных промисов завершатся с ошибкой.

Метод `any` возвращает значение первого успешно выполнившегося промиса.

## Как понять

Метод полезен, когда нужно вернуть первый исполненный промис. После того, как один из промисов будет исполнен, метод не будет дожидаться исполнения остальных. В отличие от [`Promise.all()`](/js/promise-all/), который содержит массив значений исполненных промисов, `Promise.any()` содержит только одно значение (при условии, что хотя бы один из промисов исполнен успешно). Такой подход может быть выгодным, когда нужно, чтобы выполнился только один промис, неважно какой. Также, в отличие от [`Promise.race()`](/js/promise-race/), который возвращает промис, содержащий значение первого завершённого (`resolved` или `rejected`), этот метод возвращает промис, содержащий значение первого успешно выполненного (`resolved`) промиса. Метод будет игнорировать исполнение промисов с ошибкой (`rejection`) вплоть до первого исполненного успешно (`fullfilment`).

## Для чего можно использовать

Например у нас есть 2 картинки и надо отобразить любую из них, которая загрузится быстрее:

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

### Массив промисов пустой

Передадим пустой массив в `Promise.any()`:

```js
Promise.any([])
  .then((result) => {
    console.log(result)
  })
  .catch(error => {
    console.error(error)
    // AggregateError: All promises were rejected
  })
```

В итоге обработчик `then` будет проигнорирован, и будет выполняться код из обработчика ошибок `catch`.

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
