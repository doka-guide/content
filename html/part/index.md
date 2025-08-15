---
title: "Атрибут `part`"
description: "Атрибут `part` позволяет отмечать части Shadow DOM, к которым можно применять стили из внешнего мира с помощью селектора `::part()`."
authors:
  - drakesbot12
baseline:
  - group: shadow-parts
    features:
      - api.Element.part
      - html.global_attributes.part
keywords:
  - shadow-dom
  - кастомные
  - элементы
  - веб-компоненты
  - кастомизация
  - стилизация
related:
  - html/exportparts
  - css/slotted
  - js/element-attachshadow
tags:
  - doka
---

## Кратко

Атрибут `part` применяется к элементам внутри [Shadow DOM](/js/shadowdom/) и позволяет пробрасывать имена частей наружу, чтобы их можно было стилизовать снаружи с помощью псевдоэлемента [`::part`](/css/part/).

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

```css
my-card::part(box) {
  color: #ffffff;
  border: 1.5px solid #ff8630;
  background: #ffffff22;
}
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

<iframe title="Стилизация части Shadow DOM с помощью `part`" src="demos/basic/" height="350"></iframe>

## Как пишется

Атрибут `part` указывается на элементе внутри [Shadow DOM](/js/shadowdom/):

```html
<div part="название"></div>
```

Можно указать несколько частей через пробел:

```html
<div part="header main"></div>
```

Для стилизации этих частей снаружи используется селектор [`::part(...)`](/css/part/):

```css
my-widget::part(header) {
  font-weight: bold;
}
```

Если у элемента нет [Shadow DOM](/js/shadowdom/) или атрибут part не указан — селектор [`::part(...)`](/css/part/) ничего не выберет.

## Как понять

Обычно всё, что внутри [Shadow DOM](/js/shadowdom/) — изолировано. Но иногда компонент хочет дать доступ к некоторым своим частям — например, заголовку или рамке. Атрибут `part` позволяет сделать такую «дырочку» в капсуле, не нарушая всей изоляции.

А снаружи можно использовать [`::part(...)`](/css/part/), чтобы стилизовать эти открытые части так, как требуется.

## Подсказки

💡 Атрибут `part` пробрасывает только имена. А стили всё равно применяются снаружи через обычный CSS — внутри [Shadow DOM](/js/shadowdom/) они не видны.
💡 Даже если компонент использует [Shadow DOM](/js/shadowdom/) в `mode: closed`, проброшенные `part` всё равно можно стилизовать.
💡 В отличие от [`<slot>`](/html/slot/), `part` не связан с содержимым, вставленным в компонент, а относится к структуре внутри него.
