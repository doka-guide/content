---
title: "`.delete()`"
description: "Удаляет значение из коллекции `Set`."
authors:
  - nlopin
related:
  - js/map
  - tools/oop
  - js/object
tags:
  - doka
---

## Кратко

Метод `delete()` удаляет значение из коллекции [`Set`](/js/set/).

## Пример

```js
const watchlist = new Set(['Сияние', 'Интерстеллар', 'Казино'])
console.log(watchlist.size)
// 3

const firstTry = watchlist.delete('Казино')
console.log(firstTry)
// true
console.log(watchlist.size)
// 2

const secondTry = watchlist.delete('Казино')
console.log(secondTry)
// false
console.log(watchlist.size)
// 2
```

## Как пишется

Метод принимает один аргумент — значение, которое нужно удалить.

Возвращает [булевый тип](/js/boolean/):

- `true` если значение было найдено в коллекции и удалено;
- `false` если значения нет в коллекции.
