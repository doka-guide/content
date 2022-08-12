🛠 `then()` в индустрии используется только для обработки успешного завершения операции, в варианте с одним аргументом:

```js
getPasswords().then(function (result) {
  // что-то делаем с результатом операции
  console.log(`Все пароли: ${result}`)
})
```

Для обработки ошибок используют метод [`catch()`](/js/promise-catch/). Такие цепочки читаются лучше:

```js
getPasswords()
  .then(function (result) {
    console.log(`Все пароли: ${result}`)
  })
  .catch(function (error) {
      console.log(`Ошибка: ${error.message}`)
  })
```
