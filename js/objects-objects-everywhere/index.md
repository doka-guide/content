---
title: "Почти всё в JavaScript — объект"
description: "Что бы мы ни использовали при написании JavaScript-кода, почти всё это объекты под капотом."
cover:
  author: kirakusto
  desktop: 'images/covers/desktop.svg'
  mobile: 'images/covers/mobile.svg'
  alt: 'Семейное фото в стиле семейки Аддамс, где каждый подписан как object'
authors:
  - windrushfarer
keywords:
  - array
related:
  - js/function
  - js/arrays
  - js/set
tags:
  - article
---

## Кратко

В JavaScript объект является прародителем всех других сущностей. Все типы данных и структуры, кроме примитивных, являются потомками объекта. По этой причине абсолютно у всех наследников объекта имеется набор общих методов: `toString()`, `valueOf()` и другие.

## Как понять

### Массивы и функции

[Объект](/js/object/) — это сущность с набором свойств. Мы можем добавлять, менять и удалять эти свойства.

```javascript
const programmer = { name: 'John', level: 'Junior' }

programmer.mainLanguage = 'JavaScript'
delete programmer.level

console.dir(programmer)
```

![консоль, в которой выведены свойства объекта из примера](images/console-object.png)

<aside>

🛠 `console.dir()` — это функция, которая отображает любой объект в виде иерархического дерева. Полезно, когда нужно провести анализ прототипов.

</aside>

Если взглянуть на массив, то у него тоже есть набор свойств, но свой. Например, у массива есть длина, методы для работы с ним. Обращение к элементу массива по индексу, как можно заметить, похоже на обращение к полю объекта с помощью квадратных скобок.

```javascript
const shows =
  ['Breakind Bad', 'The Office', 'Silicon Valley']

// Свойство массива
shows.length

// Получить элемент массива,
// аналогично как у объекта shows['1']
shows[1]
```

Аналогичная ситуация с функциями. У них тоже есть набор свойств, который можно увидеть, выведя информацию о ней в консоль.

```javascript
function sum(a, b) {
  return a + b
}

// Можно вызвать свойство функции
sum.arguments

// Можно присвоить значение в поле
sum.someField = 'value'

console.dir(sum)
```

В выводе есть и свойство `someField`, которое мы присвоили, и набор встроенных свойств и методов.

![консоль, в которой выведены свойства функции](images/console-func.png)

Такая структура массивов и функций очень похожа на структуру объектов. Но на самом деле это и есть объекты. В этом можно легко убедиться. Давайте посмотрим на свойство `__proto__` у функции `sum()`, описанной выше.

<aside>

👉 Свойство `__proto__` [устаревшее (deprecated)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto). Не используйте его в коде, особенно для того, чтобы самостоятельно устанавливать прототип.

</aside>

![консоль, в которой выведен прототип функции sum](images/console-func2.png)

Если посмотреть свойство прототипа, то можно заметить, что прототипом текущего является объект. Заглянув в этот прототип, можно увидеть такую картину:

![методы объекта в консоли](images/proto.png)

В этой цепочке следующего прототипа уже нет, а это значит, что мы дошли до самого конца цепочки, то есть нашли прародителя. Если подобным образом вывести в консоль любой массив, то спускаясь ниже по цепочке прототипов, в конце обязательно будет именно прототип объекта. Любая сущность в JavaScript наследуется от объекта.

![схема цепочки прототипов](images/prototype-chain.png)

### Примитивы

В JavaScript существуют примитивные типы данных, такие как строки, числа или булевы значения. При работе со строкой можно обнаружить, что у неё тоже есть свойства и методы, к которым можно обратиться.

```javascript
const show = 'Breaking Bad'

console.log(show.length)
// 12
console.log(show.charAt(1))
// 'r'
console.log(show.toUpperCase())
// 'BREAKING BAD'
```

Если строка является примитивным типом данных, откуда у неё поведение как у объекта? Когда обращаемся к свойству или методу у примитива, происходит обёртка с помощью специального конструктора (`autoboxing`), который является наследником `Object`. Для строки это будет функция `String()`. У этого объекта есть свойства и методы, которые и вызываются.

```javascript
const pet = 'dog'
// Будет создан объект
const pet2 = new String('dog')

console.log(pet === pet2)
// false, потому что в pet2 находится объект

console.dir(pet2)
/* Выведет
{
  0: "d",
  1: "o",
  2: "g",
  length: 3
}
*/
```

Для других типов данных есть аналогичные функции: `Number()` для чисел, `Boolean()` для булевых значений. Все эти функции так же являются наследниками объекта.

Главное отличие между объектами (массивами, функциями) и примитивами в том, что примитивы **неизменяемые**. Попытка изменения или добавления свойств к примитиву ничего не сделает.

```javascript
const cat = 'Boris'

// Свойство не добавится
cat.color = 'red'
// Также ничего не изменится
delete color.length

const cats = ['Boris', 'Vasya', 'Murzik']
// Теперь массив стал длинной в пять элементов
cats.length = 5
// Добавилось поле
cats.someField = 'value'

console.dir(cats)
/*
{
  0: "Boris",
  1: "Vasya",
  2: "Murzik",
  someField: "value",
  length: 5
}
*/
```

Не путайте примитив и объект, созданный через конструктор для примитива:

```js
const cat = new String('Boris')
cat.color = 'black'
// Добавится, так как в cat лежит объект, а не строка
```

## Как пишется

Поля и методы объектов и массивов можно вызывать всегда: через переменную и инлайн (inline), то есть без использования переменной.

```javascript
const array = [1, 2, 3, 4]
console.log(array[1])
// 2
const pos = 3
console.log(array[pos])
// 4

console.log(array.map(a => a + 1))
// [2, 3, 4, 5]
const f = 'map'
console.log(array[f](a => a + 1))
// [2, 3, 4, 5]

const obj = { name: 'Boris', color: 'red' }
console.log(obj.color)
// 'red'
console.log(obj['name']);
// 'Boris'

const age = Object.assign(obj, {
  name: 'Vasya',
  age: 30
}).age
console.log(age)
// 30
```

Почти у всех примитивов без переменной тоже можно обращаться к методам:

```js
true.toString()
// 'true'

Infinity.toString()
// 'Infinity'

'hello world'.toString()
// 'hello world'

Symbol('tag').toString()
// 'Symbol(tag)'

9007199254740991n.toString()
// '9007199254740991'
```

Правда, в случае с числами можно получить синтаксическую ошибку, потому что точка воспринимается как часть самого числа:

```js
42.toString()
// Uncaught SyntaxError:
// Invalid or unexpected token
```

Чтобы этого избежать, можно использовать две точки, взять выражение в скобки или вызвать обёртку примитивного типа:

```js
42..toString()
// '42'

(42).toString()
// '42'

Number(42).toString()
// '42'
```

Вызов методов или свойств не сработает у [`null`](/js/null-primitive/) и [`undefined`](/js/undefined/):

```js
null.toString()
// Uncaught TypeError:
// Cannot read property 'toString' of null

null.valueOf()
// Uncaught TypeError:
// Cannot read property 'valueOf' of null

null.length
// Uncaught TypeError:
// Cannot read property 'length' of null

undefined.toString()
// Uncaught TypeError:
// Cannot read property 'toString' of undefined

undefined.valueOf()
// Uncaught TypeError:
// Cannot read property 'valueOf' of undefined

undefined.length
// Uncaught TypeError:
// Cannot read property 'length' of undefined
```
