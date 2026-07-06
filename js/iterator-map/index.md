---
title: "Iterator.prototype.map()"
description: "Возвращает итератор, каждое значение которого является результатом колбэк-функции над элеменетом исходного итератора"
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

`Iterator.prototype.map()` создаёт новый итератор, значения которого являются результатом преобразования значений исходного итератора с помощью колбэк-функции. Колбэк-функция вызывается только при запросе следующего значения у нового итератора, например при вызове метода [`next()`](/js/iterator/#kak-ponyat). О том, что такое итератор, можно прочитать в статье [«Итератор»](/js/iterator/).

## Пример

Представим, что у нас есть итератор по станциям Лондонского метро:

```js
// Итератор для массива
const iterator = [
  { title: "Green Park", opened: 1906, connections: 2 },
  { title: "Bond Street", opened: 1900, connections: 2 },
  { title: "Baker Street", opened: 1863, connections: 4 },
  { title: "St. John's Wood", opened: 1939, connections: 0 },
].values();
```

Необходимо получить итератор, содержащий только названия станций:

```js
// Создаём итератор по названиям станций
const titleIterator = iterator.map(station => station.title)

// Получаем значения
console.log(titleIterator.toArray())
// [ 'Green Park', 'Bond Street', 'Baker Street', "St. John's Wood" ]
```

## Как пишется

`Iterator.prototype.map()` принимает один обязательный аргумент — колбэк-функцию.

Функция вызывается только в случае запроса данных и возвращает текущее значение нового итератора.

При вызове колбэк-функция получает аргументы:

- element — текущее значение исходного итератора;
- index — индекс значения;

Если попытаться выполнить `Iterator.prototype.map()` без аргумента или передать не функцию, будет брошена ошибка `TypeError`.

`Iterator.prototype.map()` возвращает новый итератор.

## Как понять

Метод `Iterator.prototype.map()` не стоит путать с методом массива [`Array.prototype.map()`](/js/array-filter/). Оба метода выполняют преобразования элементов коллекции с помощью колбэк-функции, но делают это по разному.

Для массивов, преобразование всей исходной коллекции происходит в момент вызова метода [`map()`](/js/array-map/).

Итераторы используют «ленивые» вычисления (lazy evaluation): преобразование выполняется только по мере необходимости (при получении значения нового итератора) и затрагивает текущий элемент исходного итератора. Это позволяет не перегружать память и избегать лишних операций.

Рассмотрим, как можно выполнять преобразование данных полученных из [генератора](/js/generators/).

У нас есть функция-генератор случайных событий:

```js
function* eventGenerator() {
  const eventTypes = ['info', "warn", 'error', 'debug'];
  let id = 0;
  while (true) {
    const randomIndex = Math.floor(Math.random() * eventTypes.length)
    const type = eventTypes[randomIndex];
    yield { id: id++, type, message: `Событие ${id}: ${type.toUpperCase()}` }
  }
}
```

Создадим итератор и получим несколько значений:

```js
const events = eventGenerator()

console.log(events.next().value)
// { id: 0, type: 'warn', message: 'Событие 1: WARN' }
console.log(events.next().value)
// { id: 1, type: 'debug', message: 'Событие 2: DEBUG' }
```

Создадим несколько новых итераторов на основе значений исходного итератора `events`:

```js
const types = events.map(event => event.type)
const ids = events.map(event => event.id.toString().padStart(4, '0'))

console.log(types.next().value)
// info
console.log(ids.next().value)
// 0003
```
