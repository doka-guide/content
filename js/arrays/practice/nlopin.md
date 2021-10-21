### 🛠 Копирование массива

С копированием есть хитрость. Массив — большая структура, и она не вмещается в одну переменную. Переменная хранит адрес, где находится массив. Если этого не знать, то результат такого кода будет выглядеть странно:

```js
let iWatched = ["GameOfThrones", "Breaking Bad"]
let vitalikWatched = iWatched

vitalikWatched.push("American Gods")
console.log(iWatched) // ["GameOfThrones", "Breaking Bad", "American Gods"] 🤷‍♂️
```

Фишка в том, что во второй строке происходит копирование адреса, где находится массив, а не самого массива. В итоге получаем ситуацию, когда две переменные `iWatched` и `vitalikWatched` работают с одним массивом, так как хранят один адрес.

Копия массива делается с помощью метода `slice`. Вызови его без аргументов и сохрани результат в новую переменную:

```js
let iWatched = ["GameOfThrones", "Breaking Bad"]
let vitalikWatched = iWatched.slice() // <- делаем копию массива

vitalikWatched.push("American Gods")
console.log(iWatched) // ["GameOfThrones", "Breaking Bad"] 👍
console.log(vitalikWatched) // ["GameOfThrones", "Breaking Bad", "American Gods"] 💪
```

### 🛠 Деструктуризация массива

В современном JavaScript очень популярна деструктуризация массивов. Этот подход позволяет создавать переменные из элементов массива в одну строку:

```js
// мы получаем массивы с информацией о котах
const catProfile = [
  "Maru",
  "Scottish Fold",
  true,
  "https://youtu.be/ChignoxJHXc",
]

// старый подход:
// если из массива нужна пара значений, то прочитать их и сохранить в переменную
let catName = catProfile[0]
let catBreed = catProfile[1]

// новый подход делает то же самое, но короче:
let [name, breed] = catProfile
console.log(name) // напечатает Maru
```
