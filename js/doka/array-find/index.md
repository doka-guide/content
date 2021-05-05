---
title: "Array.find"
name: array-find
authors:
  - KognitivnayaBuena
---

## Кратко

Метод массива `find` вернет первый найденый в массиве элемент, который подходит по условию в переданной колбэк-функции. Если в массиве не найдется ни оного подходящего элемента, то вернется знаечние undefined.

## Пример

```js
// функция, которая позволит определить, есть ли в списке дел мое любимое занятие
function isMyFavouriteHobby(element, index, array) {
  const myFavouriteHobby = 'смотреть сериальчики';

  if (element === myFavouriteHobby) {
    return true;
  } else {
    return false;
  }
}

const currentToDoList = ['смотреть сериальчики', 'читать книгу', 'пить кофе', 'гладить кота', 'гулять'];
const tomorrowToDoList = ['читать книгу', 'пить кофе', 'гладить кота', 'гулять'];

console.log(currentToDoList.find(isMyFavouriteHobby)) // Результат выполнения: смотреть сериальчики
console.log(tomorrowToDoList.find(isMyFavouriteHobby)) // Результат выполнения: undefined, не найдено
```

## Как пишется

Аналогично методу `filter`, метод `find` необходимо передать аргументом функцию. Функция должна возвращать boolean, т.е результатом должен быть `true` или `false`. Главное отличие от функции `filter` в том,  что `find` возвращает первый подходящий элемент, а `filter` вернет массив со всеми подходящими элементами.


```js
// функция-предикат которая проверяет является ли число четным
// если четное - вернет true, если нечетное - false
function predicate(element, index, array) {
  for (let i = 0; i < array.length; i++) {
    if (element % 2 === 0) {
      return true;
      break;
    }
  }
  return false;
}

const onlyEvenElements = [1, 3, 5, 7, 9];
const withOddElements = [1, 2, 4, 6, 3, 5, 7, 9];

console.log(onlyEvenElements.find(predicate)); // undefined, не найдено
console.log(withOddElements.find(predicate));  // 2 - вернет только его, потому что
                                               // это число первое удовлетворило значению
```

Функция, которую мы передаём в метод `find` , принимает три параметра:

- `element` — элемент массива в текущей итерации
- `index` — индекс текущего элемента
- `arr` — сам массив, который мы перебираем

## Как это понять

Метод `find` возвращает элемент, который соответствует описанному в функции-предикате условию. Реализовать такую логику можно и через `for`, но метод `find` позволяет это сделать проще.

Ниже показан пример того, как решить задачу без `find`:

```js
const numbers = [1, 2, 3, 4, 5, 6];
let result = null;

// функция-предикат для определения условия нужного элемента
const checkFunction = (element) => {
  if (element === 2) {
    return true;
  }

  return false;
};

for (let i = 0; i < numbers.length; i++) {
  if (checkFunction(numbers[i])) {
    result = numbers[i];
    return result;
    break;
  }
}

console.log(result) // 2
```

`find` позволит нам уменьшить код и сделать его более понятным:

```js
const numbers = [1, 2, 3, 4, 5, 6]

const result = numbers.find(function (element) {
  if (element === 2) {
    return true;
  }

  return false;
})
console.log(result) // 2
```

## В работе

❗ Стоит всегда возвращать значение из функции-предиката, чтобы получить необходимый элемент. В противном случае вернется undefined.


