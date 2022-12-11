---
title: "Спред-синтаксис `...`"
description: "Упрощает создание объектов и массивов на основе других объектов и массивов."
authors:
  - nlopin
editors:
  - tachisis
related:
  - js/iterator
  - js/array-from
  - js/object
tags:
  - doka
---

## Кратко

Спред-синтаксис (spread) `...` позволяет передавать итерируемые коллекции (например, [массивы](/js/arrays/) или [строки](/js/string/)) как список аргументов функции или добавлять содержащиеся в них элементы в новый массив.

Спред применятся и для объектов, чтобы копировать пары ключ-значение из одного объекта в другой.

## Пример

При вызове функции использовать значения из массива как аргументы:

```js
function multiplyThreeNumbers(a, b, c) {
  return a * b * c
}

const nums = [1, 2, 3]

console.log(multiplyThreeNumbers(...nums))
// 6
```

В массиве скопировать элементы из другого массива в новый:

```js
const donor = ['это', 'старые', 'значения']
const newArray = [...donor, 1, true, 'мама']

console.log(newArray)
// ['это', 'старые', 'значения', 1, true, 'мама']
```

У объекта скопировать свойства из другого объекта в новый:

```js
const persona = { name: 'Иван', lastName: 'Объектов'}
const userData = { ...persona, username: 'killer3000' }

console.log(userData)
// {
//    name: 'Иван',
//    lastName: 'Объектов',
//    username: 'killer3000'
// }
```

## Как понять

Спред-синтаксис легче всего изучать на примерах. Есть три контекста, в которых он применяется.

### При вызове функции

Часто встречается ситуация, когда мы хотим использовать данные из итерируемой коллекции в качестве аргументов функции. Чаще всего такая коллекция — массив. Если функция не умеет принимать массив аргументом, то придётся доставать элементы вручную:

```js
function multiplyThreeNumbers(a, b, c) {
  return a * b * c
}

const nums = [1, 2, 3]

console.log(multiplyThreeNumbers(nums[0], nums[1], nums[2]))
// 6
```

Если элементов становится больше, доставать значения вручную становится неудобно. Чтобы решить эту проблему, в старых версиях языка использовали метод `apply()`. Этот метод принимает первым аргументом значение [`this`](/js/function-context/), а вторым — список аргументов для вызова функции:

```js
function multiplyThreeNumbers(a, b, c) {
  return a * b * c
}

const nums = [1, 2, 3]

console.log(multiplyThreeNumbers.apply(null, nums))
// 6
```

Такой синтаксис сложно читается, его нельзя использовать при создании объектов с помощью конструктора `new`. Его упростили до спред-синтаксиса. В этом случае элементы как бы выкладываются из списка в нужном порядке:

```js
function multiplyThreeNumbers(a, b, c) {
  return a * b * c
}

const nums = [1, 2, 3]

console.log(multiplyThreeNumbers(...nums))
// 6
```

Если в массиве будет больше элементов, чем параметров функции, то будут использованы только те элементы, которые идут первыми по порядку:

```js
function multiplyThreeNumbers(a, b, c) {
  return a * b * c
}

const nums = [1, 2, 3, 5, 6]

console.log(multiplyThreeNumbers(...nums))
// 6
```

### При создании массивов с помощью литерала `[]`

Спред-синтаксис решает задачу создания нового массива с использованием данных из другого массива. Без него неудобно создавать массив, который содержит элементы другого. Приходится использовать методы массива, например, `concat()`:

```js
const watchedMovies = ['Rocky', 'Terminator 2', 'The Matrix']
const watchedVideos = ['Rick&Morty', 'lofi hip hop radio'].concat(watchedMovies)

console.log(watchedVideos)
// ['Rick&Morty', 'lofi hip hop radio', 'Rocky', 'Terminator 2', 'The Matrix']
```

Спред решает эту проблему лучше:

```js
const watchedMovies = ['Rocky', 'Terminator 2', 'The Matrix']
const watchedVideos = ['Rick&Morty', 'lofi hip hop radio', ...watchedMovies]

console.log(watchedVideos)
// ['Rick&Morty', 'lofi hip hop radio', 'Rocky', 'Terminator 2', 'The Matrix']

```

Таким образом можно создать копию существующего массива:

```js
const watchedMovies = ['Rocky', 'Terminator 2', 'The Matrix']
const myWatchedMovies = [...watchedMovies]
```

Или склеить несколько массивов в один:

```js
const movies = ['Rocky', 'Terminator 2', 'The Matrix']
const series = ['Prison Break', 'Rick&Morty', 'Lost']

const watched = [...movies, ...series]
// [
//  'Rocky',
//  'Terminator 2',
//  'The Matrix',
//  'Prison Break',
//  'Rick&Morty',
//  'Lost'
// ]
```

<aside>

☝️ При использовании спред-синтаксиса элементы массива копируются только на один уровень вложенности. Если массив содержит объекты, то это будут те же самые объекты, что и в исходном массиве. Для глубокого копирования пользуйтесь библиотеками, например, [_lodash_](https://lodash.com/docs/4.17.15#cloneDeep)

</aside>

Пример поведения с уровнем вложенности больше одного:

```js
const users = [{ name: 'Иван', lastName: 'Объектов' }]
const copyUsers = [...users]

copyUsers[0].name = 'Николай'
console.log(users[0])
// { name: 'Николай', lastName: 'Объектов' }
```

### При создании объекта с помощью литерала `{}`

По аналогии с массивами, спред-синтаксис решает проблему копирования свойств в новый объект. В версии языка без спреда для копирования использовался метод `Object.assign()`, который принимал два объекта — куда копировать свойства и откуда:

```js
const person = { name: 'Иван', lastName: 'Объектов' }
const userData = Object.assign({ username: 'killer3000' }, person)

console.log(userData)
// {
//    name: 'Иван',
//    lastName: 'Объектов',
//    username: 'killer3000'
// }
```

Спред упрощает код и делает его читабельнее:

```js
const person = { name: 'Иван', lastName: 'Объектов' }
const userData = { username: 'killer3000', ...person }

console.log(userData)
// {
//    name: 'Иван',
//    lastName: 'Объектов',
//    username: 'killer3000'
// }
```

Если свойства в новом и старом объекте совпадают, то будет использоваться значение свойства, которое шло последним:

```js
const person = { name: 'Иван', lastName: 'Объектов' }
const userData = { name: 'Николай', ...person }

console.log(userData)
// { name: 'Иван', lastName: 'Объектов' }
```

Если поставить спред в начало, то будет использоваться новое имя:

```js
const person = { name: 'Иван', lastName: 'Объектов' }
const userData = { ...person, name: 'Николай' }

console.log(userData)
// { name: 'Николай', lastName: 'Объектов' }
```

<aside>

☝️ При использовании спред-синтаксиса свойства объекта копируются только на один уровень вложенности. Это называется [поверхностным копированием](/js/shallow-or-deep-clone/). Для глубокого копирования пользуйтесь библиотеками, например, [lodash](https://lodash.com/docs/4.17.15#cloneDeep)

</aside>
