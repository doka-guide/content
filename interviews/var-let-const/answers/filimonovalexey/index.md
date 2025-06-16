Переменные, объявленные через `var`, всплывают (_hoisting_). Это значит, что если мы обратимся к переменной ещё до момента её инициализации, то получим `undefined`.

```js
console.log(a)
// ReferenceError: Cannot access 'a' before initialization
console.log(b)
// ReferenceError: Cannot access 'b' before initialization
console.log(c)
// undefined

let a = 10
const b = 20
var c = 30
```

У переменных `let`, `const` и `var` разная область видимости.
У `let` и `const` область видимости ограничена блоком, а не функцией.
Другими словами, если переменные `let` и `const` объявлены внутри `{ ... }`, то доступны только там и на всех вложенных уровнях. Переменная, объявленная через `var`, такую область видимости игнорирует и доступна за её пределами.

```js
if (true) {
  let a = 10
  const b = 20
  var c = 30
}

console.log(a)
// ReferenceError: a is not defined
console.log(b)
// ReferenceError: b is not defined
console.log(c)
// 30
```

Переменная, объявленная через `const`, становиться константой, и её невозможно переопределить. При попытке это сделать мы получим ошибку.

```js
let a = 10
const b = 20

a = 15
// Всё в порядке
b = 40
// TypeError: Assignment to constant variable
```

Важно помнить, что если через `const` объявлен объект, массив или функция, то их содержимое может измениться (например, можно добавить новые свойства или изменить элементы массива). Это связано с тем, что `const` хранит только ссылку на объект, но не делает его неизменяемым. Читайте подробнее в статье про «[Хранение по ссылке и по значению](/js/ref-type-vs-value-type/)».

```javascript
const obj = { name: 'Nikita' }
obj.name = 'Nick'
obj.age = 25

console.log(obj)
// {name: 'Nick', age: 25}

const arr = [1, 2, 3]

arr.push(4)
arr[0] = 10

console.log(arr)
// [10, 2, 3, 4]

obj = {}
// TypeError: Assignment to constant variable
arr = []
// TypeError: Assignment to constant variable
```
