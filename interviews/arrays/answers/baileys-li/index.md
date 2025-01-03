В JavaScript массивы — это не отдельный тип данных, а просто [объекты](/js/objects-objects-everywhere/). Заполненные слоты массива хранятся под числовыми ключами, а пустые слоты вообще не существуют.

В консоли Chrome Dev Tools пустые слоты отображаются как `empty`, а в Node.js — `empty items`. Но это лишь абстрактное представление ситуации, когда поле `.length` массива не совпадает с ожидаемыми заполненными слотами.

![Пример отображение empty slots](images/empty.png)

Чтобы проверить наличие значения по ключу, можно использовать оператор `in` или метод `.hasOwnProperty()`:

```js
const test = new Array(5)
test[2] = 42

2 in test // true
test.hasOwnProperty(2) // true

0 in test // false
test.hasOwnProperty(0) // false
```

То есть, мы можем пройтись по массиву от `0` до `length` и проверить отсутвие текущего индекса в качестве ключа. Однако есть способ ещё проще: [итератор](/js/iterator/) массива и методы, поверх него, используют только существующие ключи:

```js
const test = new Array(5)
test[2] = 42

test.forEach((value, key) => console.log(`значение по ключу ${key}: ${value}`))
// значение по ключу 2: 42

// консоль вывела значение только один раз
```

Таким образом, чтобы найти количество пустых слотов, достаточно от длины массива отнять число заполненных значений:

```js
const calcEmpty = items => items.reduce(amount => --amount, items.length)

const test = new Array(5)

test[2] = 42
calcEmpty(test) // 4

test[10] = 2
calcEmpty(test) // 9
```
