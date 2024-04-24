🛠 Чтобы понять, что в переменной хранится функция, достаточно воспользоваться оператором `typeof`. Для функций он возвращает строку `'function'`:

```js
const answer = function() {
  console.log('42!')
}

console.log(typeof answer)
// 'function'
```

🛠 Так как функция технически является объектом, то у функции есть свойства и методы. Например, свойство `length` вернёт количество параметров функции:

```js
const answer = function() {
  console.log('42!')
}

console.log(answer.length)
// 0

const sum = function(a, b) {
  return a + b
}

console.log(sum.length)
// 2
```

🛠 Функциям можно добавлять свойства как обычным объектам. Такой код встречается редко, но не удивляйтесь, если увидите:

```js
const calc = function() {}

calc.type = 'numbers'

console.log(calc.type)
// numbers
```
