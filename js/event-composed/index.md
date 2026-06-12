---
title: "`composed`"
description: "Свойство события, определяющее, может ли событие пересекать границы Shadow DOM и распространяться в обычный DOM."
authors:
  - drakesbot12
baseline:
  - group: shadow-dom
    features:
      - api.Event.composed
keywords:
  - composed
  - событие
  - shadow
  - dom
  - web-components
  - event
related:
  - js/element-attachshadow
  - html/slot
  - css/part
tags:
  - doka
---

## Кратко

Свойство `composed` события возвращает булево значение, которое указывает, может ли событие пересекать границы [Shadow DOM](/js/shadowdom/) при всплытии границы  и распространяться в обычный [DOM](/js/dom/).

## Пример

```html
<div id="open-shadow"></div>
<div id="closed-shadow"></div>
```

```javascript
const openHost = document.getElementById('open-shadow');
const openRoot = openHost.attachShadow({ mode: 'open' });
openRoot.innerHTML = '<button>Открытый дом</button>';

const closedHost = document.getElementById('closed-shadow');
const closedRoot = closedHost.attachShadow({ mode: 'closed' });
closedRoot.innerHTML = '<button>Закрытый дом</button>';
```

## Как пишется

```javascript
event.composed
```

Свойство доступно только для чтения и возвращает `true` или `false`.

## Как понять

Свойство `composed` определяет поведение события при пересечении границ [Shadow DOM](/js/shadowdom/):

- `true` — событие может пересекать границы [Shadow DOM](/js/shadowdom/) и распространяться в обычный [DOM](/js/dom/)
- `false` — событие останавливается на границе [Shadow DOM](/js/shadowdom/)

Большинство событий пользовательского интерфейса (`click`, `touch`, `mouseover`, `copy`, `paste` и др.) имеют `composed: true`

Распространение происходит только если свойство `bubbles` также равно `true`.

## Подсказки

💡 Все события пользовательского интерфейса автоматически имеют `composed: true`.
💡 События, созданные программно, по умолчанию имеют `composed: false`, если не указано иное.
💡 Используйте метод [`composedPath()`](/js/event-composedpath) для определения пути распространения события через [Shadow DOM](/js/shadowdom/).
💡 Даже если `composed: true`, события не могут проникнуть в закрытый [Shadow DOM](/js/shadowdom/).
