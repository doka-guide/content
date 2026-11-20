---
title: "`.map()`"
description: "Собирает новый массив из запчастей старого."
baseline:
  - group: array-iteration-methods
    features:
      - javascript.builtins.Array.map
authors:
  - windrushfarer
contributors:
  - skorobaeus
  - nlopin
  - furtivite
  - vitya-ne
editors:
  - tachisis
related:
  - js/arrays
  - js/function-as-datatype
  - js/function-context
tags:
  - doka
---

## Кратко

Метод `map()` позволяет трансформировать один массив в другой при помощи функций-колбэка. Переданная функция будет вызвана для каждого элемента массива по порядку. Из результатов вызова функции будет собран новый массив.

## Пример

Создадим массив квадратов:

```js
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const squares = nums.map(function (num) {
  return num * num
})

console.log(squares)
// [1, 4, 9, 16, 25, 36, 49, 64, 81]
```

Либо можно сделать массив с объектами:

```js
const objects = nums.map(function (num) {
  return {
    field: num,
  }
})

console.log(objects)
// [
//   { field: 1 },
//   { field: 2 },
//   ...
//   { field: 9 }
// ]
```

Интерактивный пример:

<iframe title="Используем map для изменения значений массива." src="demos/index/" height="910"></iframe>

## Как пишется

Как и другим похожим методам, `map()` необходимо передать колбэк-функцию, которая будет возвращать какое-то значение. Именно это значение попадёт в итоговый трансформированный массив.

Функция, которую мы передаём в метод `map()`, может принимать три параметра:

- `item` — элемент массива в текущей итерации;
- `index` — индекс текущего элемента;
- `arr` — сам массив, который мы перебираем.

Суммируем числа, индексы и длины массива:

```js
const nums = [0, 1, 2, 3]

const transformed = nums.map(function (num, index, arr) {
  return num + index + arr.length
})

console.log(transformed)
// [4, 6, 8, 10]
```

## Как понять

Часто возникают ситуации, когда на основе одного массива нужно создать другой массив, как-нибудь трансформировав исходные значения. Это можно сделать, используя обычные циклы [`for`](/js/for/) или [`while`](/js/while/):

```js
const nums = [1, 2, 3, 4, 5]

const transformed = []

for (let i = 0; i < nums.length; i++) {
  const num = nums[i]
  const item = `${i}-${num}`
  transformed.push(item)
}

console.log(transformed)
// ['0-1', '1-2', '2-3', '3-4', '4-5']
```

Задача решена, однако, как и другие встроенные методы массива, `map()` позволяет написать код короче и проще для понимания:

```js
const nums = [1, 2, 3, 4, 5]

const transformed = nums.map(function (num, i) {
  return `${i}-${num}`
})
console.log(transformed)
// ['0-1', '1-2', '2-3', '3-4', '4-5']
```

Результат тот же, но способ короче и проще.

## Подсказки

💡 `map()` возвращает **новый** массив, при этом исходный массив никак не изменится.

💡 При работе с `map()` необходимо возвращать значение из функции-колбэка. Если не вернуть значение — например, забыв обработать какую-то ветку условия, то в итоговом массиве будет `undefined`:

```js
const nums = [1, 2, 3, 4, 5]

const transformed = nums.map(function (num) {
  if (num <= 3) {
    return "less"
  }
  // Забыли обработать эту ветку условия
})
console.log(transformed)
// ['less', 'less', 'less', undefined, undefined]
```

💡 Размер массива, которые возвращает `map()` всегда совпадает с размером массива, который обходится.

💡 Функция-колбэк будет вызвана только для элементов имеющих установленное значения.

Создадим массив, используя конструктор с указанием размера массива `Array(length)`. Все элементы этого массива являются незаполненными:

```js
const newArray = Array(5)
console.log("Размер массива:", newArray.length);
// Размер массива: 5
console.log(newArray)
// [<5 empty items>]
```

Попытаемся использовать метод `map()` для установки в качестве значения элемента его индекс. В результате массив `initedArray` останется таким же пустым как и исходный массив `newArray`:

```js
const initedArray = newArray.map(function (item, index) {
    console.log("элемент:", item)
    return index
})

console.log(initedArray)
// [<5 empty items>]
```

Для решения этой проблемы можно воспользоваться деструктуризацией исходного массива:

```js
const newArray = Array(5)
console.log("Размер массива:", newArray.length)
// Размер массива: 5

const initedArray = [ ...newArray ].map(function (item, index) {
    console.log("элемент:", item)
    return index
})
// элемент: undefined
// элемент: undefined
// элемент: undefined
// элемент: undefined
// элемент: undefined

console.log(initedArray)
// [ 0, 1, 2, 3, 4 ]
```

💡 Для наполнения массива одинаковыми значениями можно воспользоваться рецептом [Создание массива из большого количества повторяющихся элементов](/recipes/array-filling/).

## Передача контекста в колбэк-функцию

Вторым аргументом `map()` может принимать значение, которое будет передано как [контекст выполнения функции-колбэка](/js/function-context/):

```js
const nums = [1, 2, 3]

const otherData = { delta: 5 }

const transformed = nums.map(function (num) {
  // this теперь ссылается на объект otherData
  return num + this.delta
}, otherData)

console.log(transformed)
// [ 6, 7, 8 ]
```

Обратите внимание, что стрелочным функциям нельзя изменить контекст выполнения, поэтому передача второго аргумента ни на что не повлияет:

```js
const nums = [1, 2, 3]

const otherData = { delta: 5 }

const transformed = nums.map((num) => {
  // this.delta в данном случае равен undefined
  return num + this.delta
}, otherData)

console.log(transformed)
// [ NaN, NaN, NaN ]
```

<aside>

📚 Подробнее о контексте выполнения функций можно почитать в статье «[this: контекст выполнения функций](/js/function-context/)».

</aside>
