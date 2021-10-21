🛠 Из-за того, что результат выполнения метода `Array.some` – это boolean-значение, то метод можно удобно использовать прямо в условных конструкциях

```js
const drinks = ['🍺', '🍺', '🥃', '🍺', '🍺']

if (drinks.some(drink => drink === '🥃')) {
  console.log('Order whiskey')
}
```
