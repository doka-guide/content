---
title: "Оператор `instanceof`"
description: "Оператор instanceof проверяет, принадлежит ли объект определённому классу. Как проверить тип объекта и отличить массив от объекта, дату от промиса"
authors:
  - drakesbot12
keywords:
  - instanceof
  - оператор instanceof
  - проверка типа объекта
  - классы javascript
  - наследование javascript
  - prototype
related:
  - js/typeof
  - js/class
  - js/prototype
tags:
  - doka
---

## Кратко

Оператор `instanceof` проверяет, принадлежит ли объект определённому классу или конструктору. Он возвращает `true`, если объект был создан с помощью этого конструктора или наследуется от него.

## Пример

<iframe title="Интерактивная демка оператора instanceof" src="demos/basic/" height="500"></iframe>

## Как пишется

`instanceof` — это бинарный оператор. Он проверяет цепочку прототипов объекта и ищет в ней свойство `prototype` указанного конструктора:

```js
объект instanceof Конструктор
```

JavaScript поднимается по цепочке прототипов объекта и проверяет, встречается ли там `Конструктор.prototype`. Если встречается — возвращает `true`, если дошёл до конца цепочки и не нашёл — `false`.

```js
class Animal {}
class Dog extends Animal {}

const rex = new Dog()

rex instanceof Dog     // true — в цепочке есть Dog.prototype
rex instanceof Animal  // true — в цепочке есть Animal.prototype
rex instanceof Object  // true — в цепочке есть Object.prototype
```

## Как понять

### Для чего нужен

`instanceof` помогает определить, с каким именно объектом мы работаем. Это особенно полезно, когда нужно отличить один тип объекта от другого:

```js
function process(value) {
  if (value instanceof Array) {
    // Обрабатываем массив
    return value.map(item => item * 2)
  }

  if (value instanceof Date) {
    // Обрабатываем дату
    return value.toLocaleString()
  }

  if (value instanceof Promise) {
    // Обрабатываем промис
    return value.then(data => data)
  }

  return value
}
```

### Примитивы и объекты

`instanceof` работает только с объектами. Для примитивов он всегда возвращает `false`:

```js
42 instanceof Number       // false
"строка" instanceof String // false
true instanceof Boolean    // false

// Но если создать через конструктор — true
new Number(42) instanceof Number   // true
new String("строка") instanceof String // true
```

### Наследование

`instanceof` учитывает наследование — если класс наследует от другого класса, проверка вернёт `true` для обоих:

```js
class Vehicle {}
class Car extends Vehicle {}

const tesla = new Car()

tesla instanceof Car      // true
tesla instanceof Vehicle  // true
tesla instanceof Object   // true
```

### Массивы

Массивы — это объекты, поэтому `instanceof Array` работает, но и `instanceof Object` тоже вернёт `true`:

```js
[1, 2, 3] instanceof Array   // true
[1, 2, 3] instanceof Object  // true
```

Чтобы точно проверить массив, лучше использовать `Array.isArray()`:

```js
Array.isArray([1, 2, 3]) // true
```

### Функции-конструкторы

`instanceof` работает и со старыми функциями-конструкторами:

```js
function Person(name) {
  this.name = name
}

const alice = new Person("Алиса")
alice instanceof Person   // true
alice instanceof Object   // true
```

### Ошибки

`instanceof` отлично работает с ошибками:

```js
try {
  // что-то ломается
} catch (error) {
  if (error instanceof TypeError) {
    console.log("Ошибка типа!")
  } else if (error instanceof RangeError) {
    console.log("Выход за пределы!")
  } else {
    console.log("Другая ошибка")
  }
}
```

## Подсказки

💡 `instanceof` проверяет **наследование**, а не просто конструктор. Если объект был создан с помощью `Object.create()` с другим прототипом — поведение может отличаться.
💡 Для примитивов используйте `typeof`, для объектов — `instanceof`.
💡 `instanceof` может сломаться, если объект был передан между разными фреймами или iframe — там свои глобальные объекты и цепочки прототипов.
💡 В современном коде вместо `instanceof` для проверки конкретных типов часто используют проверку наличия методов: `if (value?.then)` для промисов или `if (Array.isArray(value))` для массивов.
💡 `instanceof` работает с любыми функциями, у которых есть свойство `prototype`.
