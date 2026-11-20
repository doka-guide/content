---
title: "`return`"
description: "Возвращаем результат из функции."
baseline:
  - group: javascript
    features:
      - javascript.statements.return
authors:
  - doka-dog
contributors:
  - furtivite
related:
  - tools/fp
  - js/function-as-datatype
  - js/expressions-vs-statements
tags:
  - doka
---

## Кратко

Функция возвращает результат, который будет передан в вызвавший её код. Для этого и используется ключевое слово `return`.

## Пример

Примеры использования return. Функция проверки возраста на совершеннолетие и функция создания строки заданной длины со случайным содержимым — просто введите произвольные числа 😎

<iframe title="Название — return — Дока" src="demos/vindi-r-eXLXBz/" heigh="100"></iframe>

## Как пишется

`return` используется только в функциях. Этот код приведёт к ошибке, так как не является функцией:

```js
const result = 42
if (result > 10) {
  return true
}
return false
```

А вот этот код верный:

```js
function isAdult(age) {
  return age > 18
}
```

## Как понять

Определённый код «сгруппирован» и объединён в функцию, например проверка — чётное число или нет:

```js
function isEven(value) {
  if (undefined === value || null === value) {
    return false
  }
  return value % 2 == 0
}
```

### Пример

<iframe title="Название — return — Дока" src="demos/vindi-r-jJdQqz/" heigh="100"></iframe>

__Для возврата значения используется инструкция `return`__

Она может находиться в любом месте функции. Как только до неё доходит управление — функция завершается и значение передаётся обратно.

Писать `return` в функции необязательно. Рассмотрим пример:

```js
function notify(msg, type) {
  if (type === 'error') {
    alert('ОШИБКА:' + msg)
  }
  alert(msg)
}
```

Такой функции нечего возвращать, она служит только для группировки набора команд.

Несмотря на отсутствие `return`, такая функция будет возвращать [`undefined`](/js/undefined/), будто бы в ней последней строчкой написано `return undefined`

Ниже пример, который показывает что это действительно так:

```js
function notify(msg, type) {
  if (type === 'error') {
    alert('ОШИБКА:' + msg)
  }
  alert(msg)
}
function notifyFull(msg, type) {
  if (type === 'error') {
    alert('ОШИБКА:' + msg)
  }
  alert(msg)
  return undefined
}
const a = notify('Сообщение')
const b = notifyFull('Сообщение')
console.log(a === b)
// true
```
