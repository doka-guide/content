🛠 Метод применяется для запросов к API. Он особенно удобен, когда запросы независимы и ошибка в одном не влияет на другие, так как `Promise.allSettled()` дождётся завершения всех запросов. Если же запросы зависимы, то лучше использовать метод [`Promise.all()`](/js/promise-all/#na-praktike).

```js
const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.org/i_need_an_error',
]
const arrayFetchData = urls.map(url => fetch(url).then(res => res.json()))

Promise.allSettled(arrayFetchData)
  .then((res) => {
    // res — массив результатов выполнения промисов
    res.forEach(item => {
      console.log(item)
    })
  })
```

В консоли получим:

```js
// { status: 'fulfilled', value: { userId: 1, id: 1, ... } }
// { status: 'rejected', reason: 'TypeError: Failed to fetch...' }
```

🛠 Метод `Promise.allSettled()` появился в спецификации языка недавно, а именно [ES2020](https://262.ecma-international.org/11.0/#sec-promise.allsettled), возможно вам понадобится [полифил](https://www.npmjs.com/package/promise.allsettled).
