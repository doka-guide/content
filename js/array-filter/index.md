---
title: "`.filter()`"
description: "Фильтры для воды удерживают вредные частицы, а фильтр JS — плохие значения."
baseline:
  - group: array-iteration-methods
    features:
      - javascript.builtins.Array.filter
authors:
  - windrushfarer
contributors:
  - nlopin
  - skorobaeus
editors:
  - tachisis
related:
  - js/arrays
  - js/return
  - js/array-foreach
tags:
  - doka
---

## Кратко

Метод массива `.filter()` позволяет получить новый массив, отфильтровав элементы с помощью переданной колбэк-функции. Колбэк-функция будет вызвана для каждого элемента массива и по результату функции примет решение включать этот элемент в новый массив или нет.

## Пример

```js
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const evenOnly = nums.filter(function (n) {
  const remainder = n % 2

  return remainder === 0
})
```

Результат будет `[2, 4, 6, 8, 10]`.

```js
const languages = ["Java", "TypeScript", "C#", "JavaScript", "Julia"]

const jLanguages = languages.filter(function (language) {
  return language.startsWith("J")
})
```

Результат будет `['Java', 'JavaScript', 'Julia']`.

Интерактивный пример:

<iframe title="Как работает Array.filter" src="demos/index/" height="890"></iframe>

## Как пишется

Аналогично методу [`.forEach()`](/js/array-foreach/), методу `.filter()` необходимо передать аргументом функцию. Главное отличие — функция должна возвращать [boolean](/js/boolean/), т. е. результатом должен быть `true` или `false`. Такие функции называют _предикатами_.

Это предикат, так как функция возвращает boolean-результат сравнения:

```js
function isPositive(num) {
  return num > 0
}
```

Это предикат, так как метод [`.includes()`](/js/includes/) у строки возвращает boolean:

```js
function hasChar(str, char) {
  return str.includes(char)
}
```

А вот это не предикат, ведь функция возвращает число, даже несмотря на то, что любое число в JavaScript (кроме 0) может быть приведено к `true`:

```js
function sum(a, b) {
  return a + b
}
```

От результата выполнения функции зависит, попадёт ли элемент в итоговый массив:

- `true` — элемент попадёт в итоговый массив.
- `false` — не попадёт в итоговый массив.

```js
function predicate(num) {
  if (num >= 5) {
    return true
  }

  return false
}

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Передаём предикат
nums.filter(predicate)
// [5, 6, 7, 8, 9, 10]

// Либо делаем короче и просто возвращаем результат сравнения
nums.filter((num) => num >= 5)
// [5, 6, 7, 8, 9, 10]
```

Функция, которую мы передаём в метод `.filter()`, принимает три параметра:

- `item` — элемент массива в текущей итерации;
- `index` — индекс текущего элемента;
- `arr` — сам массив, который мы перебираем.

```js
const languages = ["Java", "TypeScript", "C#", "JavaScript", "Julia"]

languages.filter(function (item, index, arr) {
  console.log("Текущий элемент " + item)
  console.log("Индекс " + index)
  console.log("Массив " + arr)

  return index >= 3
})
```

💡 В новом массиве отфильтрованные элементы будут находиться в том же порядке, в котором они были в исходном массиве.

💡 `.filter()` возвращает **новый** массив, при этом исходный массив **никак не изменится**.

💡 Из-за того, что JavaScript имеет динамическую типизацию, то нам ничего не мешает возвращать какое угодно значение из функции. В этом случае JavaScript сам определит его _истинность_. Стоит помнить, что значения `0`, [`undefined`](/js/undefined/), [`null`](/js/null-primitive/) и пустая строка `''` считаются ложными и равны `false`.

Truthy и falsy: [Преобразование типов](/js/typecasting/).

```js
const goods = [
  {
    name: "AirPods",
    description: "Классные беспроводные наушники",
  },
  {
    name: "MacBook Pro",
    description: "Ноутбук на все случаи жизни",
  },
  {
    name: "iPhone",
    description: "",
  },
  {
    name: "Дошик",
  },
]

// Просто возвращаем значения описания
const withDescription = goods.filter(function (item) {
  return item.description
})
```

В результате получим массив с AirPods и MacBook Pro.

Для хорошей читаемости и понимания кода лучше всегда явно возвращать boolean-значение из функции-предиката.

💡 В JavaScript функция, в которой нет явного возвращаемого значения (т. е. нет [`return`](/js/return/)) все равно возвращает `undefined`. Потому, если забыть вернуть результат в функции в методе `.filter()`, то в результате получим пустой массив, так как отфильтруются все элементы.

```js
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const filtered = nums.filter(function (num) {
  // Забыли вернуть результат
  num >= 5
})
```

Получим [`[]`](/js/arrays/), потому что `undefined` считается как `false`.

## Как понять

Метод `.filter()` позволяет получить новый массив с отфильтрованными значениями на основании данных исходного. Несмотря на то, что то же самое можно сделать, используя обычный цикл [`for`](/js/for/) или [`while`](/js/while/), метод `.filter()` позволяет сделать это проще.

Если решать такую задачу без `.filter()`, то выйдет так:

```js
const nums = [1, 2, 3, 4, 5, 6]
const odds = []

for (let i = 0; i < nums.length; i++) {
  if (nums[i] % 2 !== 0) {
    odds.push(nums[i])
  }
}

console.log(odds)
```

Результат будет `[1, 3, 5]`.

`.filter()` позволит сильно сократить код и сделать его понятнее:

```js
const nums = [1, 2, 3, 4, 5, 6]

const odds = nums.filter(function (num) {
  return num % 2 !== 0
})
console.log(odds)
```

Результат — `[1, 3, 5]`.
