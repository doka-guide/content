Всегда используйте строгое равенство при сравнении значений.

🛠 Для удобства проверку на существование объекта можно проводить через `if (object)`, потому что объекты всегда приводятся к `true`.

```js
const exists = {}
if (exists) {
  /* эта ветка выполнится */
}

const doesntExist = undefined
if (doesntExist) {
  /* эта ветка не выполнится */
}
```

🛠 Если хочется описать сложную структуру, которая бы умела «вести себя», как число или строка, можно описать методы `.valueOf()` или `.toString()`.

```js
const ticketPrice = {
  amount: 20,
  currency: 'USD',
  valueOf: () => 20,
  toString: () => '$20',
}

1 + ticketPrice // 1 + 20 -> 21
console.log(ticketPrice)
// $20
```
