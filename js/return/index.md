---
title: "`return`"
authors:
  - doka-dog
contributors:
  - furtivite
tags:
  - doka
---

## Кратко

Функция возвращает результат, который будет передан в вызвавший её код. Для этого и используется ключевое слово `return`

## Пример

Примеры использования return. Функция проверки возраста на совершеннолетие и функция создания строки заданной длины со случайным содержимым — введи произвольные числа и попробуй 😎

<iframe title="Название — return — Дока" src="demos/vindi-r-eXLXBz/" heigh="100"></iframe>

## Как пишется

`return` используется только в функциях:

```js
// Этот код приведет к ошибке, так как не является функцией
var result = 42
if (result > 10) {
  return true
}
return false
```

```js
// А этот код верный
function isAdult(age) {
  return age > 18
}
```

## Как это понять

Определённый код «сгруппирован» и объединён в функцию, например проверка — целое число или нет:

### Код функции:

```js
function isInteger(value) {
  if (undefined === value || null === value) {
    return false
  }
  return value % 2 == 0
}
```

### Пример

<iframe title="Название — return — Дока" src="demos/vindi-r-jJdQqz" heigh="100"></iframe>

__Для возврата значения используется директива `return`__

Она может находиться в любом месте функции. Как только до неё доходит управление — функция завершается и значение передаётся обратно.

Писать `return` в функции не обязательно. Рассмотрим пример:

```js
function notify(msg, type) {
  if (type === "error") {
    alert("ОШИБКА:" + msg)
  }
  alert(msg)
}
```

Такой функции нечего возвращать, она служит только для группировки набора команд.

Несмотря на отсутствие return, такая функция будет возвращать `undefined`, будто бы в ней последней строчкой написано `return undefined;`

Ниже пример, который показывает что это действительно так:

```js
function notify(msg, type) {
  if (type === "error") {
    alert("ОШИБКА:" + msg)
  }
  alert(msg)
}
function notifyFull(msg, type) {
  if (type === "error") {
    alert("ОШИБКА:" + msg)
  }
  alert(msg)
  return undefined
}
var a = notify("Сообщение")
var b = notifyFull("Сообщение")
alert(a === b)
```
