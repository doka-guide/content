---
title: "`::slotted()`"
description: "Псевдоэлемент `::slotted()` позволяет стилизовать элементы, переданные во внешний слот веб-компонента"
authors:
  - drakesbot12
keywords:
  - веб-компоненты
  - слот
  - Shadow
  - DOM
  - ::slotted
related:
  - html/part
  - css/state
  - js/window-customelements
tags:
  - doka
---

## Кратко

`::slotted()` — это псевдоэлемент, который позволяет стилизовать **вставленные во внешний слот элементы** внутри Shadow DOM компонента.

## Пример

```html
<template id="card-template">
  <style>
    ::slotted(h1) {
      font-weight: bold;
      color: #FF8630;
      margin-bottom: 8px;
      font-size: 2rem;
    }

    ::slotted(p) {
      font-size: 1.2rem;
    }
  </style>
  <div class="card" part="box">
    <slot name="title">Пустая карточка 😔</slot>
    <slot name="content"></slot>
  </div>
</template>

<my-card>
  <h1 slot="title">Крутая карточка 😎</h1>
  <p slot="content">Контент очень крутой карточки</p>
</my-card>
<my-card></my-card>
```

```js
class MyCard extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    const template = document.getElementById('card-template')
    const content = template.content.cloneNode(true)
    shadow.appendChild(content)
  }
}
customElements.define('my-card', MyCard)
```

<iframe title="Стилизация части Shadow DOM с помощью `::slotted()`" src="demos/basic/" height="350"></iframe>

## Как пишется

Псевдоэлемент `::slotted()` пишется внутри Shadow DOM, и работает только для элементов, переданных в [`<slot>`](/html/slot/) из внешнего DOM:

```css
::slotted(h2) {
  color: red;
}
```

Можно указывать тег, класс, атрибуты и другие селекторы:

```css
::slotted(.highlighted) {
  background: yellow;
}
```

Нельзя стилизовать вложенные элементы:

```css
/* НЕ РАБОТАЕТ! */
::slotted(div span) {
  color: red;
}
```

## Как понять

Shadow DOM создаёт изоляцию: стили внутри компонента не влияют на внешний DOM, и наоборот. Слот — способ «вставить» внешний контент внутрь компонента. `::slotted()` — единственный способ внутри Shadow DOM обратиться к внешнему содержимому, пришедшему через слот.

## Подсказки

💡 Работает только внутри Shadow DOM. В обычном CSS — не сработает.
💡 `::slotted()` работает только с прямыми потомками слота. Вложенные теги — игнорируются.
💡 Если слот именованный ([`<slot name="title">`](/html/slot/)), `::slotted()` тоже работает:

```css
::slotted([slot="title"]) {
  font-weight: bold;
}
```
