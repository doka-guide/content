---
title: "Clipboard API"
description: "Clipboard API позволяет работать с буфером обмена"
authors:
  - rusakov
tags:
  - article
---

## Кратко

Clipboard API предоставляет операции для переопределения действий с буфером обмена по умолчанию (_вырезание_, _копирование_ и _вставка_), а также выполнять асинхронные _запись/чтение_ в системный буфер обмена.

API предназначен заменить `document.execCommand()` в качестве способа для доступа к буферу обмена.

## Интерфейсы

`Интерфейс прикладного программирования (API - Application Programming Interfaces)` - это готовые конструкции языка, позволяющие разработчику строить сложную функциональность с меньшими усилиями. Они _скрывают_ более сложный код, обеспечивая простоту использования.

API не являются частью языка, а построены с помощью встроенных функций JavaScript для того, чтобы увеличить ваши возможности при написании кода.

Вот список `Clipboard API`:

- _Clipboard_ (Async Clipboard API) — предоставляет интерфейс для _чтения/записи_ текста и данных в буфер обмена

- _ClipboardEvent_ (Clipboard Event API) — представляет события, содержащие информацию, относящуюся к модификации буфера обмена, а именно _cut_, _copy_ и _paste_ события

- _ClipboardItem_ — представляет единый формат элемента, используемый при чтении или записи данных.

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

- _write_ — записывает произвольные данные в буфер обмена, возвращает [`promise`](/js/promise/).

Запишем изображение в буфер обмена:

```js
const img = await fetch("image.jpg");
const blob = await image.blob();

await navigator.clipboard
  .write([new ClipboardItem({ [blob.type]: blob })])
  .then(function () {
    console.log("Успешно", data);
  })
  .catch(function (error) {
    console.error("Ошибка:", error);
  });
```

- _writeText_ — записывает текст в буфер обмена, возвращая [`promise`](/js/promise/), которое разрешается после того, как текст полностью скопирован в буфер обмена.

Ниже пример с копированием текущего URL:

```html
<button type="button">Скопировать текущий URL</button>
```

```js
const button = document.querySelector("button");

button.addEventListener("click", function () {
  navigator.clipboard
    .writeText(window.location.href)
    .then(function () {
      console.log("Успешно", data);
    })
    .catch(function (error) {
      console.error("Ошибка:", error);
    });
});
```

- _read_ — запрашивает произвольные данные (например, изображения) из буфера обмена, возвращая [`promise`](/js/promise/). Когда данные получены, обещание разрешается с помощью объекта _DataTransfer_, который предоставляет данные.

Запросим данные и запишем результат в переменную _text_:

```js
const items = await navigator.clipboard
  .read();
  .then(function () {
    console.log("Успешно", data);
  })
  .catch(function (error) {
    console.error("Ошибка:", error);
  });
const textBlob = await items[0].getType("text/plain");
const text = await (new Response(textBlob)).text();
```

- _readText_ — запрашивает текст из буфера обмена. Возвращает [`promise`](/js/promise/), которое разрешается с помощью _DOMString_, содержащего текст буфера обмена, когда он доступен.

Следующий фрагмент извлекает текст из буфера обмена и добавляет его к первому параграфу. Данный код безопасен, поскольку `readText()` возвращает пустую строку, если в буфере обмена нет текста.

```html
<p>Произвольный текст</p>
```

```js
const paragraph = document.querySelector("p");

window.navigator.clipboard
  .readText()
  .then(function (clipText) {
    paragraph.textContent += clipText;
  })
  .catch(function (error) {
    console.error("Есть ошибки", error);
  });
```

<aside>
💡 Кроме того, методы _read_ и _write_ по умолчанию отключены, и для их включения требуется изменить настройки разрешений в браузере.
💡 Важная особенность чтения из буфера в том, что оно работает не напрямую. Например, в Google Chrome во время попытки прочитать данные из буфера пользователя уведомят о попытке чтения и предложат разрешить или запретить действие.
</aside>

## Поддержка

Чтобы выполнить постепенную поддержку API в браузере или вернуться к использованию `execCommand` для не поддерживающих браузеров, вы можете проверить наличие объекта буфера обмена в глобальном объекте навигатора:

```js
if (navigator.clipboard) {
  // Всё хорошо
} else {
  // Браузер не поодерживает данное API :(
}
```

## Особенности

Современный API позволяет работать не только с текстом, но и с картинками, а также копировать смешанный контент.
