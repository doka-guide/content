🛠 Автоматическое очищение обработчика после первого срабатывания

Если нужно чтобы событие только один раз, то можно не использовать `removeEventListener()`, а использовать опцию `once` в `addEventListener()`.

```js
window.addEventListener('click', function (event) {
  console.log('Клик!')
}, { once: true })
```

При первом клике обработчик сработает, а затем автоматически удалится. В этом случае можно даже использовать анонимную функцию, так как не нужно очищать обработчик вручную.

🛠 Можно написать очищение обработчика в самом обработчике событий

Когда в браузерах не было возможности использовать опцию `{ once: true }` при установке обработчика события, такое поведение делали самостоятельно:

```js
function handleClick(event) {
  console.log('Клик!')

  // Сразу же очищаем после вызова функции,
  // обработчик сработает только один раз
  window.removeEventListener('click', handleClick)
}

window.addEventListener('click', handleClick)
```

Другим примером может быть очищение обработчика по определённому условию. Добавим обработчик события клавиатуры, но по нажатию клавиши <kbd>Esc</kbd> будет очищать его.

```js
function handleKeypress(event) {
  console.log('Нажата клавиша:', event.key)

  if (event.key === 'Escape') {
    window.removeEventListener('keypress', handleKeypress)
  }
}

window.addEventListener('keypress', handleClick)
```
