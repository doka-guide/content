---
title: "`.some()`"
description: "Проверит, есть ли в массиве хоть один элемент, подходящий под условие."
baseline:
  - group: array-iteration-methods
    features:
      - javascript.builtins.Array.some
authors:
  - windrushfarer
contributors:
  - skorobaeus
editors:
  - tachisis
related:
  - js/arrays
  - js/function-as-datatype
  - tools/programming-paradigms
tags:
  - doka
---

## Кратко

Метод массива `some()` позволяет узнать, есть ли в массиве хотя бы один элемент, удовлетворяющий условию в [функции-колбэке](/js/function-as-datatype/). Колбэк-функция будет вызываться для каждого элемента массива до тех пор, пока не вернётся `true`, либо пока не закончатся элементы массива.

Результатом вызова метода `some()` будет [boolean-значение](/js/boolean/) `true` или `false`. Если ни один элемент в массиве не удовлетворит условию, то результат будет `false`.

## Пример

Проверим, есть ли в массиве хотя бы одно чётное число:

```js
const nums = [3, 5, 7, 8, 9, 11]
const hasEvenNumber = nums.some(num => {
  return num % 2 === 0
})
console.log(hasEvenNumber)
// true

const oddNums = [3, 5, 7, 9, 11]
const noEvenNumber = oddNums.some(num => {
  return num % 2 === 0
})
console.log(noEvenNumber)
// false
```

Интерактивный пример:

<iframe title="Используем some для проверки массива" src="demos/index/" height="930"></iframe>

## Как пишется

Чтобы использовать метод `some()`, ему необходимо передать колбэк-функцию, которая должна возвращать boolean-значение аналогично методам [`filter()`](/js/array-filter/) и [`every()`](/js/array-every/). Возвращать можно и другие truthy и falsy значения, они [преобразуются согласно типу](/js/typecasting/).

Функция, которую мы передаём в метод `some()`, может принимать три параметра:

- `item` — элемент массива в текущей итерации;
- `index` — индекс текущего элемента;
- `arr` — сам массив, который мы перебираем.

```js
const balls = ['🎾', '🏈', '🎾', '🎾']

const areAllBallsGreen = balls.some(
  (ball, index, arr) => ball === '🏈'
)
console.log(areAllBallsGreen)
// true
```

## Как понять

Метод `some()` позволяет упростить написание кода в случае, когда мы хотим проверить наличие определённого элемента в массиве. В отличие от [`every()`](/js/array-every/), чтобы результат выражения стал `true`, достаточно, чтобы хотя бы один элемент удовлетворил условию функции-предиката.

Для сравнения напишем пример через [`for`](/js/for/) или [`while`](/js/while/):

```js
const food = [
  '🍗', '🍖', '🥓', '🥬', '🥩', '🍔'
]

let hasAnySalad = false

for (let i = 0; i < food.length; i++) {
  if (food[i] === '🥬') {
    hasAnySalad = true
    break
  }
}
console.log(hasAnySalad);
// true
```

Метод `some()` позволит написать меньше кода и сделать его понятнее:

```js
const food = [
  '🍗', '🍖', '🥓', '🥬', '🥩', '🍔'
]

const hasAnySalad = food.some(item => item === '🥬')
console.log(hasAnySalad)
// true
```

<aside>

💡 В примерах код был написан с помощью [двух разных подходов](/tools/programming-paradigms/): императивного и декларативного. Использование метода `some()` делает код декларативнее.

</aside>
