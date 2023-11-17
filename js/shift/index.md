---
title: "`.shift()`"
description: "Удаляем первый элемент массива."
authors:
  - doka-dog
related:
  - js/pop
  - js/array
  - js/unshift
tags:
  - doka
  - placeholder
---

## Кратко

Метод `.shift()` удаляет первый элемент массима. Возвращает удалённый элемент в качестве результата работы.

## Пример

```js
const array = ['Внучка', 'Жучка', 'Кошка']

array.shift() // 'Внучка'

let temp = array.shift()

console.log(temp) // 'Жучка'
```

## Как пишется

Метод не принимает аргументы. Возвращает удалённый элемент. Изменяет исходный массив.
