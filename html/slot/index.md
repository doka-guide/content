---
title: "`<slot>`"
description: "Место для вставки пользовательского контента в Web Components."
authors:
  - drakesbot12
baseline:
  - group: slot
    features:
      - api.Element.assignedSlot
      - api.Element.slot
      - api.HTMLSlotElement
      - api.HTMLSlotElement.name
      - api.Text.assignedSlot
      - html.elements.slot
      - html.elements.slot.name
      - html.global_attributes.slot
keywords:
  - slot
  - web
  - components
  - shadow
  - DOM
  - content
  - вставка
related:
  - html/part
  - css/slotted
  - js/window-customelements
tags:
  - doka
---

## Кратко

`<slot>` — это HTML-элемент, который используется внутри [Shadow DOM](/js/shadowdom/), чтобы указать, где должен отображаться внешний контент, переданный компоненту. Это ключевой элемент механизма вставки содержимого в [Web Components](/tools/web-components/).

## Пример

```html
<template id="custom-card-template">
  <style>
    ::slotted(h2) {
      color: #FF8630;
    }
    ::slotted(p) {
      color: #2E9AFF;
    }
  </style>
  <div class="card">
    <slot name="title">Пустая карточка</slot>
    <slot></slot>
  </div>
</template>

<div class="container">
  <custom-card>
    <h2 slot="title">Какой-то заголовок</h2>
    <p>Описание какой-то карточки с заголовком.</p>
  </custom-card>
  <custom-card></custom-card>
</div>
```

```js
class CustomCard extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById('custom-card-template');
    const clone = template.content.cloneNode(true);
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(clone);
  }
}

customElements.define('custom-card', CustomCard);
```

<iframe title="Демо работы slot в Web Components" src="demos/basic/" height="350"></iframe>

## Как пишется

```html
<slot></slot>
```

Имеет единственный атрибут `name` — задаёт имя слота, по которому в него можно вставить контент.

## Как понять

Тег `<slot>` играет роль контейнера-заглушки внутри компонента. Снаружи вы передаёте элементы, помечая их атрибутом `slot`, а внутри компонента, `<slot>` показывает, где эти элементы появятся.

Если слот не имеет `name`, он называется слотом по умолчанию, и в него попадают все элементы, не указавшие имя слота.

Если слот пуст, а пользователь не передал ничего — он будет вообще невидим, но вы можете задать дефолтный контент внутри:

```html
<slot>Ничего не передали</slot>
```

## Подсказки

💡 Элемент `<slot>` работает только внутри [Shadow DOM](/js/shadowdom/).
💡 Используйте [`::slotted()`](/css/slotted/) в CSS, чтобы стилизовать переданный внутрь контент.
💡 Можно использовать несколько `<slot>` с разными `name`, чтобы вставлять контент в нужные места.
💡 По умолчанию браузеры применяют к `<slot>` стиль `display: contents`, чтобы сам элемент не влиял на разметку, а только передавал вложенный контент.
💡 Событие `slotchange` срабатывает, когда содержимое слота изменяется. Например, если в компонент добавили или удалили элемент, привязанный к этому слоту.
