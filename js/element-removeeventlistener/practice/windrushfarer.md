🛠 Автоматическое очищение обработчика после первого срабатывания

Если нужно чтобы событие только один раз, то можно не использовать `Element.removeEventListener`, а использовать опцию `once` в `Element.addEventListener`.

```js
window.addEventListener('click', (event) => {
  console.log('Клик!')
}, { once: true }) // установим опцию once: true
```

После первого клика событие сработает и обработчик автоматически очистится. В этом случае можно даже использовать анонимную функцию, так как нам не нужно очищать обработчик вручную.

🛠 Можно написать очищение обработчика в самом обработчике событий

Когда в браузерах не было возможности использовать опцию `{ once: true }` при установке обработчика события, такое же поведение можно было сделать самостоятельно.

```js
function handleClick(event) {
  console.log('Клик!')

  // Сразу же очищаем после вызова функции, значит обработчие сработает только один раз
  window.removeEventListener('click', handleClick)
}

window.addEventListener('click', handleClick)
```

Другой пример может быть очищение обработчика по определённому условию. Например добавим обработчик события клавиатуры, но по нажатию клавиши Esc будет очищать его.

```js
function handleKepress(event) {
  console.log('Нажата клавиша:', event.key)

  if (event.key === 'Escape') {
    window.removeEventListener('keypress', handleKepress)
  }
}

window.addEventListener('keypress', handleClick)
```
