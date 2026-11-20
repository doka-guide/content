---
title: "`.pop()`"
description: "Удаляет последний элемент массива и возвращает значение удалённого элемента."
baseline:
  - group: array
    features:
      - javascript.builtins.Array.pop
authors:
  - vitya-ne
related:
  - js/array-shift
  - js/array-splice
  - js/array-pop
tags:
  - doka
---

## Кратко

Метод `pop()` удаляет из массива последний элемент и возвращает значение удалённого элемента. Метод `pop()` является изменяющим методом, так как изменяет массив, для которого он был вызван.

## Пример

Удалим из массива последний элемент:

```js
const days = ['пн', 'вт', 'ср', 'чт']
const lastItem = days.pop()

console.log(days)
// ['пн', 'вт', 'ср']

console.log(lastItem)
// чт
```

## Как пишется

`Array.pop` не имеет аргументов.

`Array.pop` возвращает удалённый элемент.

Если массив не имеет элементов, метод вернёт `undefined`:

```js
const array = []
const firstItem = array.pop()

console.log(firstItem)
// undefined
```

## Как понять

Метод `pop()` позволяет удалить из массива последний элемент и получить его значение.

Для удаления последнего элемента также может быть использован метод `splice()`:

```js
const colors = ['red', 'green', 'blue']

colors.splice(-1, 1)

console.log(colors)
// ['red', 'green']
```

## Подсказки

💡 Существует ещё один способ удаления элементов в конце массива. Для этого можно уменьшить значение свойства `length`, определяющего длину массива.

Сократим массив на два элемента:

```js
const numbers = [8, 16, 32, 64, 128]

numbers.length = numbers.length - 2

console.log(numbers)
// [8, 16, 32]
```
