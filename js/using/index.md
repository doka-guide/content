---
title: "using"
description: "Декларативный подход для описания ресурсов"
baseline:
  - group: explicit-resource-management
    features:
      - javascript.statements.using
      - javascript.builtins.Symbol.dispose
authors:
  - vitya-ne
related:
  - js/var-let
  - js/try-catch
  - js/generators
tags:
  - doka
---

## Кратко

Синтаксис `using` упрощает управление ресурсами, которые требуют явного освобождения после использования (например, сетевые соединения, потоки, подключения к базам данных).

**Синхронный** ресурс — это объект JavaScript с методом `[Symbol.dispose]()`. **Асинхронный** — с методом `[Symbol.asyncDispose]()`.

Объявление переменной с помощью `using` связывает её с **синхронным** ресурсом. При выходе из блока, в котором переменная была объявлена, автоматически вызовется метод `[Symbol.dispose]()`, освобождая ресурс. Для **асинхронных** ресурсов применяется синтаксис `await using` и вызывается метод `[Symbol.asyncDispose]()` или `[Symbol.dispose]()`.

## Пример

Рассмотрим простой пример использования `using`.

Создадим класс-обёртку для работы с экземпляром класса FileReader.

```js
// класс-обёртка для FileReader
class ManagedFileReader {
  constructor(file) {
    // Создание ресурса
    this.reader = new FileReader();
    console.log('FileReader экземпляр создан')
    this.file = file
  }

  // Метод использования ресурса
  read() {
    return new Promise((resolve, reject) => {
      this.reader.onload = () => resolve(this.reader.result)
      this.reader.onerror = reject
      this.reader.readAsText(this.file)
    })
  }

  // Метод освобождения ресурса
  close() {
    this.reader.abort()
    console.log('FileReader экземпляр освобождён')
  }
}
```

Добавим метод `[Symbol.dispose]()`, вызывающий `close()`:

```js
// класс-обёртка для FileReader
class ManagedFileReader {
  // Существующая реализация
  // ...

  [Symbol.dispose]() {
    this.close()
  }
}
```

Создадим функцию чтения файла. Обратите внимание, что нам не нужно явно вызывать метод экземпляра `close()`:

```js
const processFile = async (file) => {
  using reader = new ManagedFileReader(file) // Создание
  const content = await reader.read() // Использование
  console.log('Содержимое файла:', content)
} // <-- Автоматическое освобождение при выходе

processFile(file)
```

Посмотреть как происходит создание и освобождение ресурса c эффектом замедления можно с помощью демки.

<iframe title="Управление ресурсом с помощью using" src="demos/using-steps/" height="700"></iframe>

## Как пишется

```js
  using name = value
```

где:
- name — имя переменной, для ссылки на экземпляр ресурса;
- value — значение переменной `name`. Значением переменной может быть: `null`, `undefined` или объект с методом `[Symbol.dispose]()`.

Переменная, объявленная с помощью `using`, ведёт себя как `const`: она должна быть инициализирована при объявлении, и её нельзя переопределить.

Для асинхронных ресурсов применяется синтаксис `await using`

```js
  await using name = value
```

где:
- value — значение переменной `name`. Значением переменной может быть: `null`, `undefined`, объект с методом `[Symbol.asyncDispose]()` или `[Symbol.dispose]()`.


`using` можно использовать внутри:
- блока кода;
- функции;
- модуля;
- цикла `for` и `for..of`.

При попытке присвоить переменной недопустимое значение будет брошена ошибка TypeError.

## Как понять

Чтобы понять, как работает управление ресурсами, рассмотрим пример из жизни.

Представьте: вы заходите в комнату и включаете свет (создаёте ресурс). Вам нужно не забыть выключить его при выходе (освободить ресурс), иначе свет будет гореть без всякой пользы (утечка ресурсов).

Синтаксис `using` — это как элемент «умного дома»: как только вы покидаете комнату, свет автоматически гаснет. Но чтобы это работало, система освещения должна поддерживать «умный дом» — то есть иметь метод освобождения ресурса (например, `[Symbol.dispose]()`).

Автоматическое освобождение ресурсов решает несколько проблем:

- Забывчивость — разработчик может забыть добавить вызов метода освобождения ресурса (например, закрыть соединение с базой данных);
- Возникновение исключений при работе с ресурсом — если произойдёт ошибка, код освобождения может не выполнится;
- Соблюдение порядка освобождения зависящих друг от друга ресурсов.

Посмотрим на абстрактный пример функции работы с ресурсом:

```js
const processResource = () => {
  // Создание ресурса
  const resource = openResource()

  try {
    // Использование ресурса
  } finally {
    // Освобождение ресурса
    closeResource(resource)
  }
}
```

Функция освобождения ресурса `closeResource` вызывается в блоке `finally`. Это позволяет освободить ресурс даже в случае возникновения ошибки в блоке `try`. Однако если ошибка произойдёт в самой функции `closeResource()`, то ресурс может остаться неосвобождённым, а исходная ошибка будет заменена.

Синтаксис `using` гарантирует, что ресурс будет освобождён корректно даже при возникновении ошибки. Если ошибки происходят и в теле кода, и при освобождении ресурса, они не теряются: выбрасывается один объект `SuppressedError`. В его свойстве `error` лежит последняя возникшая ошибка (ошибка освобождения), в свойстве `suppressed` — более ранняя ошибка, а `message` содержит стандартное сообщение движка «An error was suppressed during disposal».

```js
function openResource() {
  return {
    [Symbol.dispose]() {
      throw new Error('Ошибка при освобождении ресурса')
    }
  }
}

try {
  using resource = openResource()
  throw new Error('Ошибка в теле')
} catch (error) {
  console.log(error instanceof SuppressedError)
  // true
  console.log(error.message)
  // 'An error was suppressed during disposal'
  console.log(error.error.message)
  // 'Ошибка при освобождении ресурса'
  console.log(error.suppressed.message)
  // 'Ошибка в теле'
}
```

При работе с несколькими ресурсами важно учитывать порядок их освобождения. Это может быть критично, если ресурсы зависят друг от друга. Автоматическое освобождение ресурсов гарантирует, что ресурсы будут освобождаться в обратном порядке их создания (как в стеке).

Например, при работе с базой данных, транзакция (tx) зависит от подключения к базе данных (connection). Если соединение закроется до завершения работы с транзакцией, это может привести к ошибке:

```js
const processMultiResources = () => {
  // 1. Создаём соединение
  const connection = new DatabaseConnection()
  // 2. Создаём транзакцию (зависит от соединения с БД)
  const tx = new Transaction(connection)

  // Работаем с объектом транзакции
  // ..

  // Важно указать правильный порядок освобождения
  tx.close()
  connection.close()
}
```

Использование `using` автоматически гарантирует правильный порядок освобождения.

```js
const processMultiResources = () => {
  // 1. Создаём соединение
  using connection = new DatabaseConnection()
  // 2. Создаём транзакцию (зависит от соединения)
  using tx = new Transaction(connection)

  // Работаем с объектом транзакции
  // ..
}
// Порядок автоматического освобождения ресурсов:
// 1. tx[Symbol.dispose]()
// 2. connection[Symbol.dispose]()
```

### Асинхронные ресурсы

Некоторые ресурсы не могут быть освобождены синхронно. Например, для завершения работы с объектом класса `ReadableStream` требуется вызвать асинхронный метод `cancel()`. Ресурс, освобождение которого требует ожидания (закрытие соединения, завершение операций ввода-вывода) называется асинхронным. Для автоматического освобождения, асинхронный ресурс должен иметь метод `[Symbol.asyncDispose]()` и объявляться с помощью синтаксиса `await using`:

```js
class AsyncResource {
  [Symbol.asyncDispose]() {
    return new Promise(resolve => {
      console.log("Асинхронный ресурс освобождён")
      resolve()
    })
  }

  // Другие методы
  // ..
}

const processAsyncResources = async () => {
  await using resource = new AsyncResource()
  // Работа с ресурсом
  // ..

} // Автоматический вызов `[Symbol.asyncDispose]()`

processAsyncResources()
// Асинхронный ресурс освобождён
```

<aside>

☝️ Обратите внимание: [`await`](/js/async-await/) здесь относится не к объявлению, а к моменту освобождения. При выходе из области видимости движок дождётся завершения промиса, который вернёт метод `[Symbol.asyncDispose]()`, и только потом продолжит выполнение.

</aside>

### Управление ресурсами в цикле

Синтаксис `using` можно использовать в цикле. Например, это удобно для обработки нескольких файлов с помощью `FileReader`:

```js
// Класс-обёртка для чтения файла
class MyFileReader {
  constructor(file) {
    this.reader = new FileReader()
    this.file = file
    console.log(`[${file.name}] Начало чтения...`)
  }

  read() {
    return new Promise((resolve, reject) => {
      this.reader.onload = () => {
        console.log(`[${this.file.name}] Чтение завершено`)
        resolve(this.reader.result)
      }
      this.reader.onerror = reject
      this.reader.readAsText(this.file)
    })
  }

  close() {
    this.reader.abort()
  }

  [Symbol.dispose]() {
    this.close()
    console.log(`[${this.file.name}] Ресурс освобождён`)
  }
}

// Обработка массива файлов
async function processFiles(files) {
  const results = []

  for (const file of files) {
    using fileResource = new MyFileReader(file)
    try {
      const content = await fileResource.read()
      results.push({
        name: file.name,
        size: file.size,
        length: content.length
      })
    } catch (error) {
      console.error(`Ошибка при обработке ${file.name}:`, error)
      results.push({ name: file.name, error: error.message })
    }
    // ресурс файла автоматически освобождается при переходе к следующей итерации
  }

  return results
}

document.querySelector('#file-input').addEventListener('change', async (e) => {
  const files = Array.from(e.target.files)
  if (files.length === 0) return

  console.log(`Файлов для чтения: ${files.length}`)
  const results = await processFiles(files)
  console.log('Результаты:', results)
})
```

Преимущества такого подхода:

- Нет необходимости вручную вызывать метод экземпляра `close()`;
- ресурс автоматически освобождается при завершении каждой итерации, даже если произойдёт ошибка.

## Подсказки

💡 При использовании `await using` ресурс может быть освобождён с помощью синхронного метода `[Symbol.dispose]()`. Освобождение произойдёт синхронно, даже если попытаться вернуть промис:

```js
class Resource {
  [Symbol.dispose]() {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })
  }
}

async function process() {
  await using resource = new Resource()
  // await using не будет ждать завершения Promise
  console.log('Работа завершена')
}
```

💡 Структура объекта ошибки может включать в себя информацию о связанных ресурсах. Например, если два ресурса выбросили ошибки при освобождении:

```js
SuppressedError {
  error: Error,          // ошибка последнего освобождения
  suppressed: SuppressedError {
    error: Error,        // ошибка предыдущего освобождения
    suppressed: Error    // исходная ошибка
  }
}
```
💡 Освобождение ресурса в цикле происходит также при `break`, `continue` и исключениях.
