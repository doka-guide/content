🛠 Часто нам необходимо вывести в консоли содержимое переменных. Например, вывести переменные `language` и `count` можно так:

```js
const language = 'JavaScript'
const count = 100

console.log('language:', language, 'count:', count)
// language: JavaScript count: 100
```

Но можно сделать проще и быстрее. Сравните:

```js
const language = 'JavaScript'
const count = 100

console.log({ language, count })
// { language: 'JavaScript', count: 100 }
```

🛠 Если у нас есть массив с каким-то количеством однотипных объектов, то можно воспользоваться `console.table()`:

```js
const data = [
  { section: 'HTML', count: 212 },
  { section: 'CSS', count: 121 },
  { section: 'JavaScript', count: 182 },
  { section: 'Tools', count: 211 },
]

console.table(data);
```
