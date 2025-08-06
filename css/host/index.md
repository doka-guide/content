---
title: "`:host` и `:host()`"
description: "Псевдоклассы `:host` и `:host()` позволяют стилизовать корневой элемент Shadow DOM компонента, в том числе с условиями на атрибуты."
authors:
  - drakesbot12
keywords:
  - css
  - web-components
  - shadow dom
  - :host
  - :host()
related:
  - css/part
  - html/slot
  - js/window-customelements
tags:
  - doka
---

## Кратко

Псевдокласс `:host` применяется внутри [Shadow DOM](/js/shadowdom/) и позволяет стилизовать корневой элемент (хост), к которому прикреплён [Shadow DOM](/js/shadowdom/). Вариант с функцией `:host(...)` позволяет задать условие — например, стилизовать хост только если у него есть определённый атрибут или класс.

## Пример

```html
<template id="my-box-template">
  <style>
    ::slotted(h1) {
      color: #FF8630;
    }

    ::slotted(p) {
      font-size: 1.2rem;
    }

    :host {
      display: block;
      padding: 1em;
      border-radius: 5px;
    }

    :host(.warning) {
      border-radius: 1.4rem;
      border: 5px solid red;
    }

    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }
  </style>
  <div class="card" part="box">
    <slot name="title">Пустая карточка 😔</slot>
    <slot name="content"></slot>
  </div>
</template>

<my-box>
  <h1 slot="title">Крутая карточка 😎</h1>
  <p slot="content">Контент очень крутого бокса</p>
</my-box>

<my-box class="warning">
  <h1 slot="title">Внимание ⚠️</h1>
  <p slot="content">Это предупреждающий бокс</p>
</my-box>

<my-box disabled>
  <h1 slot="title">Отключённый бокс 🚫</h1>
  <p slot="content">Этот бокс недоступен</p>
</my-box>
```

```js
class MyBox extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    const template = document.getElementById('my-box-template')
    shadow.appendChild(template.content.cloneNode(true))
  }
}

customElements.define('my-box', MyBox)
```

<iframe title="Пример использования :host и :host()" src="demos/basic/" height="550"></iframe>

## Как пишется

- `:host` — без параметров, просто селектор хоста.

```css
:host {
  display: block;
}
```

- `:host(<селектор>)` — селектор внутри скобок — условие на хост. Например:

```css
:host(.active) {
  border-color: green;
}

:host([disabled]) {
  opacity: 0.5;
}
```

Можно использовать любые обычные CSS-селекторы, которые применимы к хост-элементу.

## Как понять

[Shadow DOM](/js/shadowdom/) — это отдельный контекст, и в нём нельзя просто обратиться к хосту как к обычному элементу. Псевдокласс `:host` позволяет именно внутри [Shadow DOM](/js/shadowdom/) задать стили для самого хоста.

Использование условия через `:host(...)` даёт гибкость — можно менять стили компонента в зависимости от его атрибутов, классов или состояний, переданных извне.

## Подсказки

💡 `:host` работает только внутри [Shadow DOM](/js/shadowdom/). В обычном CSS вне компонента он не действует.
💡 Для выбора вложенных элементов компонента используется `:host`, [`::slotted(...)`](/css/slotted/) и другие селекторы.
💡 Для стилизации частей компонента снаружи используйте part и [`::part`](/css/part/).
💡 `:host и :host()` имеют более низкую специфичность, чем внешние стили **вне зависимости от селектора**. Например:

```css
* {
  padding: 0;
  margin: 0;
}
```

```html
<template>
  <style>
    :host {
      /* Данное свойство будет ИГНОРИРОВАТЬСЯ
        из-за низкой специфичности :host (или :host()) */
      padding: 16px;
    }
  </style>
  ...
</template>
```
💡 Псевдокласс `:host()` можно комбинировать с другими селекторами, например, `:host(.enabled):hover`. Или даже с другими псевдоклассами, такими как `:not()` и `:is()`, например:

```css
:host(:not([disabled])) { ... }

:host(:is(:hover, :focus-visible)) { ... }

:host(:dir(rtl)) { ... }
```
<aside>

⚠️ Комбинация `:host(:has())` не работает в Chrome, но работает в Safari / Firefox. Проверяйте поддержку перед использованием.

</aside>
