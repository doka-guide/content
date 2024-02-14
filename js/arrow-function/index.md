---
title: "Стрелочные функции"
description: "Более компактная запись, чем у обычных функций."
authors:
  - alexafcode
keywords:
  - функция
  - стрелочная функция
related:
  - js/function-as-datatype
  - js/function
  - tools/fp
tags:
  - doka
---

## Кратко

Стрелочные функции - это новая функциональная возможность в ECMAScript 2015(ES6).

## Как пишется

Если функция принимает только один аргумент, круглые скобки вокруг него можно не ставить. Оператор return тоже можно не использовать при условии что тело функции это одно выражение.

```js
const divider = n => n / 2;
```
Если аргументов больше одного, нужно аргументы оборачивать в круглые скобки.


```js
const sum = (a, b) => a + b;
```

Если требуется сложная конструкция, в несколько строк, нужно оборачивать конструкцию в фигурные скобки. Также здесь нам понадобится для возврата значения написать `return`, как и в обычных функциях.

```js
const sayHello = (name) => {
  const greeting = `Hello ${name}`
  return greeting;
};
```

## Как понять

Отличия стрелочных функций от обычных:

- Более краткая звпись

```js
// запись обычной функции
function divider(n) {
  return n / 2
}

// запись стрелочной функции
const divider = n => n / 2;
```
- Лексический `this`

Стрелочные функции не задают собственное значение для `this`. Вместо этого они используют значение `this` блока, в который они включены.
Они используют контекст в котором определены, вызов стрелочных функций с помощью методов call() или apply(), даже если передать аргументы в эти методы, не влияет на значение this.

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }

  sayNameWithArrowFunction = () => {
    console.log(this.name);
  }
}

const alex = new Person('Alex')
console.log(alex.sayName()) //Alex
console.log(alex.sayNameWithArrowFunction()) //Alex

const den = new Person('Den')
console.log(alex.sayName.call(den)) //Den
console.log(alex.sayNameWithArrowFunction.call(den)) //Alex, т.к. не можем изменить контекст
```

- Нет собственной переменной arguments. В теле стрелочных функций arguments будет ссылаться на переменную в окружающей области.

```js
function f() {
  const arrowFunction = () => {
    console.log(arguments);
  }

  arrowFunction('стрелочная функция');
}

f('обычная функция'); ////  { 0: 'обычная функция', length: 1 }
```

- Не имеют свойств `сonstructor` и `prototype`

```js
const arrowFunction = () => {}
console.log(arrowFunction.prototype) // undefined
```
И как следствие, стрелочные функции не могут быть использованы как конструктор и вызовут ошибку при использовании с new.

```js
const arrowFunction = () => {}
console.log(new arrowFunction()); //TypeError: arrowFunction is not a constructor
// arrow function не могу быть функциями конструктарами, не доступно ключевое слово new
```

- Не могут использоваться как функции генераторы.

- Не позволяют задавать имя, поэтому стрелочные функции анонимны, если их ни к чему не присвоить.

- Всегда function expressions.

## Подсказки

💡 Мы выяснили, что стрелочные функции всегда анонимные, не имеют свойств `prototype` и `constructor`, не могут быть использованы с ключевым словом new и не задают собственное значение для `this`.
Также имееют более короткую запись и имееют неявный return.
