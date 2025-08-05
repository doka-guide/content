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
  - html/exportparts
  - css/part
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

**Регистрация до использования**: Все пользовательские элементы должны быть зарегистрированы до их использования в DOM. Если элемент используется до регистрации, браузер создаст `HTMLUnknownElement` вместо вашего кастомного элемента.

```js
// Неправильно — элемент используется до регистрации
document.body.innerHTML = '<my-element></my-element>';

customElements.define('my-element', class extends HTMLElement {
  connectedCallback() {
    this.textContent = 'Привет!';
  }
});
```

```js
// Правильно — регистрация перед использованием
customElements.define('my-element', class extends HTMLElement {
  connectedCallback() {
    this.textContent = 'Привет!';
  }
});

document.body.innerHTML = '<my-element></my-element>';
```

**Альтернатива — `whenDefined()`**: Если элемент уже есть в DOM, но ещё не зарегистрирован, используйте `whenDefined()`:

```js
// Элемент уже в DOM
document.body.innerHTML = '<my-element></my-element>';

// Ждём регистрации
customElements.whenDefined('my-element').then(() => {
  console.log('Элемент зарегистрирован!');
});

// Регистрируем позже
customElements.define('my-element', class extends HTMLElement {
  connectedCallback() {
    this.textContent = 'Привет!';
  }
});
```

**Именование**: Названия пользовательских элементов обязательно должны содержать дефис (например, `my-card`, `user-list`), чтобы избежать конфликтов с будущими встроенными HTML-элементами.

## Подсказки

💡 Используйте `customElements.get('element-name')` для проверки, зарегистрирован ли элемент.
💡 Метод `upgrade()` полезен для активации кастомных элементов в динамически добавленном контенте.
💡 Можно расширять не только `HTMLElement`, но и, например, `HTMLButtonElement`, указав третий параметр `{ extends: 'button' }`, но тогда `<button is="my-button">` (не `<my-button>`) — требуется [`is`](/html/is/).
