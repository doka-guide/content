---
title: "`::part()`"
description: "Селектор для стилизации отдельных частей элемента, определённых через атрибут `part` в Shadow DOM"
authors:
  - drakesbot12
baseline:
  - group: shadow-parts
    features:
      - css.selectors.part
keywords:
  - shadow
  - dom
  - part
  - web-components
  - кастомные
  - элементы
related:
  - css/state
  - html/part
  - js/element-shadowroot
tags:
  - doka
---

## Кратко

Псевдоэлемент `::part()` позволяет применять стили к отдельным частям элемента внутри [Shadow DOM](/js/shadowdom/), если этим частям задан атрибут [`part`](/html/part/).

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

```css
my-card::part(box) {
  color: #ffffff;
  border: 1.5px solid #ff8630;
  background: #ffffff22;
}
```

<iframe title="Стилизация частей веб-компонента через ::part()" src="demos/basic/" height="350"></iframe>

## Как пишется

Запись `::part(имя)` применяется к элементу, на котором установлен [`part="имя"`](/html/part/) внутри [Shadow DOM](/js/shadowdom/). Также есть несколько условий:

- Элемент должен быть в `shadowRoot`;
- Нужно явно указать атрибут [`part`](/html/part/) у целевого элемента;
- Элемент, использующий `::part()`, должен находиться снаружи компонента.

```css
custom-element::part(name) {
  /* стили */
}
```

## Как понять

[Shadow DOM](/js/shadowdom/) изолирует внутреннюю разметку компонента от внешнего CSS. Однако, с помощью `::part()` можно выбрать конкретные участки внутренней разметки, помеченные [`part=""`](/html/part/), и изменить их стиль снаружи.

Это особенно удобно, если вы хотите позволить разработчикам кастомизировать внешний вид вашего компонента, не открывая весь [Shadow DOM](/js/shadowdom/).

## Подсказки

💡 После `::part()` можно использовать простые псевдоклассы, например `::part(name):hover`, но нельзя использовать **структурные псевдоклассы** - `::part(name):first-child`

💡 Атрибут [`exportparts`](/html/exportparts/) позволяет передавать [`part`](/html/part/) из вложенного компонента выше — для сложных вложенных структур.

```html
<inner-component exportparts="button, icon"></inner-component>
```

💡 Можно указать несколько имён в [`part`](/html/part/):

```html
<div part="header primary"></div>
```

И потом выбирать по любому:

```css
x-box::part(header) { color: red; }
x-box::part(primary) { font-weight: bold; }
```
