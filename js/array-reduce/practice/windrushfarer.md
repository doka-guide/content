🛠 `reduce()` действительно часто применяется для того, чтобы провести математическую операцию для всех элементов массиве и получить в итоге какой-то результат.

🛠 Если вы хотите применить подряд несколько операций `filter` и `map`, то с помощью `reduce()` их можно объединить в одной функции. Иногда это может быть необходимо в целях производительности, поскольку в этом случае будет всего один проход по массиву вместо нескольких в зависимости от количества вызываемых методов. Но стоит помнить, что такой способ не всегда будет хорошо читаться.

Задача: выбрать чётные, вычислить их квадраты и отобрать из них числа больше 50.

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function filterEven(num) {
  return num % 2 === 0
}

function square(num) {
  return num * num
}

function filterGreaterThanFifty(num) {
  return num > 50
}
```

Применяем несколько методов:

```js
const result = numbers
  .filter(filterEven)
  .map(square)
  .filter(filterGreaterThanFifty)

console.log(result)
// [64, 100]
```

Через один `reduce()`:

```js
const result = numbers.reduce(function (res, num) {
  if (filterEven(num)) {
    const squared = square(num)

    if (filterGreaterThanFifty(squared)) {
      res.push(squared)
    }
  }

  return res
}, [])

console.log(result)
// [64, 100]
```

🛠 Часто встречается использование `reduce()` для нормирования значений. Например, для превращения массива с данными пользователей в объект, где ключом будет ID пользователя, а значением — исходный объект. Таким образом можно быстро получать значение объект-пользователя по `id`, обратившись по ключу к объекту, вместо поиска по массиву:

```js
const users = [
  { id: "123", name: "Vasiliy", age: 18 },
  { id: "345", name: "Anna", age: 22 },
  { id: "567", name: "Igor", age: 20 },
  { id: "789", name: "Irina", age: 24 },
]

const usersById = users.reduce(function (result, user) {
  result[user.id] = {
    name: user.name,
    age: user.age,
  }

  return result
}, {})

console.log(usersById["567"]);
// { name: 'Igor', age: 20 }
```
