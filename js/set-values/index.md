---
title: "`.values()`"
description: "`.values()` возвращает итератор для обхода значений коллекции `Set`."
authors:
  - nlopin
related:
  - js/iterator
  - js/array-from
  - js/arrays
tags:
  - doka
---

## Кратко

Возвращает итератор для обхода значений коллекции [`Set`](/js/set/) в порядке добавления значений в коллекцию.

## Как пишется

Метод `values()` вызывается без аргументов. Вызов метода возвращает итератор, который содержит значения коллекции в порядке их добавления от старых к новым:

```js
const watchList = new Set(['Сияние', 'Интерстеллар', 'Казино'])
const values = watchList.values()

console.log(values)
// Set Iterator
```

Итератор можно обойти с помощью `for...of`:

```js
for (const key of values) {
  console.log(key)
}

// 'Сияние'
// 'Интерстеллар'
// 'Казино'
```

Итератор можно превратить в массив с помощью [спред-синтаксиса](/js/spread/):

```js
const movies = [...values]
console.log(movies)
// ['Сияние', 'Интерстеллар', 'Казино']
```
