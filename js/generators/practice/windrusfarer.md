🛠 С помощью генераторов можно создавать бесконечные коллекции

```js

function* createCounter() {
  let i = 0

  while (true) {
    const shouldStop = yield i++

    // Оставляем возможность остановиться
    if (shouldStop) {
      break
    }
  }
}
const counter = createCounter()
counter.next() // { value: 0, done: false }
counter.next() // { value: 1, done: false }
counter.next() // { value: 2, done: false }
counter.next() //  { value: 3, done: false }
counter.next(true) // { value: undefined, done: true }
```

🛠 Можно использовать генератор для последовательных ленивых вычислений
```js
function* lazyComputation() {
  const result = doHeavyWork()

  const input = yield result

  const anotherResult = doAnotherHeavyWork(input)

  yield result + anotherResult

  // ...
}

const computations = lazyComputation()
computations.next()

// После получили нужные входные данные
// ...
computations.next(inputData)
```
