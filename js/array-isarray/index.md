---
title: "`Array.isArray()`"
description: "Отличит массив в толпе объектов."
authors:
  - yurlovr
editors:
  - tachisis
related:
  - js/objects-objects-everywhere
  - js/arrays
  - js/object
tags:
  - doka
---

## Кратко

Статический метод `Array.isArray()` проверяет, является ли переданный аргумент массивом. Возвращает `true`, если является, и `false` — если нет.

## Пример

```js
const arr = [1, 2, 3]
const emptyArr = []
const bool = true
const num = 5

console.log(Array.isArray(arr))
// true
console.log(Array.isArray(emptyArr))
// true
console.log(Array.isArray(bool))
// false
console.log(Array.isArray(num))
// false
```

## Как пишется

`Array.isArray()` принимает один аргумент — переменную или значение, которое вы хотите проверить.

Возвращает `true`, если в переменной хранится массив и `false` во всех остальных случаях.

## Как понять

Время от времени необходимо проверить, хранится в переменной массив или что-то другое. Так как массивы не являются в JavaScript отдельным типом, то проверка с помощью `typeof` не подойдёт:

```js
const a = []
console.log(typeof a)
// 'object'
```

Чтобы проверить, является ли значение массивом, существует метод `Array.isArray()`.

Метод принимает один аргумент – значение, которое мы хотим проверить: `Array.isArray(значение)`.

Если был передан массив, то вернётся `true`, иначе — `false`.

Метод возвращает `true` при любом переданном массиве, неважно, как он был создан и какие данные в нём находятся:

```js
console.log(Array.isArray([]))
// true
console.log(Array.isArray(new Array(1, 2, 3)))
// true
console.log(Array.isArray([undefined]))
// true
console.log(Array.isArray(Array()))
// true
console.log(Array.isArray(Array.prototype))
// true
```

Во всех остальных случаях возвращается `false`:

```js
console.log(Array.isArray({}))
// false
console.log(Array.isArray(1))
// false
console.log(Array.isArray('array'))
// false
```

### Массивоподобные объекты

Метод возвращает `false` при переданных массивоподобных элементах. Например, на [`NodeList`](/js/htmlcollection-and-nodelist/), [`HTMLCollection`](/js/htmlcollection-and-nodelist/), [`arguments`](/js/function-arguments-object/).

```js
const nodes = document.querySelectorAll('div')
console.log(Array.isArray(nodes))
// false
```

### Типизированные массивы

Метод возвращает `false` при любых переданных типизированных массивах: Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array.

```js
const typedArray = new Uint8Array()
console.log(Array.isArray(typedArray))
// false
```
