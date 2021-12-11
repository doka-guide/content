---
title: "`const`, `let` и `var`"
description: "Что такое переменные и какие они бывают"
authors:
  - ruslauz
contributors:
  - furtivite
tags:
  - doka
---

## Кратко

Переменные в JavaScript хранят значения, которыми оперирует код. Для создания переменных используются ключевые слова `var`, `let` и `const`.

<aside>

🤖 Использование `var` оправдано, если нужно писать код для старых браузеров времён IE 11 или Opera mini. Во всех остальных случаях лучше использовать `let` и `const`, так как они не позволят допустить ошибки, приводящие к неправильным значениям в переменных или изменениям глобальных переменных.

</aside>

## Что такое переменные

Переменные — это именованные контейнеры для хранения данных.

Для создания переменной используется ключевое слово `let`, `const` или `var`. Сразу за ключевым словом идёт название переменной либо перечень переменных через запятую. Создание переменной также называют _объявлением переменной_. Например:

```js
var singleVariable

let firstVariable, secondVariable, thirdVariable
```

Чаще всего, при объявлении переменной ей устанавливают стартовое значение при помощи оператора `=`. Тип значения может быть абсолютно любым — [строка](/js/string), [число](/js/number), [объект](/js/object), [массив](/js/arrays) и так далее.

```js
// Объявление переменной + присвоение
let string = 'foo'
const array = ['foo', 'bar', 'baz']
var number = 10

// Множественное объявление + присвоение
let firstNumber = 5,
  secondNumber = 10
```

## Правила именования переменных

Допустимые символы для имени переменной:
- буквы латинского алфавита;
- цифры;
- символы `$` и `_`.

Первый символ не должен быть цифрой:

```js
let letters, &ampersand, _underscore

let 1number
// SyntaxError: Invalid or unexpected token
```

В качестве названий переменных нельзя использовать зарезервированные языком слова. Например: `class`, `super`, `throw`, `yield`, `var`, `let`, `const` и так далее. С полным списком таких слов можно ознакомится [здесь](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Lexical_grammar#%D0%B7%D0%B0%D1%80%D0%B5%D0%B7%D0%B5%D1%80%D0%B2%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5_%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%B2%D1%8B%D0%B5_%D1%81%D0%BB%D0%BE%D0%B2%D0%B0_%D0%B2_ecmascript_2015).


## Всплытие

Объявление переменной всегда «всплывает» в начало функции или кода. Этот процесс называется _hoisting_.

```js
var byVar = 5
let byLet = 10
const byConst = 15
```

В начале скрипта все переменные равны `undefined`:

![код со всплытием переменных](images/variables-hoisting-start.png)

В конце скрипта, после того как произошли инициализация и присвоение значений, переменные равны `5`, `10` и `15`:

![код со всплытием переменных](images/variables-hoisting-finish.png)

Объявление переменной и её инициализация могут быть произведены в разных местах скрипта, но пользоваться этим нужно с осторожностью, так как это может приводить к логическим ошибкам.

## `let` и `const`

Переменные `let` и `const` появились в версии EcmaScript 2015 года (ES6), на смену устаревшему `var`. Они имеют блочную [область видимости](/js/closures/) и не становятся частью глобального объекта (`window` в браузере, `global` в Node.js).

Блочная область видимости не даст получить значение переменной вне блока, где она объявлена.

```js
if (true) {
  let a = 5
  const b = 10

  console.log(a)
  // 5
  console.log(b)
  // 10
}

console.log(a)
// ReferenceError: a is not defined

console.log(b)
// ReferenceError: b is not defined
```

### Смена значения в `let` и `const`

Значение в переменной, созданной через `let` можно изменять:

```js
let a = 5
console.log(5)
// 5

a = 10
console.log(a)
// 10
```

Объявление переменной с именем, которое уже используется, приведёт к ошибке.

```js
let a = 5

let a = 10
// SyntaxError: Identifier 'a' has already been declared
```

То же правило работает и при использовании `const`, а так же при использовании смешанного подхода:

```js
const a = 5

const a = 10
// SyntaxError: Identifier 'a' has already been declared

// Попытка сделать константной обычную переменную
var a = 5

const a = 10
// SyntaxError: Identifier 'a' has already been declared
```

Значение хранящееся в `const` изменить нельзя, будь то примитивное значение или ссылка на объект.

```js
const a = 5

a = 10
// TypeError: Assignment to constant variable.
```

```js
const obj = {
  a: 5,
}

obj = {
  a: 10,
}
// TypeError: Assignment to constant variable.
```

Однако объект, хранящийся в `const` можно мутировать. [Объекты хранятся по ссылке](/js/ref-type-vs-value-type/#ssylochnye-tipy-dannyh) и изменение объекта не приводит к изменению ссылки:

```js
const obj = {
  a: 5,
}

obj.a = 10

console.log(obj)
// { a: 10 }
```

### Значение по умолчанию для `let` и `const`

Если переменным не установить значение при объявлении, то их значение автоматически будет `undefined`.

```js
let a
console.log(a)
// undefined

a = 5

console.log(a)
// 5
```

Однако есть некоторые нюансы:

- переменные `const` нельзя объявлять без значения:

```js
const a
// SyntaxError: Missing initializer in const declaration
```

- нельзя обращаться к переменным до инициализации, не смотря на то, что `let` и `const` «всплывают» в начало скрипта:

```js
console.log(a)
// ReferenceError: Cannot access 'a' before initialization
console.log(b)
// ReferenceError: Cannot access 'b' before initialization

let a = 5
const a = 5
```

<details>
  <summary>Почему так?</summary>

У `let` и `const` есть так называемая _temporal dead zone_ (TDZ) — часть скрипта до инициализации переменной. _TDZ_ есть так же и у `es6` классов, не смотря на то, что они являются «синтаксическим сахаром» над обычными функциями.

```js
console.log(Foo)

class Foo {
  constructor(bar) {
    this.bar = bar
  }
}
// ReferenceError: Cannot access 'Foo' before initialization
```

А функции (объявленные как _Function Declaration_) _TDZ_ не имеют.

```js
console.log(Foo)

function Foo() {
  this.bar = bar
}
// ƒ Foo() { this.bar = bar}
```

</details>

## Переменные `var`

Объявление переменных при помощи ключевого слова `var` было в JavaScript с момента его зарождения. Переменные, объявленные через `var`, имеют функциональную область видимости. Они доступны только в пределах текущей функции или глобального объекта, если функции нет:

```js
if (true) {
  var a = 5
}

function foo() {
  var b = 10
}

console.log(a)
// 5
console.log(b)
// ReferenceError: b is not defined
```

Объявление переменной вне функций, делает их глобальными переменными. Они доступны как свойства глобального объекта:

```js
var varVariable = 5

console.log(window.varVariable)
// 5
```

К переменным объявленным при помощи ключевого слова `var` можно обращаться до инициализации. В отличие от `let` и `const` ошибки это не вызовет:

```js
console.log(a)
// undefined

var a = 5

console.log(a)
// 5
```

Разберём, как работает функциональная область видимости:

```js
var a = 5

function foo() {
  console.log(a)
  // undefined

  var a = 10
  console.log(a)
  // 10
}

foo()

console.log(a)
// 5
```

Перед выполнением функции в глобальной области видимости присутствует переменная `a` равная `5`:

![код со всплытием переменных](images/scopes-start.png)

Во время выполнения функции формируется новая функциональная область видимости, в которой тоже присутствует переменная `a`. Эта переменная была объявлена с помощью `var` внутри функции, в момент выполнения которой она «всплыла» со значением равным `undefined`. В строке 4 происходит обращение именно к ней (до её инициализации), а не к той что находится вне функции.

![код со всплытием переменных](images/scopes-local-variables.png)

В строке 6 значение переменной `a` уже равно 10.

![код со всплытием переменных](images/scopes-local-variables-initialized.png)

После выполнения функции локальная область видимости была удалена. В консоли выводится глобальная переменная `a`.

![код со всплытием переменных](images/scopes-finish.png)

Более подробно об этом можно прочитать в [отдельной статье](/js/closures)

### Смена значения `var`

Значение хранящееся в переменной `var` можно изменить двумя способами:

- обратиться к имени переменной и присвоить новое значение

```js
var a = 5
console.log(a)
// 5

a = 10
console.log(a)
// 10
```

- обратиться к имени переменной вместе с к ключевым словом `var`.

```js
var a = 5
console.log(a)
// 5

var a = 10
console.log(a)
// 10
```

### Значение по умолчанию

Переменные `var` можно объявлять без присвоения им значения, в таком случае они будут равны `undefined`:

```js
var a
console.log(a)
// undefined
```

Так же, значение будет `undefined` если обращаться к ним до их инициализации в коде. Так как переменная всплывёт и получит значение по умолчанию.

```js
console.log(a)
// undefined

var a = 10
```
