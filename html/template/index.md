---
title: "`<template>`"
description: "Скрытая разметка для использования в качестве шаблона."
baseline:
  - group: template
    features:
      - html.elements.template
authors:
  - nionka
related:
  - js/dom
  - js/query-selector
  - js/element-innerhtml
tags:
  - doka
---

## Кратко

Тег `<template>` – (от английского _template_ – шаблон) используется как контейнер для хранения HTML-кода для дальнейшего использования в JavaScript.

## Пример

```html
<template>
  <div class="card">
    <h2 class="card__title"></h2>
    <div class="card__content"></div>
  </div>
</template>
```

## Как понять

В `<template>` может храниться любая корректная HTML-разметка, в том числе стили и скрипты. Браузер будет проверять HTML-синтаксис, но содержимое тега `<template>` не будет отображаться на странице.

Если в шаблоне содержатся скрипты, они не выполнятся, а стили не применятся, пока содержимое шаблона не поместить на страницу.

Для того чтобы использовать содержимое шаблона в документе нужен JavaScript.

## Атрибуты

К тегу `<template>` можно применить все [глобальные атрибуты](/html/global-attrs/).

## Как использовать

Тег `<template>` имеет свойство `content`, которое доступно только для чтения. По нему можно получить доступ к содержимому шаблона.

<aside>

👆 Хотя большинство современных браузеров имеют поддержку `<template>`, перед его использованием в скрипте это лучше проверить. Проверка осуществляется как раз по наличию свойства `content`.

</aside>

```js
if (document.createElement('template').content) {
  /* Код выполнится, если браузер поддерживает <template> */
} else {
  /* Нужно придумать что-то другое */
}
```

### Наглядный пример

Имеем HTML-разметку с контейнером для списка покупок и шаблон элемента списка, завёрнутого в `<template>`:

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

```js
const list = document.querySelector('.list')
const template = document.querySelector('#template')

// Клонируем содержимое тега <template>
const item = template.content.cloneNode(true)

// Находим тег <li> и помещаем текст внутрь
item.querySelector('li').textContent = 'Молоко'

// Вставляем склонированный контент на страницу
list.append(item)
```

## Подсказки

💡 В `<template>` могут находиться даже те теги, которые в обычной жизни не используются без родительского контейнера, такие как [`<li>`](/html/li/) или [`<tr>`](/html/tables/).

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
