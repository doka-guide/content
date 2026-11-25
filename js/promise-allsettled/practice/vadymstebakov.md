🛠 Метод удобен для независимых запросов к API: ошибка в одном не мешает получить ответы остальных. Если результат нужен, только когда успешны все запросы, используйте [`Promise.all()`](/js/promise-all/#na-praktike).

```js
const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  // Несуществующий домен: запрос упадёт с сетевой ошибкой
  'https://jsonplaceholder.invalid/todos/1',
]
const arrayFetchData = urls.map(url => {
  return fetch(url).then(response => response.json())
})

Promise.allSettled(arrayFetchData)
  .then((results) => {
    results.forEach(item => {
      console.log(item)
    })
  })
```

В консоли получим:

```js
// { status: 'fulfilled', value: { userId: 1, id: 1, ... } }
// { status: 'rejected', reason: TypeError: Failed to fetch }
// Текст ошибки зависит от браузера
```

Промис [`fetch()`](/js/fetch/) отклоняется, когда запрос не удалось выполнить: например, при сетевой ошибке или некорректном URL.

Ответ с HTTP-кодом 404 или 500 для `fetch()` успешный. Дальше всё зависит от тела ответа: `response.json()` вернёт данные или отклонится с `SyntaxError`, если в теле не JSON. Чтобы считать такой ответ ошибкой, проверьте `response.ok` и выбросите ошибку:

```js
const arrayFetchData = urls.map(async (url) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }
  return response.json()
})
```
