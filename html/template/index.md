---
title: "`<template>`"
description: "Скрытая разметка для использования в качестве шаблона."
baseline:
  - group: template
    features:
      - html.elements.template
authors:
  - nionka
contributors:
  - drakesbot12
baseline:
  - group: declarative-shadow-dom
    features:
      - api.HTMLTemplateElement.shadowRootClonable
      - api.HTMLTemplateElement.shadowRootMode
      - api.HTMLTemplateElement.shadowRootDelegatesFocus
      - api.HTMLTemplateElement.shadowRootSerializable
      - html.elements.template.shadowrootmode
      - html.elements.template.shadowrootclonable
      - html.elements.template.shadowrootdelegatesfocus
      - html.elements.template.shadowrootserializable
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

Элемент `<template>` поддерживает [глобальные атрибуты](/html/global-attrs/), а также ряд специальных атрибутов, связанных с декларативным созданием [Shadow DOM](/js/shadowdom/):

### `shadowrootmode`

Добавляет родительскому элементу декларативный [ShadowRoot](/js/shadowroot/). Это стандартный способ создать [Shadow DOM](/js/shadowdom/) прямо в HTML, аналог метода [`attachShadow()`](/js/element-attachshadow/). Принимает значения:

- `open` — внутренний [Shadow DOM](/js/shadowdom/) будет доступен из JavaScript через свойство [`element.shadowRoot`](/js/element-shadowroot/) (рекомендуется для большинства случаев).
- `closed` — внутренний [Shadow DOM](/js/shadowdom/) будет скрыт от JavaScript, свойство [`element.shadowRoot`](/js/element-shadowroot/) вернёт `null`.

<aside>

💡 Примечание: HTML-парсер создаёт объект [ShadowRoot](/js/shadowroot/) в [DOM](/js/dom/) только для первого `<template>` с этим атрибутом и допустимым значением внутри одного родителя. Если атрибут не задан, задан неверно или [ShadowRoot](/js/shadowroot/) уже создан декларативно для этого родителя, то будет создан обычный `HTMLTemplateElement`. После парсинга нельзя превратить `<template>` в [ShadowRoot](/js/shadowroot/), просто изменив его атрибуты.

</aside>

<aside>

⚠️ В старых примерах можно встретить устаревший атрибут `shadowroot`, который поддерживался в Chrome 90–110. Сейчас используется только стандартный `shadowrootmode`.

</aside>

### `shadowrootclonable`

Если установлен, свойство `clonable` у созданного [ShadowRoot](/js/shadowroot/) будет равно `true`. Это значит, что при клонировании хоста (`Node.cloneNode()` или `Document.importNode()`) в копии сохранится и [ShadowRoot](/js/shadowroot/).

### `shadowrootdelegatesfocus`

Если установлен, свойство `delegatesFocus` у созданного [ShadowRoot](/js/shadowroot/) будет равно `true`. В этом случае, если фокус попадает на не-фокусируемый элемент внутри [Shadow DOM](/js/shadowdom/), он автоматически перейдёт к первому фокусируемому элементу внутри дерева. По умолчанию — `false`.

### `shadowrootserializable`

Если установлен, свойство `serializable` у созданного [ShadowRoot](/js/shadowroot/) будет равно `true`. Это позволяет сериализовать содержимое [ShadowRoot](/js/shadowroot/) с помощью методов [`Element.getHTML()`](/js/shadowroot/) или [`ShadowRoot.getHTML()`](/js/shadowroot/) с опцией `serializableShadowRoots: true`. По умолчанию — `false`.

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
