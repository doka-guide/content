---
title: "`this`: контекст выполнения функций"
description: "Про контекст и `this` часто спрашивают на собеседованиях. Ответим подробно и разберёмся в нюансах."
authors:
  - bespoyasov
editors:
  - tachisis
keywords:
  - use strict
  - строгий режим
  - bind
  - call
  - apply
  - constructor конструктор
  - стрелочная функция
  - arrow function
  - new
related:
  - tools/programming-paradigms
  - tools/bundlers
  - js/language-versions
tags:
  - article
---

## Кратко

Грубо говоря, `this` — это ссылка на некий объект, к свойствам которого можно получить доступ внутри вызова функции. Этот `this` — и есть _контекст выполнения_.

Но чтобы лучше понять, что такое `this` и контекст выполнения в JavaScript, нам потребуется зайти издалека.

Сперва вспомним, как мы в принципе можем выполнить какую-то инструкцию в коде.

Выполнить что-то в JS можно 4 способами:

- вызвав функцию;
- вызвав метод объекта;
- использовав функцию-конструктор;
- непрямым вызовом функции.

## Функция

Первый и самый простой способ выполнить что-то — вызвать функцию.

```js
function hello(whom) {
  console.log(`Hello, ${whom}!`)
}

hello('World')
// Hello, World!
```

Чтобы выполнить функцию, мы используем выражение `hello` и скобки с аргументами.

Когда мы вызываем _функцию_, значением `this` может быть лишь _глобальный объект_ или [`undefined`](/js/undefined/) при использовании [`'use strict'`](/js/use-strict/).

### Глобальный объект

_Глобальный объект_ — это, так скажем, корневой объект в программе.

Если мы запускаем JS-код в браузере, то глобальным объектом будет `window`. Если мы запускаем код в Node-окружении, то `global`.

### Строгий режим

Можно сказать, что [_строгий режим_](/js/use-strict/) — неказистый способ борьбы с легаси.

Включается строгий режим с помощью директивы `'use strict'` в начале блока, который должен выполняться в строгом режиме:

```js
function nonStrict() {
  // Будет выполняться в нестрогом режиме.
}

function strict() {
  'use strict'
  // Будет выполняться в строгом режиме.
}
```

Также можно настроить строгий режим для всего файла, если указать `'use strict'` в начале.

### Значение `this`

Вернёмся к `this`. В нестрогом режиме при выполнении в браузере `this` при вызове функции будет равен `window`:

```js
function whatsThis() {
  console.log(this === window)
}

whatsThis()
// true
```

То же — если функция объявлена внутри функции:

```js
function whatsThis() {
  function whatInside() {
    console.log(this === window)
  }

  whatInside()
}

whatsThis()
// true
```

И то же — если функция будет анонимной и, например, вызвана немедленно:

```js
;(function () {
  console.log(this === window)
})()
// true
```

В приведённом выше примере вы можете заметить `;` перед анонимной функцией. Дело в том, что существующий механизм автоподстановки точек с запятой (ASI) срабатывает лишь в [определённых случаях](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#automatic_semicolon_insertion), в то время как строка, начинающаяся с `(`, не входит в перечень этих случаев. Поэтому опытные разработчики зачастую добавляют `;` в тех случаях, когда их код может быть скопирован и добавлен в существующий.

В строгом режиме — значение будет равно `undefined`:

```js
'use strict'

function whatsThis() {
  console.log(this === undefined)
}

whatsThis()
// true
```

## Метод объекта

Если функция хранится в объекте — это _метод этого объекта_.

```js
const user = {
  name: 'Alex',
  greet() {
    console.log('Hello, my name is Alex')
  },
}

user.greet()
// Hello, my name is Alex
```

`user.greet()` — это метод объекта `user`.

В этом случае значение `this` — этот объект.

```js
const user = {
  name: 'Alex',
  greet() {
    console.log(`Hello, my name is ${this.name}`)
  },
}

user.greet()
// Hello, my name is Alex
```

Обратите внимание, что `this` определяется в момент вызова функции. Если записать метод объекта в переменную и вызвать её, значение `this` изменится.

```js
const user = {
  name: 'Alex',
  greet() {
    console.log(`Hello, my name is ${this.name}`)
  },
}

const greet = user.greet
greet()
// Hello, my name is
```

При вызове через точку `user.greet()` значение `this` равняется объекту до точки (`user`). Без этого объекта `this` равняется глобальному объекту (в обычном режиме). В [строгом режиме](/js/use-strict/) мы бы получили ошибку «Cannot read properties of undefined».

Чтобы такого не происходило, [следует использовать `bind()`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Function/bind), о котором мы поговорим чуть позже.

## Вызов конструктора

_Конструктор_ — это функция, которую мы используем, чтобы создавать однотипные объекты. Такие функции похожи на печатный станок, который создаёт детали LEGO. Однотипные объекты — детальки, а конструктор — станок. Он как бы конструирует эти объекты, отсюда название.

По соглашениям конструкторы вызывают с помощью ключевого слова `new`, а также называют с большой буквы, причём обычно не глаголом, а существительным. Существительное — это та сущность, которую создаёт конструктор.

Например, если конструктор будет создавать объекты пользователей, мы можем назвать его `User`, а использовать вот так:

```js
function User() {
  this.name = 'Alex'
}

const firstUser = new User()
firstUser.name === 'Alex'
// true
```

При вызове _конструктора_ `this` равен свежесозданному объекту.

В примере с `User` значением `this` будет объект, который конструктор создаёт:

```js
function User() {
  console.log(this instanceof User)
  // true
  this.name = 'Alex'
}

const firstUser = new User()
firstUser instanceof User
// true
```

На самом деле, многое происходит «за кулисами»:

- При вызове сперва создаётся новый пустой объект, и он присваивается `this`.
- Выполняется код функции. (Обычно он модифицирует `this`, добавляет туда новые свойства.)
- Возвращается значение `this`.

Если расписать все неявные шаги, то:

```js
function User() {
  // Происходит неявно:
  // this = {};

  this.name = 'Alex'

  // Происходит неявно:
  // return this;
}
```

То же происходит и в ES6-классах, узнать о них больше можно в [статье про объектно-ориентированное программирование](/tools/oop/).

```js
class User {
  constructor() {
    this.name = 'Alex'
  }

  greet() {
    /*...*/
  }
}

const firstUser = new User()
```

#### Как не забыть о `new`

При работе с _функциями-конструкторами_ легко забыть о `new` и вызвать их неправильно:

```js
const firstUser = new User() // ✅
const secondUser = User() // ❌
```

Хотя на первый взгляд разницы нет, и работает будто бы правильно. Но на деле разница есть:

```js
console.log(firstUser)
// User { name: 'Alex' }

console.log(secondUser)
// undefined
```

Чтобы не попадаться в такую ловушку, в конструкторе можно прописать проверку на то, что новый объект создан:

```js
function User() {
  if (!(this instanceof User)) {
    throw Error('Error: Incorrect invocation!')
  }

  this.name = 'Alex'
}

// или

function User() {
  if (!new.target) {
    throw Error('Error: Incorrect invocation!')
  }

  this.name = 'Alex'
}

const secondUser = User()
// Error: Incorrect invocation!
```

### Непрямой вызов

_Непрямым вызовом_ называют вызов функций через [`call()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) или [`apply()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply).

Оба первым аргументом принимают `this`. То есть они позволяют настроить контекст снаружи, к тому же — явно.

```js
function greet() {
  console.log(`Hello, ${this.name}`)
}

const user1 = { name: 'Alex' }
const user2 = { name: 'Ivan' }

greet.call(user1)
// Hello, Alex
greet.call(user2)
// Hello, Ivan

greet.apply(user1)
// Hello, Alex
greet.apply(user2)
// Hello, Ivan
```

В обоих случаях в первом вызове `this` === `user1`, во втором — `user2`.

Разница между `call()` и `apply()` — в том, как они принимают аргументы для самой функции после `this`.

`call()` принимает аргументы списком через запятую, `apply()` же — принимает массив аргументов. В остальном они идентичны:

```js
function greet(greetWord, emoticon) {
  console.log(`${greetWord} ${this.name} ${emoticon}`)
}

const user1 = { name: 'Alex' }
const user2 = { name: 'Ivan' }

greet.call(user1, 'Hello,', ':-)')
// Hello, Alex :-)
greet.call(user2, 'Good morning,', ':-D')
// Good morning, Ivan :-D
greet.apply(user1, ['Hello,', ':-)'])
// Hello, Alex :-)
greet.apply(user2, ['Good morning,', ':-D'])
// Good morning, Ivan :-D
```

#### Связывание функций

Особняком стоит `bind()`. Это метод, который позволяет связывать контекст выполнения с функцией, чтобы «заранее и точно» определить, какое именно значение будет у `this`.

```js
function greet() {
  console.log(`Hello, ${this.name}`)
}

const user1 = { name: 'Alex' }

const greetAlex = greet.bind(user1)
greetAlex()
// Hello, Alex
```

Обратите внимание, что `bind()`, в отличие от `call()` и `apply()`, не вызывает функцию сразу. Вместо этого он возвращает другую функцию — связанную с указанным контекстом навсегда. Контекст у этой функции изменить невозможно.

```js
function getAge() {
  console.log(this.age);
}

const howOldAmI = getAge.bind({age: 20}).bind({age: 30})

howOldAmI();
//20
```

#### Стрелочные функции

У _стрелочных функций_ собственного контекста выполнения нет. Они связываются с ближайшим по иерархии контекстом, в котором они определены.

Это удобно, когда нам нужно передать в стрелочную функцию, например, родительский контекст без использования `bind()`.

```js
function greetWaitAndAgain() {
  console.log(`Hello, ${this.name}!`)
  setTimeout(() => {
    console.log(`Hello again, ${this.name}!`)
  })
}

const user = { name: 'Alex' }

greetWaitAndAgain.call(user)

// Hello, Alex!
// Hello again, Alex!
```

При использовании обычной функции внутри контекст бы потерялся, и чтобы добиться того же результата, нам бы пришлось использовать `call()`, `apply()` или `bind()`.
