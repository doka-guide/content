🛠 Базовый пример использования `AbortController` для отписки от слушателя событий

По умолчанию в большинстве случаев для отписки стоит использовать `removeEventListener`. Но, если при подписке была использована анонимная функция, то отписаться от такого слушателя через `removeEventListener` не получится, так как мы вторым параметром должны передать ссылку на функцию-обработчик.

```js
const abortController = new AbortController()
const element = document.querySelector('#element1')

element.addEventListener('click', () => console.log('Подписка активна'), {
  signal: abortController.signal,
})

// Вызываем когда захотим отписаться:
controller.abort()
```

🛠 Отписка сразу от нескольких обработчиков.

`AbortController` может быть удобнее, чем `removeEventListener` в случае, если нам нужно отписаться сразу от нескольких обработчиков 

```js
const abortController = new AbortController()
const element1 = document.querySelector('#element1')
const element2 = document.querySelector('#element2')

element1.addEventListener('click',()=>{
  // ...      
}, {signal: abortController.signal})
element2.addEventListener('click',()=>{
  // ...
}, {signal: abortController.signal})

// отписываемся одним вызовом сразу от двух обработчиков
abortController.abort()
```

🛠 Вешаем слушатель событий на `AbortController`

В случае, если необходимо реализовать логику после отписки, то используя `AbortController` можно слушать событие `abort` на `AbortSignal`

```js
const abortController = new AbortController()
const signal = abortController.signal

signal.addEventListener('abort', () => {
  console.log('Операция была отменена');
});
```