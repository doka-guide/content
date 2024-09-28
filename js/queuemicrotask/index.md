---
title: "`queueMicrotask()`"
description: "Брат `setTimeout`, или как добавить синхронную функцию в очередь микрозадач."
authors:
  - corocoto
contributors:
  - nlopin
keywords:
  - macrotasks
  - microtasks
  - sync-to-async
related:
  - js/async-in-js
  - tools/how-the-browser-creates-pages
  - tools/react-and-alternatives
tags:
  - doka
---

## Кратко

Браузерное API, которое выполняет переданный код асинхронно.

## Пример

Убедимся, что переданная в `queueMicrotask()` функция выполнится раньше, чем через `setTimeout()`. Для этого создадим страницу с формой, при отправке которой будут запускаться оба задания. Каждое из заданий будет печатать на экран уникальный текст:

```html
<form class="compare-form" name="compare-form">
  <h2>
    Вывод значений с помощью <code>queueMicrotask</code>
    и <code>setTimeout</code>:
  </h2>
  <p id="compare-output"
    class="compare-form__output"
  ></p>
  <button
    type="submit"
    class="button compare-form__submit-button"
  >
    Вывести текст
  </button>
  <button
    type="reset"
    class="button compare-form__reset-button"
  >
    Очистить содержимое
  </button>
</form>
```

При отправке формы запустим задачи. Первой будет располагаться `setTimeout()`, а после — `queueMicrotask()`.

```js
const handleFormSubmit = (e) => {
  e.preventDefault()

  setTimeout(() => {
    output.innerText += 'Фраза добавлена из setTimeout()\n\n'
  }, 0)
  queueMicrotask(() => {
    output.innerText += 'Фраза добавлена из queueMicrotask()\n'
  })
}
```

Вот и всё! Посмотрим, что у нас получилось:

<iframe title="Сравнение queueMicrotask() и setTimeout()" src="demos/queueMicrotask-vs-setTimeout/" height="450"></iframe>

В этом примере `queueMicrotask()` принимает функцию, которая передаётся в очередь микрозадач, и возвращает `undefined`.

```js
queueMicrotask(() => {
  console.log('Хэй, я выполнюсь асинхронно!')
})
```

## Как понять

Основная причина использования `queueMicrotask()` — обеспечение последовательности выполнения задач и снижение риска заметных пользователю задержек в операциях.

Представим ситуацию, когда получаем данные по указаному URL или когда запрос выполнялся ранее. Запрашиваем данные из кэша:

```js
const output = document.querySelector('.logging-form__output')
let data = []
const cache = {}

function getData(url) {
  if (url in cache) {
    data = cache[url]
    output.dispatchEvent(new Event('data-loaded'))
  } else {
    fetch(url)
      .then((response) => response.json())
      .then(({ data }) => {
        cache[url] = data
        data = data
        output.dispatchEvent(new Event('data-loaded'))
      })
  }
}
```

Какую проблему тут можно заметить? В теле одного условия используется цепочка промисов, в другом — обычное синхронное выполнение. Из этого делаем вывод, что в разных условиях процесс выполнения будет отличаться.

Для наглядности навесим обработчик на событие `submit`, в котором происходит вызов функции `getData`:

```js
const form = document.querySelector('.logging-form')

const handleFormSubmit = (e) => {
  e.preventDefault()

  output.innerText += 'Процесс загрузки данных…\n'
  getData('https://reqres.in/api/users/2')
  output.innerText += 'Процесс загрузки данных выполняется…\n'
}

form.addEventListener('submit', handleFormSubmit)
```

Не забудем про кастомное событие `data-loaded`, инициируемое внутри функции `getData`. Навесим обработчик и на него:

```js
const output = document.querySelector('.logging-form__output')

const handleOutputDataLoaded = () => {
  output.innerText += 'Данные загружены\n'
}

output.addEventListener('data-loaded', handleOutputDataLoaded)
```

Посмотрим, к каким результатам это приведёт. Для этого нажмите в демке на кнопку получения данных два раза.

<iframe title="Неочевидный порядок выполнения кода" src="demos/not-obvious/" height="450"></iframe>

Можете заметить недочёт после второго нажатия, когда данные берутся из кэша. Строка «Процесс загрузки данных выполняется…» выводится после «Данные загружены». Причём, когда данные приходили впервые, вывод строк был иным. Это происходит из-за того, что событие `data-loaded` отправляется из асинхронного кода при первом чтении, а в случае чтения из кэша — из синхронного.

Исправим проблему и обернём тело первого условного блока в `queueMicrotask()`. Таким образом, сделаем чтение данных из кэша асинхронной операцией:

```js
if (url in cache) {
  queueMicrotask(() => {
    data = cache[url]
    textarea.dispatchEvent(new Event('data-loaded'))
  })
}
```

Посмотрим на итоговое решение после корректировки:

<iframe title="Очевидный порядок выполнения кода" src="demos/obvious/" height="450"></iframe>

Отлично! Теперь процесс выполнения работает как при получении данных с сервера, так и при вытаскивании их из кэша.

В этом примере код схож со сценарием использования [`setTimeout()`](/js/settimeout/).

```js
queueMicrotask(() => {
  console.log('Хэй, я выполнюсь асинхронно!')
})
```

Оба сценария выполнят код асинхронно:

```js
setTimeout(() => {
  console.log('Хэй, я выполнюсь асинхронно благодаря setTimeout')
}, 0)
```

Так в чём же разница между обоими сценариями?

`queueMicrotask()` добавляет переданную функцию в _очередь микрозадач_. Функции в этой очереди выполняются одна за другой (_FIFO: First in First Out_). Это значит, что когда текущая функция выполнилась, запускается следующая функция в очереди.

Все микрозадачи в очереди выполнятся только после того как текущий _[стек вызовов](/js/async-in-js/#stek-vyzovov)_ окажется пустым, но перед выполнением следующей макрозадачи.

Вернёмся к сравнению с `setTimeout()`. Передаваемые в `setTimeout()` функции относятся к _макрозадачам_. Каждая задача будет взята из очереди после того как управление передано циклу событий. Так что, если вызвать `queueMicrotask()` после `setTimeout()` или наоборот, переданная в `queueMicrotask()` функция начнёт исполнятся первой.

<details>

   <summary>Подробнее про микро- и макрозадачи</summary>

![схема событийного цикла](images/event-loop-schema.png)

JavaScript имеет в своём арсенале различные _виды очередей_, а также _стек вызовов_. Давайте кратко разберём необходимый минимум, который поможет разобраться с процессом работы:

- _стек вызовов_ — контейнер для выполнения синхронных операций;
- _очередь микрозадач_ — контейнер для хранения асинхронных операций с высоким приоритетом;
- _очередь макрозадач_ — контейнер для хранения асинхронных операций с низким приоритетом.

Рассмотрим, как работают элементами процесса. Первый, кто начинает процесс выполнения, — стек вызовов. После того как JavaScript понимает, что стек пуст, в стек по очереди добавляются задачи из очереди микрозадач. Процесс выполнения задач продолжается, пока не станет ясно, что очередь опустела. Как только это произойдёт — выполняются задачи из очереди макрозадач. Очередь макрозадач — завершающий этап. Всё повторится снова, когда список станет снова пустым.

</details>
