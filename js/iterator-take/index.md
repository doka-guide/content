---
title: "Iterator.prototype.take()"
description: "Возвращает итератор, завершающийся после фиксированного числа шагов"
baseline:
  - group: iterator-methods
    features:
      - javascript.builtins.Iterator.take
authors:
  - vitya-ne
related:
  - js/iterator
  - js/iterator-to-array
  - js/generators
tags:
  - doka
---

## Кратко

`Iterator.prototype.take()` создаёт итератор с гарантированным завершением. Метод возвращает итератор, который завершится после указанного числа успешных шагов итерации или раньше, в случае завершения исходного итератора. О том, что такое итератор, можно прочитать в статье [«Итератор»](/js/iterator/).

## Пример

У нас есть коллекция фильмов и итератор для её обхода:

```js
const movies = [
  'Братство кольца',
  'Две крепости',
  'Возвращение короля',
  'Нежданное путешествие'
]

const baseIterator = movies.values()
```

Создадим из `baseIterator` новый итератор, для обхода только части коллекции, например для итерации по фильмам трилогии "Властелин Колец":

```js
const limitIterator = baseIterator.take(3)

for (const item of limitIterator) {
  console.log(item)
}
// Братство кольца
// Две крепости
// Возвращение короля
```

## Как пишется

`Iterator.prototype.take()` принимает один обязательный аргумент — число, определяющее максимальное количество значений, которые может вернуть созданный итератор.

`Iterator.prototype.take()` возвращает новый итератор.

При выполнении метода произойдёт преобразование аргумента в целое положительное число, поэтому тип аргумента не ограничен `Integer`. Например, равнозначными будут значения:

- 1
- "1"
- `true`
- [1]
- 1.7

Если передать `0` — метод вернёт завершённый итератор.

```js
const iterator = [ 'Трудности', 'перевода' ].values()
const limitIterator = iterator.take(0)

for (const item of limitIterator) {
  console.log(item) // Не выполнится
}
```

Если переданное значение не может быть преобразовано или является отрицательным числом, будет брошена ошибка `RangeError`. Попытка вызвать метод без аргумента так же приведёт к ошибке `RangeError`.

## Как понять

Работая с итераторами можно столкнуться с ситуацией, когда необходимо ограничить количество получаемых значений. Например, это может понадобиться, когда итератор не имеет конечного состояния (`{ done:true }`). Такой итератор называют "бесконечный".

Рассмотрим пример. У нас есть функция-генератор паролей:

```js
function* passwordGenerator(length = 8) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()'

  while (true) {
    let password = '';
    for (let i = 0; i < length; i++) {
      const random = Math.floor(Math.random() * charset.length);
      password += charset[random];
    }
    yield password;
  }
}
```

При вызове функции будет создан итератор, возвращающий строку-пароль:

```js
const passwords = passwordGenerator()

console.log(passwords.next().value)
// Z@1pivgS
console.log(passwords.next().value)
// PXoDm)B8
```

`passwords` является итерируемым объектом, но его нельзя обойти с помощью [`for...of`](/js/for-of/) потому что это приведёт к зависанию цикла. По этой же причине нельзя применить методы получения массива значений: [`Array.from()`](/js/array-from/) или [`Iterator.prototype.toArray()`](/js/iterator-to-array/).

`Iterator.prototype.take()` помогает получить итератор с ограниченным количеством итераций:

```js

const passwords = passwordGenerator()

const limitPasswords = passwords.take(3)

console.log(Array.from(limitPasswords))
// [ '1QAg2NHv', 'L(46lQly', 'Vs9c)vWm' ]
```

Итератор, созданный методом `Iterator.prototype.take()`, использует исходный итератор как источник данных. Это означает, что каждый шаг итерации выполняется за счёт вызова `next()` у исходного итератора.  Если исходный итератор завершится, итерация созданного итератора также завершится.

Посмотрим как вызов `next()` у одного итератора влияет на состояние другого:

```js
const persons = [
  'I Гретель',
  'II Брунгильда',
  'III Ирмгард',
  'IV Адельхейд'
]

const base = persons.values()

const limit = base.take(3)

base.next()

console.log(limit.next().value)
// II Брунгильда

console.log(base.next().value)
// III Ирмгард

console.log(Array.from(limit))
// [ 'IV Адельхейд' ]
```

Можно сделать выводы:
- `Iterator.prototype.take()` не создаёт независимую копию с доступом к части значений исходного итератора;
- Каждый вызов `next()` у одного итератора влияет на состояние другого, потому что они делят общее состояние итерации.

## Подсказки

Если итератор не является наследником глобального объекта `Iterator`, метод `take()` можно вызвать через `call()`. Это пригодится для итераторов, реализованных вручную.

Допустим имеется функция для создания итератора цветов: #0000FF, #00FF00, #FFFF00, #FF0000

```js
function createColorIterator() {
  const colors = ['001', '010', '110', '100']
  let index = 0

  return {
    next() {
      if (index === colors.length) {
        return { done: true }
      }
      const rgb = colors[index++].split('').map(c => c * 255)
      const value = `rgb(${rgb.join(',')})`
      return { value, done: false }
    }
  }
}

const colors = createColorIterator()
```

Вызов `colors.take(2)` приведёт к ошибке `TypeError`, так как итератор `colors` не наследует методы `Iterator.prototype`:

```js
console.log(colors instanceof Iterator)
// false
```

Вызвать `take()` можно с помощью `call()`:

```js
const limitColors = Iterator.prototype.take.call(colors, 2)

for (const color of limitColors) {
  console.log(color)
}
// rgb(0,0,255)
// rgb(0,255,0)
```
