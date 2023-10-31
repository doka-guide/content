---
title: ".findLast()"
description: "Ищем последний подходящий элемент массива"
authors:
  - doka-dog
related:
  - js/array-foreach
  - js/array-find
  - js/array-find-index
tags:
  - doka
  - placeholder
---

## Кратко

Метод `.findLast()` начнёт поиск нужного элемента массива с конца и вернёт его в результате работы.

## Пример

```js
const array = [3, 17, 58, 112, 34]

const bingo = array.findLast((element) => element >= 35)

console.log(bingo) // 112
```

## Как пишется

Внутрь метода передаётся функция-колбэк, которая будет вызвана для каждого элемента массива. Если ничего не будет найдено, то вернёт [`undefined`](/js/undefined/).
