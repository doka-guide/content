---
title: "`.clear()`"
description: "Удаляет все значения из коллекции `Set`."
authors:
  - nlopin
related:
  - js/arrays
  - js/map
  - js/local-storage
tags:
  - doka
---

## Кратко

Вызов метода `clear()` удаляет все значения из коллекции [`Set`](/js/set/).

## Пример

```js
const numbers = new Set()
numbers.add(2).add(3).add(5)

console.log(numbers.size)
// 3

numbers.clear()
console.log(numbers.size)
// 0
```

## Как пишется

Метод вызывается без аргументов. Возвращает [`undefined`](/js/undefined/).
