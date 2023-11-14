---
title: "Генераторы и yield"
description: "Генератор – это специальная функция, которая может приостанавливать своё выполнение и возвращает в результате объект-итератор"
authors:
  - windrushfarer
  - SergeyKrasnolobov
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


Генератор – это синтаксический сахар для создания особого вида [объекта-итератора](/js/iterator), который, помимо метода `next()`, реализует 2 дополнительных метода `throw()` и `return()`.

Чтобы создать такой объект нужно использовать **функцию-генератор**. Для её объявления к названию функции в начале добавляют символ звёздочки `*`.

Вызов функции вернёт **объект-генератор**, который одновременно будет итератором и итерируемым объектом (иметь свойство `Symbol.iterator`). У объекта-генератора есть 5 возможных состояний: `undefined`, `suspended-start`, `suspended-yield`, `executing` и `completed`, но доступно нам 3 `suspended` - приостановлен, `executing` - выполняется и `close` - завершён.

Для возврата значений используются операторы `yield` или `yield*`. Они приостанавливают выполнение функции с полным сохранением промежуточных вычислений.

Оператор `yield*` перенаправляет итерации в другой генератор, мы как бы делаем спред другого генератора внутри нашего, получаем его значения и возвращаем их.

Вызов метода `return()` завершает итерации и возвращает значение.

Вызов метода `throw()` завершает итерации и бросает ошибку.


## Пример

Создаём функцию-генератор.

```js
function* getLangs() {
  yield 'java';
  debugger;
  yield 'js';
  yield 'rust';
}
```

Вызов функции вернёт объект-генератор.

```js
const generator = getLangs()
```

Вызываем метод `next()`, чтобы получить следующее значение:

```js
generator.next()
// { value: 'java', done: false }
generator.next()
// { value: 'js', done: false }
generator.next()
// { value: 'rust', done: true }
```

Так как генератор это ещё и **итерируемый объект**, то можно использовать его в цикле `for..of`.

Проверим, что генератор действительно **итерируемый объект**:

```js
const generator = getLangs()

console.log(generator[Symbol.iterator]() === generator)
//true
```

А теперь попробуем обойти его в цикле:

```js
const generator = getLangs()

for (const value of generator) {
    console.log(value)
}
// 'java'
// 'js'
// 'rust'
```

## Как пишется

Чтобы создать функцию-генератор, нужно добавить знак звёздочки между ключевым словом `function` и названием функции. Как именно ставить звёздочку – не важно.

```js
function* generator() {}

function * generator() {}

function *generator() {}
```

Чтобы вернуть значение, используется оператор `yield`.

```js
function* generator() {
    yield 1
    yield 2
}
```

<aside>

  ☝️ Оператор `yield` можно использовать исключительно внутри функции-генератора. То есть в колбэках использование `yield` приведёт к синтаксической ошибке.

  ```js
    function* generator() {
        [1, 2].forEach(x => yield x)
    }
    // Получили SyntaxError
  ```
</aside>


Обратите внимание, что вызывать `return` в генераторе необязательно. Если `return` нет, то после выполнения всех `yield` следующий вызов `next()` вернёт `{ value: undefined, done: true }`.

```js
const g = generator()

g.next()
// { value: 1, done: false }
g.next()
// { value: 1, done: false }
g.next()
// { value: undefined, done: true }
```


## Как понять

Чем функция-генератор отличается от обычной функции? Функции в JavaScript выполняются полностью и в конце мы ожидаем получить результат.

```js
function createFullName(firstName, secondName) {
  return `${firstName} ${secondName}`
}

const fullName = createFullName("Анна", "Каренина")
console.log(fullName)
// Анна Каренина
```

Функция-генератор возвращает объект-генератор. Из этого объекта можно получать данные, вызывая метод `next()`. При этом выполнение функции в буквальном смысле остановится.

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

Генераторы по умолчанию ленивые, и до тех пор пока не будет вызван метод `next()`, у возвращаемого объекта-генератора никакие вычисления не будут происходить. Но даже после вызова `next()` выполнение функции произойдёт только до первого вызова `yield`. Если вызвать `next()` ещё раз, то выполнение продолжится до следующего `yield` и так далее. Продолжим пример выше.

```js
console.log(generator.next())
// "result of heavy compuation #1: 4950"
// { value: 'java', done: false }

console.log(generator.next())
// "result of heavy compuation #2: 9900"
// { value: 'js', done: false }

console.log(generator.next())
// "easy compuation: 4"
// { value: 'rust', done: false }
```

Таким образом мы получили функцию, которая выполняется частями. Если вывести в консоль содержимое, можно лучше понять что происходит внутри.

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

Вначале, генератор находится в состоянии `suspended`, т.е он приостановлен. Дальнейшие вызовы `next()` тоже будут переводить генератор в это состояние до тех пор, пока генератор не вернёт все значения (пройдёт все вызовы `yield`). Генератор закроется, только когда вызов метода `next()` вернёт объект с полем `done: true`.

```js
generator.next()
// { value: 'java', done: false }
generator.next()
// { value: 'js', done: false }
generator.next()
// { value: 'rust', done: false }
generator.next()
// { value: undefined, done: true }

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

Вместе с генераторами в JavaScript был введён оператор `yield`. Как мы видели в примерах выше, `yield` приостанавливает функцию-генератор и возвращает значение. Можно представлять `yield` как двусторонний канал общения с генератором. С одной стороны мы получаем результат, но с другой мы можем передать значение в генератор в любой момент.

Добавим в предыдущий пример условие, что если первый язык программирования нам понравился, то мы учим другой похожий язык вместо JavaScript.

```js
function* getLangs() {
  /**
   * Первый вызов next в любом случае вернет 'java',
   * не имеет значения передадим мы что-то в него или нет
   *
   * Переменная isFavorite при этом будет 'undefined'
  */
  const isFavorite = yield 'java';

    /**
    * Если мы передадим аргумент в 'next' при следующем вызове, то:
    *
    * 1) он будет присвоен переменной isFavorite;
    * 2) условие будет верно, и мы получим значение 'kotlin'
    */
  if (isFavorite) {

    yield 'kotlin'

  } else {
    /**
    * или 'js', если вызовем 'next' без аргументов
    */
    yield 'js';

  }

  yield 'rust';
}

const generator = getLangs()

generator.next()
// { value: 'java', done: false }

// Передаём true, потому что java нам понравилась
generator.next(true)
// { value: 'kotlin', done: false }
```

Может показаться нелогичным, что при первом вызове `next()` значение аргумента не запишется. Такое поведение генераторов связано с их «ленивостью». Первый вызов `next()` можно считать инициализацией.

Если представить генератор как закрытую коробку, то первый вызов `next()` – это как вытянуть первый предмет вслепую. Неизвестно заранее что мы получим и потому нельзя заранее сказать, что предмет нам понравится. Аналогично и в примере выше, сначала мы хотим получить результат, а затем на его основе можем решить какой аргумент передать в следующий вызов `next()`.

Потому мы не можем передать значение в `isFavorite` в первом вызове `next()`, но можем в следующем. Сначала генератор вернёт значение, а только потом сможет записывать переданный ему аргумент.

Используя возможность передачи данных в генератор можно по ходу его выполнения менять возвращаемые значения и создавать очень гибкие конструкции.

### Вызов генераторов внутри генератора

Если к вызову оператора `yield` добавить звёздочку `*`, то можно перенаправить выполнение в другой генератор.

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
    /**
     * Обратите внимание на звёздочку
     *
     * Данная строка тоже самое что и:
     * yield 'kotlin'
     * yield 'scala'
     * yield 'closure'
     *
    */
    yield* jvmLangs()

  } else {
    yield 'js';
  }

  yield 'rust';
}
```

Мы как будто разворачиваем одну книгу внутри другой, и продолжаем читать текст из этой развёрнутой книги.

```js
const generator = getLangs()

generator.next()
// { value: 'java', done: false }
generator.next(true)
// { value: 'kotlin', done: false }
generator.next()
// { value: 'scala', done: false }
generator.next()
// { value: 'closure', done: false }
generator.next()
// { value: 'rust', done: false }
```

Так можно вызывать генераторы внутри генераторов и удобно разбивать логику на отдельные части.

## Генератор vs Итератор

Объект-генератор  является  расширенной версией объекта-итератора, поэтому его также можно использовать для создания коллекций, например `Array` или `Set`.

```js
function* nums() {
    yield 1
    yield 2
    yield 3
}

const arr = Array.from(nums())
console.log(arr)
// [1, 2, 3]
const set = new Set(nums())
console.log(set)
// Set { 1, 2, 3 }
```

Помимо метода `next()`, у объекта-генератора есть методы `return()` и `throw()`, которые завершают генератор после их вызова.

При наличии оператора `return` или после вызова метода `return()` с любым аргументом, в поле `value` будет находиться указанное значение.

<aside>

  ☝️ Так как вызов `return` завершит генератор (переведёт в состояние `closed`), то это значение **не попадёт** в цикл во время итерации.

</aside>

```js
function* generator() {
    yield 1
    yield 2
    return 3
}

for (const num of generator()) {
    console.log(num)
}
// 1
// 2
```

Вызов `return()` с переданным аргументом:

```js
function* getLangs() {
  yield 'java';
  yield 'js';
  yield 'rust';
}

const generator = getLangs()
generator.next()
// { value: 'java', done: false }
generator.return('Programming is too hard!')
// { value: 'Programming is too hard!', done: true }
generator.next()
// { value: undefined, done: true }
```

Метод `throw()` позволяет бросить ошибку и завершить генератор.

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

generator.next()
// { value: 'java', done: false }
generator.throw(new Error("Too much OOP. Brain is melted"))
// Error: Too much OOP. Brain is melted
generator.next()
// { value: undefined, done: true }
```

Оператор `break` в цикле тоже завершает генератор, после чего его невозможно использовать повторно в новом цикле.

Итератор остановит перебор, но его можно использовать повторно.

```js
const generator = getLangs()

const langs = []

for(const lang of generator){
  langs.push(lang)
  if(langs.length === 1) break
}

console.log(langs.length)
// 1

//Новый цикл
for(const lang of generator){
  langs.push(lang)
  if(langs.length === 2) break
}

console.log(langs.length)
// Все ещё 1, а ожидалось 2
```

Повторим этот же пример с использованием итератора.

```js
function getLangs() {
  let index = 0
  const langs = ['java', 'js', 'rust']
  return {
    [Symbol.iterator](){
      return this
    },
    next(){
      return {
        value: langs[index++],
        done: index >= langs.length
      }
    }
  }
}

const iterator = getLangs()

const langs = []

for(const lang of iterator){
  langs.push(lang)
  if(langs.length === 1) break
}

console.log(langs.length)
// 1

//Новый цикл
for(const lang of iterator){
  langs.push(lang)
  if(langs.length === 2) break
}

console.log(langs.length)
//2
```

Если присвоить функцию-генератор в свойство `Symbol.iterator` объекта-генератора, то генератор можно использовать повторно.

```js
const generator = getLangs()

//Присвоим функцию-генератор в свойство Symbol.iterator
generator[Symbol.iterator] = function*(){
    yield 'java';
    yield 'js';
    yield 'rust';
}

const langs = []

for(const lang of generator){
  langs.push(lang)
  if(langs.length === 1) break
}

console.log(langs.length)
// 1

//Новый цикл
for(const lang of generator){
  langs.push(lang)
  if(langs.length === 2) break
}

console.log(langs.length)
//2
```

