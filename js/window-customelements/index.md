---
title: "`window.customElements`"
description: "Позволяет регистрировать и управлять пользовательскими HTML-элементами — Web Components"
authors:
  - drakesbot12
keywords:
  - web-components
  - пользовательские
  - элементы
  - кастомные
  - теги
related:
  - js/element-attachshadow
  - css/part
  - html/exportparts
tags:
  - doka
---

## Кратко

`window.customElements` — это глобальный объект, который предоставляет методы для создания, регистрации и получения пользовательских HTML-элементов (Web Components).

## Пример

```js
class MyGreeting extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<p>👋 Привет из кастомного элемента!</p>`;
  }
}

customElements.define('my-greeting', MyGreeting);
```

```html
<my-greeting></my-greeting>
```

<iframe title="Создание пользовательского тега через customElements" src="demos/basic/" height="150"></iframe>

## Как пишется

Объект `customElements` — это свойство `window`. Он предоставляет такие методы:

- `.define(name, constructor, options)` — регистрирует новый элемент.
- `.get(name)` — возвращает конструктор уже зарегистрированного элемента.
- `.whenDefined(name)` — возвращает промис, который выполнится, когда элемент будет определён.
- `.upgrade(root)` — вручную активирует пользовательские элементы внутри указанного `root`.

Пример:

```js
customElements.define('my-box', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<div>📦 Это мой компонент</div>';
  }
});
```

## Как понять

Когда вы хотите создать собственный HTML-тег с поведением, которое не поддерживает стандартный HTML, вы используете `customElements`. Это позволяет:

- разделять код на логические блоки;
- повторно использовать компонент на странице;
- инкапсулировать логику и стили (если используется Shadow DOM).

## Подсказки

💡 Все пользовательские элементы должны быть зарегистрированы до их использования в DOM (или используйте `whenDefined`).
💡 Названия пользовательских элементов обязательно должны содержать дефис (например, `my-card`, `user-list`), чтобы избежать конфликтов с будущими встроенными HTML-элементами.
💡 Можно расширять не только `HTMLElement`, но и, например, `HTMLButtonElement`, указав третий параметр `{ extends: 'button' }`, но тогда `<button is="my-button">` (не `<my-button>`) — требуется [`is`](/html/is/).
