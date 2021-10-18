---
title: "Array.reverse"
description: "позволяет обратить порядок элементов в массиве."
authors:
  - yurlovr
tags:
  - doka
---

## Кратко
Метод `Array.reverse` позволяет обратить порядок элементов в массиве (развернуть массив), то есть первый элемент становиться последним, а последний – первым.

## Пример
```js
const array = [1, 2, 3, 'a', 'b', 'c',]
array.reverse()
console.log(array) // ['c', 'b', 'a', 3, 2, 1]
```

Метод `reverse` не создаёт новый массив, а изменяет текущий.

## Пример
```js
const array1 = [1, 2, 3]
const array2 = array1.reverse()

console.log(array2) // [3, 2, 1]
console.log(array1) // [3, 2, 1]

// Так как метод не создаёт новый массив, а изменяет существующий
// У нас получается, что обе переменные ссылаются на один и тотже массив
console.log(array1 === array2) // true
```
Рассмотрим ещё один пример с массивом, у которого есть разрывы между элементами:

## Пример
```js
const array = [1, 2, 3]
// Добавим элемент с индексом 5
array[5] = 6
array.reverse()
console.log(array) // [6, 2 × empty, 3, 2, 1]
console.log(array[1]) // undefined
```

## Как пишется
`Array.reverse()`

