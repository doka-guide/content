---
title: "`composed`"
description: "Свойство события, определяющее, может ли событие пересекать границы Shadow DOM и распространяться в обычный DOM."
authors:
  - drakesbot12
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

Свойство `composed` события возвращает булево значение, которое указывает, может ли событие пересекать границы Shadow DOM и распространяться в обычный DOM.

## Пример

```html
<open-shadow text="Открытый дом"></open-shadow>

<closed-shadow text="Закрытый дом"></closed-shadow>
```

```javascript
customElements.define('open-shadow', class extends HTMLElement {
  constructor() {
    super();
    const p = document.createElement('p');
    p.textContent = this.getAttribute('text');
    
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(p);
  }
});

customElements.define('closed-shadow', class extends HTMLElement {
  constructor() {
    super();
    const p = document.createElement('p');
    p.textContent = this.getAttribute('text');
    
    const shadow = this.attachShadow({ mode: 'closed' });
    shadow.appendChild(p);
  }
});

document.addEventListener('click', (e) => {
  console.log('composed:', e.composed);
  console.log('composedPath:', e.composedPath());
});
```

## Как пишется

```javascript
event.composed
```

Свойство доступно только для чтения и возвращает `true` или `false`.

## Как понять

Свойство `composed` определяет поведение события при пересечении границ Shadow DOM:

- `true` — событие может пересекать границы Shadow DOM и распространяться в обычный DOM
- `false` — событие останавливается на границе Shadow DOM

Все события пользовательского интерфейса (`click`, `touch`, `mouseover`, `copy`, `paste` и др.) имеют `composed: true`. Большинство других типов событий имеют `composed: false`.

Распространение происходит только если свойство `bubbles` также равно `true`.

## Подсказки

💡 Все события пользовательского интерфейса автоматически имеют `composed: true`.
💡 События, созданные программно, по умолчанию имеют `composed: false`, если не указано иное.
💡 Используйте метод [`composedPath()`](/js/event-composedpath) для определения пути распространения события через Shadow DOM.
💡 Даже если `composed: true`, события не могут проникнуть в закрытый Shadow DOM.
