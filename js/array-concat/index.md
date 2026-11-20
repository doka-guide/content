---
title: "`.concat()`"
description: "Возвращает новый массив, полученный при объединении нескольких массивов."
baseline:
  - group: array
    features:
      - javascript.builtins.Array.concat
authors:
  - vitya-ne
related:
  - js/array-to-spliced
  - js/array-push
  - js/array-splice
tags:
  - doka
---

## Кратко

Метод `concat()` объединяет исходный массив с одним или несколькими указанными массивами или другими значениями и возвращает новый массив. Метод не меняет массивы, участвующие в объединении.

## Пример

Объединим два массива в новый массив. Обратите внимание — исходный массив не изменился:

```js
const months = ['март', 'апрель', 'май']
const summer = ['июнь', 'июль', 'август']
const favoriteMonths = months.concat(summer)

console.log(favoriteMonths)
// ['март', 'апрель', 'май', 'июнь', 'июль', 'август']

console.log(months)
// ['март', 'апрель', 'май']
```

Объединим три массива в новый массив, используя в качестве исходного пустой массив:

```js
const numbers = [2, 12, 85]
const strings = ['06', 'это', 'твой', 'номер']
const result = [].concat(numbers, strings)

console.log(result)
// [2, 12, 85, '06', 'это', 'твой', 'номер']
```

## Как пишется

`concat()` принимает в качестве аргументов элементы, объединяемые в новый массив.

`concat()` возвращает новый массив, полученный при объединении.

Если метод без аргументов был вызван для массива, возвращается [поверхностная копия (shallow copy)](/js/shallow-or-deep-clone/) исходного массива:

```js
const numbers = [1, 2, 3, 4]
const copyNumbers = numbers.concat()

console.log(copyNumbers)
// [1, 2, 3, 4]

console.log(numbers)
// [1, 2, 3, 4]
```

В качестве аргументов могут выступать не только массивы, но и значения других типов:

```js
const numbers = [1, 2, 3]
const result = numbers.concat(
  4, 'five', null, {name: 'six'}, [[7]]
)

console.log(result)
// [1, 2, 3, 4, 'five', null, {name: 'six'}, [7]]
```

Метод `concat()` можно вызвать и для значений других типов (например: строка, число, объект). Если `this` является значением примитивного типа (строка, число, `true` или `false`), то оно преобразуется в объект.

<details>
  <summary>
    Подробнее о преобразовании в объект
  </summary>

  Для примитивных значений будет создан объект-обёртка соответствующего типа, например: `true` — `Boolean`, `'строка'` — `String`, `48` — `Number`.

  Для `undefined` и `null` преобразование в объект выполнено быть не может, так как эти значения не имеют объектов-обёрток.

</details>

Примеры использования метода `concat()`, когда исходным значением не является массив:

```js
const concatFn = Array.prototype.concat
const str = 'я строка'
console.log(concatFn.call(str))
// [ [String: 'я строка'] ]

const number = 42
console.log(concatFn.call(number, 21))
// [ [Number: 42], 21 ]
```

В случае попытки использовать `undefined` или `null` как исходное значение метода `Array.prototype.concat`, будет вызвано исключение `TypeError`.

```js
try {
  console.log(concatFn.call(null))
} catch(err) {
  console.error('Поймали ошибку! Вот она:', err.message)
}
// Поймали ошибку! Вот она:
// Array.prototype.concat called on null or undefined
```

## Как понять

`concat()` обычно используется когда необходимо получить новый массив путём объединения нескольких массивов. В отличие от метода `splice()`, который может использоваться для добавления элементов к исходному массиву, метод `concat()` создаёт новый массив и не изменяет исходный.

Если аргумент содержит неодномерный массив, то этот массив будет добавлен как один элемент:

```js
const numbers = [1, 2, 3]
console.log(numbers.concat([4, [5, 6]]))
// [1, 2, 3, 4, [5, 6]]
```

Стандартное поведение метода можно изменить с использованием `Symbol.isConcatSpreadable`.

<details>
  <summary>
    Подробнее об использовании `Symbol.isConcatSpreadable`
  </summary>

  Согласно спецификации ECMAScript, для изменения поведения метода может использоваться специальное свойство `Symbol.isConcatSpreadable`.

  Если значением этого свойства для массива является `false`, то он будет добавлен как один элемент:

  ```js
  const numbers = [1, 2, 3]

  const otherNumbers = [4, 5, 6]
  otherNumbers[Symbol.isConcatSpreadable ] = false

  console.log(numbers.concat(otherNumbers))
  // [1, 2, 3, [4, 5, 6, [Symbol(Symbol.isConcatSpreadable)]: false ]]
  //           ------------------------------------------------------
  ```

  Если значением этого свойства для массивоподобного объекта является `true`, то его свойства-элементы будут добавлены по отдельности:

  ```js
  const numbers = [1, 2, 3]
  const arrayLike = {
    [Symbol.isConcatSpreadable ]: true,
    '0': 4,
    '1': 5,
    '2': 6,
    length: 3
  }

  console.log(numbers.concat(arrayLike))
  // [1, 2, 3, 4, 5, 6]
  ```

</details>

## Подсказки

💡 Если один из массивов имеет незаполненные элементы, то при выполнении `concat()` возвращаемый массив тоже будет содержать незаполненные элементы:

```js
const colors = ['crimson', , 'purple']
console.log(colors.concat(['magenta']))
// ['crimson', <1 empty item>, 'purple', 'magenta']
```

💡 Если исходный массив или один из аргументов содержит объекты, то возвращаемый в результате работы `concat()` массив будет содержать для них ссылки, а не новые объекты. Таким образом, последующее изменение объекта будет видно в созданном массиве и наоборот:

```js
const skills = [{name: 'HTML'}, {name: 'CSS'}, {name: 'JS'}]

// Добавим новый элемент
const result = skills.concat([{name: 'Python'}]);
console.log(result)
// [{name: 'HTML'}, {name: 'CSS'}, {name: 'JS'}, {name: 'Python'}]

// Изменим элемент исходного массива
skills[1].level = 'C'

console.log(skills)
// [{name: 'HTML'}, {name: 'CSS', level: 'C'}, {name: 'JS'}]

// Увидим изменения в созданном массиве
console.log(result)
// [
//  { name: 'HTML'},
//  { name: 'CSS', level: 'C'},
//  { name: 'JS' },
//  { name: 'Python' }
// ]
```
