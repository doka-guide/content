🛠 Базовый пример использования `AbortController` для отписки от обработчика событий.

Обычно для отписки используют `removeEventListener()`. Но если при подписке использовали анонимную функцию, отписаться через `removeEventListener()` не получится: вторым аргументом нужно передать ссылку на функцию-обработчик.

```js
const abortController = new AbortController()
const element = document.querySelector('#element1')

element.addEventListener('click', () => {
  console.log('Подписка активна')
}, {
  signal: abortController.signal
})

// Вызываем, когда захотим отписаться:
abortController.abort()
```

🛠 Отписка сразу от нескольких обработчиков.

`AbortController` удобнее, чем `removeEventListener()`, если нужно отписаться сразу от нескольких обработчиков:

```js
const abortController = new AbortController()
const element1 = document.querySelector('#element1')
const element2 = document.querySelector('#element2')

element1.addEventListener('click', () => {
  // ...
}, {signal: abortController.signal})
element2.addEventListener('click', () => {
  // ...
}, {signal: abortController.signal})

// Отписываемся одним вызовом сразу от двух обработчиков
abortController.abort()
```

🛠 Подписываемся на событие `abort` у `AbortSignal`.

Если после отписки нужно что-то сделать, слушайте событие `abort`:

```js
const abortController = new AbortController()
const signal = abortController.signal

signal.addEventListener('abort', () => {
  console.log('Операция отменена')
})
```
