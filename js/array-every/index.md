---
title: "Array.every"
authors:
  - windrushfarer
editors:
  - tachisis
contributors:
  - skorobaeus
tags:
  - doka
---

## Кратко

Метод массива `Array.every` позволяет узнать, удовлетворяют ли все элементы в массиве условию в функции-колбэке. Результатом вызова метода `Array.every` будет boolean-значение `true` или `false`. Если хотя бы один элемент не будет удовлетворять условию, то результат будет `false`.

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
// Проверим, что все пользователи онлайн
const isAllUsersOnline = users.every(user => {
  return user.online
})
```

Проверка, что всех пользователей зовут «Анна», вернёт `false`:

```js
const isAllUsersAnna = users.some(num => {
  return user.name === 'Анна'
})
```

Интерактивный пример:

<iframe title="Используем every для проверки массива" src="demos/index.html" height="980"></iframe>

## Как пишется

В метод `Array.every` необходимо передать колбэк-функцию, которая должна возвращать boolean-значение, аналогично методам [Array.filter](/js/array-filter) или [Array.some](/js/array-some). Возвращать можно и другие truthy и falsy значения, они [преобразуются согласно типу](/js/typecasting/).

Функция, которую мы передаём в метод `Array.every`, может принимать три параметра:

- `item` — элемент массива в текущей итерации;
- `index` — индекс текущего элемента;
- `arr` — сам массив, который мы перебираем.

```js
const balls = ['🎾', '🎾', '🎾', '🎾']

const areAllBallsAreGreen = balls.every((ball, index, arr) => ball === '🎾') // true
```

## Как это понять

Метод `Array.every` позволяет решить задачу, когда необходимо узнать, что все элементы в массиве соответствуют условию. Метод, по сути, противоположен [Array.some](/js/array-some). В `Array.every`, чтобы результат выражения стал `true`, необходимо, чтобы все элементы удовлетворяли условию функции-предиката.

Для сравнения напишем пример через `for` или `while`:

```js
const nums = [10, 303, 16, 20, 21]

let areGreater = true;

for (let i = 0; i < nums.length; i++) {
  if (nums[i] < 10) {
    areGreater = false;
    break;
  }
}
```

Метод `Array.every` позволит написать все в одно компактное и понятное выражение.

```js
const nums = [10, 303, 16, 20, 21]

const areGreater = nums.every(num => num >= 10)  // true
```

:::callout💡

В примерах код был написан с помощью [двух разных подходов](/js/programming-paradigms): императивного и декларативного. Использование метода `Array.every` делает код декларативнее.

:::
