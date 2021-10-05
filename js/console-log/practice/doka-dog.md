В пространстве `console` существуют различные инструменты. Рассмотрим `console.log` и `console.dir`.

🤖 `console.log` отражает любой объект в консоли в достаточно удобном виде. Если это примитив — то его значением, если объект — его древовидной формой, если DOM элемент — его можно также раскрыть и увидеть, что внутри.

Но `console.log` показывает содержимое DOM, а не его свойства. Чтобы увидеть свойства DOM элемента необходимо использовать console.dir:

```js
z = document.createElement("div")
zz = document.createElement("div")
zz.appendChild(z)
console.log(z)
console.dir(z)
```

⚡️Короче, `console.log` удобен для исследования объектов и их вложенных элементов, а console.dir удобен для просмотра свойств объекта.

Если делать `console.log` и `console.dir` простого объекта, то разница минимальна, ребят:

```js
let a = { cat: "miu", dog: "woof" }
console.log(a)
console.dir(a)
```

🛠 В каждом браузере свой набор инструментов работы с console. В целом, они похожи, но есть и различия. Узнать подробности и поддерживаемые методы можно по ссылкам:

[https://developers.google.com/web/tools/chrome-devtools/console/console-write](https://developers.google.com/web/tools/chrome-devtools/console/console-write)

[https://developer.mozilla.org/en-US/docs/Web/API/Console](https://developer.mozilla.org/en-US/docs/Web/API/Console)
