🛠 Из-за того, что результат выполнения метода `Array.every` – это boolean-значение, метод можно удобно использовать прямо в условных конструкциях:

```js
const drinks = ['🍺', '🍺', '🍺', '🍺', '🍺']

if (drinks.every(drink => drink === '🍺')) {
  console.log('This is a beer party! 🎉')
}
```
Но следует помнить, что проверка пустого массива всегда вернёт `true`

```js
const drinks = []

if (drinks.every(drink => drink === '🍺') {
  console.log('This is a beer party! 🎉 without BEER :)')
}
```

