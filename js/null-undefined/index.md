---
title: "`Null` и `undefined`"
authors:
  - nlopin
keywords:
  - нул
  - андефайнд
tags:
  - doka
---

## Кратко

В JavaScript есть два типа данных, которые обозначают «ничего»:

- `null`
- `undefined`

Существует договорённость, когда какой использовать:

- если значение _намеренно_ установлено пустым, то используют `null`
- если значение ещё не было присвоено, то используют `undefined`

## Как пишется

### `undefined`

```js
let name
console.log(name) // напечатает undefined, потому что значение ещё не присвоено
const workoutsDoneByDays = [true, false, true, true, undefined, false, false]
let waitingTime = undefined // явно установили значение переменной в undefined
```

### `null`

```js
let pinCode = null // пин-кода нет
```

## Как понять

Простым языком:

- `null` обозначает понятие «ничего», «пусто», «значение неизвестно»
- `undefined` обозначает, что значение ещё не установлено

Сам JavaScript использует `undefined`, чтобы обозначить, что значение не было установлено. Это часто можно наблюдать в функциях, когда не все аргументы передаются при вызове:

```js
function greet(firstName, lastName) {
  console.log(firstName, lastName)
}

greet("Иван", "Иванов") // напечатает «Иван Иванов»
greet("Петр") // напечатает «Петр undefined». Не передан второй аргумент, поэтому lastName будет undefined
```

Значение `null` всегда явно задаётся программистом, чтобы обозначить пустоту. В JavaScript `null` используется только для обозначения конца цепочки прототипов.
