---
title: "Поверхностное и глубокое копирование"
description: "Полностью скопировать объект и массив иногда не просто."
authors:
  - nlopin
contributors:
  - rrramble
related:
  - js/spread
  - js/ref-type-vs-value-type
  - js/objects-objects-everywhere
tags:
  - article
---

## Кратко

Копировать переменные можно тремя способами:

- Использовать знак «равно» (оператор присваивания). Если переменная хранит примитив, то данные скопируются, если переменная содержит объект то копируется только ссылка на объект. Примитивы это: число number, [большое целое число](/js/bigint/), [булев тип](/js/boolean/), undefined, null, [символ](/js/symbol/).
- Использовать [спред синтаксис (троеточие)](https://doka.guide/js/spread/). Это **поверхностное копирование** (shallow), так как копируются данные только из _первого_ уровня вложенности; на данные 2-го уровня и глубже копируется только ссылка.
- [Функция `structuredClone()`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) выполнит **глубокое** (полное, deep) копирование, но не во всех версиях браузеров она сработает.

## Проблема поверхностного копирования

Поверхностное копирование работает быстро и его достаточно для несложного кода или для одноуровневых структур. Проблемы появляются при копировании вложенных структур:

```js
// 1. Поверхностное копирование одноуровневой структуры выполняется без проблем
const productNames = ['Носки', 'Штаны', 'Кепка']
const clonedNames = [...productNames]

// 2. Поверхностное копирование сложной структуры
// может иметь неожиданные результаты: см. последующие примеры
const itemsInCart = [
  { product: 'Носки', quantity: 3 },
  { product: 'Штаны', quantity: 1 },
  { product: 'Кепка', quantity: 1 },
]

const clonedCart = [...itemsInCart]
```

Если изменить клонированную переменную `clonedCart`, то исходная переменная `itemsInCart` тоже изменится!:

```js
// Меняем элемент с индексом 1 в скопированном объекте
clonedCart[1].quantity = 999

// Меняется скопированный объект
console.log(clonedCart)
// [
//    { product: 'Носки', quantity: 3 },
//    { product: 'Штаны', quantity: 999 },
//    { product: 'Кепка', quantity: 1 },
// ]

// И исходный объект тоже меняется!
console.log(itemsInCart)
// [
//    { product: 'Носки', quantity: 3 },
//    { product: 'Штаны', quantity: 999 },
//    { product: 'Кепка', quantity: 1 },
// ]
```

Объект и его вариант — массив это непримитивный тип данных. Они хранятся [по ссылке](/js/ref-type-vs-value-type/#ssylochnye-tipy-dannyh). Присвоение с помощью знак «равно» копирует в новую переменную не данные, а _ссылку_ на данные.

В итоге разные массивы ссылаются на один и тот же объект:

```js
console.log(itemsInCart[1] === clonedCart[1])
// true
```

![Результат поверхностного копирования массива](images/shallow.png)

## Как получить глубокую копию

### Функция `structuredClone()`

Функция [`structuredClone()`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) для глубокого копирования появилась в JavaScript начиная с версии EcmaScript 2021. Она работает во всех текущих версиях поддерживаемых интернет-браузеров с 2021—2022 года. Информация о [функции `structuredClone()` на «Can I Use»](https://caniuse.com/?search=structuredClone).

### Функция `cloneDepp()` из библиотеки Lodash

Функция [`cloneDeep()`](https://lodash.com/docs/4.17.15#cloneDeep) для глубокого копирования есть в популярной библиотеке утилит Lodash. Функция используется в десятках тысяч проектов каждый день. Исходный код библиотеки открыт, можно изучить [исходный код функции глубокого копирования](https://github.com/lodash/lodash/blob/4.17.15/lodash.js#L2620).

```js
import cloneDeep from 'lodash.clonedeep'

const deep = cloneDeep(itemsInCart)
console.log(itemsInCart[1] === deep[1])
// false
```

### Преобразовать в JSON и обратно

Самый простой и быстрый способ — преобразовать копируемый объект в JSON-строку с помощью метода `JSON.stringify()` и снова преобразовать в объект методом `JSON.parse()`.

```js
const clonedCart = JSON.parse(JSON.stringify(itemsInCart))
console.log(itemsInCart[1] === clonedCart[1])
// false
```

![Результат глубокого копирования массива](images/deep.png)

У этого метода есть ограничение — копируемые данные должны быть [сериализуемы](https://ru.wikipedia.org/wiki/%D0%A1%D0%B5%D1%80%D0%B8%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F).

Примеры несериализуемых данных: `undefined`, функции, [Symbol](/js/symbol/).

Массивы и объекты - сериализуемы. Но если их ключами или значениями будут несериализуемые данные, то результатом будет:

- для массивов: такие значения будут превращены в null;
- для объектов: такие значения будут опущены, а если symbol является ключом объекта, то он будет проигнорирован, даже при использовании функции replacer.

```js
// 1. Копирование сложного массива с помощью JSON.stringify(), JSON.parse()
const arr = [
  undefined,
  function() { console.log('aaa') },
  Symbol('foo'),
]

const copyArr = JSON.parse(JSON.stringify(arr))

console.log(copyArr)
// [null, null, null]

// 2. Копирование сложного объекта с помощью JSON.stringify(), JSON.parse()
const obj = {
  a: undefined,
  method: () => {},
  [Symbol('foo')]: 'foo',
}
const copyObj = JSON.parse(JSON.stringify(obj), function(k, v) {
  if (typeof k === 'symbol') {
    return 'символ'
  }

  return v
})

console.log(copyObj)
// {}
```
