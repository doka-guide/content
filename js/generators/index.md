---
title: "Генераторы и yield"
description: "Генератор – это специальная функция, которая может приостанавливать свое выполнение и возвращает в результате объект-итератор"
authors:
  - windrushfarer
keywords:
  - Итератор
  - Генератор
  - Symbol.iterator
  - iterator
  - yield
tags:
  - doka
---

## Кратко

Генератор – это специальная функция, которая возвращает [объект-генератор](/js/iterator/). Объект-генератор это расширенная версия объекта-итератора. Можно сказать, что генератор – это функция, которая создает итератор.
Чтобы объявить фукнцию-генератор к названию функции в начале добавляют символ звездочки `*`.
Чтобы вернуть значение, внутри генератора используется оператор `yield`. Вызов `return` завершит перебор объекта-итератора.

## Пример

```js
function* getLangs() {
  yield 'java';
  yield 'js';
  yield 'rust';
}

const generator = getLangs()
generator.next() // { value: 'java', done: false }
generator.next() // { value: 'js', done: false }
generator.next() // { value: 'rust', done: true }

const generator2 = getLangs()
for (const value of generator2) {
    console.log(value)
}
// Выведет: 'java', 'js', 'rust'
```

## Как это понять

Для лучшего понимания проведём сравнение с обычными функциями. Функции в JavaScript выполняются полностью и в конце мы ожидаем получить результат.

```js
function createFullName(firstName, secondName) {
  return `${firstName} ${secondName}`
}

const fullName = createFullName("Анна", "Каренина")
```

Функция-генератор во время вызова не вернёт значение сразу, а вместо этого вернёт объект-генератор из которого мы можем получить ожидаемый результат. При этом выполнение функции в бувальном смысле остановится.

```js
function imaginaryHeavyComputation() {
  let result = 0
  for (let i = 0; i < 100; i++) {
    result += i
  }

  return result
}

function* getLangs() {
  const result1 = imaginaryHeavyComputation()
  console.log('result of heavy compuation #1:', result1)
  yield 'java';
  
  const result2 = imaginaryHeavyComputation()
  console.log('result of heavy compuation #2:', result1 + result2)
  yield 'js';

  console.log("easy compuation:", 2 + 2)
  yield 'rust';
}

const generator = getLangs()
// Никаких логов и вызовов функций не произошло
```

Генераторы ленивые по-умолчанию и до тех пор пока не будет вызван метод `.next()` у возвращаемого объекта-генератора никакие вычисления не будут происходить. Но даже после вызова `.next()` выполнение функции произойдёт только до первого вызова `yield`. Если вызвать `.next()` ещё раз, то выполнение продолжится до следующешо `yield` и так далее. Продолжим пример выше.

```js
generator.next() // Возвращает { value: 'java', done: false }
// Выведет "result of heavy compuation #1: 4950"

generator.next() // Возвращает { value: 'js', done: false }
// Выведет "result of heavy compuation #2: 9900"

generator.next() // Возвращает { value: 'rust', done: false }
// Выведет "easy compuation: 9900"
```

Таким образом мы получили функцию, которая выполняется частями. Если вывести в консоль содержимое, то можно лучше понять что происходит внутри.

```js
const generator = getLangs()
console.log(generator)
/*
[[GeneratorLocation]]: VM229:1
[[Prototype]]: Generator
[[GeneratorState]]: "suspended"
[[GeneratorFunction]]: ƒ* getLangs()
[[GeneratorReceiver]]: Window
[[Scopes]]: Scopes[3]
*/
```

В самом начале своего генератор имеет состояние `suspended`, т.е он приостановлен. Дальнейшие вызовы `.next()` тоже будут переводить генератор в то же состояние пока генератор не вернул все значения (не прошёл все вызова `yield`). Генератор закроется только когда вызов метода `.next()` вернет объект с полем `done: true`.

```js
generator.next() // { value: 'java', done: false }
generator.next() // { value: 'js', done: false }
generator.next() // { value: 'rust', done: false }
generator.next() // { value: undefined, done: true }

console.log(generator)
/*
[[GeneratorLocation]]: VM229:1
[[Prototype]]: Generator
[[GeneratorState]]: "closed" // Обратите внимание на изменившийся статус
[[GeneratorFunction]]: ƒ* getLangs()
[[GeneratorReceiver]]: Window
[[Scopes]]: Scopes[3]
*/
```

### Передача значений в генератор с `yield`

Вместе с генераторами в JavaScript был введён оператор `yield`. Как мы видели в примерах выше, `yield` приостанавливает функцию-генератор и возвращает значение. Однако `yield` можно представлять как двусторонний канал общения с генератором. С одной стороны мы получаем результат, но с другой мы можем передать значение в генератор в любой момент.

Немного изменими пример с языками выше и добавим условие, что если первый язык программирования нам понравился, то мы учим другой похожий язык вместо JavaScript.

```js
function* getLangs() {
  // Сюда запишется аргумент из следующего вызова next
  const isFavorite = yield 'java';

  if (isFavorite) {
    yield 'kotlin'
  } else {
    yield 'js';
  }

  yield 'rust';
}

const generator = getLangs()

generator.next() // { value: 'java', done: false }
// Передаём true, потому что java нам понравилась
generator.next(true) // { value: 'kotlin', done: false }
```

☝️ Не забывайте, что вызов `.next()` выполняет содержимое функции **до** следующего `yield`. Потому мы не можем передать значение в `isFavorite` в первом вызове `.next()`. Это как заранее сказать, что язык нам понравился, когда мы даже не увидели результат. А что если бы вместо `java` вернулось что-то другое?

Таким образом можно по ходу выполнения генератора менять возвращаемые значения и создавать очень гибкие конструкии.

### Вызов генераторов внутри генератора

Если по аналогии с генератором добавить звездочку `*` к вызову оператора `yield`, то так можно перенаправлять выполнение в другой генератор. 

Снова дополним наш пример и предположим, что если нам понравился язык `java`, то мы хотим попробовать несколько языков на базе JVM.

```js
function* jvmLangs() {
  yield 'kotlin'
  yield 'scala'
  yield 'closure'
}

function* getLangs() {
  const isFavorite = yield 'java';

  if (isFavorite) {
    yield* jvmLangs() // Обратите внимание на звездочку
  } else {
    yield 'js';
  }

  yield 'rust';
}

const generator = getLangs()

generator.next() // { value: 'java', done: false }
generator.next(true) // { value: 'kotlon', done: false }
generator.next() // { value: 'scala', done: false }
generator.next() // { value: 'closure', done: false }
generator.next() // { value: 'rust', done: false }
```

Так можно вызывать генераторы внутри генераторов и удобно разбивать логику на отдельные части.

## Как пишется

Чтобы создать функцию-генератор нужно добавить знак звёздочки между ключевым словом `function` и названием функции. При этом возможны любые варианты постановки и где поставить звёздочку лишь дело вкуса.

```js
function* generator() {}

function * generator() {}

function *generator() {}
```

Чтобы вернуть значение используется оператор `yield`.

```js
function* generator() {
    yield 1
    yield 2
}
```

Обратите внимание, что слово `return` в генераторе необязательно. Если `return` нет, то после выполнения всех `yield` следующий вызов `.next()` вернёт `{ value: undefined, done: true }`.

```js
const g = generator()

g.next() // { value: 1, done: false }
g.next() // { value: 1, done: false }
g.next() // { value: undefined, done: true }
```

При наличии `return` в поле `value` будет находится указанное значение.

☝️ Так как вызов `return` закрывает генератор, то это значение **не попадёт** в цикл во время итерации.

```js
function* generator() {
    yield 1
    yield 2
    return 3
}

for (const num of generator()) {
    console.log(num)
}
// Выведет: 1, 2
```

Генераторы возвращают объект-генератор, который являвется просто расширенной версией объекта-итератора, потому результат вызова можно использовать для создания коллекций, например `Array` или `Set`.

```js
function* nums() {
    yield 1
    yield 2
    yield 3
}

const arr = Array.from(nums()) // [1, 2, 3]
const set = new Set(nums()) // Set { 1, 2 }
```

У объект-генератор помимо метода `.next()` есть методы `.return()` и `.throw()`, которые позволяют завершить генератор после вызова.

Метод `.return()` закрывает генератор и передает в поле `value` значение аргумента, переданного в `.return()`.

```js
function* getLangs() {
  yield 'java';
  yield 'js';
  yield 'rust';
}

const generator = getLangs()
generator.next() // { value: 'java', done: false }
generator.return('Programming is too hard!') // { value: 'Programming is too hard!', done: true }
generator.next() // { value: undefined, done: true }
```

Метод `.throw()` позволяет бросить ошибку в генератор и тоже закрывает его.

```js
function* getLangs() {
  try {
    yield 'java';
    yield 'js';
    yield 'rust';
  } catch (e) {
      console.log(e)
  }
}

const generator = getLangs()
generator.next() // { value: 'java', done: false }
generator.throw(new Error("Too many OOP. Brain melted")) // Error: Too many OOP. Brain melted
generator.next() // { value: undefined, done: true }
```