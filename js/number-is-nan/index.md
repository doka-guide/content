---
title: "`Number.isNaN()`"
authors:
  - doka-dog
tags:
  - doka
---

## Кратко

Существуют ситуации, когда результат математической обработки не может быть получен.

Например `Math.sqrt(-9)` или `parseInt('text')`. Результатом выполнения в таком случае будет `NaN`.

Сравнение NaN с чем угодно (даже с самим собой) вернёт `false`. Поэтому была создана глобальная функция `isNaN()`, а потом и метод у функции `Number` - `Number.isNaN()`.

## Как пишется

```js
const result = Math.sqrt(-9)
// NaN

console.log(result === NaN)
// false

console.log(Number.isNaN(result))
// true
```

## Как это понять

`NaN` расшифровывается как _Not a Number_, то есть «не число». Однако он относится к числовому типу данных.

```js
typeof NaN
// number
```

Как мы выяснили ранее, проверка результатов математических операций стандартным способом не принесёт успеха.

```js
const result = someCalculations()

if (result === NaN) {
  throw new Error('Calculation failed')
  // Не сработает
}
```

Мы бы могли использовать уникальные свойства `NaN` и написать собственную утилиту для проверки результата, сравнивая его с самим собой.

```js
function isNaN(number) {
  return number !== number
}

isNaN(NaN)
// true
```

Однако мы не рекомендуем использовать такой подход в разработке. Для проверки лучше применять `Number.isNaN()`. Есть второй похожий метод `window.isNaN()` (или просто `isNaN`), но он работает не всегда так, как ожидается и возвращает `true` и при значениях, отличных от `NaN`. Например:

```js
isNaN(undefined)
//  true

Number.isNaN(undefined)
// false
```
