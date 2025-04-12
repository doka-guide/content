---
title: "AbortController"
description: "Встроенный объект для отмены асинхронных операций и не только."
baseline:
  - group: aborting
    features:
      - api.AbortController
      - api.AbortController.abort
      - api.AbortController.signal
authors:
  - teplostanski
tags:
  - doka
---

## Кратко

`AbortController` — это встроенный объект, который позволяет отменять выполнение любых операций. Появился в ES2018 (ES9) для отмены [fetch](/js/fetch/) запросов, но позже его применение расширилось на другие операции.

## Как понять

`AbortController` - это механизм для отмены операций. С его помощью можно:

- отменять [fetch](/js/fetch/) запросы
- удалять обработчики событий
- останавливать стримы
- прерывать любые другие операции

Состоит из:

1. Метода `abort([reason])` для отмены операции, где `reason` - необязательный параметр.

При вызове метода `abort([reason])` `reason` будет доступен через `signal.reason`. В `reason` можно передать любое значение: строку, число, объект, ошибку и т.д.

2. Свойства `signal`, возвращает объект, который является экземпляром [`AbortSignal`](https://developer.mozilla.org/ru/docs/Web/API/AbortSignal) со следующими свойствами и методами:
  - `aborted` - булево значение, указывающее было ли выполнено прерывание;
  - `reason` - причина отмены;
  - `onabort` - обработчик события отмены;
  - `throwIfAborted()` - выбрасывает ошибку с причиной отмены, если сигнал в состоянии "отменён".

При отмене операций чаще всего возникает ошибка типа "AbortError". Она появляется в трёх случаях:

- Не передан `reason` в `abort()`;
- При использовании встроенных API (например [`fetch`](/js/fetch/)), которые сами создают AbortError;
- При создании через `new DOMException()` с именем "AbortError".

В остальных случаях тип ошибки будет зависеть от того, что было передано в `reason`.

Также у [`AbortSignal`](https://developer.mozilla.org/ru/docs/Web/API/AbortSignal) есть статические методы:

- `AbortSignal.abort([reason])` - создаёт уже отменённый сигнал;
- `AbortSignal.timeout(milliseconds)` - создаёт сигнал, который будет отменён через указанное время;
- `AbortSignal.any(signals)` - создаёт сигнал, который будет отменён, если хотя бы один из переданных сигналов отменён.

Статические методы используются в случаях, когда не нужен контроллер для ручной отмены.

## Как пишется

```js
// Создаём контроллер
const controller = new AbortController()
const API_URL = 'https://jsonplaceholder.typicode.com'

// Делаем запрос с сигналом
fetch(`${API_URL}/posts/1`, { signal: controller.signal })
  .then((response) => response.json())
  .catch((error) => {
    if (error.name === 'AbortError') {
      console.log('Запрос был отменён')
    }
  })

// Отменяем запрос через 5 секунд
setTimeout(() => {
  controller.abort()
}, 5000)
```

### Использование с событиями

```js
const controller = new AbortController()
const { signal } = controller

const handler = () => console.log('Клик!')

// Добавляем обработчик с сигналом
element.addEventListener('click', handler, { signal })

// Удаляем обработчик через AbortController
controller.abort()

// Это аналогично удалению через removeEventListener:
element.addEventListener('click', handler)
element.removeEventListener('click', handler)
```

### Отмена нескольких операций

Один сигнал можно использовать для отмены нескольких операций:

```js
const controller = new AbortController()
const { signal } = controller
const API_URL = 'https://jsonplaceholder.typicode.com'

// Запускаем несколько запросов
Promise.all([
  fetch(`${API_URL}/posts/1`, { signal }),
  fetch(`${API_URL}/posts/2`, { signal }),
  fetch(`${API_URL}/posts/3`, { signal }),
]).catch((error) => {
  if (error.name === 'AbortError') {
    console.log('Все запросы отменены')
  }
})

// Отменяем все запросы одной командой
controller.abort()
```

### Передача причины отмены

Можно указать причину отмены, передав её в метод `abort()`:

```js
controller.abort('Операция устарела')

// В обработчике ошибки
try {
  ...
} catch (error) {
  if (error.name === 'AbortError') {
    console.log(error.message) // "Операция устарела"
  }
}
```

### Использование onabort

`onabort` - это свойство для быстрого назначения обработчика события отмены:

```js
// Через onabort - быстро и просто
signal.onabort = () => {
  console.log('Операция отменена')
  console.log('Причина:', signal.reason)
}

// Через addEventListener - больше кода
const handler = () => {
  console.log('Операция отменена')
  console.log('Причина:', signal.reason)
}
signal.addEventListener('abort', handler)
```

Плюсы:

- Простой способ узнать момент отмены операции;
- Лаконичный синтаксис;
- Не нужно хранить ссылку на функцию-обработчик.

Минусы:

- Можно установить только один обработчик;
- При повторном присвоении предыдущий обработчик теряется;
- Нет прямого способа удалить обработчик (только присвоить null).

### Использование throwIfAborted()

Метод `throwIfAborted()` полезен для проверки состояния сигнала - он выбросит ошибку, если сигнал находится в состоянии "отменён":

```js
controller.abort('Операция устарела')

try {
  // Проверяем состояние сигнала
  signal.throwIfAborted()
  // Этот код не выполнится, если сигнал отменён
  await someAsyncOperation()
} catch (error) {
  console.log(error.message) // "Операция устарела"
}
```

Это более декларативный способ проверки состояния сигнала по сравнению с проверкой `signal.aborted`.

### Использование AbortSignal.any()

`AbortSignal.any()` создаёт сигнал, который будет отменён, если хотя бы один из переданных сигналов отменён:

```js
// Создаем два контроллера
const controller1 = new AbortController()
const controller2 = new AbortController()

// Создаем сигнал, который сработает при отмене любого из контроллеров
const signal = AbortSignal.any([controller1.signal, controller2.signal])

// Используем общий сигнал для запроса
fetch(url, { signal })
  .then((response) => response.json())
  .catch((error) => {
    if (error.name === 'AbortError') {
      console.log('Запрос отменён:', error.message)
    }
  })

// Отмена любого из контроллеров приведёт к отмене запроса
controller1.abort('Отмена через первый контроллер')
controller2.abort('Отмена через второй контроллер')
```

Это полезно для отмены нескольких операций, которые могут быть отменены независимо друг от друга.

### Использование AbortSignal.timeout()

`AbortSignal.timeout()` создаёт сигнал, который будет автоматически отменён через указанное количество миллисекунд:

```js
// Создаем сигнал с таймаутом в 5 секунд
const signal = AbortSignal.timeout(5000)

// Используем сигнал для запроса
fetch(url, { signal })
  .then((response) => response.json())
  .catch((error) => {
    if (error.name === 'AbortError') {
      // При таймауте reason будет установлен как "TimeoutError" DOMException
      console.log('Запрос отменён по таймауту:', error.message)
    }
  })
```

Это полезно для отмены долгих операций, которые могут занять больше времени, чем ожидалось. Удобная альтернатива ручной установке таймера с `setTimeout()` и созданию `AbortController`.

## Подсказки

💡 Создавайте новый контроллер для каждой группы связанных операций. После вызова `abort()` сигнал остаётся в состоянии "отменён", поэтому для новых операций нужно создать новый контроллер. Не используйте один контроллер для всего приложения.

💡 Метод `abort()` нужно вызывать только в контексте контроллера: `controller.abort()`. Деструктуризация метода приведёт к потере контекста.
