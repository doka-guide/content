---
title: "`set.size`"
description: "Свойство коллекции Set, содержит количество значений в коллекции"
authors:
  - nlopin
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
