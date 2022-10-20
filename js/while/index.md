---
title: "`while`"
description: "Классический цикл, который есть в каждом языке программирования."
authors:
  - nlopin
contributors:
  - furtivite
keywords:
  - итерация
  - обход
  - пробежать
  - cycle
  - iteration
  - вайл
related:
  - js/array-map
  - js/typecasting
  - js/iterator
tags:
  - doka
---

## Кратко

Управляющая конструкция, которая создаёт _[цикл](/js/loop/)_.

## Как пишется

```js
while (условие) {
  //тело цикла
}
```

Пример печати квадратов чисел из массива:

```js
const numbers = [1, 2, 3, 4, 5]
let i = 0
while (i < numbers.length) {
  const currentElement = numbers[i]
  console.log(currentElement * currentElement)
  i++
}
// напечатает 1, 4, 9, 16, 25

let count = numbers.length
while (count) {
  // вариант с приведением типов в условии цикла
  console.log(count)
  count--
}
// напечатает 5, 4, 3, 2, 1
```
