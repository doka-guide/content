---
title: "`Clipboard API`"
description: "Clipboard API позволяет работать с буфером обмена"
authors:
  - rusakov
tags:
  - article
---

## Кратко

`Clipboard API` предоставляет операции для переопределения действий с буфером обмена по умолчанию (*вырезание*, *копирование* и *вставка*), а также выполнять асинхронные *запись/чтение* в системный буфер обмена.

API предназначен заменить `document.execCommand()` в качестве способа для доступа к буферу обмена.

## Интерфейсы

- *Clipboard* (Async Clipboard API) — предоставляет интерфейс для *чтения/записи* текста и данных в буфер обмена

- *ClipboardEvent* (Clipboard Event API)* — представляет события, содержащие информацию, относящуюся к модификации буфера обмена, а именно *cut*, *copy* и *paste* события

- *ClipboardItem* — представляет единый формат элемента, используемый при чтении или записи данных.

💡 Типы данных, которые можно использовать:

<details>
  <summary>С методом <strong>paste</strong></summary>

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
  <summary>С методами <strong>copy</strong> или <strong>cut</strong></summary>

  - text/plain
  - text/uri-list
  - text/csv
  - text/html
  - image/svg+xml
  - application/xml, text/xml
  - application/json
</details>

## Как это работает

### Clipboard (async Clipboard API)

Методы:

- *write* — записывает произвольные данные в буфер обмена. Эта асинхронная операция сигнализирует о завершении путём разрешения возвращённого [`promise`](/js/promise/).

- *writeText* — записывает текст в буфер обмена, возвращая [`promise`](/js/promise/), которое разрешается после того, как текст полностью скопирован в буфер обмена.

- *read* — запрашивает произвольные данные (например, изображения) из буфера обмена, возвращая [`promise`](/js/promise/). Когда данные получены, обещание разрешается с помощью объекта *DataTransfer*, который предоставляет данные.

- *readText* — запрашивает текст из буфера обмена; возвращает [`promise`](/js/promise/), которое разрешается с помощью *DOMString*, содержащего текст буфера обмена, когда он доступен.

💡 Кроме того, методы *read* и *write* по умолчанию отключены, и для их включения требуется изменить настройки разрешений в браузере.

### Запись в буфер обмена

Для сохранения данных в буфер можно использовать универсальный метод *navigator.clipboard.write()* или специальный *navigator.clipboard.writeText()*, если вы собираетесь помещать в буфер только текст. Оба метода асинхронные и возвращают [`promise`](/js/promise/).

Ниже пример с копированием текущего URL:

```html
<button type='button'>Скопировать текущий URL</button>
```

И добавим немного js:

```js
const button = document.querySelector('button');

button.addEventListener('click', function () {
  navigator.clipboard
    .writeText(window.location.href)
    .then(function () {
       console.log('Успешно', data)
    })
    .catch(function (error) {
      console.error('Есть ошибки', error);
    });
});
```

### Чтение из буфера обмена

По аналогии с записью, вы также можете читать данные из буфера обмена. Для этого есть аналогичные методы *read* и *readText*:

```js
const paragraph = document.querySelector("p");

window.navigator.clipboard
  .readText()
  .then(function (clipText) {
    paragraph.textContent += clipText;
  })
  .catch(function (error) {
    console.error('Есть ошибки', error);
  });
```

Этот фрагмент извлекает текст из буфера обмена и добавляет его к первому параграфу. Данный код безопасен, поскольку `readText()` возвращает пустую строку, если в буфере обмена нет текста.

💡 Важная особенность чтения из буфера в том, что оно работает не напрямую. Например, в Google Chrome во время попытки прочитать данные из буфера пользователя уведомят о попытке чтения и предложат разрешить или запретить действие.

## Поддержка

Чтобы выполнить постепенную поддержку API в браузере или вернуться к использованию `execCommand` для не поддерживающих браузеров, вы можете проверить наличие объекта буфера обмена в глобальном объекте навигатора:

```js
if (navigator.clipboard) {
  // Всё хорошо
} else {
  // Браузер не поодерживает данное API :(
}
```

## Важность

Современный API позволяет работать не только с текстом, но и с картинками, а также копировать смешанный контент.
