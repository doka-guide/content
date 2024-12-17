---
related:
  - js/arrays
---

Дан одномерный массив. Его элементами могут быть значения разных типов, включая: `undefined`, `null`, `boolean`, `string`, `number`.

Например:

```javascript
const array = [5, undefined, 0, false, '', null, true, 1]
```

Массив может быть разрежённым (sparse array), то есть включать незаполненные элементы (empty slots).

Например, добавим к массиву `array` элемент с индексом 15:

```javascript
array[15] = 'новый элемент'
console.log(array)
// [ 5, undefined, 0, false, '', null, true, 1, <7 empty items>, 'новый элемент']
```

Напишите функцию подсчёта незаполненных элементов массива.
