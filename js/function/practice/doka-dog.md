🛠 При написании функции указываются параметры — те переменные, с которыми работает функция. Но возможны случаи, когда не все параметры заданы. Это может быть и специально, например для использования варианта по умолчанию, так и случайно — ошибка при использовании или неожиданные входные данные.

<iframe title="Название — function() — Дока" src="../demos/vindi-r-pYYKMW/" height="350"></iframe>

🛠 Давайте функциям имена, чтобы отладку было проводить проще.

```js
// Анонимную функцию будет сложнее отлаживать,
// потому что в стеке вызовов не будет её имени.
someElement.addEventListener("click", function () {
  throw new Error("Error when clicked!")
})

// ...В отличие от именованной.
someElement.addEventListener("click", function someElementClickHandler() {
  throw new Error("Error when clicked!")
})
```

🛠 У стрелочных функций можно использовать быстрый (implicit) return.

```js
const arrowFunc1 = () => {
  return 42
}

const arrowFunc2 = () => 42

arrowFunc1() === arrowFunc2()
// Обе функции возвращают 42.

// Также можно возвращать любые структуры и типы данных:
const arrowFunc3 = () => "string"
const arrowFunc4 = () => ["array", "of", "strings"]

// Чтобы вернуть объект, его необходимо обернуть в скобки.
// Только так JS поймёт, что мы не открываем тело функции,
// а возвращаем результат.
const arrowFunc5 = () => ({ some: "object" })
```
