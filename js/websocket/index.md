---
title: "WebSocket"
description: "Устанавливает постоянное соединение с сервером для обмена данными в реальном времени."
baseline:
  - group: websockets
    features:
      - api.WebSocket
      - api.WebSocket.WebSocket
      - api.WebSocket.send
      - api.WebSocket.close
      - api.WebSocket.readyState
      - api.WebSocket.url
      - api.WebSocket.protocol
      - api.WebSocket.extensions
      - api.WebSocket.bufferedAmount
      - api.WebSocket.binaryType
      - api.WebSocket.open_event
      - api.WebSocket.message_event
      - api.WebSocket.error_event
      - api.WebSocket.close_event
authors:
  - teplostanski
tags:
  - doka
---

## Кратко

`WebSocket` — браузерный API для постоянного соединения с сервером. Клиент и сервер обмениваются данными в реальном времени, клиенту не нужно постоянно отправлять HTTP-запросы.

<iframe title="Жизненный цикл WebSocket-соединения" src="demos/example/" height="950"></iframe>

<aside>

☝️ WebSocket работает в [Web Workers](/js/web-workers/), но в `Service Worker` его не стоит использовать для постоянных соединений: браузер может завершить worker в любой момент (например, при простое), что разорвёт соединение.

</aside>

## Как пишется

```js
const socket = new WebSocket(url, [protocols]?)
```

- `url` — строка с адресом сервера. Поддерживаются схемы `ws://`, `wss://`, `http://`, `https://` и query-параметры;
- `protocols` — строка или массив строк с названиями предпочитаемых [подпротоколов WebSocket](https://www.iana.org/assignments/websocket/websocket.xhtml), необязательный параметр. Какой подпротокол выбрал сервер, можно узнать из свойства [`protocol`](#protocol).

`new WebSocket()` возвращает экземпляр и сразу начинает подключение. У `WebSocket` нет статических методов и свойств, кроме [статических констант](#staticheskie-konstanty).

### Ошибки

Конструктор выбросит `SyntaxError`, когда:

- `url` невалиден, схема не `ws`, `wss`, `http` или `https`, или содержит якорь (`#`);
- в `protocols` пустая строка, недопустимый символ или дубликат имени.

Если подключиться не удалось, например при 404, отказе в upgrade или сбое TLS, конструктор ошибку не выбросит. Сначала сработает событие `error`, затем `close`, в котором флаг `event.wasClean` со значением `false` будет указывать на то, что соединение оборвалось.

### Протоколы ws и wss

WebSocket использует два протокола:

- `ws://` — незащищённое соединение (как `http://`);
- `wss://` — защищённое соединение с шифрованием (как `https://`).

Браузер преобразует `http://` в `ws://`, а `https://` в `wss://`:

```js
const socket = new WebSocket("https://example.com/ws")

console.log(socket.url)
// wss://example.com/ws
```

Итоговый URL хранится в свойстве [`url`](#url).

<aside>

☝️ В продакшене всегда используйте `wss://`. Незащищённое соединение `ws://` подходит только для локальной разработки.

</aside>

## Методы

У экземпляра `WebSocket` всего два публичных метода: [`send()`](#send) и [`close()`](#close). Оба вызываются синхронно. Браузер сразу выполняет действие и возвращает управление, но отправка данных и закрытие соединения на уровне сети происходят асинхронно.

### `send()`

Отправляет данные на сервер. Принимает один аргумент — данные, которые нужно отправить:

```js
socket.send('Привет, сервер!')
```

Можно отправлять разные типы данных:

- [строки (`String`)](/js/string/);
- бинарные данные — [`ArrayBuffer`](/js/array-buffer/), [`TypedArray`](/js/typed-array/), [`DataView`](/js/data-view/);
- `Blob`.

```js
const socket = new WebSocket('wss://example.com/ws')

const buffer = new ArrayBuffer(4)
const view = new Uint8Array(buffer)
view.set([1, 2, 3, 4])

const blob = new Blob([buffer], { type: 'application/octet-stream' })

if (socket.readyState === WebSocket.OPEN) {
  // Отправляем строку
  socket.send('Сообщение')

  // Отправляем JSON
  socket.send(JSON.stringify({ type: 'message', text: 'Привет' }))

  // Отправляем бинарные данные
  socket.send(buffer)

  // Отправляем Blob
  socket.send(blob)
}
```

Если [`readyState`](#readystate) равен `WebSocket.CONNECTING`, вызов [`send()`](#send) выбросит `InvalidStateError`, потому что соединение ещё устанавливается. В состояниях `WebSocket.CLOSING` и `WebSocket.CLOSED` при вызове [`send()`](#send) данные отбрасываются без ошибки.

<aside>

☝️ Перед отправкой дождитесь события `open` или проверьте, что [`readyState`](#readystate) равен `WebSocket.OPEN`.

</aside>

Ещё у метода есть особенность: он складывает данные во внутреннюю очередь. Если отправляете много сообщений подряд, они уйдут не сразу, но порядок сохранится. Проверить размер очереди можно через свойство [`bufferedAmount`](#bufferedamount).

### `close()`

Закрывает соединение с сервером. Принимает два необязательных аргумента:

```js
socket.close(code?, reason?)
```

- `code` — числовой код закрытия. Допустимы `1000` и значения от `3000` до `4999`;
- `reason` — строка с причиной закрытия, не длиннее 123 байт в UTF-8.

Метод выбросит:

- `InvalidAccessError`, если `code` недопустим;
- `SyntaxError`, если `reason` длиннее 123 байт в UTF-8.

```js
// Простое закрытие
socket.close()

// Закрытие с кодом и причиной
socket.close(1000, 'Работа завершена')

// Пользовательский код
socket.close(4001, 'Неверный формат сообщения')
```

Как и [`send()`](#send), метод [`close()`](#close) вызывается синхронно. Сразу после вызова [`readyState`](#readystate) становится `WebSocket.CLOSING`. Браузер начинает закрывающее рукопожатие с сервером, но соединение ещё не закрыто полностью.

Когда обмен завершится, состояние сменится на `WebSocket.CLOSED` и сработает событие [`close`](#slushateli-sobytiy).

Если `readyState` уже `WebSocket.CLOSING` или `WebSocket.CLOSED`, повторный вызов [`close()`](#close) ничего не сделает.

### Память после закрытия

[`close()`](#close) закрывает соединение, но **не удаляет** объект `WebSocket` из памяти. Пока на объект есть ссылка, он живёт вместе со всеми [свойствами](#svoystva) и обработчиками. Обработчики нередко замыкают DOM-элементы и другие объекты.

Если `socket` объявлен внутри функции и никуда не «утекает» через замыкание, после выхода из функции сборщик мусора удалит объект сам. Если же ссылка хранится долго, например в глобальной переменной, в состоянии приложения или как поле объекта, после [`close()`](#close) её лучше обнулить:

```js
let socket = new WebSocket('wss://example.com/ws')
// ...
socket.close()
socket = null
```

## Слушатели событий

`WebSocket` наследует [`EventTarget`](/js/events/), поэтому на события можно подписаться двумя способами:

- через `on`-свойства — `onopen`, `onmessage`, `onerror`, `onclose`;
- через [`addEventListener()`](/js/element-addeventlistener/).

У экземпляра есть четыре события:

- `open` — соединение установлено, [`readyState`](#readystate) равен `WebSocket.OPEN`;
- `message` — пришли данные от сервера. Текст приходит строкой или бинарными данными в формате, заданном [`binaryType`](#binarytype);
- `error` — ошибка соединения. Событие не содержит деталей, код и причину смотрите в [`close`](#kody-v-sobytii-close);
- `close` — соединение закрыто. `event.code` и `event.reason` содержат код и причину. Флаг `event.wasClean` равен `true`, если закрытие штатное.

### `on`-свойства

Чтобы подписаться на событие, запишите функцию в соответствующее свойство.

```js
const socket = new WebSocket('wss://example.com/ws')

socket.onopen = () => {
  console.log('Соединение открыто')
}

socket.onmessage = (event) => {
  console.log('Сообщение:', event.data)
}

socket.onerror = () => {
  console.log('Ошибка соединения')
}

socket.onclose = (event) => {
  const { code, reason, wasClean } = event
  console.log(`Закрыто: ${code}, ${reason}, wasClean: ${wasClean}`)
}
```

На каждое событие одна функция. Новое присваивание заменяет предыдущий обработчик. Чтобы снять обработчик, присвойте свойству `null`, например `socket.onmessage = null`.

<aside>

`on`-свойства не отдельный механизм, а **обёртки** над тем же API событий. Когда вы пишете `socket.onmessage = handler`, браузер внутри регистрирует обработчик через механизм `EventTarget`. Поэтому `onmessage` и `addEventListener('message', ...)` слушают одно и то же событие.

</aside>

### Коды в событии `close`

В `event.code` приходит код закрытия. Бывают **стандартные** (`1000`–`1015`) и **пользовательские** (`3000`–`4999`, те же, что можно передать в [`close()`](#close)).

Из стандартных в [`close()`](#close) можно передать только `1000`. Остальные коды из диапазона `1000`–`1015` попадают в `event.code`, когда их присылает сервер, а `1005`, `1006` и `1015` браузер выставляет сам.

- `1000` — нормальное закрытие;
- `1001` — сторона закрывает соединение, потому что уходит (закрыли вкладку, ушли со страницы, сервер упал);
- `1002` — ошибка протокола;
- `1003` — получены неподдерживаемые данные;
- `1004` — зарезервирован, не используется;
- `1005` — код не был указан (например, `close()` без аргументов);
- `1006` — соединение оборвалось до завершения закрытия;
- `1007` — неверные данные во фрейме;
- `1008` — нарушение политики;
- `1009` — сообщение слишком большое;
- `1010` — клиент ожидал [расширение](#extensions), которое сервер не поддерживает;
- `1011` — внутренняя ошибка сервера;
- `1012` — сервер перезапускается;
- `1013` — временная перегрузка, попробуйте подключиться позже;
- `1014` — сервер выступал прокси и получил неверный ответ от upstream-сервера (аналог HTTP 502);
- `1015` — не удалось установить TLS-соединение.

Полный список кодов закрытия смотрите в [реестре IANA](https://www.iana.org/assignments/websocket/websocket.xhtml).

## Свойства

У экземпляра `WebSocket` шесть свойств. Пять из них только для чтения и описывают состояние соединения и параметры, согласованные с сервером при [рукопожатии](#zagolovki-rukopozhatiya). [`binaryType`](#binarytype) можно менять: оно задаёт формат входящих бинарных сообщений.

### `readyState`

Текущее состояние соединения. Возвращает число от `0` до `3`. Для сравнения используйте [статические константы](#staticheskie-konstanty).

### `url`

Строка с итоговым URL соединения после нормализации браузером. Может отличаться от аргумента конструктора. Подробнее в разделе [«Протоколы ws и wss»](#protokoly-ws-i-wss).

### `protocol`

Подпротокол, который выбрал сервер при рукопожатии. Пустая строка, если подпротокол не согласовывали или сервер ничего не выбрал.

Значение доступно после того, как соединение будет открыто:

```js
const socket = new WebSocket('wss://example.com/ws', ['soap', 'wamp'])

socket.onopen = () => {
  console.log(socket.protocol) // 'soap' или 'wamp'
}
```

Список допустимых имён подпротоколов смотрите в [реестре IANA](https://www.iana.org/assignments/websocket/websocket.xhtml).

### `extensions`

Строка с расширениями протокола, которые выбрал сервер (например, сжатие `permessage-deflate`). Если расширений нет, вернётся пустая строка.

Список зарегистрированных расширений смотрите в [реестре IANA](https://www.iana.org/assignments/websocket/websocket.xhtml).

Значение доступно после того, как соединение будет открыто:

```js
socket.onopen = () => {
  console.log(socket.extensions) // например, 'permessage-deflate'
}
```

### `binaryType`

Определяет, в каком виде бинарные сообщения попадут в `event.data` у события [`message`](#slushateli-sobytiy). На текстовые сообщения не влияет: они всегда приходят как строки.

Допустимые значения:

- `'blob'` (по умолчанию) — бинарные данные приходят объектом `Blob`;
- `'arraybuffer'` — бинарные данные приходят `ArrayBuffer`.

Свойство можно менять в любой момент, в том числе после открытия соединения. Новое значение применится к следующим входящим сообщениям.

```js
const socket = new WebSocket('wss://example.com/ws')

socket.binaryType = 'arraybuffer'

socket.onmessage = (event) => {
  if (event.data instanceof ArrayBuffer) {
    const view = new Uint8Array(event.data)
    console.log(view)
  } else {
    console.log(event.data) // строка
  }
}
```

`'arraybuffer'` удобен, когда нужно сразу работать с байтами через `TypedArray`. `'blob'` подходит, если данные удобнее обрабатывать как файл, например создать object URL или прочитать через `FileReader`.

### `bufferedAmount`

Количество байт данных, поставленных в очередь через [`send()`](#send), но ещё не отправленных по сети.

Если отправлять сообщения быстрее, чем браузер успевает передать их по сети, очередь может переполниться. В этом случае браузер закроет соединение, однако метод [`send()`](#send) не вызовет ошибку.

Лимит очереди браузер не сообщает. Имеет смысл следить за `bufferedAmount`, чтобы очередь не переполнилась.

```js
socket.send('Первое сообщение')
socket.send('Второе сообщение')

console.log(socket.bufferedAmount) // размер очереди в байтах
```

После закрытия соединения `bufferedAmount` не обнуляется.

В состояниях `WebSocket.CLOSING` и `WebSocket.CLOSED` при вызове [`send()`](#send) данные отбрасываются, метод не выбросит исключение, но `bufferedAmount` при каждом таком вызове всё равно увеличивается.

## Статические константы

Для сравнения с [`readyState`](#readystate):

- `WebSocket.CONNECTING` (`0`) — идёт подключение;
- `WebSocket.OPEN` (`1`) — соединение открыто, можно вызывать метод [`send()`](#send);
- `WebSocket.CLOSING` (`2`) — идёт закрытие после вызова метода [`close()`](#close);
- `WebSocket.CLOSED` (`3`) — соединение закрыто.

## Заголовки рукопожатия

Подключение WebSocket начинается как обычный [HTTP-запрос](/tools/http-protocol/). Браузер просит сервер «переключить протокол». Если всё прошло успешно, дальше общение идёт уже по WebSocket, а не по HTTP.

Все заголовки браузер формирует сам при вызове `new WebSocket()`. Из JavaScript их **нельзя** задать или изменить, в отличие от [`fetch()`](/js/fetch/).

### Запрос клиента

Пример запроса на установку соединения:

```http
GET /ws HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
Sec-WebSocket-Protocol: soap, wamp
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
```

Основные заголовки:

- `Upgrade: websocket` и `Connection: Upgrade` — просьба перейти с HTTP на WebSocket;
- `Sec-WebSocket-Key` — случайное значение для проверки, что сервер действительно поддерживает WebSocket;
- `Sec-WebSocket-Version: 13` — версия протокола, в браузерах всегда `13`;
- `Sec-WebSocket-Protocol` — список подпротоколов из второго аргумента конструктора;
- `Sec-WebSocket-Extensions` — расширения, которые предлагает браузер (например, сжатие).

Браузер также отправляет служебные заголовки вроде `Origin` и cookie для домена, как при обычном HTTP-запросе.

### Ответ сервера

Если сервер согласен, он отвечает кодом `101 Switching Protocols`:

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
Sec-WebSocket-Protocol: soap
Sec-WebSocket-Extensions: permessage-deflate
```

- `Sec-WebSocket-Accept` — ответ на `Sec-WebSocket-Key`, браузер проверяет его автоматически. Если значение неверное, соединение не откроется;
- `Sec-WebSocket-Protocol` — один подпротокол из списка клиента, который выбрал сервер;
- `Sec-WebSocket-Extensions` — расширения, которые сервер принял.
