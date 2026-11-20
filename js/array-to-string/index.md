---
title: "`.toString()`"
description: "Возвращает строковое представление массива."
baseline:
  - group: array
    features:
      - javascript.builtins.Array.toString
authors:
  - vitya-ne
related:
  - js/arrays
  - js/object-tostring
  - js/string
tags:
  - doka
---

## Кратко

Метод `toString()` возвращает представление массива в виде строки, состоящей из значений всех элементов массива, разделённых запятой.

## Пример

Создадим строку из массива:

```js
const menuItems = ['Файл', 'Редактирование', 'Просмотр']
const menuStr = menuItems.toString()

console.log(menuStr)
// Файл,Редактирование,Просмотр
```

## Как пишется

`Array.toString()` не имеет аргументов.

`Array.toString()` возвращает строку, состоящую из строкового представления значений всех элементов массива, разделённых запятой.

## Как понять

`toString()` является одним из базовых методов, реализованных в `Object.prototype`. Массивы переопределяют этот метод. Согласно спецификации ECMAScript, метод `Array.toString()` при вызове обращается к методу `.join()`.

Проверим, что результат работы `toString()` и `.join()` совпадает:

```js
const years = [1970, 1980, 1990]
console.log(years.toString())
console.log(years.join())
// 1970,1980,1990
// 1970,1980,1990
```

Если метод `.join()` не может быть вызван, будет вызван `Object.prototype.toString()`:

```js
const years = [1970, 1980, 1990]

// Обнуляем возможность вызывать .join()
years.join = null

console.log(years.toString())
// [object Array]
```

Некоторые значения элементов в строковом представлении будут изменены.

`null`, `undefined`, а также незаполненные элементы будут представлены пустой строкой:

```js
const numbers = [0, , 1, undefined, null, Infinity]
console.log(numbers.toString())
// 0,,1,,,Infinity
```

Значения, не являющиеся примитивными типами, будут представлены соответствующим строковым представлением:

```js
const obj = {name: 'Firefox'}
const func = obj => obj.name
const arr = [[42]]
const objects = [obj, func, arr]

console.log(objects.toString())
// [object Object],obj => obj.name,42
```

## Подсказки

💡 Метод `toString()` вызывается автоматически, когда массив должен быть представлен как строка:

```js
const names = ['Рататоск', 'Иггдрасиль']
console.log(names + ' и Хвергельмир')
// Рататоск,Иггдрасиль и Хвергельмир
```
