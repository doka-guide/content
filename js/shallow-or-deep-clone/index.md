---
title: "Поверхностное и глубокое копирование"
description: "При копировании объектов и массивов в JavaScript, данные копируются только на один уровень вглубь."
authors:
  - nlopin
related:
  - js/spread
  - js/ref-type-vs-value-type
  - js/objects-objects-everywhere
tags:
  - article
---

## Кратко

При копировании объекта вложенные свойства (nested properties) не дублируются, а сохраняются в новом объекте как ссылки. Этот тип копирования называется _поверхностным_ (shallow).

Если необходимо полностью скопировать сложную структуру данных, например, массив объектов, то нужно делать _глубокое_ (deep) или полное копирование данных.

## Как понять

### Проблема поверхностного копирования

Поверхностное копирование работает быстро и в большинстве случаев его достаточно. Проблемы появляются, когда приходится копировать вложенные структуры:

```js
const itemsInCart = [
  { product: 'Носки', quantity: 3 },
  { product: 'Штаны', quantity: 1 },
  { product: 'Кепка', quantity: 1 },
]

const clonedCart = [...itemsInCart]
```

Если изменять элементы этой структуры после копирования, то эти изменения будут также видны в исходной структуре. Такое поведение называется _мутацией вложенных свойств_:

```js
clonedCart[1].quantity = 5

console.log(clonedCart)
// [
//    { product: 'Носки', quantity: 3 },
//    { product: 'Штаны', quantity: 5 },
//    { product: 'Кепка', quantity: 1 },
// ]

console.log(itemsInCart)
// [
//    { product: 'Носки', quantity: 3 },
//    { product: 'Штаны', quantity: 5 },
//    { product: 'Кепка', quantity: 1 },
// ]
```

Непримитивные типы данных, такие как массивы и объекты, хранятся [по ссылке](/js/ref-type-vs-value-type/#ssylochnye-tipy-dannyh). Так как копирование происходит только на один уровень вглубь, то при копировании массива происходит копирование _ссылок на старые объекты_ в новый массив.

В итоге получается картина, когда элементы разных массивов ссылаются на одни и те же объекты в памяти:

```js
console.log(itemsInCart[1] === clonedCart[1])
// true
```

![Результат поверхностного копирования массива](images/shallow.png)

### Как получить глубокую копию

Существует несколько способов выполнить глубокое копирование:

- собственная функция копирования;
- глобальная функция `structuredClone()`;
- преобразование с помощью функций `JSON.stringify()` и `JSON.parse()`;
- сторонние библиотечные функции, например `cloneDeep()` из библиотеки `Lodash`.

У каждого способа есть свои ограничения, потому что не все объекты могут быть полностью клонированы.

### Своя функция копирования объектов

Можно написать свою функцию глубокого копирования. Скорее всего ваша функция будет [рекурсивной](/js/recursion/), и она будет работать только для конкретных данных — написать универсальную функцию не так-то просто.

Создадим, для примера, функцию копирования:

```js
function createCopy(object) {
  if (object === null || typeof object !== 'object') {
    return object
  }

  const keys = Object.keys(object)
  const clonedObject = keys.reduce((acc, key) => {
    acc[key] = createCopy(object[key])
    return acc
  }, Array.isArray(object) ? [] : {})
  return clonedObject
}
```

Функция `createCopy()` подойдёт для копирования простых объектов (plain objects) или массивов различной вложенности, при условии, что исходный объект:

- не содержит [Symbol](/js/symbol/)-ключи;
- хранит в качестве значений вложенные массивы, простые объекты или примитивы (кроме `Symbol`);
- не содержит циклических ссылок;
- не наследует изменений в прототипах.

### Глобальная функция `structuredClone()`

Во многих случаях предпочтительным будет применить глобальную функцию `structuredClone()`. Она не описывается спецификацией ECMAScript (и поэтому не является частью языка), но доступна в браузерах благодаря Web API, а также реализована в Node.js и в других средах исполнения кода.

```js
const clonedCart = structuredClone(itemsInCart)
console.log(itemsInCart[1] === clonedCart[1])
// false
```

### Преобразование с помощью функций `JSON.stringify()` и `JSON.parse()`

Ещё один способ глубокого копирования звучит достаточно глупо — нужно сериализовать копируемый объект в JSON и тут же распарсить его. В результате появится полная копия объекта:

```js
const deep = JSON.parse(JSON.stringify(itemsInCart))
console.log(itemsInCart[1] === deep[1])
// false
```

![Результат глубокого копирования массива](images/deep.png)

У этого метода есть свои ограничения — копируемые данные должны быть сериализуемы.

Вот примеры несериализуемых значений: `undefined`, функция, [Symbol](/js/symbol/).

Массивы и объекты - сериализуемы. Что будет если у них в качестве ключа или значения будут несериализуемые данные?

- для массивов: такие значения будут превращены в null;
- для объектов: такие значения будут опущены, а если symbol является ключом объекта, то он будет проигнорирован, даже при использовании функции `replacer`.

```js
const arr = [
  undefined,
  function() { console.log('aaa') },
  Symbol("foo"),
]
const copyArr = JSON.parse(JSON.stringify(arr))

console.log(copyArr)
// [null, null, null]

const obj = {
  a: undefined,
  method: () => {},
  [Symbol("foo")]: "foo",
}
const copyObj = JSON.parse(JSON.stringify(obj), function(k, v) {
  if (typeof k === 'symbol') {
    return 'символ';
  }

  return v;
})

console.log(copyObj)
// {}
```

### Метод `cloneDeep()`

Можно воспользоваться готовыми решениями, например, методом [`_.cloneDeep()`](https://lodash.com/docs/4.17.15#cloneDeep) из библиотеки _Lodash_. Он надёжен и используется в десятках тысяч проектов каждый день. Кстати, изучить его реализацию можно на [GitHub](https://github.com/lodash/lodash/blob/main/lodash.js#L2662).

```js
import cloneDeep from 'lodash.clonedeep'

const clonedCart = cloneDeep(itemsInCart)
console.log(itemsInCart[1] === clonedCart[1])
// false
```

`cloneDeep()` корректно сохраняет ссылку на прототип исходного объекта. Это может быть важным при работе с объектами-экземплярами классов:

```js
import cloneDeep from 'lodash.clonedeep'

class Person {
    constructor(name) {
        this.name = name
    }
}

const person = new Person('Адам')

const clonedPerson1 = cloneDeep(person)

console.log(clonedPerson1 instanceof Person)
// true

const clonedPerson2 = structuredClone(person)

console.log(clonedPerson2 instanceof Person)
// false
```

Метод `cloneDeep()` имеет некоторые ограничения. По ссылке сохраняются:

  - DOM-элементы;
  - `Symbol`;
  - `Function`;
  - `WeakMap`-объекты;
  - `WeakSet`-объекты;
  - `Proxy`-объекты.