---
title: "AbortController"
description: "Встроенный объект для отмены асинхронных операций и не только."
baseline:
  - group: aborting
    features:
      - api.AbortController
      - api.AbortController.abort
      - api.AbortController.signal
  - group: abortsignal-any
    features:
      - api.AbortSignal.any_static
  - group: abortsignal-timeout
    features:
      - api.AbortSignal.timeout_static
authors:
  - teplostanski
contributors:
  - solarrust
tags:
  - doka
---

## Кратко

`AbortController` — это встроенный объект, который подаёт сигнал отмены асинхронным операциям. Операция остановится, только если она приняла этот сигнал и следит за ним. Сначала его придумали для отмены [`fetch`](/js/fetch/)-запросов, а теперь сигнал понимают и другие API: [`addEventListener()`](/js/element-addeventlistener/), потоки данных (Streams API), таймеры в Node.js.

`AbortController` — часть стандарта DOM, а не языка JavaScript (ECMAScript). В Node.js он есть с версий 15.0.0 и 14.17.0.

## Пример

Отменим запрос, если он идёт дольше двух секунд:

```js
const controller = new AbortController()
const url = 'https://jsonplaceholder.typicode.com/posts'

fetch(url, { signal: controller.signal })
  .then((response) => response.json())
  .then((posts) => console.log(posts.length))
  .catch((error) => {
    if (error.name === 'AbortError') {
      console.log('Запрос отменён')
      return
    }
    console.error(error)
  })

setTimeout(() => controller.abort(), 2000)
```

## Как понять

Вызов `abort()` переводит сигнал в состояние «отменён». Дальше всё решает операция, которая получила сигнал: `fetch` прерывает запрос и отклоняет [промис](/js/promise/).

Контроллер состоит из:

- метода `abort([reason])` для отмены операции с необязательной причиной `reason`;
- свойства `signal` — объекта [`AbortSignal`](https://developer.mozilla.org/ru/docs/Web/API/AbortSignal) со свойствами и методами:
  - `aborted` — `true`, если сигнал отменён;
  - `reason` — причина отмены: любое значение, которое передали в `abort()`, например строка, число, объект или ошибка;
  - `onabort` — обработчик события отмены;
  - `throwIfAborted()` — выбрасывает `signal.reason`, если сигнал в состоянии «отменён».

Если вызвать `abort()` без аргумента, `signal.reason` станет объектом `DOMException` с именем `AbortError`. Отдельного типа `AbortError` нет, это значение свойства `error.name`.

Также у `AbortSignal` есть статические методы:

- `AbortSignal.abort([reason])` — создаёт уже отменённый сигнал;
- `AbortSignal.timeout(milliseconds)` — создаёт сигнал, который будет отменён через указанное время;
- `AbortSignal.any(signals)` — создаёт сигнал, который будет отменён, если хотя бы один из переданных сигналов отменён.

`AbortSignal.abort()` и `AbortSignal.timeout()` пригодятся, когда не нужен контроллер для ручной отмены. Заранее отменённый сигнал удобен в тестах и там, где функция ждёт сигнал, а операцию уже не нужно запускать. А `AbortSignal.any()` объединяет сигналы, в том числе сигналы разных контроллеров.

## Как пишется

```js
// Создаём контроллер
const controller = new AbortController()
const API_URL = 'https://jsonplaceholder.typicode.com'

// Передаём операции сигнал контроллера
fetch(`${API_URL}/posts/1`, { signal: controller.signal })
  .catch((error) => console.log(error.name)) // AbortError

// Отменяем операцию
controller.abort()
```

Сервер при этом мог уже получить запрос и выполнить его. Отмена не откатит, например, уже сохранённые данные.

Если вызвать `abort()`, когда ответ сервера уже получен, но тело ещё читается, `response.json()` тоже отклонится. Если всё уже прочитано, сигнал перейдёт в состояние «отменён», но на запрос это уже не повлияет.

### Использование с событиями

```js
const controller = new AbortController()
const { signal } = controller
const button = document.querySelector('button')

const handler = () => console.log('Клик!')

// Добавляем обработчик с сигналом
button.addEventListener('click', handler, { signal })

// Удаляем обработчик через AbortController
controller.abort()

// Это аналогично удалению через removeEventListener:
button.addEventListener('click', handler)
button.removeEventListener('click', handler)
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
    return
  }
  console.error(error)
})

// Отменяем все запросы одной командой
controller.abort()
```

### Передача причины отмены

Можно указать причину отмены, передав её в метод `abort()`. Удобнее всего передавать ошибку: у неё есть имя, сообщение и стек вызовов. Примеры с [`await`](/js/async-await/) ниже работают в модуле (`<script type="module">`) или в консоли браузера.

```js
const controller = new AbortController()
const API_URL = 'https://jsonplaceholder.typicode.com'

controller.abort(new DOMException('Операция устарела', 'AbortError'))

// В обработчике ошибок
try {
  await fetch(`${API_URL}/posts/1`, { signal: controller.signal })
} catch (error) {
  if (error.name === 'AbortError') {
    console.log(error.message) // Операция устарела
  }
}
```

Если передать в качестве `reason` строку, а не объект, то и в обработчик ошибок попадёт строка:

```js
const controller = new AbortController()
const API_URL = 'https://jsonplaceholder.typicode.com'

controller.abort('Операция устарела')

// В обработчике ошибок
try {
  await fetch(`${API_URL}/posts/1`, { signal: controller.signal })
} catch (error) {
  if (error === 'Операция устарела') {
    console.log(error)
  }
}
```

По спецификации `fetch` отклоняет промис со значением `signal.reason`. Браузеры делают это не везде:

- Chrome — только с версии 124;
- Safari — только если сигнал отменили до вызова `fetch`. Для запроса, который уже идёт, Safari отдаёт обычный `AbortError` со своим текстом в `message`.

Чтобы хотя бы имя ошибки было одинаковым везде, передавайте причину как `new DOMException('Текст', 'AbortError')`.

### Использование onabort

Через свойство `onabort` можно быстро назначить обработчик события `abort`:

```js
const controller = new AbortController()
const { signal } = controller

// Через onabort — быстро и просто
signal.onabort = () => {
  console.log('Операция отменена')
  console.log('Причина:', signal.reason)
}

// Через addEventListener — больше кода
const handler = () => {
  console.log('Операция отменена')
  console.log('Причина:', signal.reason)
}
signal.addEventListener('abort', handler)
```

Плюсы:

- простой способ узнать момент отмены операции;
- лаконичный синтаксис;
- не нужно хранить ссылку на функцию-обработчик.

Минусы:

- можно установить только один обработчик;
- при повторном присвоении предыдущий обработчик теряется;
- убрать обработчик можно, только присвоив `null`, а обработчики из `addEventListener()` при этом останутся.

Событие `abort` срабатывает один раз. Обработчик, который добавили после отмены, уже не вызовется. Поэтому сначала проверяйте `signal.aborted`.

### Использование throwIfAborted()

`fetch` следит за сигналом сам. А в своём коде сигнал никто не слушает, и проверять его нужно вручную: например, перед каждым шагом цикла. Для такой проверки есть `throwIfAborted()`:

```js
const wait = (ms) => new Promise((done) => setTimeout(done, ms))

async function countdown(signal) {
  for (let i = 3; i > 0; i--) {
    // Перед каждым шагом проверяем сигнал
    signal.throwIfAborted()
    console.log(i)
    await wait(1000)
  }
}

const controller = new AbortController()

countdown(controller.signal).catch((error) => {
  console.log(error) // Операция устарела
})

setTimeout(() => controller.abort('Операция устарела'), 1500)
```

Код выведет 3 и 2, а на третьем шаге остановится. Это короче, чем проверять `signal.aborted` и выбрасывать `signal.reason` своими руками.

### Использование AbortSignal.any()

Объединим сигналы двух контроллеров в один:

```js
const url = 'https://jsonplaceholder.typicode.com/posts'

// Создаём два контроллера
const controller1 = new AbortController()
const controller2 = new AbortController()

// Сигнал сработает при отмене любого из контроллеров
const signal = AbortSignal.any([
  controller1.signal,
  controller2.signal,
])

// Используем общий сигнал для запроса
fetch(url, { signal })
  .then((response) => response.json())
  .catch((error) => {
    if (error.name === 'AbortError') {
      // Safari заменяет текст ошибки, а reason хранит исходный
      console.log('Запрос отменён:', signal.reason.message)
    }
  })

// Отмена любого из контроллеров отменит и запрос
controller1.abort(
  new DOMException('Отмена через первый контроллер', 'AbortError')
)
```

Это полезно, когда операцию нужно отменить по любой из нескольких причин: например, по кнопке пользователя или по таймауту.

### Использование AbortSignal.timeout()

Отменим запрос через две секунды без контроллера и [`setTimeout()`](/js/settimeout/):

```js
const url = 'https://jsonplaceholder.typicode.com/posts'

// Создаём сигнал с таймаутом в 2 секунды
const signal = AbortSignal.timeout(2000)

// Используем сигнал для запроса
fetch(url, { signal })
  .then((response) => response.json())
  .catch((error) => {
    // По таймауту в reason лежит DOMException с именем TimeoutError
    if (['TimeoutError', 'AbortError'].includes(error.name)) {
      console.log('Запрос отменён по таймауту:', error.message)
    }
  })
```

Проверяйте оба имени ошибки. В Chrome до 124-й версии по таймауту приходил `AbortError`, а не `TimeoutError`. Safari по таймауту тоже отдаёт `AbortError`: к этому моменту запрос уже идёт.

## Подсказки

💡 Создавайте новый контроллер для каждой группы связанных операций. После вызова `abort()` сигнал остаётся в состоянии «отменён», поэтому для новых операций нужно создать новый контроллер. Не используйте один контроллер для всего приложения.

💡 Вызывайте `abort()` как метод: `controller.abort()`. После `const { abort } = controller` вызов `abort()` упадёт с `TypeError`, и сигнал не отменится: методу нужен контроллер в `this`. Для колбэка оберните вызов: `() => controller.abort()`. `signal` можно доставать [деструктуризацией](/js/destructuring-assignment/): это готовый объект, а не метод.

💡 Сам контроллер и отмена `fetch` появились в браузерах в 2017–2019 годах. Свойство `reason`, метод `throwIfAborted()` и `AbortSignal.timeout()` добавили в браузеры в 2022 году. `AbortSignal.any()` работает во всех основных браузерах с 2024 года.
