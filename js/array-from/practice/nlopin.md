🛠 Если вызвать `Array.from()` без аргументов, то произойдёт ошибка _«TypeError: undefined is not iterable (cannot read property Symbol(Symbol.iterator))»_.

🛠 В подавляющем большинстве случаев второй и третий аргументы опускаются, но их использование может быть полезным сокращением кода.

Вместо последовательного вызова `Array.from()` и `.map()`:

```js
const name = 'Mike'
const spacedLetters = Array.from(name).map(function (letter) {
    return `*${letter}*`
})

console.log(spacedLetters)
// ['*M*', '*i*', '*k*', '*e*']
```

...можно записать один вызов `Array.from()` со вторым аргументом:

```js
const name = 'Mike'
const spacedLetters = Array.from(name, function(letter) { return `*${letter}*` })
```

При выполнении этого кода не создаётся промежуточный массив.

🛠 Можно использовать `Array.from()`, чтобы генерировать последовательности значений без использования классического цикла [`for`](/js/for/).

Для этого нужно создать объект, который соответствует требованиям — имеет свойство `length` и индексы. Так как размер массива не всегда совпадает с количеством элементов внутри, мы можем создать объект со свойством `length`, но без индексированных элементов, и создавать такие элементы с помощью второго аргумента:

```js
const nums = Array.from({length: 4}, function(value, index) {
  // value будет undefined
  return index * 2
})

console.log(nums)
// [0, 2, 4, 6]
```
