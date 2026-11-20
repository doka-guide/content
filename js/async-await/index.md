---
title: "`async/await`"
description: "Ждать выполнения асинхронного кода стало легче! Больше никаких колбэков и промисов, только новые ключевые слова."
baseline:
  - group: async-await
    features:
      - javascript.statements.async_function
      - javascript.operators.await
authors:
  - nlopin
contributors:
  - vitya-ne
keywords:
  - асинхронный вызов
  - api
related:
  - js/async-in-js
  - js/promise
  - js/fetch
tags:
  - doka
---

Эта документация связана с понятием асинхронности в JavaScript. Зачем нужен асинхронный код и как он работает в деталях описано в обзорной статье «[Асинхронность в JavaScript](/js/async-in-js/)».

## Кратко

Добавленное перед определением функции ключевое слово `async` делает функцию асинхронной. Возвращаемое значение такой функции автоматически оборачивается в [Promise](/js/promise/):

```js
async function getStarWarsMovies() {
  return 1
}

console.log(getStarWarsMovies())
// Promise { <state>: "fulfilled", <value>: 1 }
```

Асинхронные функции нужны для выполнения асинхронных операций: работой с API, базами данных, чтения файлов и т. д.

Асинхронные операции выполняются не сразу: код отправил запрос к API и ждёт, пока сервер пришлёт ответ. Ключевое слово `await` используется, чтобы дождаться выполнения асинхронной операции:

```js
async function getStarWarsMovie(id) {
  const response = await fetch(`https://swapi.dev/api/films/${id}/`)
  console.log('ответ получен', response)
  // *1

  return response.json()
}

const movies = getStarWarsMovie(1).then((movie) => {
  console.log(movie.title)
  // *2
})

console.log('результат вызова функции', movies)
// *3
```

Движок JavaScript при этом не блокируется и может выполнять другой код. Как только ответ получен, выполнение кода продолжается.

Вывод на экран будет следующий:

```js
// Вызвали функцию, она начала выполнять
// асинхронную операцию и вернула промис (*3)
'результат вызова функции' Promise

// Получили ответ API, продолжаем
// выполнение функции (*1)
'ответ получен' Response

// Сработал колбэк (*2)
'A New Hope'
```

## Как понять

Ключевые слова `async/await` не привносят в JavaScript что-то новое. Они только упрощают работу с промисами.

Вместо кода с цепочкой вызовов:

```js
function getMainActorProfileFromMovie(id) {
  return fetch(`https://swapi.dev/api/films/${id}/`)
    .then((movieResponse) => {
      return movieResponse.json()
    })
    .then((movie) => {
      const characterUrl = movie.characters[0].split('//')[1]
      return fetch(`https://${characterUrl}`)
    })
    .then((characterResponse) => {
      return characterResponse.json()
    })
    .catch((err) => {
      console.error('Произошла ошибка!', err)
    })
}

getMainActorProfileFromMovie(1).then((profile) => {
  console.log(profile)
})
```

Можно записать с `async/await`:

```js
async function getMainActorProfileFromMovie(id) {
  try {
    const movieResponse = await fetch(`https://swapi.dev/api/films/${id}/`)
    const movie = await movieResponse.json()

    const characterUrl = movie.characters[0].split('//')[1]
    const characterResponse = await fetch(`https://${characterUrl}`)
    return characterResponse.json()
  } catch (err) {
    console.error('Произошла ошибка!', err)
  }
}

getMainActorProfileFromMovie(1).then(
  (profile) => {console.log(profile)}
)
```

Такой код проще понимать:

- он плоский;
- выглядит, как синхронный;
- использует стандартный блок `try...catch` для обработки ошибок.

☝️ Ключевое слово `await` может использоваться не только внутри асинхронных функций, но и в [модулях](/js/modules/).

<details>
  <summary>
    Подробнее об использовании `await` в модулях (Top level await)
  </summary>

  Определение данных в дочернем модуле с использованием `await` позволяет родительскому модулю ожидать окончания загрузки асинхронных данных, при этом загрузка других дочерних модулей не блокируется.

  Допустим, у нас есть модуль `Parent.mjs`, импортирующий данные из модулей `Child.mjs`:

  ```js
  // Parent.mjs
  import {data} from './Child.mjs'

  console.log('Parent:', data)
  ```

  Модуль `Child.mjs` экспортирует данные, полученные асинхронно:

  ```js
  // Child.mjs

  // Пример асинхронной функции, возвращающей Promise
  const promise =
    fetch('https://dummyjson.com/products/1')
    .then(res => res.json())

  export const data = await promise
  ```

  При запуске `Parent.mjs` будет ожидать завершения асинхронной операции.

</details>

💡 Возможность использовать `await` вне асинхронной функции в модулях появилась в стандарте ES2022.

Попытка использовать `await` вне модуля и не в асинхронной функции приведёт к синтаксической ошибке:
`SyntaxError: await is only valid in async functions and the top level bodies of modules`.

```js
function getMainActorProfileFromMovie(id) {
  // Код из примера выше
}

await getMainActorProfileFromMovie(1)
```
