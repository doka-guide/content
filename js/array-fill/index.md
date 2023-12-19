---
title: "`.fill()`"
description: "Заполняет элементы массива указанным значением."
authors:
  - vitya-ne
related:
  - js/arrays
  - js/array-splice
  - js/array-with
tags:
  - doka
---

## Кратко

Метод `fill()` заполняет часть или все элементы массива одним и тем же значением.

## Пример

Заменим все значения на 'purple':

```js
const colors = ['red', 'green', 'white']

colors.fill('purple')

console.log(colors)
// ['purple', 'purple', 'purple']
```

Заменим все значения начиная с 3-ого элемента:

```js
const skills = ['HTML', 'CSS', 'JS', 'Python']

skills.fill(null, 2)

console.log(skills)
// [ 'HTML', 'CSS', null, null ]
```

## Как пишется

## Как понять

