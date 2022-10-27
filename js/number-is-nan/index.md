---
title: "`Number.isNaN()`"
description: "Проверяет, а не `NaN` ли нам прислали."
authors:
  - ruslauz
contributors:
  - skorobaeus
related:
  - js/function
  - js/typecasting
  - js/deal-with-forms
tags:
  - doka
---

## Кратко

Статический метод `Number.isNaN()` проверяет переданное аргументом значение и возвращает [`true`](/js/boolean/), если это значение `NaN`.

## Как пишется

```js
Number.isNaN(NaN)
// true

Number.isNaN()
Number.isNaN(42)
Number.isNaN('42')
Number.isNaN(null)
Number.isNaN(undefined)
Number.isNaN(false)
// false
```

## Как понять

Существуют [ситуации](/js/number/#specialnye-znacheniya), когда результат математической обработки не может быть получен. Например, `Math.sqrt(-9)` или [`parseInt('text')`](/js/parseint/). Результатом выполнения в таком случае будет `NaN`. `NaN` расшифровывается как _Not a Number_, то есть «не число». Однако, он относится к числовому типу данных.

```js
typeof NaN
// 'number'
```

Сравнение `NaN` с чем угодно, даже с самим собой, вернёт `false`. Поэтому проверка результатов математических операций стандартным способом не принесёт успеха. В примере ниже валидация введённых пользователем данных не будет работать.

```js
function getUserAge() {
  while (true) {
    const value = prompt('Пожалуйста, укажите ваш возраст')

    if (!value) {
        alert('Вы ничего не ввели!')
        continue
    }

    return Number(value)
  }
}

const age = getUserAge()

if (age === NaN) {
  alert('Вы ввели неверные данные')
  // Не сработает
}
```

Мы бы могли использовать уникальные свойства `NaN` и написать собственную утилиту для проверки результата, сравнивая его с самим собой.

```js
function isNaN(number) {
  return number !== number
}

const age = getUserAge()

if (isNaN(age)) {
  alert('Вы ввели неверные данные')
  // Теперь будет работать
}
```

Однако, мы не рекомендуем использовать такой подход в разработке. Для проверки лучше применять статический метод `Number.isNaN()` у [обёртки `Number`](/js/number-wrapper/).

Есть так же глобальная функция `isNaN()`, но она работает не всегда так, как ожидается и возвращает `true` и при значениях, отличных от `NaN`. Например:

```js
isNaN(undefined)
// true

Number.isNaN(undefined)
// false
```

### Сравнение `isNaN()` и `Number.isNaN()`

Отличие заключается в том, что глобальная функция `isNaN()` приводит к числовому типу всё, что было в неё передано, если оно не является числом. Если в результате приведения был получен `NaN`, она возвращает `true`:

```js
Number(undefined)
// NaN
isNaN(undefined)
// true

Number('0')
// 0
isNaN('0')
// false
```

Однако, если неявная передача `undefined` (вызов функции без параметров) в `Number` возвращает число `0`, то `isNaN()` вернёт `true`, приняв пустое значение за `NaN`.

```js
Number()
// 0

isNaN()
// true
```

`Number.isNaN()` же никаких приведений не производит. Она вернёт `true` только если переданное в неё значение является `NaN`.
