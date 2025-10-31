---
title: "Iterator.prototype.take()"
description: "Возвращает итератор, завершающийся после фиксированного числа шагов"
baseline:
  - group: iterator-methods
    features:
      - javascript.builtins.Iterator.take
authors:
  - vitya-ne
related:
  - js/iterator
  - js/iterator-to-array
  - js/generators
tags:
  - doka
---

## Кратко

Метод `Iterator.prototype.take()` возвращает итератор, завершающийся после указанного количества успешных шагов итерации или раньше, если исходный итератор завершится. О том, что такое итератор, можно прочитать в статье [«Итератор»](/js/iterator/).

## Пример

У нас есть коллекция фильмов и итератор для обхода:

```js
const movies = [
  'Братство кольца',
  'Две крепости',
  'Возвращение короля',
  'Нежданное путешествие'
]

const baseIterator = movies.values()
```

Создадим новый итератор, для обхода только части коллекции, например для получения только 2-x значений:

```js
const limitIterator = baseIterator.take(2)

for ( item of limitIterator ) {
  console.log(item)
}
// Братство кольца
// Две крепости

```