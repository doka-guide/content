---
title: "`.findLastIndex()`"
description: "Ищем индекс последнего подходящего элемента в массиве."
authors:
  - doka-dog
related:
  - js/array-findlast
  - js/array-find-index
  - js/array-find
tags:
  - doka
  - placeholder
---

## Кратко

Метод `.findLastIndex()` переворачивает массив и ищет нужный элемент с конца. Возвращает его индекс, если найдёт и -1 если не найдёт.

## Пример

В примере ниже, поскольку поиск идёт с конца, первое подходящее под условие число — 54. Его индекс 4.

```js
const array = [4, 17, 32, 112, 54]

const bingo = (element) => element > 45

console.log(array.findLastIndex(isLargeNumber)) // 4
```

## Как пишется

Внутрь метода передаётся функция-колбэк, которая будет вызвана для каждого элемента массива. Если ничего не будет найдено, то вернёт -1.
