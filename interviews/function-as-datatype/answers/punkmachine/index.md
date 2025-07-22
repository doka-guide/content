В JavaScript функция — это объект, у которого есть метод [`toString()`](/js/object-tostring/), возвращающий исходный код в виде строки. Это позволяет нам проанализировать текст функции и извлечь закомментированный код.

А также для создания новой функции нам понадобится конструктор `new Function()`. Он принимает список параметров и тело функции в виде строки.

Решение можно разбить на несколько шагов:

**1. Получение текстового представления функции**

Сначала получаем код функции в виде строкового значения, используя метод `toString()`. Это даст нам доступ ко всему телу функции, включая комментарии.

```js
const fnText = fn.toString()
```

**2. Удаление символов комментариев**

Используем регулярное выражение для удаления символов комментария (`//`) из всех строк, где они встречаются. Это превращает закомментированный код в обычный исполняемый код, не меняя его содержимого.

```js
const uncommentedFnText = fnText.replace(/\/\/\s?/g, '')
```

**3. Извлечение параметров функции**

Для корректной работы с функцией нам важно сохранить все её параметры. Извлекаем их из исходного кода функции.

```js
const params = fnText.slice(fnText.indexOf('(') + 1, fnText.indexOf(')')).split(',').map(p => p.trim())
```

**4. Создание новой функции**

Создаём новую функцию, передавая параметры и тело с раскомментированным кодом в конструктор `new Function()`.

```js
return new Function(...params, `${uncommentedFnText.substring(uncommentedFnText.indexOf('{'))}`)
```

Теперь соберём всё вместе. Вот полное решение:

```js
function createFn(fn) {
  const fnText = fn.toString()
  const params = fnText.slice(fnText.indexOf('(') + 1, fnText.indexOf(')')).split(',').map(p => p.trim())
  const uncommentedFnText = fnText.replace(/\/\/\s?/g, '')

  return new Function(...params, `${uncommentedFnText.substring(uncommentedFnText.indexOf('{'))}`)
}
```

Вот как это работает с функцией из вопроса:

```js
const sourceFn = (a, b) => {
  // const c = a + 2
  // return c * b
  return a + b
}

console.log(sourceFn(5, 3)) // Выведет: 8

const uncommentedFn = createFn(sourceFn);
console.log(uncommentedFn(5, 3)) // Выведет: 21
```

А вот пример с функцией без параметров:

```js
const someFn = () => {
  console.log('Hello, World!')
  // console.log('Hello there!')
}

someFn() // Выведет: "Hello, World!"

const fullSomeFn = createFn(someFn)
fullSomeFn()
// Выведет все сообщения:
// "Hello, World!"
// "Hello there!"
```

Что важно помнить при использовании этого решения:

- Работает только с однострочными комментариями — многострочные `/* */` останутся нетронутыми;
- При конфликтующих операциях (например, две переменные с одним именем) код может выдать ошибку.
