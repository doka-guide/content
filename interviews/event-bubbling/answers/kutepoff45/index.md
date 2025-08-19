**Всплытие события (event bubbling)** — это механизм обработки событий в браузере, при котором событие, произошедшее на вложенном элементе, последовательно «поднимается» вверх по дереву [`DOM`](/js/dom/) через его предков, пока не достигнет объекта document (а в конце — window).

Проще говоря: если кликнули на кнопку внутри [`<div>`](/html/div/), сначала обработчик сработает на кнопке, затем на [`<div>`](/html/div/), затем на [`<body>`](/html/body/), и так далее (если на всех перечисленных элементах присутствует обработчик события [`click`](/js/element-click/)).

Рассмотрим пример. Наш контейнер с кнопкой:

```html
<div id="container">
  <button>Нажми на меня</button>
</div>
```

Добавим обработку клика по кнопке:

```js
const container = document.getElementById('container')

container.addEventListener('click', containerClick)

function containerClick(event) {
  console.log(`Зарегистрировано событие на контейнере ${event.currentTarget.tagName}`)
}
```

При клике по кнопке вызывается слушатель события, который был установлен на контейнере. Это происходит благодаря тому, что событие [`click`](/js/element-click/) всплывает - сначала возникает на кнопке (но там слушателя нет), потом на контейнере (там слушатель есть, он вызывает `console.log()`).

Рассмотрим ещё один пример. Обернём наш контейнер с кнопкой ещё одним элементом [`<body>`](/html/body/):

```html
<html>
  <body>
    <div id="container">
      <button>Нажми на меня</button>
    </div>
  </body>
</html>
```

Добавим обработку клика на все три элемента:

```js
const button = document.querySelector('button')
const container = document.getElementById('container')
const body = document.querySelector('body')

button.addEventListener('click', handleClick)
container.addEventListener('click', handleClick)
body.addEventListener('click', handleClick)

function handleClick(event) {
  console.log(`Зарегистрировано событие на элементе ${event.currentTarget.tagName}`)
}
```

При клике на элемент, срабатывает всплытие и функция `handleClick()` вызывается соответствующее количество раз.
1. Клик на button:

  ```
  Зарегистрировано событие на элементе BUTTON
  Зарегистрировано событие на элементе DIV
  Зарегистрировано событие на элементе BODY
  ```
2. Клик на container:

  ```
  Зарегистрировано событие на элементе DIV
  Зарегистрировано событие на элементе BODY
  ```
3. Клик на body:

  ```
  Зарегистрировано событие на элементе BODY
  ```

Зачем это нужно

- Удобно использовать для делегирования событий: можно вешать один обработчик на контейнер, а не на каждую кнопку;
- Повышает производительность, т. к. можно использовать меньше обработчиков.

☝️ Если нужно остановить всплытие, то нужно использовать `event.stopPropagation()` в функции-обработчике события.

```html
<html>
  <body>
    <div id="container">
      <button>Нажми на меня</button>
    </div>
  </body>
</html>
```

Тогда при клике на нашу кнопку, `handleClick()` будет вызвана только один раз:
```js
const button = document.querySelector('button')
const container = document.getElementById('container')
const body = document.querySelector('body')

button.addEventListener('click', handleClick)
container.addEventListener('click', handleClick)
body.addEventListener('click', handleClick)

function handleClick(event) {
  event.stopPropagation()
  console.log(`Зарегистрировано событие на элементе ${event.currentTarget.tagName}`)
}
```

В консоли браузера мы увидим:
```
Зарегистрировано событие на элементе BUTTON
```

Это означает что всплытия не произошло, благодаря нашему вызову `event.stopPropagation()`.
