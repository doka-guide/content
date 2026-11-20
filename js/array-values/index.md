---
title: "`.values()`"
description: "Возвращает объект-итератор значений элементов массива."
baseline:
  - group: array-iterators
    features:
      - javascript.builtins.Array.values
authors:
  - vitya-ne
related:
  - js/arrays
  - js/iterator
  - js/for-of
tags:
  - doka
---

## Кратко

Метод `values()` возвращает новый объект-итератор, созданный из значений элементов массива. Подробнее о том, что такое итератор, можно прочитать в статье «[Итератор](/js/iterator/)».

## Пример

Создадим объект-итератор и получим его значения с помощью `for...of`:

```js
const array = [1, 2, 3]
const iterator = array.values()

for (const item of iterator) {
  console.log(item)
}
// 1
// 2
// 3
```

## Как пишется

`Array.values()` не имеет аргументов.

`Array.values()` возвращает новый объект-итератор, реализующий протокол перебора массива.

## Как понять

Массив в JavaScript имеет различные методы для перебора элементов. Например, `map()` или `forEach()`. Но иногда удобнее работать не с самим массивом, а с итерируемым объектом. Создать такой объект из массива позволяет метод `values()`.

Метод `values()` как функция доступен также с помощью вызова `Array.prototype[Symbol.iterator]()`:

```js
const array = [1, 2, 3]
console.log(array.values === array[Symbol.iterator])
// true
```

`Array.values()` не нужно путать со статическим методом `Object.values()`, который возвращает массив значений перечисляемых свойств объекта.

## Подсказки

💡 Если массив имеет незаполненные элементы, то объект-итератор, созданный при вызове `values()`, вернёт при обходе `undefined` как значение для всех незаполненных элементов:

```js
const colors = []

colors[2] = 'crimson'
for (const color of colors.values()) {
  console.log(color)
}
// undefined
// undefined
// crimson
```

💡 Объект-итератор, созданный при вызове `values()`, можно преобразовать обратно в массив с помощью метода `Array.from`:

```js
const numbersIterator = [1, 2, 3, 4].values()
const numbers = Array.from(numbersIterator)

console.log(numbers)
// [1, 2, 3, 4]
```
