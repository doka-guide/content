---
title: "`async/await`"
description: "Ждать выполнения асинхронного кода стало легче! Больше никаких колбэков и промисов, только новые ключевые слова."
authors:
  - nlopin
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

Эта документация связана с понятием асинхронности в JavaScript. Зачем нужен асинхронный код и как он работает в деталях описано в обзорной статье [Асинхронность в JS](/js/async-in-js/).

## Кратко

Добавленное перед определением функции ключевое слово `async` делает функцию асинхронной. Возвращаемое значение такой функции автоматически оборачивается в [Promise](/js/promise/):

```js
async function getStarWarsMovies() {
  return 1
}

console.log(getStarWarsMovies()) // Promise { <state>: "fulfilled", <value>: 1 }
```

Асинхронные функции нужны для выполнения асинхронных операций: работой с API, базами данных, чтения файлов и т.д.

Асинхронные операции выполняются не сразу: код отправил запрос к API и ждёт, пока сервер пришлёт ответ. Ключевое слово `await` используется, чтобы дождаться выполнения асинхронной операции:

```js
async function getStarWarsMovie(id) {
  const response = await fetch(`https://swapi.dev/api/films/${id}/`)
  console.log("ответ получен", response) // *1
  return response.json()
}

const movies = getStarWarsMovie(1).then((movie) => {
  console.log(movie.title)
}) // *2
console.log("результат вызова функции", movies) // *3
```

Движок JavaScript при этом не блокируется и может выполнять другой код. Как только ответ получен, выполнение кода продолжается.

Вывод на экран будет следующий:

```js
"результат вызова функции" Promise // вызвали функцию, она начала выполнять асинхронную операцию и вернула Promise (*3)
"ответ получен" Response // получили ответ API, продолжаем выполнение функции (*1)
"A New Hope" // сработал callback (*2)
```

## Как понять

Ключевые слова `async/await` не привносят в JavaScript что-то новое. Они только упрощают работу с Promise.

Вместо кода с цепочкой вызовов:

```js
function getMainActorProfileFromMovie(id) {
  return fetch(`https://swapi.dev/api/films/${id}/`)
    .then((movieResponse) => {
      return movieResponse.json()
    })
    .then((movie) => {
      const characterUrl = movie.characters[0].split("//")[1]
      return fetch(`https://${characterUrl}`)
    })
    .then((characterResponse) => {
      return characterResponse.json()
    })
    .catch((err) => {
      console.error("Произошла ошибка!", err)
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
    const movieResponse = await fetch(`https://swapi.dev/api/films/${id}/`);
    const movie = await movieResponse.json();

    const characterUrl = movie.characters[0].split('//')[1];
    const characterResponse = await fetch(`https://${characterUrl}`);
    return characterResponse.json();
  } catch (err) {
    console.error('Произошла ошибка!', err);
  }
}

getMainActorProfileFromMovie(1).then((profile) => {console.log(profile)});
```

Такой код проще понимать:

- он плоский;
- выглядит, как синхронный;
- использует стандартный try...catch блок для обработки ошибок.

☝️ Ключевое слово `await` работает только внутри асинхронных функций. Вызов его вне функции будет синтаксической ошибкой:

```js
function getMainActorProfileFromMovie(id) {
  // код примера выше
}

await getMainActorProfileFromMovie(1)
```

Код упадёт с ошибкой `SyntaxError: await is only valid in async functions and async generators`.
