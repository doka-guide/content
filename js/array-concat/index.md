---
title: "`.concat()`"
description: "Возвращает новый массив, полученный при объединении нескольких массивов."
authors:
  - vitya-ne
related:
  - "array-to-spliced"
  - "array-push"
  - "array-splice"
tags:
  - doka
---

## Кратко

Метод `concat()` объединяет исходный массив с одним или несколькими указанными массивами или другими значениями и возвращает новый массив. Метод не меняет массивы участвующие в объединении.

## Пример

Объединим два массива в новый массив. Обратите внимание исходный массив не изменился:

```js
const months = ['март', 'апрель', 'май']
const summer = ['июнь', 'июль', 'август']

const favoriteMonths = months.concat(summer)

console.log(favoriteMonths)
// ['март', 'апрель', 'май', 'июнь', 'июль', 'август']
console.log(months)
// ['март', 'апрель', 'май']
```

Объединим три массива в новый массива используя в качестве исходного пустой массив:
```js
const numbers = [2, 12, 85]
const strings = ['06', 'это', 'твой', 'номер']
const result = [].concat(numbers, strings)

console.log(result)
// [2, 12, 85, '06', 'это', 'твой', 'номер']
```

## Как пишется

`Array.concat` принимает в качестве аргументов элементы, объединяемые с исходным массивом в новый массив.

`Array.concat` возвращает новый массив, полученный при объединении.

Если метод был вызван без аргументов, возвращается [поверхностная копия (shallow copy)](/js/shallow-or-deep-clone/) исходного массива:

```js
const numbers = [1, 2, 3, 4]

const copyNumbers = numbers.concat()

console.log(copyNumbers)
// [1, 2, 3, 4]
console.log(numbers)
// [1, 2, 3, 4]
```

В качестве аргументов могут выступать не только массивы, но и значения других типов:

```js
const numbers = [1, 2, 3]

const result = numbers.concat(4, 'five', null, {name: 'six'}, [[7]])

console.log(result)
// [1, 2, 3, 4, 'five', null, {name: 'six'}, [7]]
```

## Как понять

