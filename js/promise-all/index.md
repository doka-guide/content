---
title: "Promise. Метод all"
description: "Метод all используют для того, чтобы запустить несколько промисов параллельно и дождаться, когда они все выполнятся."
authors:
  - yurlovr
editors:
  - tachisis
tags:
  - doka
---

::: callout 

💡 Эта статья связана с понятием [Promise](/js/promise).

:::

## Кратко
Метод `all` — это один из статических методов объекта `Promise`.

Метод `all` используют, когда нужно запустить несколько промисов параллельно и дождаться их выполнения.
Он принимает массив промисов и возвращает новый промис, который будет выполнен, когда будут выполнены все промисы, переданные в виде перечисляемого аргумента, или отклонён, если хотя бы один из переданных промисов завершится с ошибкой.

Метод `all` возвращает массив значений всех переданных промисов, при этом сохраняя порядок оригинального (переданного) массива, но не порядок выполнения.

## Пример

Успешное выполнение нескольких промисов:

```js
// Создадим несколько промисов
const promise1 = new Promise(resolve => setTimeout(() => resolve(1), 5000))
const promise2 = new Promise(resolve => setTimeout(() => resolve(2), 2000))
const promise3 = new Promise(resolve => setTimeout(() => resolve(3), 1000))

// Передаем массив из созданных промисов в Promise.all
Promise.all([promise1, promise2, promise3])
  .then(([response1, response2, response3 ]) => {
    console.log(response1) // 1
    console.log(response2) // 2
    console.log(response3) // 3
  });
```

Если передать пустой массив, то `Promise.all` будет выполнен немедленно.

Следует помнить, что если хотя бы один промис из переданного массива завершится с ошибкой, то `Promise.all` тоже завершится с этой ошибкой. Метод уже не будет следить за выполнением оставшихся промисов, которые рано или поздно все-таки выполнятся, и их результаты будут просто проигнорированы.

## Пример

В этом примере один из промисов завершается с ошибкой:

```js
const promise1 = new Promise(resolve => setTimeout(() => resolve(1), 5000))

// Следующий промис завершится с ошибкой
const promise2 = new Promise((resolve, reject) => setTimeout(() => reject('error'), 2000))
const promise3 = new Promise(resolve => setTimeout(() => resolve(3), 1000))

Promise.all([promise1, promise2, promise3])
  .then(([response1, response2, response3 ]) => {
    console.log(response1)
    console.log(response2)
    console.log(response3)
  })
  .catch(error => {
    console.error(error) // error
  })
```

Так же в `Promise.all` можно передать не промисы, тогда он вернётся в массив результатов как есть. (На самом же деле произойдёт его преобразование с помощью метода `Promise.resolve`)

## Пример

Передадим в `all` не только промисы:

```js
const promise1 = new Promise(resolve => setTimeout(() => resolve(1), 5000))

// Ниже пройдет преобразование переменных в промис, и он тут же выпонится
const promise2 = 2  // Promise.resolve(2)
const promise3 = 3 // Promise.resolve(3)

Promise.all([promise1, promise2, promise3])
  .then(([response1, response2, response3 ]) => {
    console.log(response1) // 1
    console.log(response2) // 2
    console.log(response3) // 3
  });
```

Довольно частое использование - это преобразовать массив с помощью `map`, создав для каждого элемента промис, а затем передать полученный массив в `Promise.all`. Это позволит дождаться выполнения всех промисов, а затем обработать результат.

## Пример

Вот так можно использовать метод `all` для получения данных пользователей через запрос к API:

```js
const users = ['userId1', 'userId2', 'userId3']
const arrayFetchUsers = users.map(user => fetch(`https://api.someapi.com/users/${user}`))

Promise.all(arrayFetchUsers)
  .then(resonse => {
    // Тут не забываем, что response — 
    // это массив результатов выполнения промисов
    response.forEach(resp => {
      console.log(resp)
    })
  })
  // Не забываем обработать ошибку
  .catch(error => {
    console.error(error)
  })
```
## Как пишется

  `Promise.all(iterable)`

  iterable - перечисляемый объект, чаще всего массив.

