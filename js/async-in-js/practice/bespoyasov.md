#### Отложить выполнение

Иногда нам бывает нужно отложить выполнение функции на потом, но не через какой-то промежуток времени, а чтобы она выполнилась сразу после каких-то операций. Для этого можно использовать [`setTimeout()`](/js/settimeout/) с нулевым таймером.

Мы помним, что колбэк из `setTimeout()` откладывается в очередь задач. Если мы поставим интервал 0 миллисекунд, то эта задача выполнится _ровно через один цикл событий_ — то есть сразу после синхронного кода.

Абсолютное временное значение одного цикла событий может варьироваться от 4 до 100 миллисекунд.

В Node.js и в некоторых браузерах есть `setImmediate()`, который делает почти то же, что и `setTimeout()` с нулевым таймером.

#### Дождаться всех или дождаться первого

Когда мы работаем с запросами к серверу, нам не всегда бывает нужно вызывать запросы последовательно друг за другом.

Бывают ситуации, когда мы хотим:

- либо подождать, когда выполнятся все запросы, и потом сделать что-то;
- либо дождаться выполнения первого запроса из списка и сделать что-то сразу после этого.

Для этого мы можем использовать [`Promise.all()`](/js/promise-all/) и [`Promise.race()`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/race).

Когда мы хотим дождаться выполнения всех запросов и сделать что-то после этого:

```js
const request1 = fetch('/api/users')
const request2 = fetch('/api/posts')
const request3 = fetch('/api/comments')

Promise.all([request1, request2, request3]).then((values) => {
  console.log('Загрузились все данные!')
  console.log(values)
})
```

Загрузились все данные!

В переменной `values` будет массив со значениями каждого из промисов, порядок значений в нём будет соответствовать порядку запросов:

```js
[
  [user1, user2],
  [post1, post2],
  [comment1, comment2]
]
```

Когда нам важно, чтобы выполнился хотя бы один:

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'First')
})

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'Second')
})

Promise.race([promise1, promise2]).then((value) => {
  console.log(value)
})

// Second
```

#### Отдельный поток

В браузерном JavaScript есть некое подобие многопоточности. [Мы можем выносить тяжёлые операции в _Web Worker_](https://bespoyasov.ru/blog/about-web-workers/).

Не следует путать _Web Worker_ и _Service Worker_ — это разные технологии.

#### Асинхронные циклы

Просто использовать цикл [`for`](/js/for/) или метод [`forEach`](/js/array-foreach/) с асинхронными операциями мы не можем. И цикл `for`, и метод `forEach` ожидают синхронный код.

Однако мы можем использовать [`for await...of`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/for-await...of), который появился в ES2018, для обхода асинхронных итерируемых сущностей.

Простой генератор создаёт итерируемую сущность, которую можно «перебрать» через `for...of`:

```js
const urls = ['/api/users', '/api/posts', '/api/comments']

function* requestGenerator() {
  for (const url of urls) {
    yield url
  }
}

for (const item of requestGenerator()) {
  console.log(item)
}
```

Выведет каждый URL по очереди. Порядок гарантируется — так как код синхронный.

Асинхронный же генератор почти не отличается от обычного, только вместо значений он выбрасывает промисы. И итерировать его придётся через `for await...of`:

```js
async function* removeDataGenerator() {
  for (const url of urls) {
    const response = await fetch(url)
    const data = await response.json()
    yield data
  }
}

;(async () => {
  for await (const item of removeDataGenerator()) {
    console.log(item)
  }
})()
```

Выведет данные, которые получит от сервера. Порядок гарантируется, потому что следующий запрос не начнёт выполняться пока не будет закончен предыдущий.

Как вариант, это можно использовать [для управления состоянием приложений](https://bespoyasov.ru/blog/fsm-to-the-rescue/).
