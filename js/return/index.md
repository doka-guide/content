---
title: "return"
authors:
  - vindi-r
contributors:
  - furtivite
tags:
  - doka
---

## Кратко

Функция возвращает результат, который будет передан в вызвавший её код. Для этого и используется ключевое слово `return`

## Пример

Примеры использования return. Функция проверки возраста на совершеннолетие и функция создания строки заданной длины со случайным содержимым — введи произвольные числа и попробуй 😎

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="vindi-r" data-slug-hash="eXLXBz" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="return() Кратко">
  <span>See the Pen <a href="https://codepen.io/vindi-r/pen/eXLXBz">
  return() Кратко</a> by vindi-r (<a href="https://codepen.io/vindi-r">@vindi-r</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

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
//А этот код верный
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

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="vindi-r" data-slug-hash="jJdQqz" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="return() как это понять">
  <span>See the Pen <a href="https://codepen.io/vindi-r/pen/jJdQqz">
  return() как это понять</a> by vindi-r (<a href="https://codepen.io/vindi-r">@vindi-r</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

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
