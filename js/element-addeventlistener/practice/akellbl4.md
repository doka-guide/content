🛠 Обработка передачи третьего параметра для устаревших браузеров:

Проверим, поддерживает ли браузер объект `options`. Добавим обработчик события на `window` передав ему объект `options`, в котором поле `passive` при попытке доступа к нему будет менять ранее установленную переменную на `true`. Это значит если браузер будет проверять содержимое `options.passive`, значит он поддерживает данные настройки.

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

Далее мы можем просто проверить если `passive` поддерживается то передавать `options` иначе передавать `false`

```js
window.addEventListener(
  'resize',
  function () {
    // обработка события
  },
  hasPassiveSupport ? { passive: true } : false
)
```

Также, в случае, если вы хотите использовать `passive` и `capture` одновременно, то такую проверку можно не делать.
В этом случае старый браузер воспримет переданный объект как `true` и включит `capture`, а новый обработает оба параметра внутри объекта.

```js
window.addEventListener('resize', function () {
  // обработка события
}, { passive: true, capture: true })
```
