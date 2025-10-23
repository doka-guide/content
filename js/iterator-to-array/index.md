---
title: "Iterator.prototype.toArray()"
description: "Создаёт массив из всех значений, возвращаемых итератором"
baseline:
  - group: iterator-methods
    features:
      - javascript.builtins.Iterator.toArray
authors:
  - vitya-ne
related:
  - js/iterator
  - js/array-values
  - js/generators
tags:
  - doka
---

## Кратко

Метод `Iterator.prototype.toArray()` выполняет обход итератора и возвращает массив всех его значений.
О том, что такое итератор, можно прочитать в статье [«Итератор»](/js/iterator/).

## Пример

Предположим у нас есть функция-генератор, возвращающая итератор:

```js
function* getArrayMethods() {
  yield 'map';
  yield 'filter';
  yield 'every';
  yield 'some';
}

const iterator = getArrayMethods()
```

Получим все значения итератора:

```js
console.log(iterator.toArray())
// [ 'map', 'filter', 'every', 'some' ]
```

## Как пишется

`toArray()` не имеет аргументов.

`toArray()` возвращает массив всех значений итератора.

## Как понять

Объект-итератор не хранит коллекцию значений, а лишь предоставляет последовательный доступ к элементам коллекции. Такой подход позволяет не тратить лишнюю память, так как часто при переборе необходимо только текущее значение, а не вся коллекция целиком. Однако иногда вместо итерации по коллекции требуется получить все её значения.

Для получения массива значений итератора можно использовать несколько подходов. Рассмотрим это на примере.

Допустим у нас есть итератор, созданный для Set-объекта:

```js
// Создаём множество
const byteSet = new Set()

// Наполняем множество значениями
byteSet.add('000') // 0
byteSet.add('001') // 1
byteSet.add('010') // 2
byteSet.add('011') // 3

// Создаём итератор
const byteIterator = byteSet.values()
```
Получить массив значений из итератора можно:

- Применяя деструктуризацию.
```js
const arr1 = [ ...byteIterator ]
console.log(arr1)
// [ '000', '001', '010', '011' ]
```

- Используя метод Array.from().
```js
const arr2 = Array.from(byteIterator)
console.log(arr2)
// [ '000', '001', '010', '011' ]
```

Метод итератора `toArray()` решает ту же задачу:

```js
const arr3 = byteIterator.toArray()
console.log(arr3)
// [ '000', '001', '010', '011' ]
```

☝️ Говоря о методах итератора, важно помнить разницу между объектом, реализующим протокол итератора, итерируемым объектом и итератором как наследником `Iterator.prototype`. Подробнее об этом можно прочитать в статье [«Итератор»](/js/iterator/).

Метод `toArray()` можно вызвать и для объекта, реализующего протокол итератора, но не являющегося итерируемым.

Предположим мы хотим работать с представлением чисел в двоичном виде.
Напишем функцию, создания объекта реализующего протокол итератора:

```js
function getBinary(max = 7) {
  let number = 0
  const size = max.toString(2).length

  return {
    next() {
      if (number > max) {
        return { done: true }
      }
      // Преобразуем число в строку в двоичном виде
      const value = number.toString(2).padStart(size, '0')
      number++
      return { value, done: false }
    }
  }
}

const iterator = getByteBinary(2)

console.log(iterator.next())
// { value: '00', done: false }
console.log(iterator.next())
// { value: '01', done: false }
console.log(iterator.next())
// { value: '10', done: false }
console.log(iterator.next())
// { done: true }
```

Возвращаемый функцией `getBinary` объект имеет метод `next()`, но не является итерируемым, потому что не содержит метод `[Symbol.iterator]()`. Попытка использовать цикл `for...of` или применить деструктуризацию приведёт к ошибке:

```js
for (const x of iterator) {
  console.log(x)
}
// TypeError: iterator is not iterable

console.log([...iterator])
// TypeError: iterator is not iterable
```

Создать массив с помощью `Array.from()` тоже не получится:

```js
console.log(Array.from(iterator))
// []
```

Однако мы можем получить массив всех значений с помощью `Iterator.prototype.toArray()`. Метод `toArray` не содержится в цепочке прототипов объекта `iterator`, но может быть вызван через `call()`:

```js
console.log(Iterator.prototype.toArray.call(iterator))
// [ '00', '01', '10' ]
```

Это работает, так как при выполнении `toArray()` от объекта требуется только иметь метод `next()`.

