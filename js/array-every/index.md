---
title: "`.every()`"
description: "Проверить по списку, что все сделали домашнее задание? Проще простого с массивами и методом `every`."
baseline:
  - group: array-iteration-methods
    features:
      - javascript.builtins.Array.every
authors:
  - windrushfarer
editors:
  - tachisis
contributors:
  - skorobaeus
related:
  - js/loop
  - js/array-reduce
  - js/boolean
tags:
  - doka
---

## Кратко

Метод массива `.every()` позволяет узнать, удовлетворяют ли все элементы в массиве условию в функции-колбэке. Результатом вызова метода `.every()` будет [boolean-значение](/js/boolean/) `true` или `false`. Если хотя бы один элемент не будет удовлетворять условию, то результат будет `false`.

## Пример

Данные представляют собой информации о пользователях с именем и флагом, онлайн ли сейчас пользователь:

```js
const users = [
  { name: 'Анна', online: true },
  { name: 'Михаил', online: true },
  { name: 'Саша', online: true },
]
```

Проверка, что все пользователи сейчас онлайн, вернёт `true`:

```js
const isAllUsersOnline = users.every(user => {
  return user.online
})
console.log(isAllUsersOnline)
// true
```

Проверка, что всех пользователей зовут «Анна», вернёт `false`:

```js
const isAllUsersAnna = users.every(user => {
  return user.name === 'Анна'
})
console.log(isAllUsersAnna);
// false
```

Интерактивный пример:

<iframe title="every для проверки массива" src="demos/index/" height="980"></iframe>

## Как пишется

В метод `.every()` необходимо передать колбэк-функцию, которая должна возвращать boolean-значение, аналогично методам [Array.filter](/js/array-filter/) или [Array.some](/js/array-some/). Возвращать можно и другие truthy и falsy значения, они [преобразуются согласно типу](/js/typecasting/).

Функция, которую мы передаём в метод `.every()`, может принимать три параметра:

- `item` — элемент массива в текущей итерации;
- `index` — индекс текущего элемента;
- `arr` — сам массив, который мы перебираем.

```js
const balls = ['🎾', '🎾', '🎾', '🎾']

const areAllBallsAreGreen = balls.every(
  (ball, index, arr) => ball === '🎾'
)
// true
```

## Как понять

Метод `.every()` позволяет решить задачу, когда необходимо узнать, что все элементы в массиве соответствуют условию. Метод, по сути, противоположен [.some()](/js/array-some/). В `.every()`, чтобы результат выражения стал `true`, необходимо, чтобы все элементы удовлетворяли условию функции-предиката.

Для сравнения напишем пример через [`for`](/js/for/) или [`while`](/js/while/):

```js
const nums = [10, 303, 16, 20, 21]

let areGreater = true
for (let i = 0; i < nums.length; i++) {
  if (nums[i] < 10) {
    areGreater = false
    break
  }
}
```

Метод `.every()` позволит написать все в одно компактное и понятное выражение.

```js
const nums = [10, 303, 16, 20, 21]
const areGreater = nums.every(num => num >= 10)

console.log(areGreater)
// true
```

<aside>

💡 В примерах код был написан с помощью [двух разных подходов](/tools/programming-paradigms/): императивного и декларативного. Использование метода `.every()` делает код декларативнее.

</aside>
