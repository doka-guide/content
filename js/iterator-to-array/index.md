---
title: "`Iterator.prototype.toArray()`"
description: "Создаёт массив из значений, возвращаемых итератором"
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

Метод `Iterator.prototype.toArray()` возвращает массив значений, полученных при обходе итератора. О том, что такое итератор, можно прочитать в статье «[Итератор](/js/iterator/)».

## Пример

Предположим у нас есть [функция-генератор](/js/generators/) плана по изучению основ JavaScript.

```js
function* getStudyPlan() {
  yield 'Переменные const, let и var'
  yield 'Выражения и инструкции'
  yield 'Области видимости'
}
```

Функция `getStudyPlan()` возвращает итератор. Мы можем переходить от темы к теме, вызывая метод `next()` или [`for...of`](/js/for-of/):

```js
// Создаём итератор
const topics = getStudyPlan()

console.log(topics.next().value)
// Переменные const, let и var

for (const topic of topics) {
  console.log(topic)
}
// Выражения и инструкции
// Области видимости
```

С помощью метода `Iterator.prototype.toArray()` мы можем получить массив значений итератора:

```js
// Создаём итератор
const topics = getStudyPlan()

// Получим все значения итератора:
console.log(topics.toArray())
// [
//   'Переменные const, let и var',
//   'Выражения и инструкции',
//   'Области видимости'
// ]
```

## Как пишется

`toArray()` не имеет аргументов.

`toArray()` возвращает массив всех значений итератора.

## Как понять

Объект-итератор не хранит коллекцию значений, а лишь предоставляет последовательный доступ к элементам коллекции. Такой подход позволяет не тратить лишнюю память, так как часто при переборе необходимо только текущее значение, а не вся коллекция целиком. Однако иногда вместо итерации по коллекции требуется получить все её значения.

Для получения массива значений итератора можно использовать несколько подходов. Рассмотрим это на примере.

Допустим у нас множество значений в виде Set-объекта:

```js
// Создаём множество
const byteSet = new Set()

// Наполняем множество значениями
byteSet.add('000') // 0
byteSet.add('001') // 1
byteSet.add('010') // 2
byteSet.add('011') // 3
```

Создадим итератор множества и получим массив его значений.

- Применяя деструктуризацию.

```js
const byteIterator = byteSet.values()

const arr1 = [ ...byteIterator ]
console.log(arr1)
// [ '000', '001', '010', '011' ]
```

- Используя метод Array.from().

```js
const byteIterator = byteSet.values()

const arr2 = Array.from(byteIterator)
console.log(arr2)
// [ '000', '001', '010', '011' ]
```

Метод итератора `toArray()` решает ту же задачу:

```js
const byteIterator = byteSet.values()

const arr3 = byteIterator.toArray()
console.log(arr3)
// [ '000', '001', '010', '011' ]
```

☝️ Говоря о методах итератора, важно помнить разницу между объектом, реализующим протокол итератора, итерируемым объектом и итератором как объектом-наследником `Iterator.prototype`. Подробнее об этом можно прочитать в статье [«Итератор»](/js/iterator/#iterator-iteratoru-rozn).

В отличии от `Array.from()` метод `toArray()` можно вызвать для объекта, реализующего протокол итератора, но не являющегося итерируемым.

Предположим мы хотим работать с представлением чисел в двоичном виде. Напишем функцию, создания объекта реализующего протокол итератора:

```js
function getByteBinary(max = 7) {
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

Возвращаемый функцией `getByteBinary` объект имеет метод `next()`, но не является итерируемым, потому что не содержит метод `[Symbol.iterator]()`. Попытка использовать цикл `for...of` или применить деструктуризацию приведёт к ошибке:

```js
for (const x of iterator) {
  console.log(x)
}
// TypeError: iterator is not iterable

console.log([...iterator])
// TypeError: iterator is not iterable
```

Создать массив значений итератора с помощью `Array.from()` тоже не получится:

```js
console.log(Array.from(iterator))
// []
```

Однако мы можем получить массив значений с помощью `Iterator.prototype.toArray()`. Метод `toArray` не содержится в цепочке прототипов объекта `iterator`, но может быть вызван через [`call()`](/js/bind-call-apply/#call):

```js
console.log(Iterator.prototype.toArray.call(iterator))
// [ '00', '01', '10' ]
```

Это работает, так как при выполнении `toArray()` от объекта требуется только иметь метод `next()`.

## Подсказки

💡 Метод `toArray()` возвращает массив **всех** значений, только в случае когда итератор находится в начальным состоянии. Значения, полученные при вызовах `next()` не попадут в массив:

```js
function* getPrimeNumbers() {
  yield 2
  yield 3
  yield 5
  yield 7
}

const numbers = getPrimeNumbers()

console.log(numbers.next().value)
// 2

console.log(numbers.toArray())
// [ 3, 5, 7 ]
```

💡 Метод `toArray()` не защищён от вызова на «бесконечном» итераторе. Бесконечным называется итератор, не имеющий конечного состояния (`{ done:true }`).

Например функция-генератор случайных чисел:

```js
function* getRandomNumber() {
  while (true) {
    yield Math.floor(Math.random() * 1000)
  }
}
```
В нашей функции нет условия прекращения цикла поэтому при вызове она вернёт итератор, поддерживающий бесконечное количество вызовов `next()`. При попытке получить массив значений «бесконечного» итератора `toArray()` зависнет в бесконечном цикле и может вызвать переполнение памяти:

```js
const infinityIterator = getRandomNumber()

// Внимание! Небезопасное взаимодействие с бесконечностью!
console.log(infinityIterator.toArray()) // ⚠️ Никогда не завершится!
```
