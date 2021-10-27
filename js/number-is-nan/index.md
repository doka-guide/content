---
title: "`Number.isNaN()`"
authors:
  - ruslauz
tags:
  - doka
---

## Кратко

Существуют [ситуации](/js/number/#specialnye-znacheniya), когда результат математической обработки не может быть получен.

Например, `Math.sqrt(-9)` или `parseInt('text')`. Результатом выполнения в таком случае будет `NaN`.

Сравнение `NaN` с чем угодно, даже с самим собой, вернёт `false`. Поэтому для проверки на `NaN` была создана сначала глобальная функция `isNaN()`, а потом и статический метод `Number.isNaN()` у [обёртки `Number`](/js/number-wrapper).

## Как пишется

```js
const result1 = 0 / 0
// NaN
console.log(Number.isNaN(result1))
// true

const result2 = 5 / 0
// Infinity
console.log(Number.isNaN(result2))
// false
```

## Как это понять

`NaN` расшифровывается как _Not a Number_, то есть «не число». Однако, он относится к числовому типу данных.

```js
typeof NaN
// number
```

Как мы выяснили ранее, проверка результатов математических операций стандартным способом не принесёт успеха. В примере ниже валидация введённых пользователем данных не будет работать.

```js
function getUserAge() {
  while (true) {
    const value = prompt('Пожалуйста укажите ваш возраст')
    const number = Number(value)

    if (!value) {
        alert('Вы ничего не ввели!')
        continue
    }

    return Number(value)
  }
}

const age = getUserAge()

if (age === NaN) {
  alert('Вы ввели не верные данные')
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
  alert('Вы ввели не верные данные')
  // Теперь будет работать
}
```

Однако, мы не рекомендуем использовать такой подход в разработке. Для проверки лучше применять `Number.isNaN()`.

Есть второй похожий метод `isNaN()`, но он работает не всегда так, как ожидается и возвращает `true` и при значениях, отличных от `NaN`. Например:

```js
isNaN(undefined)
//  true

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

`Number.isNaN()` же никаких приведений не производит. Она вернёт `true` только если переданное в неё значение является типом `number` и оно `NaN`:

```js
Number.isNaN(undefined)
// false

Number.isNaN()
// false
```
