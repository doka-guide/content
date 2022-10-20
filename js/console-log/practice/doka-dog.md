### `console.log()` и `console.dir()`

В пространстве объекта `console` существуют различные методы. Есть два похожих метода `console.log()` и `console.dir()`.

`console.log()` отражает любой объект в консоли в удобном виде. Если это примитив — то его значением, если объект — его древовидной формой. DOM-элемент — его можно также раскрыть и увидеть, что внутри.

Но `console.log()` показывает содержимое DOM, а не его свойства. Если нужно увидеть свойства DOM-элемента, то лучше использовать `console.dir()`:

```js
const el = document.createElement('div')
const el2 = document.createElement('div')
el2.appendChild(el)
console.log(el)
console.dir(el)
```

<aside>

⚡️ `console.log()` удобен для исследования объектов и их вложенных элементов, а `console.dir()` удобен для просмотра свойств объекта.

</aside>

Если делать `console.log()` и `console.dir()` простого объекта, то разница минимальна:

```js
const a = { cat: "miu", dog: "woof" }
console.log(a)
console.dir(a)
```

🛠 В каждом браузере свой набор инструментов работы с `console`. Смотрите, поддерживается ли тот или иной метод в вашем браузере в [таблице на MDN](https://developer.mozilla.org/en-US/docs/Web/API/Console#browser_compatibility)
