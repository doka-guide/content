🛠 Метод бесполезный, обойти `Set` можно с помощью метода [`forEach`](/js/set-foreach) или `for...of`:

```js
const watchList = new Set(['Сияние', 'Интерстеллар', 'Казино'])

for (const movie of watchList) {
  console.log(movie)
}

// 'Сияние'
// 'Интерстеллар'
// 'Казино'
```

Если нужно превратить `Set` в массив, то достаточно применить spread-оператор напрямую:

```js
const watchList = new Set(['Сияние', 'Интерстеллар', 'Казино'])
const array = [...watchList]
console.log(array)
// ['Сияние', 'Интерстеллар', 'Казино']
```
