---
title: "`composedPath()`"
description: "Метод события, возвращающий массив объектов, через которые будет распространяться событие, включая элементы Shadow DOM."
authors:
  - drakesbot12
baseline:
- group: shadow-dom
  features:
    - api.Event.composedPath
keywords:
  - composedPath
  - событие
  - shadow
  - dom
  - event-path
  - web-components
  - event
related:
  - js/event-composed
  - html/exportparts
  - css/state
tags:
  - doka
---

## Кратко

Метод `composedPath()` возвращает массив объектов `EventTarget`, через которые будет распространяться событие. В массив не включаются узлы из закрытых [Shadow DOM](/js/shadowdom/).

## Пример

```html
<div id="open-shadow"></div>
<div id="closed-shadow"></div>
```

```js
const openHost = document.getElementById('open-shadow');
openHost.attachShadow({ mode: 'open' }).innerHTML = '<button>Open shadow</button>';

const closedHost = document.getElementById('closed-shadow');
closedHost.attachShadow({ mode: 'closed' }).innerHTML = '<button>Closed shadow</button>';
```

## Как пишется

```js
event.composedPath()
```

Метод не принимает параметров и возвращает массив объектов `EventTarget`.

## Как понять

Метод `composedPath()` показывает полный путь распространения события от целевого элемента до корня документа:

- **Открытый [Shadow DOM](/js/shadowdom/)**: внутренние узлы видны в `composedPath()`
- **Закрытый [Shadow DOM](/js/shadowdom/)**: внутренние узлы скрыты из `composedPath()`

Путь начинается с целевого элемента и заканчивается `window` (для событий, которые распространяются до глобального объекта).

## Подсказки

💡 Метод работает только с событиями, которые имеют `composed: true`.
💡 Используйте `composedPath()` для отладки распространения событий в сложных компонентах.
💡 Для **закрытого [Shadow DOM](/js/shadowdom/)** путь будет: `[кастомный-элемент, body, html, document, window]`.
💡 Для **открытого [Shadow DOM](/js/shadowdom/)** путь будет: `[элемент, ShadowRoot, кастомный-элемент, body, html, document, window]`.
