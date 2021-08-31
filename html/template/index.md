---
title: "<template>"
authors:
  - nionka
summary:
  - template
  - тег
  - тэг
tags:
  - doka
---

## Кратко

Тег `<template>` – (от английского _template_ – шаблон) используется как контейнер для хранения HTML кода.

## Пример

```html
<template>
  <div class="card">
    <h2 class="card__title"></h2>
    <div class="card__content"></div>
  </div>
</template>
```

## Как это понять

В `<template>` может храниться любая корректная HTML разметка, в том числе стили и скрипты. Браузер будет проверять HTML-синтаксис, но содержимое тега `<template>` не будет отображаться на странице.

Если в шаблоне содержаться скрипты, они не выполнятся, а стили не применятся, пока содержимое шаблона не поместить на страницу.

Для того, чтобы использовать содержимое шаблона в документе нужен JavaScript.

## Атрибуты

К тегу `<template>` можно применить все [глобальные атрибуты](/html/global-attrs).

### `content`

Атрибут `content` доступен только для чтения. По нему можно получить доступ к содержимому тега `<template>`.

👆 Хотя большинство современных браузеров имеют поддержку `<template>`, перед его использованием в скрипте это лучше проверить. Проверка осуществляется как раз по наличию атрибута `content`

```javascript
if (document.createElement("template").content) {
  /* Код выполнится, если браузер поддерживает <template> */
} else {
  /* Нужно придумать что-то другое */
}
```

## Как использовать

Имеем HTML разметку с контейнером для списка покупок и шаблон элемента списка, завёрнутого в `<template>`:

```html
<div>
  <h2>Список покупок</h2>
  <ul class="list">
  </ul>

  <template id="template">
    <li></li>
  </template>
</div>
```

Использование шаблона с помощью JavaScript:

```javascript
const list = document.querySelector('.list');
const template = document.querySelector('.template');

// клонируем содержимое тега <template>
const item = template.content.cloneNode(true);

// находим тег <li> и помещаем текст внутрь
item.querySelector('li').textContent = 'Молоко';

// вставляем склонированный контент на страницу
list.append(item);
```

## Подсказки

💡 Тег `<template>` может располагаться практически в любом месте HTML страницы.

💡 В `<template>` могут находится даже те теги, которые в обычной жизни не используются без родительского контейнера, такие как [`<li>`](/html/li) или [`<tr>`](/html/tables).

```html
<template>
  <li></li>
</template>

<template>
  <tr>
    <td></td>
  </tr>
</template>
```
