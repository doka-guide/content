---
title: "`:state()`"
description: "Псевдокласс :state() позволяет применять стили в зависимости от пользовательского состояния компонента. Особенно полезен для стилизации кастомных элементов."
authors:
  - drakesbot12
keywords:
  - state
  - кастомные
  - элементы
  - web-components
  - пользовательские
  - состояния
related:
  - css/slotted
  - html/part
  - js/element-shadowroot
tags:
  - doka
---

## Кратко

Псевдокласс `:state()` используется для кастомных HTML-элементов и позволяет применять стили в зависимости от их пользовательского состояния.

## Пример

```html
<template id="toggle-box-template">
  <style>
    :host {
      display: block;
      padding: 1em;
      border: 2px solid #888;
      border-radius: 8px;
      cursor: pointer;
    }

    :host(:state(active)) {
      background: lightgreen;
      border-color: green;
    }
  </style>
  <slot></slot>
</template>

<toggle-box>Нажми меня</toggle-box>
```

```js
class ToggleBox extends HTMLElement {
  constructor() {
    super()
    const template = document.getElementById('toggle-box-template')
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))

    this.addEventListener('click', () => {
      if (this.states?.has('active')) {
        this.states.delete('active')
      } else {
        this.states?.add('active')
      }
    })
  }
}

customElements.define('toggle-box', ToggleBox)
```

## Как пишется

```css
:host(:state(<состояние>)) {
  /* Стили, когда у компонента установлено состояние */
}
```

```js
// Внутри кастомного элемента
this.states.add('active')    // Устанавливаем состояние
this.states.delete('active') // Удаляем состояние
```

## Как понять

Селектор `:host(:state(active))` применяется к компоненту, если у него установлено состояние.
Управлять этим состоянием можно из JavaScript с помощью объекта `CustomStateSet`, который доступен через свойство `this.states` внутри кастомного элемента.
Важно помнить, что механизм работает только для компонентов в Shadow DOM, зарегистрированных через `customElements.define`.
Состояния, установленные таким образом, являются внутренними: они не отображаются в виде атрибутов или классов и не видны в DOM.

## Подсказки

💡 Можно задавать несколько состояний и применять к ним разные стили.
💡 Используйте `:state()` для логики типа «открыт/закрыт», «активен/неактивен» без необходимости менять классы или атрибуты.
