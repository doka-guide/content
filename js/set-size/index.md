---
title: "`.size`"
description: "Свойство коллекции Set, содержит количество значений в коллекции"
authors:
  - nlopin
tags:
  - doka
---

## Кратко

Свойство `size` содержит количество значений, находящихся в коллекции [`Set`](/js/set). Доступно только для чтения.

## Пример

```js
const watchlist = new Set()

console.log(watchlist.size)
// 0

watchlist.add('Бойцовский клуб')
console.log(watchlist.size)
// 1
```
