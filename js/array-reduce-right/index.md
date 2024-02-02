---
title: "`.reduceRight()`"
description: "Приводит массив к одному значению."
authors:
  - alexafcode
related:
  - js/arrays
  - js/function-as-datatype
  - js/values
tags:
  - doka
---

## Кратко

Метод массива `reduceRight()` работает так же, как и метод [reduce](/js/array-reduce/). Единственные отличия: `reduce()` перебирает элементы слева направо, а `reduceRight()` — справа налево, а также значение для для второго аргумента, в методе `reduceRight()`, по умолчанию будет последний элемент, а для `reduce()` первый.

## Пример

Находим сумму элементов:

```js
const nums = [1, 2, 3, 4]

const sum = nums.reduceRight((currentSum, currentNumber) => {
  return currentSum + currentNumber
}, 0)
// 10
```

Можно сократить данную запись:

```js
const nums = [1, 2, 3, 4]

const sum = nums.reduceRight((currentSum, currentNumber) =>  currentSum += currentNumber)
// 10
```

Создаём двумерный массив и преобразуем его в одномерный массив:

```js
const numsArrays = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

const nums = numsArrays.reduceRight((acc, cur) => {
  return acc.concat(cur);
}, [])
// [7, 8, 9, 4, 5, 6, 1, 2, 3]
```
