---
title: "`Promise.withResolvers()`"
description: "Возвращает новый промис и колбэк-функции управления его состоянием."
baseline:
  - group: promise-withresolvers
    features:
      - javascript.builtins.Promise.withResolvers
authors:
  - vitya-ne
related:
  - js/promise-then
  - js/promise-catch
  - js/promise-try
tags:
  - doka
---

<aside>

💡 Эта документация связана с понятием [`Promise`](/js/promise/).

</aside>

## Кратко

`Promise.withResolvers()` — это статических метод объекта Promise. Метод `Promise.withResolvers()` возвращает объект, содержащий новый промис и колбэк-функции управления его состоянием: `resolve()` и `reject()`. Доступ к колбэк-функциям упрощает разделение логики создания и управления состоянием промиса.

## Пример

Допустим, мы используем WebSocket. Получение ответа от сервера реализовано как асинхронная функция. Для изменения состояния промиса применяем колбэк-функции: `resolve()` — при успешном получении сообщения и `reject()` — в случае ошибки.

```js

function waitForWebSocketMessage(ws, expectedType) {
  // Создаём новый промис и получаем колбэк-функции
  const { promise, resolve, reject } = Promise.withResolvers()

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)
    if (data.type === expectedType) {
      // Успешный результат
      resolve(data)
    }
  };

  ws.onerror = (error) => {
    // Ошибка
    reject(error)
  }
  return promise
}

const socket = new WebSocket('wss://example.com')

waitForWebSocketMessage(socket, 'auth_success')
  .then(data => console.log('Получен ответ:', data))
  .catch(error => console.error('Ошибка:', error))
```

## Как пишется

```js
const { promise, resolve, reject } = Promise.withResolvers()
```

`Promise.withResolvers()` не имеет аргументов.

`Promise.withResolvers()` возвращает объект, содержащий:

- promise — новый промис;
- resolve
- reject


## Как понять

Представим, что нам необходимо обрабатывать события как промисы. Создадим функцию `addEventPromise`, которая добавляет слушателя для однократной обработки события и возвращает промис. Когда событие произойдёт, промис перейдёт в состояние выполнено (fulfilled), с результатом в виде объекта события `event`.

```js
function addEventPromise(element, eventName) {
  let resolverFn
  // Создаём промис и сохраняем ссылку на функцию resolve
  const promise = new Promise((resolve) => {
    resolverFn = resolve
  });

  element.addEventListener(eventName, (event) => {
    // Переводим промис в состояние fulfilled.
    // Результат выполнения — объект event
    resolverFn(event)
  }, { once: true }) // Удаляет слушатель после первого вызова

  return promise
}

// Использование
const button = document.querySelector('button');

// Обрабатываем событие как промис
addEventPromise(button, 'click').then(event => {
  console.log('Кнопка нажата!', event)
});
```

Обратите внимание как используется функция `resolve()`. Доступ к ней есть только в конструкторе промиса, а вызываться она должна в обработчике события. Поэтому приходится использовать временную переменную `resolverFn`.

`Promise.withResolvers()` позволяет упростить код функции `addEventPromise()`:

```js
function addEventPromise(element, eventName) {
  // Создаём промис и получаем функцию resolve
  const { promise, resolve } = Promise.withResolvers()

  element.addEventListener(eventName, (event) => {
    resolve(event)
  }, { once: true })

  return promise
}
```