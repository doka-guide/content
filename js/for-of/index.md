---
title: "`for`...`of`"
description: "Обходим перечисляемые свойства итерируемого объекта."
authors:
  - vitya-ne
related:
  - js/object
  - js/for-in
  - js/iterator
tags:
  - doka
---

## Кратко

Инструкция `for...of` выполняет цикл обхода перечисляемых свойств итерируемого объекта.

Итерируемый объект можно воспринимать как коллекцию элементов. К итерируемым объектам относятся: Array, String, Map, Set, TypedArray, а также массивоподобные объекты такие как объект `arguments` и DOM-коллекции.

В каждой итерации цикла выполняются инструкции, которые могут ссылаться на значение текущего элемента коллекции.

## Пример

Выводим результат деления каждого элемента массива на 2:

```js
const numbers = [28, 16, 32]

for (const value of numbers) {
  console.log(value/2)
}
// 14
// 8
// 16
```

Выводим форматированное представление для элементов объекта `Map`:

```js
const skills = new Map()

skills.set(1, 'JS')
skills.set(2, 'CSS')
skills.set(3, 'PHP')

for (let value of skills) {
  console.log(`${value[0]}.`, value[1])
}
// 1. JS
// 2. CSS
// 3. PHP
```

## Как пишется

- Обход перечисляемых свойств _итерируемого объекта_, где на каждой итерации:
  - _переменная_ получает значение текущего элемента коллекции;
  - выполняется _инструкция_, имеющая доступ к значению _переменной_.

```js
for (переменная of итерируемый_объект)
  инструкция
```

- Обход перечисляемых свойств _итерируемого объекта_, где на каждой итерации:
  - _переменная_ получает значение текущего элемента коллекции;
  - выполняется `блок инструкций`, имеющих доступ к значению `переменной`.

```js
for (переменная of итерируемый_объект) {
  блок_инструкций
}
```

_переменная_ может определяться с использованием `let`, `const` и `var` или быть объявленной заранее с использованием `let` и `var`. Если текущий элемент является объектом или массивом можно использовать деструктурирующее присваивание:

```js
const skills = new Map()

skills.set(1, 'JS')
skills.set(2, 'CSS')
skills.set(3, 'PHP')

for (let [key, value] of skills) {
  console.log(`${key}.`, value)
}
// 1. JS
// 2. CSS
// 3. PHP
```

В качестве _переменной_ допускается использовать свойство ранее созданного объекта:

```js
const str = 'Румпельштильцхен'
const obj = {}

for (obj.value of str) {
  if (obj.value === 'н') {
    console.log('тут есть "н"');
  }
}
// тут есть "н"
```

Цикл `for...of` может быть прерван с использованием инструкции `break`:

```js
const array = [1, true, null, {}]

for (const value of array) {
  if (value === null) {
    break
  }
  console.log(value);
}
// 1
// true
```

Инструкция `continue` позволяет перейти к следующей итерации, минуя оставшиеся инструкции:

```js
const array = [1, true, null, {}]

for (const value of array) {
  if (value === null) {
    continue
  }
  console.log(value);
}
// 1
// true
// {}
```

## Как понять

Инструкция `for...of` похожа на (`for...in`)[/js/for-in/] тем, что позволяет итерироваться по коллекции. Однако в отличие от `for...in`, `for...of` обходит только значения итерируемых свойств самого объекта.

Сравним поведение:

```js
// создадим массив и добавим к нему свойство name
const array = ['Fm', 'H', 'Cm7']
array.name = 'массив аккордов'

console.log(array)
// ['Fm', 'H', 'Cm7', name: 'массив аккордов']

// обойдём массив используя for...in
for (const item in array) {
  console.log(item);
}
// 0
// 1
// 2
// name

// обойдём массив используя for...of
for (const value of array) {
  console.log(value);
}
// Fm
// H
// Cm7

```

Инструкция `for...of` позволяет использовать единый способ обхода итерируемых объектов разных типов без необходимости их преобразования в массив.

## Подсказки

💡 С помощью `for...of` можно выполнить обход итератора, созданного вручную:

```js
// создадим итератор из объекта String
const iterator = new String("");

iterator[Symbol.iterator] = function () {
  return {
    _tick: 0,
    next: function() {
      if (this._tick >= 3) {
        return { done: true }
      }

      this._tick++

      return {
        value: `я вызван ${this._tick} раз`,
        done: false
      }
    },
  };
};

for (const item of iterator) {
  console.log(item);
}
// я вызван 1 раз
// я вызван 2 раз
// я вызван 3 раз
```

💡 С помощью `for...of` можно выполнить обход функции-[генератора](/js/generators/):

```js
function* getLangs() {
  yield 'java';
  yield 'js';
  yield 'rust';
}

const generator = getLangs()

for (const item of generator) {
  if (item === 'js') {
    console.log('JS тут есть!');
    break
  }
}

// JS тут есть!
```

💡 Следует отметить, что генератор нельзя использовать дважды, даже если цикл был прерван с использованием `break`. Попытаемся использовать обход генератора дважды, используя функцию-генератор из предыдущего примера:

```js
const generator = getLangs()

for (const item of generator) {
  if (item === 'js') {
    console.log('JS тут есть');
    break
  }
}
// JS тут есть!

// обход ничего не выдаст
for (const item of generator) {
    console.log(item);
}
```
