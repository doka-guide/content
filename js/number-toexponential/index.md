---
title: "`.toExponential()`"
description: "Метод преобразует число в строковое представление числа в экспоненциальной записи."
baseline:
  - group: number
    features:
      - javascript.builtins.Number.toExponential
authors:
  - egorlem
contributors:
  - vitya-ne
related:
  - js/string
  - js/number-wrapper
  - js/typecasting
tags:
  - doka
---

## Кратко

Метод `toExponential()` объекта [`Number`](/js/number-wrapper/) используется для преобразования числа в строку в экспоненциальной (научной) нотации.

## Пример

```js
// Пример большого числа
const largeNumber = 860000000000000000000

console.log(largeNumber.toExponential())
// "8.6e+20"
```

<aside>

🎮 "8.6e+20" — столько очков нужно набрать, чтобы пройти Boss Blind на Ante 16 в игре Balatro.

</aside>


## Как пишется

Метод `toExponential()` объекта `Number` имеет необязательный аргумент `fractionDigits`, который определяет количество цифр после десятичной точки.

Если аргумент `fractionDigits` не указан, то по умолчанию используется минимальное количество цифр, необходимое для представления числа в экспоненциальной форме.

Значение аргумента должно находиться в диапазоне от 0 до 100, иначе метод бросит ошибку `RangeError`.

Метод возвращает строку.

```js
const num = 123456

console.log(num.toExponential())
// "1.23456e+5"

console.log(num.toExponential(2))
// "1.23e+5"
```

☝️ Вызвать метод `toExponential()` можно и для числового литерала. Если число не содержит десятичную точку, добавьте точку или пробел после числа:

```js
console.log(1234..toExponential())
// 1.234e+3

console.log(1234 .toExponential())
// 1.234e+3
```


## Как понять

Иногда числа в их стандартной форме занимают больше памяти, чем строки. Это особенно актуально, когда нужно передавать очень большие или очень маленькие числа по сети. Например, при работе с транзакциями в блокчейне, где важно минимизировать объем передаваемых данных.

Чтобы сократить использование памяти, числа можно представить в экспоненциальной записи. Это переводит числа в компактную форму.

💡 Метод `toExponential()` не добавляет символ экспоненты для «особенных» чисел. Например:

```js
const num1 = Number.POSITIVE_INFINITY
const num2 = NaN

console.log(num1.toExponential())
// Infinity
console.log(num2.toExponential())
// NaN
```
