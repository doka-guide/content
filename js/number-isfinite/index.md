---
title: "`Number.isFinite()`"
description: "Поможет убедиться, что переданное значение — конечное число."
baseline:
  - group: number
    features:
      - javascript.builtins.Number.isFinite
authors:
  - windrushfarer
related:
  - js/deal-with-forms
  - js/objects-objects-everywhere
  - js/typecasting
tags:
  - doka
---

## Кратко

Метод `Number.isFinite()` позволяет проверить, является ли переданное в аргументе число конечным. Конечным числом можно считать любое число, кроме бесконечности и `NaN`. В JavaScript бесконечность можно выразить только с помощью глобального `Infinity` или полей `Number.POSITIVE_INFINITY` и `Number.NEGATIVE_INFINITY`.

В JavaScript есть так же глобальная функция `isFinite()`, которая работает аналогичным образом, но преобразует переданный аргумент в число.

## Пример

```js
Number.isFinite(3.14)
// true
Number.isFinite(10e5)
// true
Number.isFinite(0)
// true

Number.isFinite(-Infinity)
// false
Number.isFinite([])
// false
Number.isFinite('Двадцать пять')
// false

// Использование глобальной функции isFinite
isFinite('Сорок')
// false
isFinite(50)
// true
isFinite('101')
// true
isFinite('10e3')
// true
```

## Как понять

В математике конечным числом можно считать по сути любое число, потому что у числа есть конечное значение. Только у бесконечностей нет фиксированного и конечного значения. Метод `Number.isFinite()` позволяет проверить это свойство у переданного числа.

## Как пишется

Метод `Number.isFinite()` принимает только один аргумент — число, которое нужно проверить. Для любого нечислового значения метод вернёт `false`.

<aside>

☝️ Если нужно убедиться что значение действительно не является числом, можно использовать метод [Number.isNaN()](/js/number-is-nan/).

</aside>

```js
Number.isFinite('123')
// false потому что передана строка
Number.isFinite({})
// false потому что передан объект
Number.isFinite(Infinity)
// false потому что передали бесконечность
Number.isFinite(NaN)
// false потому что передали не число

Number.isFinite(123)
// true, передали обычное число
Number.isFinite(-456)
// true, отрицательные числа тоже конечные
```

<aside>

💡 Бесконечность в JavaScript тоже считается числом, попробуйте ввести в консоли `typeof Infinity`. Выражение `Number.isFinite(Infinity)` возвращает `false` так как бесконечность не является _конечным_ числом, а не потому что бесконечность — это не число.

</aside>

Если возникает необходимость работать с бесконечностью, то в глобальном объекте `Number` имеются удобные ссылки на бесконечности с разными знаками.

```js
Number.POSITIVE_INFINITY === Infinity
// true
Number.NEGATIVE_INFINITY === -Infinity
// true
```
