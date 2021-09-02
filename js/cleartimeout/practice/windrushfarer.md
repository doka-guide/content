🛠 Связку `setTimeout` и `clearTimeout` часто можно увидеть во время реализации всплывающей подсказки. Ниже я приведу базовый пример такой функциональности. Этот код можно использовать как стартовый шаблон для ваших наработок.

Создадим HTML-разметку, в которой будет кнопка и скрытая подсказка к этой кнопке.

```html
<button>Наведи на меня</button>
<div hidden>Подсказка к кнопке</div>
```

Подсказка будет появляться сразу при наведении мыши на кнопку. Но если убрать курсор с кнопки, то подсказка исчезнет только через секунду.

```js
const trigger = document.querySelector('button')
const hint = document.querySelector('div')

let hideTimeoutId = null

trigger.addEventListener('mouseenter', () => {
  clearTimeout(hideTimeoutId)
  hint.hidden = false
})

trigger.addEventListener('mouseleave', () => {
  hideTimeoutId = setTimeout(() => {
    hint.hidden = true
  }, 1000)
})
```
