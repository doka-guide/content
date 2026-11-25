---
title: "`beforeunload`"
description: "Событие ухода пользователя со страницы."
baseline:
  - group: beforeunload
    features:
      - api.Window.beforeunload_event
authors:
  - kotosha-real
contributors:
  - solarrust
related:
  - js/events
  - js/element-addeventlistener
  - js/fetch
tags:
  - doka
---

## Кратко

Когда пользователь уходит со страницы, можно спросить его, точно ли он хочет уйти. За это отвечает обработка события `beforeunload`.

Браузер создаёт событие, когда страница вот-вот закроется или сменится другой. Окно подтверждения он покажет, только если пользователь уже взаимодействовал со страницей: кликал, нажимал клавиши или печатал. На iPhone и iPad событие не срабатывает совсем, ни в Safari, ни в других браузерах.

## Пример

Спросим подтверждение, если пользователь начал заполнять форму и ещё не отправил её:

```js
const form = document.querySelector('form')

function handleBeforeUnload(event) {
  event.preventDefault()
  // Для браузеров на Chromium до 119
  event.returnValue = true
}

form.addEventListener('input', function () {
  window.addEventListener('beforeunload', handleBeforeUnload)
})

form.addEventListener('submit', function () {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})
```

## Как пишется

Современный способ с [`addEventListener()`](/js/element-addeventlistener/):

```js
window.addEventListener('beforeunload', function () {
  // ...
})
```

Также можно обработать событие через [встроенный обработчик событий](/js/element/#vstroennye-obrabotchiki-sobytiy):

```js
window.onbeforeunload = function () {
  // ...
}
```

## Как понять

Мы все хотя бы раз теряли проделанную работу:

1. нетленная классика с зависшим Word и несохранённой курсовой;
1. случайный свайп влево на ноутбуках Apple, который вместо горизонтальной прокрутки возвращает на предыдущую страницу;
1. автор этих строк однажды перепутал `git stash pop` с `git stash drop` 😰.

Есть страницы, на которых пользователь что-то делает. Если результат не сохраняется, например, в [`localStorage`](/js/local-storage/), стоит предупредить пользователя, прежде чем он потеряет работу. В этом поможет обработка события `beforeunload`.

Обработчик через `addEventListener()`:

```js
window.addEventListener('beforeunload', function (event) {
  // Отменяем поведение по умолчанию
  event.preventDefault()

  // Для браузеров на Chromium до 119
  event.returnValue = true
})
```

Когда обработчик отменяет событие, браузер может показать окно подтверждения. В нём пользователь решает, уйти со страницы или остаться. За один переход окно подтверждения появится не больше одного раза.

В современных браузерах хватает [`event.preventDefault()`](/js/event-prevent-default/). Строку с `returnValue` оставляют для браузеров на движке Chromium до 119 версии: Chrome, Edge, Opera и других. Без неё окно подтверждения там не появлялось.

Обработчик через свойство `onbeforeunload` у `window`:

```js
window.onbeforeunload = () => false
```

Во втором случае [необязательно возвращать `false`](https://html.spec.whatwg.org/multipage/webappapis.html#the-event-handler-processing-algorithm): можно вернуть любое значение, кроме [`null`](/js/null-primitive/) и [`undefined`](/js/undefined/). Это работает только с `onbeforeunload`. Значение, которое возвращает обработчик из `addEventListener()`, браузер не учитывает, там нужен `preventDefault()`.

Раньше браузеры показывали возвращённое значение как сообщение в окне подтверждения. Встречали сайты, которые при попытке закрыть страницу показывали сообщения про нигерийских родственников или правоохранительные органы? Поэтому браузеры перестали так делать, а [спецификация](https://html.spec.whatwg.org/multipage/browsing-the-web.html#checking-if-unloading-is-canceled) это закрепила. Теперь текст в окне подтверждения задаёт браузер, а не сайт.

Как окно подтверждения выглядит в вашем браузере, проверьте в демке. Введите текст в поле и нажмите кнопку:

<iframe title="Демонстрация обработки события beforeunload" src="demos/beforeunload/" height="350"></iframe>

Добавляйте обработчик, только когда на странице есть несохранённые данные, и убирайте его после сохранения. Так сделано в демке. Тогда окно подтверждения не будет мешать, когда терять нечего.

Не используйте `beforeunload` для отправки данных на сервер. На телефонах событие часто не происходит: пользователь сворачивает браузер, и система закрывает вкладку без предупреждения.

Отправляйте данные в обработчике события `visibilitychange`, когда страница скрывается. Обычный запрос в этот момент может оборваться. Поэтому используйте `navigator.sendBeacon()` или [`fetch()`](/js/fetch/) с настройкой `keepalive: true`. Браузер отправит такой запрос, даже если страница уже закрылась. Но размер ограничен: все такие запросы вместе не больше 64 КБ.

Чтобы сервер получил данные как JSON, передайте их в `Blob` с нужным типом:

```js
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'hidden') {
    const draft = { text: 'Черновик письма' }
    const blob = new Blob([JSON.stringify(draft)], {
      type: 'application/json'
    })
    navigator.sendBeacon('/save', blob)
  }
})
```

Подробнее в статье «[`unload`](/js/event-unload/)».
