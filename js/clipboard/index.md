---
title: "Clipboard API"
description: "Clipboard API позволяет работать с буфером обмена"
authors:
  - rusakov
tags:
  - article
---

## Кратко

Clipboard API выполнять асинхронные запись и чтение в системный буфер обмена, а также подписываться на события `copy`, `cut`, `paste` и переопределять поведение сайта при их наступлении.

API предназначен заменить `document.execCommand()` в качестве способа для доступа к буферу обмена.

<aside>

💡 API буфера обмена поддерживается только для страниц, обслуживаемых через HTTPS. Доступ к буферу обмена разрешён только когда страница находится на активной вкладке.

</aside>

## Интерфейсы

[Интерфейс прикладного программирования, API](/js/api) — это объединение нескольких API, которые работают с буфером обмена.

Среди Clipboard API мы можем выделить:

- _Clipboard_ (Async Clipboard API) — интерфейс для чтения или записи текста и данных в буфер обмена;
- _ClipboardEvent_ (Clipboard Event API) — события, содержащие информацию, относящуюся к модификации буфера обмена, а именно `cut`, `copy` и `paste` события;
- _ClipboardItem_ — единый формат элемента, используемый при чтении или записи данных.

С Clipboard API мы можем использовать не любые типы данных. У разных методов есть разные ограничения на то, что мы можем класть или доставать из буфера обмена.

<details>
  <summary>С методом <code>paste</code></summary>

  - text/plain
  - text/uri-list
  - text/csv
  - text/css
  - text/html
  - application/xhtml+xml
  - image/png
  - image/jpg, image/jpeg
  - image/gif
  - image/svg+xml
  - application/xml, text/xml
  - application/javascript
  - application/json
  - application/octet-stream
</details>

<details>
  <summary>С методами <code>copy</code> или <code>cut</code></summary>

  - text/plain
  - text/uri-list
  - text/csv
  - text/html
  - image/svg+xml
  - application/xml, text/xml
  - application/json
</details>

## Как это работает

Теперь разберём как работать с каждым из интерфейсов.

### Clipboard (async Clipboard API)

Позволяет писать текст или другие данные в буфер и читать из него. Данное API доступно через `navigator.clipboard`.

Метод `write()` принимает на вход данные для записи в буфер обмена в виде списка `ClipboardItem`, возвращает [`promise`](/js/promise/).

В качестве примера запишем изображение в буфер обмена:

```js
const img = await fetch('image.jpg')
const blob = await image.blob()

await navigator.clipboard
  .write([new ClipboardItem({ [blob.type]: blob })])
  .then(function () {
    console.log('Успешно', data)
  })
  .catch(function (error) {
    console.error('Ошибка:', error)
  })
```

Метод `writeText()` записывает строку в буфер обмена, возвращая [`promise`](/js/promise/), которое разрешается после того, как строка полностью скопирована.

Скопируем текущий URL страницы при нажатии на кнопку:

```html
<button type="button">Скопировать текущий URL</button>
```

```js
const button = document.querySelector('button')

button.addEventListener('click', function () {
  navigator.clipboard
    .writeText(window.location.href)
    .then(function () {
      console.log('Успешно', data)
    })
    .catch(function (error) {
      console.error('Ошибка:', error)
    })
})
```

Метод `read()` читает произвольные данные (например, изображения) из буфера обмена, возвращая [`promise`](/js/promise/). Когда данные получены, промис разрешается в объект `DataTransfer`, который предоставляет данные.

Запросим данные и запишем результат в переменную `text`:

```js
const items = await navigator.clipboard
  .read()
  .then(function () {
    console.log('Успешно', data)
  })
  .catch(function (error) {
    console.error('Ошибка:', error)
  })
const textBlob = await items[0].getType('text/plain')
const text = await (new Response(textBlob)).text()
```

Метод `readText` запрашивает текст из буфера обмена, возвращая [`promise`](/js/promise/). Когда ответ получен, промис разрешается в текст буфера обмена типа `DOMString`.

Следующий фрагмент извлекает текст из буфера обмена и добавляет его к первому параграфу. Данный код безопасен, поскольку `readText()` возвращает пустую строку, если в буфере обмена нет текста.

```html
<p>Произвольный текст</p>
```

```js
const paragraph = document.querySelector('p')

window.navigator.clipboard
  .readText()
  .then(function (clipText) {
    paragraph.textContent += clipText
  })
  .catch(function (error) {
    console.error('Есть ошибки', error)
  })
```

<aside>

💡 Методы `read` и `write` по умолчанию отключены. Для их включения требуется изменить настройки разрешений в браузере.

</aside>

<aside>

💡 Важная особенность чтения из буфера в том, что оно работает не напрямую. Например, в Google Chrome во время попытки прочитать данные из буфера пользователя уведомят о попытке чтения и предложат разрешить или запретить действие.

</aside>

## Поддержка

Не все браузеры поддерживают Clipboard API. Вы можете проверить поддержку, проверив объекта буфера обмена в глобальном объекте навигатора:

```js
if (navigator.clipboard) {
  // Всё хорошо
} else {
  // Браузер не поодерживает данное API :(
}
```

Если объекта нет, то можно использовать `execCommand` для поддержки старых браузеров.

## Особенности

Современный API позволяет работать не только с текстом, но и с картинками, а также копировать _смешанный контент_.

_Смешанный контент_ — это когда страница загружается по защищённому HTTPS соединению, но отдельные ресурсы (изображения, стили, скрипты и прочее) — по незащищённому HTTP.
