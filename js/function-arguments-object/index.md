---
title: "Объект `arguments`"
description: "Устаревший способ получить все значения, переданные в функцию при вызове."
baseline:
  - group: functions
    features:
      - javascript.functions.arguments
authors:
  - nlopin
related:
  - js/for
  - js/arrays
  - js/spread
tags:
  - doka
---

## Кратко

Устаревший способ получить все значения, переданные в функцию при вызове в виде массивоподобного объекта. Используется в функциях, которые принимают произвольное количество аргументов.

Не работает в стрелочных функциях.

<aside>

🙅 Используйте синтаксис остаточных (_rest_) параметров, он современнее и лучше читается.

Используйте `arguments` только если пишете код в [версии языка раньше ES6](/js/language-versions/#obnovleniya-i-versii), выпущенной в 2015 году.

</aside>

## Пример

Функция, которая принимает произвольное количество аргументов, выбирает из них только строки и склеивает с помощью пробела:

```js
function joinStrings() {
  const strings = []
  for (let i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] === 'string') {
      strings.push(arguments[i])
    }
  }
  return strings.join(' ')
}

const result = joinStrings('hello', 12, 'world', false, null)
console.log(result)
// hello world
```

## Как понять

`arguments` доступно во всех видах [функций](/js/function/), за исключением стрелочных.

`arguments` — массивоподобный объект, к его элементам можно обращаться по индексу, у него есть свойство `length`, но `arguments` не имеет остальных методов массива, таких как `push()` или [`filter()`](/js/array-filter/).

Массивоподобность объекта позволяет обойти его элементы с помощью цикла.
