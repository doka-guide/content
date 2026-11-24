---
title: "`async/await`"
description: "Ждать выполнения асинхронного кода стало легче! Цепочки промисов превращаются в код, который читается как синхронный."
baseline:
  - group: async-await
    features:
      - javascript.statements.async_function
      - javascript.operators.await
      - javascript.operators.async_function
      - javascript.builtins.AsyncFunction
  - group: top-level-await
    features:
      - javascript.operators.await.top_level
authors:
  - nlopin
contributors:
  - vitya-ne
  - solarrust
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

Эта документация связана с понятием асинхронности в JavaScript. Зачем нужен асинхронный код и как он работает в деталях, описано в обзорной статье «[Асинхронность в JavaScript](/js/async-in-js/)».

## Кратко

Ключевое слово `async` перед объявлением функции делает её асинхронной. Такая функция всегда возвращает [промис](/js/promise/). JavaScript сам оборачивает в него значение из `return`:

```js
async function getStarWarsMovies() {
  return 1
}

console.log(getStarWarsMovies())
// Promise { <state>: "fulfilled", <value>: 1 }
```

Асинхронные функции нужны для асинхронных операций: работы с API, базами данных, чтения файлов и так далее.

Асинхронные операции выполняются не сразу: код отправил запрос к API и ждёт, пока сервер пришлёт ответ. Ключевое слово `await` ставят перед промисом, чтобы дождаться выполнения асинхронной операции:

```js
async function getStarWarsMovie(id) {
  const response = await fetch(`https://swapi.dev/api/films/${id}/`)
  console.log('ответ получен', response)
  // *1

  return response.json()
}

const moviePromise = getStarWarsMovie(1).then((movie) => {
  console.log(movie.title)
  // *2
})

console.log('промис из then()', moviePromise)
// *3
```

В консоли появится:

```js
// Вызвали функцию, она начала выполнять асинхронную
// операцию и вернула промис, then() вернул ещё один (*3)
'промис из then()' Promise

// Получили ответ API, продолжаем
// выполнение функции (*1)
'ответ получен' Response

// Сработал колбэк (*2)
'A New Hope'
```

На `await` функция встаёт на паузу, а движок JavaScript выполняет другой код. Поэтому строка *3 появилась в консоли первой. Когда промис выполнится, функция продолжит работу с места `await`. Результат промиса станет значением `await`: в примере это ответ сервера в `response`.

Порядок этих шагов подробно разобран в статье «[Микро- и макрозадачи](/js/micro-and-macro-tasks/)».

## Как пишется

`async` ставят перед объявлением функции, функциональным выражением, стрелочной функцией или методом:

```js
async function getUser() {}

const getPost = async function () {}

const getNews = async () => {}

const api = {
  async getComments() {}
}
```

Геттер, сеттер и конструктор класса асинхронными быть не могут.

`await` ставят перед промисом: `const data = await promise`. Писать его можно только внутри асинхронной функции или на верхнем уровне [модуля](/js/modules/).

## Как понять

Ключевые слова `async/await` не добавляют в JavaScript ничего нового. Они только упрощают работу с промисами.

Вместо кода с цепочкой вызовов:

```js
function getFirstCharacterFromMovie(id) {
  return fetch(`https://swapi.dev/api/films/${id}/`)
    .then((movieResponse) => {
      return movieResponse.json()
    })
    .then((movie) => {
      return fetch(movie.characters[0])
    })
    .then((characterResponse) => {
      return characterResponse.json()
    })
    .catch((err) => {
      console.error('Произошла ошибка!', err)
    })
}

getFirstCharacterFromMovie(1).then((character) => {
  console.log(character)
})
```

Можно записать с `async/await`:

```js
async function getFirstCharacterFromMovie(id) {
  try {
    const movieResponse = await fetch(
      `https://swapi.dev/api/films/${id}/`
    )
    const movie = await movieResponse.json()

    const characterResponse = await fetch(movie.characters[0])
    return await characterResponse.json()
  } catch (err) {
    console.error('Произошла ошибка!', err)
  }
}

getFirstCharacterFromMovie(1).then((character) => {
  console.log(character)
})
```

Такой код проще понимать:

- промежуточные значения лежат в обычных переменных;
- выглядит как синхронный;
- использует стандартный блок [`try...catch`](/js/try-catch/) для обработки ошибок.

Если промис отклонён, `await` выбросит ошибку, и её поймает `catch`.

Обратите внимание на `return await`. Без `await` промис из `json()` вернётся наружу, и, если он отклонится, `catch` внутри функции эту ошибку не поймает.

[`fetch()`](/js/fetch/) не отклоняет промис, если сервер ответил с кодом 404 или 500. Чтобы такие ответы тоже попадали в `catch`, проверяйте свойство `ok`:

```js
const response = await fetch(url)

if (!response.ok) {
  throw new Error(`Ошибка ${response.status}`)
}
```

<details>
  <summary>
    Подробнее об использовании `await` в модулях (_top-level await_)
  </summary>

  Допустим, у нас есть модуль `Parent.mjs`, импортирующий данные из модуля `Child.mjs`:

  ```js
  // Parent.mjs
  import {data} from './Child.mjs'

  console.log('Parent:', data)
  ```

  Модуль `Child.mjs` экспортирует данные, полученные асинхронно:

  ```js
  // Child.mjs

  // Промис, который вернёт данные о товаре
  const promise =
    fetch('https://dummyjson.com/products/1')
      .then((response) => response.json())

  export const data = await promise
  ```

  `Parent.mjs` и все модули, которые зависят от `Child.mjs`, выполнятся только после ответа сервера. Модули, которые от него не зависят, в это время выполняются. Если промис отклонится, `Child.mjs` выбросит ошибку, и `Parent.mjs` не выполнится вовсе.

  Safari с 15 по 26 версию поддерживал `await` в модулях частично. Если модуль с `await` импортировали сразу несколько модулей, они могли выполниться раньше него. Полная поддержка появилась в Safari 27.

</details>

`await` в обычном скрипте вне асинхронной функции вызывает синтаксическую ошибку. Например, если так вызвать функцию с цепочкой `then()` из начала раздела:

```js
function getFirstCharacterFromMovie(id) {
  // Код из примера выше
}

await getFirstCharacterFromMovie(1)
```

В Chrome ошибка выглядит так:

```
SyntaxError: await is only valid in async functions
and the top level bodies of modules
```

Такой код сработает в двух случаях:

- в консоли DevTools: она разрешает `await` на верхнем уровне;
- в Node.js с версий 22.7 и 20.19 для файла `.js`, если нет `package.json` или в нём не указано поле `"type"`: Node.js сам запустит такой файл как модуль.

Если `package.json` есть, но в нём нет поля `"type"`, Node.js выведет предупреждение. Чтобы его не было, укажите `"type": "module"` или используйте расширение `.mjs`.
