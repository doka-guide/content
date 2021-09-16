🛠 Метод бесполезный, обойти `Set` можно с помощью метода [`forEach`](/js/set-foreach) или `for...of`:

```js
const watchlist = new Set(['Сияние', 'Интерстеллар', 'Казино'])

for(const movie of watchlist) {
  console.log(movie)
}

// 'Сияние'
// 'Интерстеллар'
// 'Казино'
```

Если нужно превратить `Set` в массив, то достаточно применить spread-оператор напрямую:

```js
const watchlist = new Set(['Сияние', 'Интерстеллар', 'Казино'])
const array = [...watchlist]
console.log(array)
// ['Сияние', 'Интерстеллар', 'Казино']
```
