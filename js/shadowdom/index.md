---
title: "Shadow DOM"
description: "Как Shadow DOM помогает создавать изолированные компоненты и защищает их от внешних вмешательств."
authors:
  - drakesbot12
keywords:
  - shadow dom
  - web components
  - инкапсуляция
  - изоляция
  - attachshadow
  - shadow root
related:
  - js/shadowroot
  - html/slot
  - css/part
tags:
  - article
---

## Что такое Shadow DOM?

Представьте, что вы создали кастомный компонент — например, кнопку с анимацией или сложный виджет. Вы хотите, чтобы этот компонент работал на любой странице, независимо от того, какие стили или скрипты уже есть на сайте. Но как защитить внутреннюю структуру компонента от случайного вмешательства?

Именно для этого и был создан Shadow DOM — технология, которая позволяет создавать изолированные деревья DOM, скрытые от основного документа. Это как коробка с секретом: снаружи вы видите только компонент, а внутри у него своя жизнь, свои стили и своя структура.

Shadow DOM решает три основные проблемы:
- **Инкапсуляция стилей** — CSS внутри компонента не влияет на внешние элементы
- **Скрытие структуры** — внутренние элементы недоступны из основного DOM
- **Переиспользование** — компонент работает одинаково в любом контексте

## Как работает Shadow DOM?

### Основные концепции

Shadow DOM состоит из нескольких ключевых частей:

- **Shadow Host** — обычный DOM-элемент, к которому прикрепляется Shadow DOM
- **Shadow Tree** — дерево DOM внутри Shadow DOM
- **Shadow Boundary** — граница между Shadow DOM и обычным DOM
- [**Shadow Root**](/js/shadowroot/) — корневой узел Shadow Tree

```javascript
// Создание Shadow DOM
const host = document.querySelector('#my-element');
const shadow = host.attachShadow({ mode: 'open' });

// Теперь у нас есть изолированное дерево DOM
shadow.innerHTML = `
  <style>
    div { color: red; }
  </style>
  <div>Это содержимое Shadow DOM</div>
`;
```

### Режимы доступа

Shadow DOM может работать в двух режимах:

**Открытый режим** (`mode: 'open'`):

```javascript
const shadow = element.attachShadow({ mode: 'open' });
console.log(element.shadowRoot); // ShadowRoot
```

Позволяет получить доступ к ShadowRoot извне через свойство [`element.shadowRoot`](/js/shadowroot/). Это удобно для отладки и взаимодействия с внутренним содержимым компонента из внешнего кода.

**Закрытый режим** (`mode: 'closed'`):

```javascript
const shadow = element.attachShadow({ mode: 'closed' });
console.log(element.shadowRoot); // null
```

В закрытом режиме получить доступ к ShadowRoot извне невозможно — свойство [`element.shadowRoot`](/js/shadowroot/) всегда возвращает `null`. Это обеспечивает максимальную изоляцию внутренней структуры компонента: никакой внешний скрипт не сможет напрямую обратиться к содержимому Shadow DOM.

Открытый режим удобен для отладки, закрытый — для максимальной инкапсуляции.

## Инкапсуляция от JavaScript

Одна из главных особенностей Shadow DOM — элементы внутри него недоступны для обычных DOM-методов.

```javascript
// Создаём Shadow DOM
const host = document.querySelector('#host');
const shadow = host.attachShadow({ mode: 'open' });
shadow.innerHTML = '<span>Я в Shadow DOM</span>';

// Этот код НЕ найдёт элемент в Shadow DOM
const spans = document.querySelectorAll('span');
console.log(spans.length); // 0

// Но этот код найдёт
const shadowSpans = host.shadowRoot.querySelectorAll('span');
console.log(shadowSpans.length); // 1
```

Это означает, что внешние скрипты не могут случайно сломать ваш компонент, изменив его внутренние элементы.

## Инкапсуляция от CSS

Аналогично работает и с CSS — стили из основного документа не проникают в Shadow DOM.

```html
<style>
  /* Эти стили НЕ повлияют на элементы в Shadow DOM */
  span {
    color: blue;
    font-weight: bold;
  }
</style>

<div id="host"></div>
```

```javascript
const host = document.querySelector('#host');
const shadow = host.attachShadow({ mode: 'open' });
shadow.innerHTML = `
  <style>
    /* Эти стили работают только внутри Shadow DOM */
    span {
      color: red;
      border: 1px solid black;
    }
  </style>
  <span>Красный текст с рамкой</span>
`;
```

В результате элемент в Shadow DOM будет красным с рамкой, а не синим и жирным, как в основном документе.

## Стилизация Shadow DOM

### Внутренние стили

Самый простой способ — добавить [`<style>`](/html/style/) прямо в Shadow DOM:

```javascript
const shadow = element.attachShadow({ mode: 'open' });
shadow.innerHTML = `
  <style>
    :host {
      display: block;
      border: 1px solid #ccc;
    }
    .internal {
      color: red;
    }
  </style>
  <div class="internal">Содержимое</div>
`;
```

### Конструктивные таблицы стилей

Для более сложных случаев можно использовать `adoptedStyleSheets`:

```javascript
const sheet = new CSSStyleSheet();
sheet.replaceSync(`
  :host {
    display: block;
    padding: 16px;
  }
  .component {
    background: #f0f0f0;
  }
`);

const shadow = element.attachShadow({ mode: 'open' });
shadow.adoptedStyleSheets = [sheet];
```

### Псевдоклассы [`:host` и `:host()`](/css/host/)

Позволяет стилизовать сам элемент-хост изнутри Shadow DOM:

```css
:host {
  display: block;
  border: 2px solid blue;
}

:host(:hover) {
  border-color: red;
}
```

## Shadow DOM и кастомные элементы

Shadow DOM особенно полезен в сочетании с [`customElements`](/js/window-customelements/). Вот пример компонента с изолированной структурой:

```javascript
class MyCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 16px;
          max-width: 300px;
        }
        .title {
          font-weight: bold;
          margin-bottom: 8px;
        }
        .content {
          color: #666;
        }
      </style>
      <div class="title">
        <slot name="title">Заголовок</slot>
      </div>
      <div class="content">
        <slot>Содержимое карточки</slot>
      </div>
    `;
  }
}

customElements.define('my-card', MyCard);
```

```html
<my-card>
  <span slot="title">Моя карточка</span>
  <p>Это содержимое карточки</p>
</my-card>
```

## Слоты для гибкости

Слоты ([`<slot>`](/html/slot/)) позволяют вставлять внешний контент в Shadow DOM:

```javascript
shadow.innerHTML = `
  <div class="header">
    <slot name="header">Заголовок по умолчанию</slot>
  </div>
  <div class="body">
    <slot>Содержимое по умолчанию</slot>
  </div>
`;
```

```html
<my-component>
  <h1 slot="header">Мой заголовок</h1>
  <p>Моё содержимое</p>
</my-component>
```

## Декларативный Shadow DOM

В современных браузерах можно создавать Shadow DOM прямо в HTML с помощью [`<template>`](/html/template/):

```html
<div id="host">
  <template shadowrootmode="open">
    <style>
      span { color: red; }
    </style>
    <span>Я в декларативном Shadow DOM</span>
  </template>
</div>
```

Это особенно полезно для серверного рендеринга.

## Когда использовать Shadow DOM?

**Используйте Shadow DOM когда:**
- Создаёте переиспользуемые компоненты
- Нужна полная изоляция стилей
- Компонент должен работать в любом контексте
- Хотите защитить внутреннюю структуру от внешних вмешательств

**НЕ используйте когда:**
- Нужна максимальная гибкость стилизации
- Компонент должен адаптироваться к дизайн-системе сайта
- Требуется простое решение без сложностей
