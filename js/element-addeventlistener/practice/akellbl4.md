🛠 Обработка передачи третьего параметра для устаревших браузеров.

Проверим, поддерживает ли браузер объект `options`. Добавим обработчик события на `window`, передав ему объект `options`. В нём поле `passive` будет менять ранее установленную переменную на `true` при попытке доступа к объекту. Если браузер проверит содержимое `options.passive`, он поддерживает данные настройки.

```js
let hasPassiveSupport = false

try {
  const options = Object.defineProperty({}, 'passive', {
    get() {
      hasPassiveSupport = true
    },
  })

  window.addEventListener('test', null, options)
} catch (err) {}
```

Далее можем просто проверить, поддерживается ли `passive`. Если поддерживается, то передаём `options`, иначе — `false`.

```js
window.addEventListener(
  'resize',
  function () {
    // Обработка события
  },
  hasPassiveSupport ? { passive: true } : false
)
```

В случае, если используете `passive` и `capture` одновременно, такую проверку можно не делать. Старый браузер воспримет переданный объект как `true` и включит `capture`, а новый обработает оба параметра внутри объекта.

```js
window.addEventListener('resize', function () {
  // Обработка события
}, { passive: true, capture: true })
```
