---
title: "`fetch()`"
description: "Модно и современно отправляем запросы на сервер."
authors:
  - windrushfarer
contributors:
  - vitya-ne
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

С помощью глобальной функции `fetch()` можно выполнять [HTTP-запросы]((/tools/http-protocol/)) — как получать, так и отправлять данные. Функция возвращает [промис](/js/promise/), который резолвится в объект ответа, где находится дополнительная информация (статус ответа, [заголовки](/tools/http-protocol/#ispolzovanie-zagolovkov)) и ответ на запрос.

## Пример

Рассмотрим несколько примеров использования `fetch()`.

Проверим доступ к тестовому [API](/tools/api/) с помощью GET-запроса:

```js
fetch('https://dummyjson.com/test')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error.message))

// { status: 'ok', method: 'GET' }
```

А вот такой же запрос с [синтаксисом async/await](/js/async-await/):

```js
try {
  const response = await fetch('https://dummyjson.com/test')
  const data = await response.json()
  console.log(data)
} catch (error) {
  console.error(error.message)
}
// { status: 'ok', method: 'GET' }
```

Отправим данные с помощью POST-запроса:

```js
try {
  const response = await fetch('https://dummyjson.com/todos/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      todo: 'Выучить С++ за 21 день',
      userId: '42',
      completed: false
    })
  })
  const data = await response.json()
  console.log(data)
} catch (error) {
  console.error(error.message)
}
// {
//   id: 255,
//   todo: 'Выучить С++ за 21 день',
//   completed: false,
//   userId: '42'
// }
```

## Как пишется

```js
fetch(resource, options)
```

Функция `fetch()` принимает два параметра:

- `resource` — строка, содержащая [URL](/tools/url/)-адрес, по которому нужно сделать запрос, или специальный Request-объект, хранящий данные запроса;
- `options` (необязательный) — объект конфигурации, в котором можно настроить метод и тело запроса, заголовки и многое другое.

Для выполнения GET-запроса к серверу по url-адресу можно использовать краткий синтаксис: `fetch(url)`.

Функция `fetch()` возвращает `Promise`, который:

- при успешном выполнении запроса резолвится в объект `Response`, представляющий ответ от сервера;
- будет отклонён (rejected) при возникновении сетевых ошибок (например: нет доступа к сети, CORS‑блокировка).

При вызове `fetch()` будет брошено исключение `TypeError` если:

- указан некорректный URL-адрес;
- объект конфигурации _options_ содержит недопустимые параметры;

## Как понять

Функция `fetch()` предназначена для выполнения HTTP-запросов. Раньше для этой цели использовался `XMLHttpRequest`, однако `fetch()` более гибкое и универсальное решение.

В отличие от XMLHttpRequest API, где результат запроса обрабатывается с помощью колбэков, fetch() использует `Promise`. Это позволяет упростить и переиспользовать код, отделив логику обработки результата от выполнения запроса.

Гибкость интерфейса `fetch()` основана на использовании специальных объектов:

- Request, хранит информацию о запросе (URL-адрес, HTTP-метод, формат передаваемых данных, данные и заголовки запроса );
- Response, содержит данные о результате и методы обработки ответа.

Глобальная функция `fetch()` не описывается спецификацией ECMAScript и доступна в браузере как часть Web API, а вне браузера (Node.js, Deno, Bun) как часть runtime API.

### Формирование и отправка запроса

Указать HTTP-метод, добавить заголовки и тело запроса, можно c помощью объекта options:

```js
// Данные для отправки на сервер
const newPost = {
  title: 'foo',
  userId: 1,
}

fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST', // Здесь так же могут быть GET, PUT, DELETE
  // Тело запроса в JSON-формате
  body: JSON.stringify(newPost),
  headers: {
    // Добавляем необходимые заголовки
    'Content-type': 'application/json; charset=UTF-8',
  }
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    // {title: "foo", userId: 1, id: 101}
  }
)
```

Выполним тот же запрос, но с явным созданием объекта `Request`, принимающего те же параметры что и `fetch()`:

```js
const newPost = {
  title: 'foo',
  userId: 1,
}

// Создаём объект Request
const request = new Request(
  'https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify(newPost),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
})

// Выполняем запрос
fetch(request)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    // {title: "foo", userId: 1, id: 101}
  }
)
```

Объект Request помогает разделять логику формирования и выполнения запросов, позволяя динамически формировать и изменять параметры запроса.

Если передать в `fetch()` оба параметра, то можно изменить параметры запроса при отправке:

```js
// Создаём объект Request c данными { title: 'bar', userId: 123 }
const request = new Request(
  'https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: 'bar',
    userId: 123,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
})

fetch(request, {
  // Передаём в options данные { title: 'baz', userId: 42 }
  body: JSON.stringify({
    title: 'baz',
    userId: 42,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    // {title: "baz", userId: 42, id: 101}
  }
)
```

### Получение ответа

Результатом вызова `fetch()` будет промис. При завершении запроса, промис резолвится в объект ответа `Response`, который содержит информацию об ответе сервера. У этого объекта есть множество полезных полей и методов. Вот основные:

- `ok` — принимает состояние `true` или `false` и сообщает об успешности запроса;
- `status` — содержит HTTP-код ответа, например: 200, 400, 404;
- `headers` — объект заголовков ответа `Headers`;
- `json()` — возвращает результат запроса в виде JSON;
- `text()` — возвращает результат запроса в виде текста;
- `blob()` — возвращает результат запроса в виде объекта файла;
- `arrayBuffer()` — возвращает результат запроса в виде бинарных данных.

В следующем примере используем `.then()` — обработчик результата, полученного от асинхронной операции. Обработчик дождётся ответа от сервера, принимает ответ, и, в данном случае, неявно вернёт ответ, обработанный методом `.json()`.

В примере функция `then` вернёт другой промис (их можно объединять). Когда отрезолвится промис `(response.json())`, который вернула функция `then`, будет вызван следующий колбэк в цепочке.

```js
fetch('http://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json()
  // Получим ответ в виде массива из объектов:
  // [{...}, {...}, {...}, ...]
)
```

### Cookies

По умолчанию `fetch()` запросы не включают в себя [cookies](/js/cookie/), и поэтому авторизованные запросы на сервере могут не пройти. Для этого необходимо добавить в настройку поле `credentials`:

```js
fetch('https://somesite.com/admin', {
  method: 'GET',
  // Или same-origin, если можно делать такие запросы
  // только в пределах этого домена
  credentials: 'include',
})
```

### Обработка ошибок

Любой ответ на запрос через `fetch()`, например, HTTP-код 400, 404 или 500, переводит `Promise` в состояние _fulfilled_. Промис перейдёт в состояние _rejected_ только если запрос не случился из-за сбоя сети или что-то помешало выполнению `fetch()`.

```js
// Запрос вернёт ошибку «404 Not Found»
fetch('https://jsonplaceholder.typicode.com/there-is-no-such-route').catch(
  () => {
    console.log('Error occurred!')
  }
)
// Никогда не выполнится
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
  // Теперь попадём сюда, так как выбросили ошибку
  .catch((err) => {
    console.log(err)
  }
)
// Error: Error occurred!
```
