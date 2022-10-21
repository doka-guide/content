---
title: "Итератор"
description: "Разбираемся, как сделать перебор элементов коллекций в порядке, котором хочется."
authors:
  - kanishev
keywords:
  - Итератор
  - Итерируемый объект
  - Symbol.iterator
  - iterator
related:
  - js/objects-objects-everywhere
  - js/for-in
  - js/array-foreach
tags:
  - doka
---

## Кратко

Итератор — это объект, который умеет обращаться к элементам коллекции по одному за раз, при этом отслеживая своё текущее положение внутри этой последовательности.

Иными словами итератор — это такой механизм, который позволяет перемещаться (итерироваться) по элементам коллекции в определённом порядке и делает их доступными.

## Как понять

В JavaScript итератор — это объект, который возвращает следующий элемент последовательности, через метод `next()`. Этот метод возвращает объект с двумя свойствами:

- `value` — значение текущего элемента коллекции.
- `done` — индикатор, указывающий, есть ли ещё в коллекции значения, доступные для перебора.

```js
function makeIterator(array) {
  let nextIndex = 0

  return {
    next: function () {
      if (nextIndex < array.length) {
        const result = { value: array[nextIndex], done: false }
        nextIndex++
        return result
      } else {
        return { done: true }
      }
    }
  }
}
```

После создания, объект-итератор может быть явно использован, с помощью вызовов метода `next()`:

```js
let iterator = makeIterator(['Hello', 'world'])
console.log(iterator.next().value)
// 'Hello'
console.log(iterator.next().value)
// 'world'
console.log(iterator.next().done)
// true
```

Как только метод `next()` завершает перебор, то возвращается `{ done: true }`. Это является сигналом, что итерирование завершено.

## Зачем это нужно

Практически везде, где нужен перебор, он осуществляется через итераторы. Это включает в себя не только [строки](/js/string/), [массивы](/js/arrays/), но и другие структуры данных. В современный JavaScript добавлена новая концепция «итерируемых» (_iterable_) объектов, например [`Map`](/js/map/), представленный [в ES6](/js/language-versions/).

Это позволяет перебрать итерируемый объект в цикле `for..of`:

```js
for (let value of ['a', 'b', 'c']) {
  console.log(value)
  // a
  // b
  // c
}
```

<aside>

⚠️ Чтобы быть итерируемым, объект должен реализовать метод [`@@iterator`](https://tc39.es/ecma262/#sec-iteration). Это означает, что он (или один из объектов в цепочке прототипов) должен иметь свойство `Symbol.iterator`.

</aside>

Предположим, у нас есть объект `person`, который представляет набор данных:

```js
const person = {
  name: 'Mark',
  age: 30,
  gender: 'male',
  interests: ['music', 'fishing'],
}
```

Чтобы сделать такой объект итерируемым (и позволить `for..of` работать с ним), в нём нужно определить `Symbol.iterator`:

```js
person[Symbol.iterator] = function () {
  const properties = Object.keys(this)
  let count = 0

  return {
    next() {
      if (count < properties.length) {
        const key = properties[count]
        let result = { done: false, value: person[key] }
        count++
        return result
      } else {
        return { done: true }
      }
    },
  }
}
```

Убедимся, что объект `person` действительно итерируется:

```js
for (let x of person) {
  console.log(x)
  // Mark, 30, male, ['music', 'fishing']
}
```

## Встроенные итераторы

В некоторых случаях интерфейс итератора вызывается по умолчанию. Такие объекты как `String`, `Array`, `Map` и [`Set`](/js/set/) являются итерируемыми, потому что их прототипы содержат `Symbol.iterator`.

## Где ещё встречается итератор

### Деструктуризация

При деструктуризации итератор используется для доступа к элементам коллекции:

```js
const [a, b] = new Set(['a', 'b', 'c'])
// a
// b
```

### `Array.from()`

[`Array.from()`](/js/array-from/) позволяет конвертировать итерируемый объект в массив:

```js
const arr = Array.from(new Set(['a', 'b', 'c']))
// ['a', 'b', 'c']
```

### Спред-оператор

[Спред-оператор](/js/spread/) (spread) также вызывает интерфейс итератора по умолчанию:

```js
const arr = [...new Set(['a', 'b', 'c'])]
// ['a', 'b', 'c']
```

### `Map`, `Set`

Конструкторы `Map` и `Set` преобразуют итерируемые значения в соответственно `Map` и `Set`:

```js
const map = new Map([
  ['uno', 'one'],
  ['dos', 'two'],
])
map.get('uno')
// one
map.get('dos')
// two

const set = new Set(['red', 'green', 'blue'])
set.has('red')
// true
set.has('yellow')
// false
```
