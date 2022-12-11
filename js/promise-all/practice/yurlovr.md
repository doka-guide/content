🛠 Довольно частое использование — это преобразование массива с данными в массив с промисами с помощью [`map()`](/js/array-map/). В `map()` для каждого элемента создаётся промис, а затем полученный массив передаётся в `Promise.all()`. Это позволит дождаться выполнения всех промисов, а затем обработать результат.

Например, можно использовать метод `Promise.all()` для получения данных нескольких персонажей из вселенной звёздных войн через запрос к API:

```js
const peopleIds = [1, 13, 3]
const arrayFetchUsers = peopleIds.map(user => fetch(`https://swapi.dev/api/people/${user}`).then((response) => response.json()))

Promise.all(arrayFetchUsers)
  .then((responses) => {
    // responses — массив результатов выполнения промисов
    responses.forEach(resp => {
      console.log(resp.name)
    })
  })
  .catch(error => {
    console.error(error)
  })
```

Пример сначала сделает три запроса к API, с помощью `Promise.all()` дождётся их завершения и парсинга ответа в [JSON](/tools/json/), а затем выведет имя персонажа для каждого. В консоли появится:

```
Luke Skywalker
Chewbacca
R2-D2
```
