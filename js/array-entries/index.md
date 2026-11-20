---
title: "`.entries()`"
description: "Возвращает объект-итератор индексов и значений элементов массива."
baseline:
  - group: array-iterators
    features:
      - javascript.builtins.Array.entries
cover:
  author: kirakusto
  desktop: 'images/covers/desktop.svg'
  mobile: 'images/covers/mobile.svg'
  alt: 'Закрытые шкафчики из раздевалки, но один открыт, потому что в нём ключ Доки'
authors:
  - vitya-ne
related:
  - js/arrays
  - js/iterator
  - js/array-values
tags:
  - doka
---

## Кратко

Метод `entries()` возвращает новый объект-итератор, созданный из пар индекс и значение для всех элементов массива. Подробнее о том, что такое итератор, можно прочитать в статье «[Итератор](/js/iterator/)».

## Пример

Создадим объект-итератор и получим его значения с помощью `for...of`:

```js
const cities = ['Сен-Тропе', 'Сан-Себастьян', 'Сан-Марино']
const iterator = cities.entries()

for (const item of iterator) {
  console.log(item)
}
// [0, 'Сен-Тропе']
// [1, 'Сан-Себастьян']
// [2, 'Сан-Марино']
```

Создадим объект-итератор и получим индекс и значение первого элемента коллекции:

```js
const generations = ['X', 'Y', 'Z', 'Alpha']
const iterator = generations.entries()

console.log(iterator.next().value)
// [0, 'X']
```

## Как пишется

`Array.entries()` не имеет аргументов.

`Array.entries()` возвращает новый объект-итератор, реализующий протокол перебора массива. При выполнении перебора для каждого элемента коллекции возвращается массив, содержащий индекс элемента в исходном массиве, и его значение.

## Как понять

`entries()` работает схожим образом с методом [`values()`](/js/array-values/), но позволяет получить для каждого элемента индекс и значение.

`Array.entries()` не нужно путать со статическим методом `Object.entries()`, который возвращает массив пар индекс и значение перечисляемых свойств объекта.

## Подсказки

💡 Если массив имеет незаполненные элементы, то объект-итератор, созданный при вызове `entries()`, вернёт при обходе `undefined` как значение для всех незаполненных элементов:

```js
const words = [, 'этот', 'тот']

for (const [index, value] of words.entries()) {
  console.log(index, value)
}
// 0 undefined
// 1 этот
// 2 тот
```
