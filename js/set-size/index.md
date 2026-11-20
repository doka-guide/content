---
title: "`.size`"
description: "Свойство коллекции `Set`, содержит количество значений в коллекции."
baseline:
  - group: set
    features:
      - javascript.builtins.Set.size
authors:
  - nlopin
related:
  - js/set-constructor
  - js/arrays
  - js/map
tags:
  - doka
---

## Кратко

Свойство `size` содержит количество значений, находящихся в коллекции [`Set`](/js/set/). Доступно только для чтения.

## Пример

```js
const watchList = new Set()

console.log(watchList.size)
// 0

watchList.add('Бойцовский клуб')
console.log(watchList.size)
// 1
```
