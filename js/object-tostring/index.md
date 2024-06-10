---
title: "`.toString()`"
description: "Возвращает строковое представление объекта."
authors:
  - nlopin
related:
  - js/string
  - js/console-log
  - js/ref-type-vs-value-type
tags:
  - doka
---

## Кратко

Метод `toString()` возвращает строковое представление объекта. Метод автоматически вызывается, когда объект нужно представить в текстовом виде. При необходимости поведение метода можно изменить.

## Пример

```js
const book = {
  title: 'JavaScript: the good parts',
  author: 'Douglas Crockford'
}

console.log(`Сейчас читаю ${book}`)
// Сейчас читаю [object Object]
```

## Как пишется

`Object.prototype.toString()` не имеет аргументов.

`Object.prototype.toString()` возвращает строковое представление объекта.

## Как понять

Обычно метод `toString()` не используется для объектов явно, а вызывается JavaScript автоматически, если объект находится в контексте, где он должен быть представлен в виде строки.

Объекты, в отличие от примитивных типов, сложно преобразовывать в строку. Объект может содержать произвольное количество полей и без программиста непонятно, какие из них важные. Поэтому стандартная реализация метода `toString()` представляет собой заглушку и возвращает малоинформативную строку, например, `'[object Object]'`.

Метод `toString()` является одним из нескольких базовых методов, наследуемых всеми объектами созданными из Object. Встроенные объекты (например: `Number`, `Array`, `Error`, `Function` и другие) переопределяют реализацию метода `toString()` для отображения объекта в подходящем виде.

Например, [`Number` преобразует число в строку в указанной системе счисления](/js/number-tostring/), `Array` выводит список элементов через запятую, а `Error` отображает имя и сообщение об ошибке.

Следует отметить, что при использовании Console API метод `toString()` для объектов не используется:

```js
const person = {name: 'Brendan Eich', year: 1961}

// Объект как аргумент console.log
console.log('person: ', person)
// person: { name: 'Brendan Eich', year: 1961 }

// Строка как аргумент console.log
console.log('person: ' + person)
// person: [object Object]
```

### Описание стандартной реализации

Для обычных объектов (имеющих набор полей {ключ: значение}) метод `toString()` возвращает строку `'[object Object]'`.

<details>
  <summary>
    Иные результаты в зависимости от факторов
  </summary>

Значение `Symbol.toPrimitive`. Если объект имеет это специальное поле, описывающее преобразование объекта к примитивным типам, то результат этого преобразования к строке используется вместо `toString()`:

```js
const book = {
  title: 'Замок',
  author: 'Ф. Кафка'
}

book[Symbol.toPrimitive] = function(hint) {
  if (hint === 'string') {
    return `(название: ${this.title}, автор: ${this.author})`
  }
  return true;
}

console.log(`Книга ${book}`)
// Книга (название: Замок, автор: Ф. Кафка)
```

Значение `Symbol.toStringTag`. Если объект имеет это специальное строковое поле, то его значение отображается как тип объекта:

```js
const book = {
  title: 'Дар',
  author: 'В. В. Набоков'
}

book[Symbol.toStringTag] = 'Book'

console.log(`Сейчас читаю ${book}`)
// Сейчас читаю [object Book]
```

Тип `this`. Метод `Object.toString()` может быть вызван для значений других типов:

```js
const toString = Object.prototype.toString

console.log(toString.call([1, 2, 3]))
// [object Array]

console.log(toString.call(25))
// [object Number]

console.log(toString.call(true))
// [object Boolean]
```

</details>

### Переопределение стандартной реализации

Существует несколько способов изменить поведение метода `toString()`.

**Переопределение метода на уровне объекта**. Можно использовать перечисленные выше способы с использованием специальных полей `Symbol.toPrimitive`, `Symbol.toStringTag`.

**Переопределение метода для всех экземпляров класса**. Допустим, классу требуется переопределить поведение метода `toString()`. Для этого нужно добавить собственную реализацию метода. Тогда все объекты этого класса будут использовать переопределённую реализацию:

```js
class Book {
  title = ''
  author = ''

  constructor(title, author) {
    this.title = title
    this.author = author
  }

  toString() {
    return `«${this.title}», автор ${this.author}`
  }
}

const book = new Book('Палата №6', 'А. П. Чехов')
console.log(`Читаю ${book}`)
// Читаю «Палата №6», автор А. П. Чехов
```

**Переопределение метода на уровне прототипа функции**. Для создания объектов с необходимым набором свойств может использоваться функция. В этом случае переопределить метод `toString()` можно для прототипа:

```js
function Book(title, author) {
  this.title = title
  this.author = author
}

Book.prototype.toString = function() {
  return `«${this.title}», автор ${this.author}`
}

const book = new Book('Палата №6', 'А. П. Чехов')
console.log(`Читаю ${book}`)
// Читаю «Палата №6», автор А. П. Чехов
```
