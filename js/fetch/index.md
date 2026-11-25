---
title: "`fetch()`"
description: "Модно и современно отправляем запросы на сервер."
baseline:
  - group: fetch
    features:
      - api.fetch
authors:
  - windrushfarer
contributors:
  - vitya-ne
  - solarrust
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

С помощью глобальной функции `fetch()` можно выполнять [HTTP-запросы](/tools/http-protocol/) — как получать, так и отправлять данные. Функция возвращает [промис](/js/promise/), который резолвится в объект ответа, где лежат статус, [заголовки](/tools/http-protocol/#ispolzovanie-zagolovkov) и тело ответа.

## Пример

Проверим доступ к тестовому [API](/tools/api/) с помощью GET-запроса:

```js
fetch('https://dummyjson.com/test')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error.message))

// { status: 'ok', method: 'GET' }
```

А вот такой же запрос с [синтаксисом `async/await`](/js/async-await/):

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
      todo: 'Выучить C++ за 21 день',
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
//   todo: 'Выучить C++ за 21 день',
//   completed: false,
//   userId: '42'
// }
```

## Как пишется

```js
fetch(resource, options)
```

Функция `fetch()` принимает два параметра:

- `resource` — строка, содержащая [URL](/tools/url/)-адрес, по которому нужно сделать запрос, или объект `Request`, хранящий данные запроса;
- `options` (необязательный) — объект конфигурации, в котором можно настроить метод и тело запроса, заголовки и многое другое.

Для GET-запроса к серверу по URL-адресу можно использовать краткий синтаксис: `fetch(url)`.

Функция `fetch()` возвращает промис, который:

- при успешном выполнении запроса резолвится в объект `Response`, представляющий ответ от сервера;
- отклоняется (_rejected_), если случилась сетевая ошибка (например: нет доступа к сети, блокировка [CORS](/tools/cors/)).

Промис будет отклонён с ошибкой `TypeError` и тогда, когда запрос даже не начался:

- указан некорректный URL-адрес;
- в объекте конфигурации `options` недопустимое значение, например тело у GET-запроса.

Неизвестные опции браузер просто пропускает.

## Как понять

Функция `fetch()` выполняет HTTP-запросы. Раньше для этого использовали `XMLHttpRequest`, где результат обрабатывают колбэками. А `fetch()` возвращает промис. Так логику обработки результата проще отделить от выполнения запроса и переиспользовать.

Но двух вещей из `XMLHttpRequest` у `fetch()` нет:

- опции таймаута, его задают через [`AbortSignal.timeout()`](/js/abort-controller/);
- прогресса отправки данных, поэтому файлы с прогрессом до сих пор отправляют через `XMLHttpRequest`.

Гибкость `fetch()` держится на двух объектах:

- `Request` — хранит информацию о запросе (URL-адрес, HTTP-метод, формат передаваемых данных, данные и заголовки запроса);
- `Response` — содержит данные о результате и методы обработки ответа.

Функцию `fetch()` описывает не спецификация ECMAScript. В браузере она часть Web API, а в Node.js, Deno и Bun — часть API среды выполнения.

### Формирование и отправка запроса

Указать HTTP-метод, добавить заголовки и тело запроса можно с помощью объекта `options`:

```js
// Данные для отправки на сервер
const newPost = {
  title: 'foo',
  userId: 1,
}

fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST', // Ещё бывают PUT, DELETE и другие. У GET тела нет
  // Тело запроса в JSON-формате
  body: JSON.stringify(newPost),
  headers: {
    // Добавляем нужные заголовки
    'Content-type': 'application/json; charset=UTF-8',
  }
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    // { title: 'foo', userId: 1, id: 101 }
  }
)
```

Выполним тот же запрос, но сначала явно создадим объект `Request`. Он принимает те же параметры, что и `fetch()`:

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
    // { title: 'foo', userId: 1, id: 101 }
  }
)
```

С объектом `Request` запрос можно собрать в одном месте, а отправить в другом.

Если передать в `fetch()` оба параметра, то можно изменить параметры запроса при отправке:

```js
// Создаём объект Request с данными { title: 'bar', userId: 123 }
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
    // { title: 'baz', userId: 42, id: 101 }
  }
)
```

### Получение ответа

Когда придут заголовки ответа, промис `fetch()` резолвится в объект `Response`. Тело при этом может ещё загружаться. Вот его основные поля и методы:

- `ok` — `true`, если HTTP-код ответа от 200 до 299, иначе `false`;
- `status` — содержит HTTP-код ответа, например: 200, 400, 404;
- `headers` — объект заголовков ответа `Headers`;
- `json()` — разбирает тело ответа как JSON и возвращает промис с JavaScript-значением;
- `text()` — возвращает промис с текстом ответа;
- `blob()` — возвращает промис с объектом `Blob`, например для картинки;
- `arrayBuffer()` и `bytes()` — возвращают промис с бинарными данными.

Метод `json()` тоже возвращает промис. Поэтому данные приходят в следующий [`then()`](/js/promise-then/):

```js
fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then(data => console.log(data))
  // [{...}, {...}, {...}, ...]
```

### Куки

По умолчанию у `fetch()` опция `credentials` равна `'same-origin'`: браузер отправляет [куки](/js/cookie/) только в запросах на тот же источник (_origin_), с которого загружена страница. Другой протокол, домен, поддомен или порт — это уже другой источник, и туда куки не уходят. Чтобы отправить их и туда, укажите `credentials: 'include'`:

```js
fetch('https://api.example.com/admin', {
  method: 'GET',
  // Отправляем куки и на другой домен
  credentials: 'include',
})
```

Сервер должен разрешить такой запрос. Для этого он отвечает заголовком `Access-Control-Allow-Credentials: true` и указывает в `Access-Control-Allow-Origin` конкретный источник, а не `*`. Не подставляйте туда любой пришедший `Origin`: тогда ответ с данными пользователя сможет прочитать любой сайт.

Без этих заголовков браузер не отдаст ответ коду. Но простой запрос, например GET без своих заголовков, всё равно уйдёт на сервер вместе с куками. Запрос посложнее браузер сначала согласует с сервером через предварительный запрос `OPTIONS` и без разрешения не отправит.

Если API живёт не на поддомене вашего сайта, а на совсем другом сайте, его куки для браузера сторонние. Такие куки нужно выставить с атрибутами `SameSite=None; Secure`. Но даже так браузеры ограничивают сторонние куки:

- Safari по умолчанию их не отправляет;
- Firefox хранит их отдельно для каждого сайта, поэтому куки, которые пользователь получил на `api.example.com` напрямую, в запрос с вашей страницы не попадут;
- Chrome их пока отправляет: в 2025 году Google отказался от планов их отключить. Но в режиме инкогнито Chrome их блокирует, а пользователь может отключить их в настройках.

Во всех трёх браузерах работают куки с атрибутом `Partitioned`: браузер хранит их отдельно для вашего сайта и отправляет в запросах с его страниц.

Надёжнее всего держать API на поддомене своего сайта или передавать токен в заголовке `Authorization`.

### Обработка ошибок

Любой ответ на запрос через `fetch()`, например HTTP-код 400, 404 или 500, переводит промис в состояние _fulfilled_. В состояние _rejected_ промис перейдёт, только если браузер не получил ответ или не отдал его коду:

- по причинам из раздела «Как пишется»;
- при отмене (`AbortError`);
- по таймауту (`TimeoutError`).

```js
// Запрос вернёт ошибку «404 Not Found»
fetch('https://jsonplaceholder.typicode.com/there-is-no-such-route')
  .catch(() => {
    console.log('Error occurred!')
  })
// Никогда не выполнится
```

Чтобы обработать ошибку сервера, проверьте поле `ok` в объекте ответа `Response`. Если сервер ответил ошибкой, там будет `false`.

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
  .catch((error) => {
    console.log(error)
  }
)
// Error: Error occurred!
```

Сам `fetch()` не бросает исключений: любая его ошибка переводит промис в состояние _rejected_, и её ловит метод [`catch()`](/js/promise-catch/). Но синхронная ошибка может возникнуть при подготовке данных запроса, ещё до вызова `fetch()`. Например, `JSON.stringify()` не умеет переводить в строку объект с циклической ссылкой:

```js
try {
  // Объект с циклической ссылкой
  const invalidBody = { key: 'value' }
  invalidBody.self = invalidBody

  fetch('https://dummyjson.com/posts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Пытаемся преобразовать объект в JSON
    // Здесь возникнет синхронная ошибка
    body: JSON.stringify(invalidBody)
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log('Асинхронная ошибка:', error))
} catch (error) {
  // Ловим синхронную ошибку
  console.log('Синхронная ошибка:', error.message)
}
// Синхронная ошибка: Converting circular structure to JSON
// (текст ошибки зависит от браузера)
```

Если используете `async/await`, напишите `await fetch(…)` внутри [`try`](/js/try-catch/), и тогда `catch` поймает и те и другие. Туда же поставьте `await response.json()`: если тело не удастся разобрать как JSON, этот промис отклонится с ошибкой `SyntaxError`.
