🛠 Применение такое же как и для метода [`all`](/js/promise-all/#v-rabote), только в методе [`all`](/js/promise-all/#odin-iz-promisov-zavershilsya-oshibkoy) завершение со статусом _rejected_ приведёт к завершению с ошибкой, а в нашем случае, `allSettled` дождётся выполнения всех промисов.

Пример:

```js
const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.org/i_need_an_error',
];
const arrayFetchData = urls.map(url => fetch(url).then(res => res.json()));

Promise.allSettled(arrayFetchData)
  .then((res) => {
    // res — массив результатов выполнения промисов
    res.forEach(item => {
      if (item.status === 'fulfilled') {
          console.log(item);
          // { status: 'fulfilled', value: { userId: 1, id: 1, ... } }
      } else if (item.status === 'rejected') {
        console.log(item);
        // { status: 'rejected', reason: TypeError: Failed to fetch... }
      }
    });
  });
```

Примерно так можно использовать метод `allSettled`.
Этот метод появился в спецификации языка недавно, а именно [ES2020](https://habr.com/ru/company/plarium/blog/485362/), возможно вам понадобится [полифил](https://www.npmjs.com/package/promise.allsettled).
