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
- value — начальное значение переменной `name`. Значением переменной может быть: `null`, `undefined` или объект с методом `[Symbol.dispose]()`.

Для асинхронных ресурсов применяется синтаксис `await using`

```js
  await using name = value
```

где:
- value — начальное значение переменной `name`. Значением переменной может быть: `null`, `undefined`, объект с методом `[Symbol.asyncDispose]()` или `[Symbol.dispose]()`.


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
- Возникновение исключений при работе с ресурсом — если произойдёт ошибка, обычный код освобождения может не выполнится;
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

Синтаксис `using` гарантирует, что ресурс будет освобождён корректно, а ошибка возникающая при освобождении ресурса, не заменит исходную ошибку:

```js
const processResource = () => {
  // Создание ресурса
  using resource = openResource()

  // Использование ресурса
  // ..
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

☝️ Обратите внимание, что использование оператора [`await`](/js/async-await/) указывает на возможность выполнение асинхронной операции но не при объявлении переменной, а при освобождении ресурса.

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
