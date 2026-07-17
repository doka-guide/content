---
title: "`Iterator.prototype.map()`"
description: "Возвращает итератор, каждое значение которого является результатом колбэк-функции над элементом исходного итератора"
baseline:
  - group: iterator-methods
    features:
      - javascript.builtins.Iterator.map
authors:
  - vitya-ne
related:
  - js/iterator
  - js/iterator-to-array
  - js/iterator-take
tags:
  - doka
---

## Кратко

`Iterator.prototype.map()` создаёт новый итератор, значения которого это результат преобразования элементов исходного итератора с помощью колбэк-функции. Колбэк-функция вызывается только при запросе значения у нового итератора, например при вызове метода [`next()`](/js/iterator/#kak-ponyat). О том, что такое итератор, можно прочитать в статье «[Итератор](/js/iterator/)».

## Пример

Представим, что у нас есть итератор по станциям Лондонского метро 🚇:

```js
// Итератор по массиву
const iterator = [
  { title: "Green Park", opened: 1906, connections: 2 },
  { title: "Bond Street", opened: 1900, connections: 2 },
  { title: "Baker Street", opened: 1863, connections: 4 },
  { title: "St. John's Wood", opened: 1939, connections: 0 } // Abbey Road is nearby!
].values()
```

Необходимо получить итератор, содержащий информацию о станциях в виде строк:

```js
// Создаём итератор по названиям станций
const titleIterator = iterator.map((station) => {
    return `Станция ${station.title} работает с ${station.opened} г.`
})

// Получаем значения
console.log(titleIterator.toArray())
// [
//  "Станция Green Park работает с 1906 г.",
//  "Станция Bond Street работает с 1900 г.",
//  "Станция Baker Street работает с 1863 г.",
//  "Станция St. John's Wood работает с 1939 г."
// ]
```

## Как пишется

`Iterator.prototype.map()` принимает один обязательный аргумент — колбэк-функцию.

Колбэк-функция вызывается только в случае запроса данных и возвращает текущее значение нового итератора.

При вызове колбэк-функция получает аргументы:

- element — текущее значение исходного итератора;
- index — индекс значения.

Если попытаться выполнить `Iterator.prototype.map()` без аргумента или передать не функцию, будет брошена ошибка `TypeError`.

`Iterator.prototype.map()` возвращает новый итератор.

## Как понять

Метод `Iterator.prototype.map()` не стоит путать с методом массива [`Array.prototype.map()`](/js/array-filter/). Оба метода выполняют преобразования элементов коллекции с помощью колбэк-функции, но делают это по-разному.

Для массивов создание новой коллекции происходит в момент вызова метода [`map()`](/js/array-map/).

Итераторы используют «ленивые» вычисления (lazy evaluation): преобразование текущего элемента исходного итератора выполняется только по мере необходимости (при запросе значения нового итератора). Это позволяет экономить память, избегать лишних операций и работать с бесконечными потоками данных.

Рассмотрим, как можно выполнять преобразование данных, полученных из [генератора](/js/generators/).

У нас есть функция-генератор случайных событий:

```js
function* eventGenerator() {
  const eventTypes = ['info', 'warn', 'error', 'debug'];
  let id = 0;
  while (true) {
    const randomIndex = Math.floor(Math.random() * eventTypes.length)
    const type = eventTypes[randomIndex];
    yield { id: id++, type, message: `Событие ${id}: ${type.toUpperCase()}` }
  }
}
```

Создадим генератор и получим несколько случайных значений:

```js
const events = eventGenerator()

console.log(events.next().value)
// { id: 0, type: 'warn', message: 'Событие 1: WARN' }
console.log(events.next().value)
// { id: 1, type: 'debug', message: 'Событие 2: DEBUG' }
```

`events` является итерируемым объектом, но не имеет конечного состояния (`{ done: true }`) и поэтому это «бесконечный» итератор. Как быть, если необходимо преобразовать его значения без изменения исходной функции-генератора?

Создадим новый итератор на основе `events` с помощью метода `map()`:

```js
const eventTypes = events.map(item => item.type)

console.log(eventTypes.next().value)
// error
console.log(eventTypes.next().value)
// info
```

Итератор, созданный методом `Iterator.prototype.map()`, использует исходный итератор как источник данных и разделяет с ним состояние (указатель на текущее значение). Если вызвать `next()` на одном из итераторов, указатель сдвинется для обоих:

```js
const days = ['пн', 'вт', 'ср', 'чт', 'пт'].values()

// Создаём итератор с преобразованием строки в объект:
const transformedDays = days.map((item) => {
  return { day: item }
})

// Первое значение исходного итератора
console.log(days.next().value)
// пн

// Следующее доступное значение исходного итератора — 'вт'
// Значение нового итератора — результат его преобразования:
console.log(transformedDays.next().value)
// { day: 'вт' }

// Следующее доступное значение исходного итератора — 'ср'
console.log(days.next().value)
// ср
```

До сих пор мы использовали в колбэк-функции только текущее значение исходного итератора. Посмотрим на второй параметр — индекс элемента:

```js
// Исходный итератор
const birds = ['🦆', '🦢', '🦉', '🦜'].values()

// Создаём итератор с преобразованием значений
const transformed = birds.map((item, index) => {
  return `Значение:${item}, индекс: ${index}`
})

console.log(birds.next().value)
// 🦆
console.log(transformed.next().value)
// Значение:🦢, индекс: 0
console.log(birds.next().value)
// 🦉
console.log(transformed.next().value)
// Значение:🦜, индекс: 1
```

`index` — это порядковый номер вызова колбэк-функции, а не индекс значения в исходном итераторе. Сдвиг указателя на исходном итераторе влияет на то, какое значение будет обработано, но не влияет на `index` в колбэке.

## Подсказки

Поддержка `map()` как и других [helper-методов](/js/iterator/#iterator-kak-globalnyy-obekt) появилась в Node.js начиная с версии 22.
