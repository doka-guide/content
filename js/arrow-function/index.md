---
title: "Стрелочные функции"
description: "Более компактная запись, чем у обычных функций."
authors:
  - alexafcode
contributors:
  - splincool
related:
  - js/function-as-datatype
  - js/function
  - tools/fp
tags:
  - doka
---

## Кратко

Стрелочная функция это короткая запись функционального выражения (function expression) без собственных привязок `this`, `arguments` и `super`.

## Как пишется

Если функция принимает только один аргумент, круглые скобки вокруг него можно не ставить. Если тело функции состоит из одного выражения, оператор `return` также необязателен.

```js
const divider = n => n / 2
```

Если тело функции содержит несколько выражений, оберните их в фигурные скобки. Здесь оператор `return` нужен, так как функция что-то возвращает.

```js
const sayHello = (name) => {
  const greeting = `Hello ${name}`
  return greeting
}
```

## Как понять

Стрелочные функции пишутся короче:

```js
// Обычная функция
function divider(n) {
  return n / 2
}

// Стрелочная функция
const divider = n => n / 2
```

У стрелочных функций нет своих привязок для `arguments`, `super`, `this` или `new.target`. Значения этих ключевых слов привязываются к внешнему лексическому окружению.

Использование `call()` или `apply()` никак не влияет на стрелочные функции.

```js
class Person {
  constructor(name) {
    this.name = name
  }

  sayName() {
    console.log(this.name)
  }

  sayNameWithArrowFunction = () => {
    console.log(this.name)
  }
}

const alex = new Person('Alex')
console.log(alex.sayName())
// Alex

console.log(alex.sayNameWithArrowFunction())
// Alex

const den = new Person('Den')
console.log(alex.sayName.call(den))
// Den

console.log(alex.sayNameWithArrowFunction.call(den))
// Alex, т. к. не изменить контекст
```

В теле стрелочных функций `arguments` будет ссылаться на `arguments` из внешней лексической области:

```js
function f() {
  const arrowFunction = () => {
    console.log(arguments)
  }

  arrowFunction('стрелочная функция')
}

f('обычная функция')
//  { 0: 'обычная функция', length: 1 }
```

У стрелочных функций нет свойств `сonstructor` и `prototype`:

```js
const arrowFunction = () => {}
console.log(arrowFunction.prototype)
// undefined
```

И, как следствие, стрелочные функции не могут быть использованы как конструктор. Их нельзя использовать с оператором `new`.

```js
const arrowFunction = () => {}
console.log(new arrowFunction())
// TypeError: arrowFunction is not a constructor
```

Стрелочные функции нельзя использоваться как генераторы. Ключевое слово `super` внутри стрелочных функциях ссылается на `super` из внешнего лексического окружения, а не на `super` родительского класса.

До появления стрелочных функций возникали проблемы с использованием `this` внутри функций-колбеков. Посмотрите на пример с [`setTimeout`](/js/settimeout/).

```js
const obj = {
  count: 10,
  doSomethingLater() {
    setTimeout(function () {
      // Тут this ссылается на объект Window
      this.count++
      console.log(this.count)
    }, 1000)
  },
};

obj.doSomethingLater()
// "NaN"
```

В колбэк-функции `setTimeout` `this` указывет на объект `Window`, а не на `obj`, поэтому значение `this.count` оказывается неверным.

Поэтому приходилось использовать различные методы для передачи контекста внутрь колбэка.

Например, при помощи `bind(this)`:

```js
const obj = {
  count: 10,
  doSomethingLater() {
    setTimeout(function () {
      this.count++
      console.log(this.count)
    }.bind(this), 1000)
  },
}

obj.doSomethingLater()
// 11
```

Также использовался хак с переменной `that`, где сохранялся контекст `this`, и внутри колбэка уже использовалась эта переменная:

```js
const obj = {
  count: 10,
  doSomethingLater() {
    const that = this
    setTimeout(function () {
      that.count++
      console.log(that.count)
    }, 1000)
  },
}

obj.doSomethingLater()
// 11
```

С появлением стрелочных функций в качестве колбэков, больше не нужно беспокоиться о правильной привязке `this`, так как их контекст выполнения привязан к лексической области видимости.

```js
const obj = {
  count: 10,
  doSomethingLater() {
    setTimeout(() => {
      this.count++
      console.log(this.count)
    }, 1000)
  },
}

obj.doSomethingLater()
// 11
```
