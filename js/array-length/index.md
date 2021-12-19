---
title: "`[].length`"
description: "Свойство, которое возвращает количество элементов в массиве."
authors:
  - nlopin
editors:
  - tachisis
tags:
  - doka
---

## Кратко

Свойство `length` возвращает количество элементов в массиве. Если элементов нет, то свойство возвращает 0.

## Пример

```js
const series = ['Silicon Valley', 'Game of Thrones', 'Rick & Morty', 'Gravity Falls']
console.log(series.length)
// 4

const empty = []
console.log(series.length)
// 0
```

## Как понять

Свойство `length` хранит количество ячеек в массиве. Строго говоря, количество ячеек может быть больше, чем количество элементов в массиве, но на практике они почти всегда совпадают.

Значение свойства `length` — целое положительное число в диапазоне от 0 до 2<sup>32</sup>.

### Запись в свойство `length`

Свойство `length` перезаписываемое, вы можете записать в него любое число из диапазона возможных значений. Это изменит количество ячеек массива.

Если уменьшить значение свойства `length`, то из конца массива будут отброшены элементы, которые не входят в новый размер массива:

```js
const series = ['Silicon Valley', 'Game of Thrones', 'Rick & Morty', 'Gravity Falls']
console.log(series.length)
// 4

series.length = 2
console.log(series)
// ['Silicon Valley', 'Game of Thrones']
```

Если увеличить значение свойства `length`, то в конец массива добавятся пустые ячейки массива. Значение в них не будет установлено и они будут игнорироваться при обходе массива:

```js
const todos = ['buy milk', 'contribute to Doka']
console.log(todos.length)
// 2

todos.length = 4
console.log(todos)
// ['buy milk', 'contribute to Doka', <2 empty slots>]

todos.forEach(function(todo, index) {
  console.log(`${index + 1}. todo`)
})
// 1. buy milk
// 2. contribute to Doka
```

### Случаи, когда `length` не совпадает с количеством элементов в массиве

Корректнее всего говорить, что свойство `length` хранит количество ячеек доступных для записи в массиве, а не количество элементов. Они почти всегда совпадают, но есть случаи, когда в массиве больше ячеек, чем значений. Разберём эти случаи.

1️⃣ При создании пустого массива с помощью конструктора `new Array()` можно указать количество ячеек в массиве. Тогда количество ячеек и количество элементов не будут совпадать:

```js
const emptyArray = new Array(100)
console.log(emptyArray.length)
// 100
```

Такой проблемы не случится, если создавать массив с помощью литерала:

```js
const anotherEmptyArray = []
console.log(anotherEmptyArray.length)
// 0
```

2️⃣ При записи нового элемента в индекс далеко за пределами массива. В этом случае между последним элементом и новым появляется «дыра» из пустых ячеек:

```js
const priorities = ['sleep', 'eat', 'drink']
console.log(priorities.length)
// 3

priorities[999] = 'work'
console.log(priorities.length)
// 1000
console.log(priorities)
// ['sleep', 'eat', 'drink', <996 empty slots>, 'work']
```

3️⃣ При ручном увеличении значения свойства `length`:

```js
const todos = ['buy milk', 'contribute to Doka']
console.log(todos.length)
// 2

todos.length = 4
console.log(todos)
// ['buy milk', 'contribute to Doka', <2 empty slots>]
```
