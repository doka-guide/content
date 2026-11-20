---
title: "`.findIndex()`"
description: "Найдёт индекс первого подходящего под условие элемента."
baseline:
  - group: array-find
    features:
      - javascript.builtins.Array.findIndex
authors:
  - cergmin
related:
  - js/function-as-datatype
  - js/arrays
  - js/includes
tags:
  - doka
---

## Кратко

Метод `findIndex()` возвращает _индекс_ первого найденного в [массиве](/js/arrays/) элемента, который подходит под условие переданной функции. Если же ни одного подходящего элемента не найдётся, то метод вернёт `-1`.

<aside>

💡 Если вам нужно получить элемент, а не его индекс, то используйте метод [`find()`](/js/array-find/). А если необходимо проверить наличие чего-либо в массиве, то сначала обратите внимание на метод [`includes()`](/js/includes/).

</aside>

## Пример

Напишем код, который позволит найти человека в списке гостей мероприятия. Для этого определим функцию, которая будет получать имя из массива участников и сверять его с константой `guestName`. Затем передадим эту функцию в метод `findIndex()`:

```js
function isWantedGuest(element, index, array) {
  const guestName = 'Лиза'

  return element === guestName
}

const partyGuests = [
  'Даня',
  'Саша',
  'Юля',
  'Лиза',
  'Егор'
]

const meetingGuests = [
  'Даня',
  'Егор',
  'Арсений'
]

console.log(partyGuests.findIndex(isWantedGuest))
// 3 (так как partyGuests[3] -> 'Лиза')

console.log(meetingGuests.findIndex(isWantedGuest))
// -1 (совпадений нет)
```

## Интерактивный пример

<iframe title="Работа метода findIndex" src="demos/guest-list/" height="790"></iframe>

## Как пишется

Метод `findIndex()` обходит массив и возвращает индекс первого элемента, который подходит под условие функции-предиката. Если ничего не подошло, то он возвращает `-1`.

<aside>

💡 Предикативная функция _(функция-предикат)_ — это функция, которая проверяет значение на соответствие какому-то условию, а затем возвращает `true` или `false`.

</aside>

Функция, которую мы передаём в метод `findIndex()`, может принимать три параметра:

- `element` — элемент массива в текущей итерации;
- `index` — индекс текущего элемента;
- `array` — сам массив, который перебираем.

Определим функцию `isEven`, которая проверяет, является ли число чётным, то есть делится на два без остатка. А затем найдём в массиве индекс первого такого числа через `findIndex()`.

```js
// Если число чётное — вернёт true,
// если нечётное — false
function isEven(element) {
  return element % 2 === 0
}

const onlyOddNumbers = [1, 3, 5, 7, 9]
const randomNumbers = [7, 1, 6, 3, 5]

console.log(onlyOddNumbers.findIndex(isEven))
// -1 (элемент не найден)

console.log(randomNumbers.findIndex(isEven))
// 2 (так как randomNumbers[2] -> 6)
```

В этом примере функция `isEven` не использует параметры `index` и `array`, поэтому мы не стали их объявлять.

## Как понять

Найти индекс первого подходящего элемента можно и с помощью цикла [`for`](/js/for/), но метод `findIndex()` позволяет сделать это декларативно. С помощью функции-колбэка мы описываем, какой элемент мы ищем и не описываем как должен происходить поиск. Поиск с помощью цикла `for` содержал бы гораздо больше деталей.

Давайте сами попробуем реализовать `findIndex()`, чтобы лучше понять, как он работает «под капотом».

```js
function findIndex(array, predicate) {
  for (let i = 0; i < array.length; i++) {
    // Если элемент удовлетворяет условию,
    // то возвращаем его индекс
    if (predicate(array[i], i, array)) {
      return i
    }
  }

  // Если ничего не подошло,
  // то возвращаем -1
  return -1
}

function isEven(element) {
  return element % 2 === 0
}

const onlyOddNumbers = [1, 3, 5, 7, 9]
const randomNumbers = [7, 1, 6, 3, 5]

console.log(findIndex(onlyOddNumbers, isEven))
// -1

console.log(findIndex(randomNumbers, isEven))
// 2
```

## Подсказки

💡 Если используете `findIndex` в условии, то всегда явно проверяйте возвращаемое значение на `-1`.
