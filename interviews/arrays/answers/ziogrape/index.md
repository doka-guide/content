Для решения этой задачи важно понимать, что массивы в JavaScript — это объекты с числовыми ключами, которые автоматически создаются при инициализации и могут изменяться при мутации массива его методами.

Как это выглядит:
```js
  const arr = [1, 2]
```
Для движка, который обрабатывает JavaScript, массив arr выглядит примерно так:
```js
const arr = {
  '0': 1,
  '1': 2,
  'length': 2
}
```
Ключи "0" и "1" — это строки, соответствующие индексам массива.
Свойство ```length``` указывает на наибольший индекс + 1.

Как мы знаем, если обратиться к несуществующему ключу в объекте, результатом будет ```undefined```.
Например:

```js
  const obj = {}
  console.log(obj['nonexistentKey']) // undefined
```
Аналогично для массивов:
```js
  const arr = [1, 2]
  console.log(arr[10]) // undefined
```
Но в случае массивов, если между существующими индексами есть разрывы ```например [1, , 3]```, JavaScript не создаёт ключ для пропущенного индекса. Это означает, что такие слоты считаются "пустыми".

```js
  const sparseArr = [1, , 3]
  console.log(sparseArr.length) // 3
  console.log(sparseArr) // [1, empty, 3]
  console.log(sparseArr[1]) // undefined
```
Для движка массив sparseArr будет выглядеть так:
```js
{
  '0': 1,
  '2': 3,
  'length': 3
}
```
Важно: ```empty``` — это не отдельный тип данных. Это просто обозначение отсутствия ключа для индекса в массиве.

Некоторые методы массива, умеют отличать ```empty``` от хранящегося в массиве ```undefined```.

Например:

```js
  const sparseArr = [1, , 3]
  sparseArr.forEach((element) => {
    console.log(element)
  })
  // 1
  // 3
```
На примере методов ```sort()``` и ```toSorted()```, можно увидеть разницу в обработке ```empty```.

```js
const colors = ['red', 'yellow', 'blue', undefined]
colors[6] = 'purple'
colors.toSorted() // ['blue', purple, 'red', 'yellow', undefined, undefined, undefined]
colors.sort() //  ['blue', purple, 'red', 'yellow', undefined, empty x 2]
```

```toSorted()``` преобразовал ```empty``` в ```undefined```,  а ```sort()``` сохранил их свойства, при этом переместив все ```empty``` в конец массива.

Решение задачи:

```js
function countEmptySpacesInSparseArray(arr) {
  let count = 0
  for (let i = 0; i < arr.length; i++) {
    // Проходясь по всей длине массива проверяем, отсутствует ли у него ключ равный индексу
    const isEmptySpace = !arr.hasOwnProperty(i)
    if (isEmptySpace) {
      // В случае отсутствия ключа увеличиваем значение счетчика
      count++
    }
  }
  return count
}
```

И так-как мы знаем об особенностях методов массивов можно переписать как:

```js
function countEmptySpacesInSparseArray(arr) {
  let count = 0
  arr.forEach(element => {
    count++
  });
  return arr.length - count;
}
```

Примечание: у решения алгоритмическая сложность O(n).
