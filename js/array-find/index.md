---
title: "`.find()`"
description: "Поиск по массиву будет искать по тем критериям, которые вы придумали."
authors:
  - kognitivnayabuena
editors:
  - tachisis
contributors:
  - skorobaeus
related:
  - js/function-as-datatype
  - js/logic-operators
  - js/for
tags:
  - doka
---

## Кратко

Метод массива `find()` вернёт первый найденный в массиве элемент, который подходит под условие в переданной колбэк-функции. Если в массиве не найдётся ни одного подходящего элемента, то вернётся значение [`undefined`](/js/undefined/).

## Пример

Опишем функцию, которая позволит определить, есть ли в списке дел моё любимое занятие. Поставим в константу просмотр сериальчиков и будем проверять: если занятие из ToDo-списка совпадает с моим хобби, то вернём его. В списке дел на завтра нет просмотра сериалов, а значит, вернётся `undefined`.

```js
function isMyFavoriteHobby(element, index, array) {
  const myFavoriteHobby = 'смотреть сериальчики'

  return element === myFavoriteHobby
}

const currentToDoList = [
  'смотреть сериальчики',
  'читать книгу',
  'пить кофе',
  'гладить кота',
  'гулять',
]
const tomorrowToDoList = [
  'читать книгу',
  'пить кофе',
  'гладить кота',
  'гулять',
]

console.log(currentToDoList.find(isMyFavoriteHobby))
// 'смотреть сериальчики'

console.log(tomorrowToDoList.find(isMyFavoriteHobby))
// undefined, не найдено
```

## Интерактивный пример

<iframe title="Работа метода массива filter — Array.find — Дока" src="demos/index/" height="695"></iframe>

## Как пишется

В метод `find()` необходимо передать аргументом функцию. Функция должна возвращать [булевое значение](/js/boolean/) `true` или `false`. `find()` вернёт первый элемент, на котором переданная функция-колбэк вернула `true`.

Чтобы получить необходимый элемент, нужно определить условие поиска. В этом нам поможет функция-предикат. Предикат — это функция, которая возвращает булевое значение.

От результата выполнения функции зависит, вернёт ли `find()` подходящий элемент:

- `true` — элемент проходит проверку.
- `false` — элемент не проходит проверку.

Опишем функцию-предикат `isOdd`, которая проверяет, является ли число нечётным: проверим остаток от деления на 2, и если остаток равен 1, то число нечётное:

```js
const isOdd = (element) => {
  return element % 2 === 1;
}
```

Протестируем функцию на двух наборах данных. Первый набор состоит только из чётных значений. Второй массив включает в себя нечётные значения: 17, 19, 21.

Когда мы запустим метод `find()` у первого массива, то нам вернётся `undefined`, так как ни одно значение не подходит под условие. В случае со вторым набором вернётся число _17_ и только оно, потому что это число первое удовлетворило значению.

```js
const onlyEvenElements = [2, 4, 8, 16, 32]
const withOddElements = [2, 4, 8, 16, 17, 19, 21]

console.log(onlyEvenElements.find(isOdd))
// undefined, не найдено

console.log(withOddElements.find(isOdd))
// 17
```

Функция, которую мы передаём в метод `find`, принимает три параметра:

- `element` — элемент массива в текущей итерации;
- `index` — индекс текущего элемента;
- `arr` — сам массив, который перебираем.

В коде `isOdd` мы не стали объявлять параметры `index` и `arr`, потому что не используем их.

## Как понять

Метод `find()` возвращает элемент, который соответствует описанному в функции-предикате условию. Реализовать такую логику можно и через [`for`](/js/for/), но метод `find()` позволяет это сделать проще.

Ниже показан пример того, как решить задачу без `find()`. Если мы уберём число 2 из массива, то функция будет возвращать `undefined`.

```js
const numbersWithTwo = [1, 2, 3, 4, 5, 6]
const numbersWithoutTwo = [1, 3, 4, 5, 6]

const findTwo = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === 2) {
      return array[i]
    }
  }

  return undefined
};

console.log(findTwo(numbersWithTwo))
// 2

console.log(findTwo(numbersWithoutTwo))
// undefined
```

☝️ Обратите внимание: после того, как нужный элемент был найден, из функции `findTwo` возвращается значение. Это ведёт к прерыванию цикла `for`. Мы сделали так, чтобы полностью симулировать работу метода `find()` — он заканчивает работу сразу, как только нашёл нужный элемент. Это называется оптимизация. Не стоит тратить ресурс на то, что уже сделано и не пригодится в дальнейшем.

`find()` позволит писать меньше кода и сделать его более понятным:

```js
const numbers = [1, 2, 3, 4, 5, 6]

const result = numbers.find(function isElementEquals2(element) {
  return element === 2
});

console.log(result)
// 2
```

Методы [`.filter()`](/js/array-filter/) и `find()` похожи. Главное отличие `find()` от `filter()` в том, что `find()` возвращает первый подходящий элемент, а `filter()` вернёт массив со всеми подходящими элементами.

Вариант реализации через `.filter()`:

```js
const isTwoOrFour = (element) => {
  return (element === 2) || (element === 4)
}

const numbers = [1, 2, 3, 4, 5, 2, 6]

const resultWithFilter = numbers.filter(isTwoOrFour(element))
const resultWithFind = numbers.find(isTwoOrFour(element))

console.log(resultWithFilter);
// [2, 4, 2]

console.log(resultWithFind);
// 2
```
