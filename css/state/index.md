---
title: "`:state()`"
description: "Псевдокласс :state() позволяет применять стили в зависимости от пользовательского состояния компонента. Особенно полезен для стилизации кастомных элементов."
authors:
  - drakesbot12
baseline:
  - group: state
    features:
      - css.selectors.state
      - api.ElementInternals.states
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
<toggle-box>Нажми меня</toggle-box>
```

```js
class ToggleBox extends HTMLElement {
  constructor() {
    super()

    this._internals = this.attachInternals()
    this.addEventListener('click', () => {
      if (this._internals.states.has('active')) {
        this._internals.states.delete('active')
      } else {
        this._internals.states.add('active')
      }
    })
  }
}

customElements.define('toggle-box', ToggleBox)
```

```css
toggle-box:state(active) {
  color: green;
}
```

## Как пишется

```css
:host(:state(<состояние>)) {
  /* Стили, когда у компонента установлено состояние */
}
```

```js
// Внутри кастомного элемента
const internals = this.attachInternals();
internals.states.add('active');    // Устанавливаем состояние
internals.states.delete('active'); // Удаляем состояние
```

Для работы с состояниями кастомного элемента нужно получить объект internals через `this.attachInternals()`. Только после этого можно использовать `internals.states` для управления состояниями.

## Как понять

Селектор `:state(active)` применяется к компоненту, если у него установлено внутреннее состояние через [`CustomStateSet`](/js/customstateset/), доступный по свойству `internals.states` внутри кастомного элемента. Такие состояния не отображаются в виде атрибутов или классов и не видны в [DOM](/js/dom/). Управлять ими можно только из JavaScript. Механизм работает только для компонентов, зарегистрированных через [`customElements.define`](/js/window-customelements/). Для компонентов с [Shadow DOM](/js/shadowdom/) можно использовать [`:host(:state())`](/css/host/).

## Подсказки

💡 Можно задавать несколько состояний и применять к ним разные стили.
💡 Используйте `:state()` для логики типа «открыт/закрыт», «активен/неактивен» без необходимости менять классы или атрибуты.
