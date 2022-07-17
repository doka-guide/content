### 🛠 Копирование массива

С копированием есть хитрость. Массив — большая структура, и она не вмещается в одну переменную. Переменная хранит адрес, где находится массив. Если этого не знать, то результат такого кода будет выглядеть странно:

```js
const iWatched = ['GameOfThrones', 'Breaking Bad']
const vitalikWatched = iWatched

vitalikWatched.push('American Gods')
console.log(iWatched)
// ['GameOfThrones', 'Breaking Bad', 'American Gods'] 🤷‍♂️
```

Хитрость в том, что во второй строке происходит копирование адреса, где находится массив, а не самого массива. В итоге получаем ситуацию, когда две переменные `iWatched` и `vitalikWatched` работают с одним массивом, так как хранят один адрес. Это особенность работы со значениями, которые [хранятся по ссылке](/js/ref-type-vs-value-type/).

Копия массива создаётся с помощью метода `slice()`. Нужно вызвать его без аргументов и сохранить результат в новую переменную:

```js
const iWatched = ['GameOfThrones', 'Breaking Bad']
const vitalikWatched = iWatched.slice()

vitalikWatched.push('American Gods')
console.log(iWatched)
// ['GameOfThrones', 'Breaking Bad'] 👍
console.log(vitalikWatched)
// ['GameOfThrones', 'Breaking Bad', 'American Gods'] 💪
```

### 🛠 Деструктуризация массива

В современном JavaScript очень популярна деструктуризация массивов. Этот подход позволяет создавать переменные из элементов массива в одну строку:

```js
const catProfile = [
  'Maru',
  'Scottish Fold',
  true,
  'https://youtu.be/ChignoxJHXc'
]
```


В старом подходе, если из массива нужна пара значений, то их читают и сохраняют в переменные:

```js
const catName = catProfile[0]
const catBreed = catProfile[1]
```

Новый подход делает то же самое, но короче:

```js
const [name, breed] = catProfile
console.log(name)
// Maru
```
