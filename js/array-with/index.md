---
title: "`.with()`"
description: "Создаёт новый массив изменяя один элемент исходного"
authors:
  - vitya-ne
related:
  - js/arrays
  - js/ref-type-vs-value-type
tags:
  - doka
---

## Кратко

Метод `with()` возвращает новый массив, позволяя изменять значение одного из элементов, без изменения исходного массива.

## Пример

Получаем новый массив, изменяя элемент 'white' на 'blue':

```js
const colors = ['red', 'green', 'white']

const newColors = colors.with(2, 'blue')

console.log(newColors)
// ['red', 'green', 'blue']
console.log(colors)
// ['red', 'green', 'white']
```

Получаем новый массив, используя отрицательный индекс для изменения элемента 'white':
```js
const colors = ['red', 'green', 'white']

const newColors = colors.with(-1, 'blue')

console.log(newColors)
// ['red', 'green', 'blue']
console.log(colors)
// ['red', 'green', 'white']
```

## Как пишется

`Array.with()` принимает два обязательных аргумента:
- индекс элемента, который нужно изменить;
- новое значение изменяемого элемента.

Индекс элемента может быть:
- положительный - для доступа к элементам от начала массива;
- отрицательный - для доступа к элементам с конца массива. Например: `-1` - индекс последнего элемента, `-2` - предпоследнего.

`Array.with()` возвращает массив, с изменённым элементом.

## Как понять

При работе с массивами иногда требуется получить новый массив, содержащий измененную копию исходного массива.

Например, напишем функцию для изменения значения первого элемента массива используя метод `with()`:

```js
const updateFirstItem = (array, value) => {
  return array.with(0, value);
}
```

Проверим, как она работает и убедимся что исходный массив остался прежним.

```js
const bears = ['Grizzly', 'Polar', 'Brown']
const result = updateFirstItem(bears, 'Panda')
console.log(result)
// ['Panda', 'Polar', 'Brown']
console.log(bears)
// ['Grizzly', 'Polar', 'Brown']

```

А вот для сравнения функция, меняющая значение первого элемента в массиве непосредственно:

```js
const updateFirstItemDanger = (array, value) => {
  array[0] = value;
  return array;
}
```

Вызов этой функции приведет к изменению исходного массива. В большинстве случаев такого кода следует избегать!

```js
const bears = ['Grizzly', 'Polar', 'Brown'];
const result = updateFirstItemDanger(bears, 'Panda')
console.log(result);
// ['Panda', 'Polar', 'Brown']
console.log(bears);
// ['Panda', 'Polar', 'Brown']

```

☝️ Обратите внимание: причина изменения исходного массива, при использовании функции updateFirstItemDanger(), в том что массив является ссылочным типом данных.
Подробнее об этом можно почитать в разделе [Хранение по ссылке и по значению](https://doka.guide/js/ref-type-vs-value-type/#mutacii-i-neizmenyaemost).

## Подсказки

💡 `with()` это удобный способ избежать мутации исходного массива.

💡 Благодаря поддержке отрицательных индексов в `with()` значительно упрощается способ изменения элементов в конце массива. Например для изменения последнего элемента массива без использования `with()` дополнительно потребуется:
- узнать размер массива;
- вычислить индекс последнего элемента;

💡 `with()` является удобным способом при использовании объединения вызовов функций обработки массива в цепочку. Например:

```js
const days = ['', 'пн', 'вт', 'ср', 4]

console.log(days.filter(
  item => typeof item === 'string'
).with(0, 'вс').map(
  item => item.toUpperCase()
))
// [ 'ВС', 'ПН', 'ВТ', 'СР' ]
```

💡 при создании нового массива `with()` выполнит преобразование всех незаполненных ячеек к `undefined`:

```js
const numbers = [0, , 11, 20, , 30];

console.log(numbers.with(2, 10))
// [ 0, undefined, 10, 20, undefined, 30 ]
```

💡 попытка вызвать `with()` cо значением индекса за пределами допустимых значений ( index >= array.length || index < -array.length ) приведет к возникновению ошибки RangeError

```js
const flowers = ['rose', 'tulip'];

try {
  console.log(flowers.with(2, 'snowdrop'));
} catch (err) {
  console.log('Поймали ошибку! Вот она: ', err.message)
}

// Поймали ошибку! Вот она:  Invalid index : 2
```







