---
title: "`.toSorted()`"
description: "Сортирует элементы массива так же, как и метод sort(), но возвращает новый массив."
baseline:
  - group: array-by-copy
    features:
      - javascript.builtins.Array.toSorted
authors:
  - alexafcode
contributors:
  - solarrust
related:
  - js/arrays
  - js/array-to-string
  - js/array-with
tags:
  - doka
---

## Кратко

Метод массива `toSorted()` сортирует элементы так же, как метод [`sort()`](/js/array-sort/), но не меняет исходный массив, а возвращает новый отсортированный массив.

## Пример

Отсортируем массив с числами:

```js
const numbers = [43, 6, 35, 1, 9, 7, 5, 75, 16];
const sortedNumbers = numbers.toSorted(
  (a, b) => a - b
);
console.log(numbers);
// [43, 6, 35, 1, 9, 7, 5, 75, 16]

console.log(sortedNumbers);
// [1, 5, 6, 7, 9, 16, 35, 43, 75]
```

Отсортируем массив с именами:

```js
const names = [
  'Kirill',
  'Alex',
  'Denis',
  'Albert',
  undefined,
  '',
];
const sortedNames = names.toSorted();

console.log(sortedNames);
// ['', 'Albert', 'Alex', 'Denis', 'Kirill', undefined]
```

## Как пишется

Метод `toSorted()` принимает один необязательный аргумент — функцию-компаратор. Она задаёт порядок сортировки, как в `sort()`.

Компаратор получает два элемента `a` и `b` и возвращает число:

- отрицательное — `a` встанет раньше `b`;
- положительное — `a` встанет после `b`;
- `0` — порядок этих элементов не меняется.

Если компаратор не передать, метод превращает элементы в строки и сравнивает их по кодам символов (кодовым единицам UTF-16). Поэтому без компаратора метод сортирует числа не по величине:

```js
console.log([10, 9, 1, 2].toSorted());
// [1, 10, 2, 9]
```

Элементы `undefined` и пустые ячейки метод не сравнивает, а сразу ставит в конец. Компаратор для них не вызывается.

## Как понять

Главное отличие от `sort()` — исходный массив остаётся прежним. Это удобно, когда исходные данные трогать нельзя: например, массив, который использует другая часть кода.

## Подсказки

💡 Метод `toSorted()` появился в ES2023. С июля 2023 года он работает во всех основных браузерах, а в [Node.js](/tools/nodejs/) — с версии 20. Если вашему коду нужно работать в старых окружениях, скопируйте массив и отсортируйте копию методом `sort()`:

```js
const numbers = [
  43, 6, 35, 1, 9, 7, 5, 75, 16
];

// Используем спред-оператор
const sortedNumbers = [...numbers].sort(
  (a, b) => a - b
);
console.log(numbers);
// [43, 6, 35, 1, 9, 7, 5, 75, 16]

console.log(sortedNumbers);
// [1, 5, 6, 7, 9, 16, 35, 43, 75]
```

💡 Пустые ячейки `toSorted()` заменяет на `undefined`, а `sort()` оставляет пустыми:

```js
console.log([3, , 1].toSorted());
// [1, 3, undefined]

console.log([3, , 1].sort());
// [1, 3, <1 empty item>]
```

☝️ Метод `toSorted()` делает [поверхностную копию (shallow copy)](/js/shallow-or-deep-clone/) массива. Если элементы массива — объекты, новый массив содержит ссылки на те же объекты. Изменения в таком объекте видны в обоих массивах.

```js
const obj = {name: 'Scarlett'};

const names = [
  'Kirill',
  'Alex',
  obj,
  'Denis',
  'Albert',
  undefined,
  '',
];
const sortedNames = names.toSorted();

console.log(sortedNames);
// [
//  '', 'Albert', 'Alex', 'Denis', 'Kirill',
//  { name: 'Scarlett' }, undefined
// ]

// Меняем объект
obj.name = 'Dan';

// В отсортированном массиве объект также изменился
console.log(sortedNames);
// [
//  '', 'Albert', 'Alex', 'Denis', 'Kirill',
//  { name: 'Dan' }, undefined
// ]
```
