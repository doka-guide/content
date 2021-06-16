---
tags:
  - practice
permalink: false
---

🛠 При написании функции указываются параметры — те переменные, с которыми работает функция. Но возможны случаи, когда не все параметры заданы. Это может быть и специально, например для использования варианта по умолчанию, так и случайно — ошибка при использовании или неожиданные входные данные.

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="vindi-r" data-slug-hash="pYYKMW" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="function в работе">
  <span>See the Pen <a href="https://codepen.io/vindi-r/pen/pYYKMW">
  function в работе</a> by vindi-r (<a href="https://codepen.io/vindi-r">@vindi-r</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

🛠 Давайте функциям имена, чтобы отладку было проводить проще.

```js
// Анонимную функцию будет сложнее отлаживать,
// потому что в стеке вызовов не будет её имени.
someElement.addEventListener("click", function () {
  throw new Error("Error when clicked!")
})

// ...В отличие от именованной.
someElement.addEventListener("click", function someElementClickHandler() {
  throw new Error("Error when clicked!")
})
```

🛠 У стрелочных функций можно использовать быстрый (implicit) return.

```js
const arrowFunc1 = () => {
  return 42
}

const arrowFunc2 = () => 42

arrowFunc1() === arrowFunc2()
// Обе функции возвращают 42.

// Также можно возвращать любые структуры и типы даных:
const arrowFunc3 = () => "string"
const arrowFunc4 = () => ["array", "of", "strings"]

// Чтобы вернуть объект, его необходимо обернуть в скобки.
// Только так JS поймёт, что мы не открываем тело функции,
// а возвращаем результат.
const arrowFunc5 = () => ({ some: "object" })
```
