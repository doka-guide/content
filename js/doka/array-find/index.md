---
title: "Array.find"
name: array-find
authors:
  - KognitivnayaBuena
---

## Кратко

Метод массива `find` вернет первый найденый в массиве элемент, который подходит по условию в переданной колбэк-функции. Если в массиве не найдется ни одного подходящего элемента, то вернется значение undefined.

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

В метод `find` необходимо передать аргументом функцию. Функция должна возвращать boolean, т.е результатом должен быть `true` или `false`. Функция `find` возвращает первый подходящий во условию в функции элемент.

Чтобы получить необходимый элемент, нужно определить условие поиска. В этом нам поможет функция-предикат. Этот тип функций подразумевает под собой результат булевого значения.

От результата выполнения функции зависит, попадёт ли элемент в итоговый массив:

- `true` — элемент проходит проверку
- `false` — элемент не проходит проверку

```js
// функция-предикат которая проверяет является ли число нечетным
// если четное - вернет false, если нечетное - true
function isEven(element, index, array) {
  const start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start++ < 1) {
      return false;
    }
  }
  return element > 1;
}

const onlyEvenElements = [2, 4, 8, 16, 32];
const withOddElements = [2, 4, 8, 16, 17, 19, 21];

console.log(onlyEvenElements.find(isEven)); // undefined, не найдено
console.log(withOddElements.find(isEven));  // 17 - вернет только его, потому что
                                               // это число первое удовлетворило значению
```

Функция, которую мы передаём в метод `find` , принимает три параметра:

- `element` — элемент массива в текущей итерации
- `index` — индекс текущего элемента
- `arr` — сам массив, который перебираем

## Как это понять

Метод `find` возвращает элемент, который соответствует описанному в функции-предикате условию. Реализовать такую логику можно и через `for`, но метод `find` позволяет это сделать проще.

Ниже показан пример того, как решить задачу без `find`. Если мы уберем число 2 из массива, то функция будет возвращать undefined. Обрати внимание  на то, что после того, как нужный элемент был найдейн, делается прерывание цикла `for`. Это написано для имитации поиска через `find`. `find` заканчивает работу как только нашёл нужный элемент. Это называется оптимизация. Не стоит тратить ресурс на то, что уже сделано и не пригодится в дальнейшем.

```js
const numbers_1 = [1, 2, 3, 4, 5, 6];
const numbers_2 = [1, 3, 4, 5, 6];

const isElementEquals2 = (array) => {

  for (let i = 0; i < array.length; i++) {
    if (array[i] === 2) {
      return array[i];
      break;
    }
  }
  
  return undefined;
}

console.log(isElementEquals2(numbers_1)); // 2
console.log(isElementEquals2(numbers_2)); // undefined
```

`find` позволит писать меньше кода и сделать его более понятным:

```js
const numbers_1 = [1, 2, 3, 4, 5, 6]

const result = numbers_1.find(function isElementEquals2 (element) {
  return element === 2
})
console.log(result) // 2
```

Аналогично методу `filter`, метод `find` необходимо передать аргументом функцию. Функция должна возвращать 
boolean, т.е результатом должен быть `true` или `false`. Главное отличие от функции `filter` в том,  что `find` 
возвращает первый подходящий элемент, а `filter` вернет массив со всеми подходящими элементами.

Вариант реализации через `filter`:

```js
const numbers_1 = [1, 2, 3, 4, 5, 6]

const result = numbers_1.filter(function isElementEquals2 (element) {
  return element === 2
})
console.log(result) // [2]
```
