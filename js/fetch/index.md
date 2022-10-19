---
title: "`fetch()`"
description: "Модно и современно отправляем запросы на сервер."
authors:
  - windrushfarer
keywords:
  - фетч
  - запрос
related:
  - tools/http-protocol
  - recipes/progress
  - recipes/dragndrop-upload
tags:
  - doka
---

## Кратко

С помощью функции `fetch()` можно отправлять сетевые запросы на сервер — как получать, так и отправлять данные. Метод возвращает [промис](/js/promise/) с объектом ответа, где находится дополнительная информация (статус ответа, заголовки) и ответ на запрос.

## Как понять

Браузер предоставляет глобальный API для работы с запросами и ответами [HTTP](/tools/http-protocol/). Раньше для подобной работы использовался XMLHttpRequest, однако `fetch()` более гибкая и мощная альтернатива, он понятнее и проще в использовании из-за того, что использует `Promise`.

## Как пишется

Функция `fetch()` принимает два параметра:

- `url` — адрес, по которому нужно сделать запрос;
- `options` (необязательный) — объект конфигурации, в котором можно настроить метод запроса, тело запроса, заголовки и многое другое.

По умолчанию вызов `fetch()` делает GET-запрос по указанному адресу. Базовый вызов для получения данных можно записать таким образом:

```js
fetch('http://jsonplaceholder.typicode.com/posts')
```

Результатом вызова `fetch()` будет `Promise`, в котором будет содержаться специальный объект ответа `Response`. У этого объекта есть два важных для нас поля:

- `ok` — принимает состояние `true` или `false` и сообщает об успешности запроса;
- `json` — метод, вызов которого, возвращает результат запроса в виде json.

```js
fetch('http://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((data) => data)
  // Получим ответ [{...}, {...}, {...}, ...]
```

С помощью второго аргумента `options` можно передать настройки запроса. Например, можно изменить метод и добавить тело запроса, если мы хотим не получать, а отправлять данные. Так же в запрос можно добавить заголовки в виде объекта или специального класса `Headers`.

```js
const newPost = {
  title: 'foo',
  body: 'bar',
  userId: 1,
}

fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST', // Здесь так же могут быть GET, PUT, DELETE
  body: JSON.stringify(newPost), // Тело запроса в JSON-формате
  headers: {
    // Добавляем необходимые заголовки
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    // {title: "foo", body: "bar", userId: 1, id: 101}
  })
```

### Cookies

По умолчанию `fetch()` запросы не включают в себя [cookies](/js/cookie/) и потому авторизованные запросы на сервере могут не пройти. Для этого необходимо добавить в настройку поле `credentials`:

```js
fetch('https://somesite.com/admin', {
  method: 'GET',
  // или 'same-origin' если можно делать такие запросы только в пределах этого домена
  credentials: 'include',
})
```

### Обработка ошибок

Любой ответ на запрос через `fetch()` (например HTTP-код 400, 404 или 500) переводит `Promise` в состояние _fulfilled_. Промис перейдёт в состояние _rejected_ только если запрос не случился из-за сбоя сети или что-то помешало выполнению `fetch()`.

```js
// Запрос вернет ошибку 404 Not Found
fetch('https://jsonplaceholder.typicode.com/there-is-no-such-route').catch(
  () => {
    console.log('Error occurred!')
  }
) // Никогда не выполнится
```

Чтобы обработать ошибку запроса, необходимо обращать внимание на поле `ok` в объекте ответа `Response`. В случае ошибки запроса оно будет равно `false`.

```js
fetch('https://jsonplaceholder.typicode.com/there-is-no-such-route')
  .then((response) => {
    // Проверяем успешность запроса и выкидываем ошибку
    if (!response.ok) {
      throw new Error('Error occurred!')
    }

    return response.json()
  })
  // Теперь попадём сюда, т.к выбросили ошибку
  .catch((err) => {
    console.log(err)
  }) // Error: Error occurred!
```
