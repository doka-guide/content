---
title: "`.toSorted()`"
description: "Сортирует элементы массива так же, как и метод sort(), но возвращает новый массив."
authors:
  - alexafcode
related:
  - js/arrays
  - js/array-to-string
  - js/array-with
tags:
  - doka
---

## Кратко

Метод массива `toSorted()` это копия метода `sort()`, но, в отличие от него, не мутирует исходный массив, а возвращает новый отсортированный массив. Все `undefined` элементы сортируются в конец массива.

## Пример

Отсортируем массив с числами:

```js
const numbers = [43, 6, 35, 1, 9, 7, 5, 75, 16];

const sortedNumbers = numbers.toSorted((a, b) => a - b);

console.log(numbers);
// [43, 6, 35, 1, 9, 7, 5, 75, 16];
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
console.log(sortedNames)
// ['', 'Albert', 'Alex', 'Denis', 'Kirill', undefined]
// undefined элементы будут в конце массива.
```

## Как пишется

`Array.toSorted`, также как и `Array.sort`, может принимать в качестве аргумента функцию-компаратор: специальную функцию, определяющую порядок сортировки. Это необязательный параметр. Если функция пропущена, элементы массива конвертируются в строки и сортируются в порядке следования символов Unicode.

## Как понять

Метод `toSorted()` имеет те же аргументы и работает также, как метод `sort()`, но отличается тем, что возвращает новый массив, а не мутирует исходный.

Использование аргумента функции-компаратора позволяет определить порядок сортировки.

## Подсказки

💡 Если нет возможности использовать метод `toSorted()`, можно воспользоваться следующим кодом:

```js
const numbers = [43, 6, 35, 1, 9, 7, 5, 75, 16];

const sortedNumbers = [...numbers].sort((a, b) => a - b);
// используем spread оператор

console.log(numbers);
// [43, 6, 35, 1, 9, 7, 5, 75, 16];
console.log(sortedNumbers);
// [1, 5, 6, 7, 9, 16, 35, 43, 75]
```

<aside>

☝️ При сортировке массива методом `toSorted()` возвращаемый массив будет содержать [поверхностную копию (shallow copy) элементов](/js/shallow-or-deep-clone/), если эти элементы являются объектами. При изменении этих элементов в объекте, изменения будут видны и в исходном массиве.

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
//  ['', 'Albert', 'Alex', 'Denis', 'Kirill', { name: 'Scarlett' }, undefined]

obj.name = 'Dan'; // меняем объект

console.log(sortedNames)
//  ['', 'Albert', 'Alex', 'Denis', 'Kirill', { name: 'Dan' }, undefined]
// в отсортированном массиве, объект также изменился.
```
</aside>
