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
  console.log('composedPath:', e.composedPath());
});
```

```html
<open-shadow text="Открытый Shadow DOM"></open-shadow>
<closed-shadow text="Закрытый Shadow DOM"></closed-shadow>
```

## Как пишется

```javascript
event.composedPath()
```

Метод не принимает параметров и возвращает массив объектов `EventTarget`.

## Как понять

Метод `composedPath()` показывает полный путь распространения события от целевого элемента до корня документа:

- **Открытый [Shadow DOM](/js/shadowdom/)**: Включает все узлы, включая элементы внутри [Shadow DOM](/js/shadowdom/)
- **Закрытый [Shadow DOM](/js/shadowdom/)**: Исключает узлы из закрытого [Shadow DOM](/js/shadowdom/)

Путь всегда начинается с целевого элемента и заканчивается `Window`.

## Подсказки

💡 Метод работает только с событиями, которые имеют `composed: true`.
💡 Используйте `composedPath()` для отладки распространения событий в сложных компонентах.
💡 Для **закрытого [Shadow DOM](/js/shadowdom/)** путь будет: `[кастомный-элемент, body, html, document, window]`.
💡 Для **открытого [Shadow DOM](/js/shadowdom/)** путь будет: `[элемент, ShadowRoot, кастомный-элемент, body, html, document, window]`.
