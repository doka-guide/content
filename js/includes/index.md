---
title: '`.includes()`'
description: 'Проверяет, есть ли элемент в массиве или подстрока в строке.'
authors:
  - nlopin
related:
  - js/array-find-index
  - js/set
  - js/deal-with-forms
tags:
  - doka
---

## Кратко

Этот метод определён у [массивов](/js/arrays/) и [строк](/js/string/).

Для _массивов_: проверяет, есть ли искомый элемент в массиве.

Для _строк_: проверяет, есть ли искомая подстрока в строке.

Возвращает `true`, если искомый элемент нашёлся и `false` — если нет 😎

## Пример

Метод принимает один аргумент — значение, которое нужно проверить.

Массив:

```js
const dead = ['Джофри', 'Нед Старк', 'Король ночи']
const isJonDead = dead.includes('Джон Сноу')
console.log(isJonDead)
// false

const isJoffreyDead = dead.includes('Джофри')
console.log(isJoffreyDead)
// true
```

Строка:

```js
const text =
  'Посмотри, ведь это рядом наша панда. Мы бежим с тобой как-будто от гепарда.'

console.log(text.includes('панда'))
// true

console.log(text.includes('Обезьяна'))
// false

// поиск идет с учетом регистра
console.log(text.includes('Панда'))
// false
```
