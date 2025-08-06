---
title: "`window.customElements`"
description: "Позволяет регистрировать и управлять пользовательскими HTML-элементами — Web Components"
authors:
  - drakesbot12
baseline:
  - group: customized-built-in-elements
    features:
      - api.CustomElementRegistry.builtin_element_support
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

`window.customElements` — это глобальный объект, который предоставляет методы для создания, регистрации и получения пользовательских HTML-элементов ([Web Components](/tools/web-components/)).

## Пример

```html
<my-greeting></my-greeting>
```

```js
class MyGreeting extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<p>👋 Привет из кастомного элемента!</p>`;
  }
}

customElements.define('my-greeting', MyGreeting);
```

<iframe title="Создание пользовательского тега через customElements" src="demos/basic/" height="150"></iframe>

## Как пишется

Объект `customElements` — это свойство `window`. Он предоставляет следующие методы:

- `.define(name, constructor, options)` — регистрирует новый пользовательский элемент.
- `.get(name)` — возвращает конструктор уже зарегистрированного элемента.
- `.whenDefined(name)` — возвращает промис, который выполнится, когда элемент будет определён.
- `.upgrade(root)` — вручную активирует пользовательские элементы внутри указанного `root`.

Рассмотрим подробнее каждый метод:

### `.define(name, constructor, options)`

Регистрирует новый пользовательский элемент.

- `name` — строка, имя нового тега (обязательно). Имя должно содержать хотя бы один дефис (`-`), чтобы не пересекаться с существующими HTML-тегами, например, `my-element`. Если имя не содержит дефиса, будет выброшено исключение. Если попытаться зарегистрировать элемент с именем, которое уже занято другим веб-компонентом, также возникнет ошибка. Подробнее о правилах именования пользовательских элементов можно прочитать в [спецификации Custom Elements](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name).

- `constructor` — класс, который наследуется от `HTMLElement` или другого встроенного элемента (built-in HTML elements), например, `HTMLButtonElement`. Встроенные элементы — это стандартные элементы HTML, такие как [`<button>`](/html/button/), [`<input>`](/html/input/), [`<ul>`](/html/ul/) и т.д. Наследование от них позволяет расширять их поведение. Например, если вы хотите создать свою кнопку на основе стандартной, используйте `class MyButton extends HTMLButtonElement`.
- `options` — объект с дополнительными настройками (необязательно). Обычно используется для расширения встроенных элементов через свойство `extends`, например: `{ extends: 'button' }` для создания кастомной кнопки на основе стандартной.

#### **В чём разница между наследованием от `HTMLElement` и, например, `HTMLButtonElement`?**

Если вы наследуетесь от `HTMLElement`, вы создаёте полностью новый элемент с нуля. Если от встроенного элемента (например, `HTMLButtonElement`), то ваш компонент будет вести себя как стандартная кнопка, но с дополнительной логикой или стилями.

### `.get(name)`

Возвращает конструктор уже зарегистрированного элемента по имени. Если элемент не зарегистрирован — вернёт `undefined`.

### `.whenDefined(name)`

Возвращает промис, который выполнится, когда элемент с указанным именем будет определён. Удобно использовать, если элемент может быть зарегистрирован позже.

### `.upgrade(root)`

Вручную активирует пользовательские элементы внутри указанного корня (например, если элементы были добавлены в [DOM](/js/dom/) до регистрации).

Пример:

```js
const container = document.createElement('div');
container.innerHTML = '<my-box></my-box>';

document.body.appendChild(container);

customElements.define('my-box', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<div>📦 Это мой компонент</div>';
  }
});

customElements.upgrade(container);
```

## Как понять

Иногда стандартные HTML-элементы не подходят для ваших задач. Например:

- Нужен сложный компонент с собственной логикой (календарь, слайдер, модальное окно)
- Хочется переиспользовать один и тот же блок кода на разных страницах
- Нужно инкапсулировать стили и поведение, чтобы они не конфликтовали с остальной страницей

В таких случаях вы можете создать собственный HTML-тег с помощью [`customElements`](/js/window-customelements/). Это позволяет:

- разделять код на логические блоки;
- повторно использовать компонент на странице;
- инкапсулировать логику и стили (если используется [Shadow DOM](/js/shadowdom/)).

Так же при создании кастомных элементом, важно знать несколько важных моментов:

- **Регистрация до использования**: Рекомендуется регистрировать все пользовательские элементы с помощью `customElements.define` до того, как они появятся в [DOM](/js/dom/). Это можно сделать, подключив скрипт с регистрацией в `<head>` или в начале вашего основного JavaScript-файла, до вставки соответствующих тегов на страницу. Если элемент окажется в DOM до регистрации, браузер создаст вместо него `HTMLUnknownElement`, и только после регистрации выполнит «апгрейд» до нужного класса и вызовет, например, `connectedCallback`.

```js
//  До апгрейда браузером — элемент представлен как HTMLUnknownElement,
//  после регистрации и апгрейда — становится экземпляром вашего класса
document.body.innerHTML = '<my-element></my-element>';

customElements.define('my-element', class extends HTMLElement {
  connectedCallback() {
    this.textContent = 'Привет!';
  }
});
```

```js
// Сразу становится экземпляром вашего класса
customElements.define('my-element', class extends HTMLElement {
  connectedCallback() {
    this.textContent = 'Привет!';
  }
});

document.body.innerHTML = '<my-element></my-element>';
```

- **Реакция на регистрацию с помощью `whenDefined()`**: Если элемент уже есть в [DOM](/js/dom/), но ещё не зарегистрирован, можно использовать `whenDefined()`, чтобы выполнить какие-то действия сразу после его регистрации. Например, это удобно, если вы хотите заменить временный плейсхолдер на содержимое кастомного элемента, как показано в [MDN](https://developer.mozilla.org/ru/docs/Web/API/CustomElementRegistry/whenDefined):

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

- **Именование**: Названия пользовательских элементов обязательно должны содержать дефис (например, `my-card`, `user-list`), чтобы избежать конфликтов с будущими встроенными HTML-элементами.

## Подсказки

💡 Метод `upgrade()` полезен для активации кастомных элементов в динамически добавленном контенте.
💡 Используйте [`customElements.get('element-name')`](/js/window-customelements/) для проверки, зарегистрирован ли элемент.
💡 Можно расширять не только `HTMLElement`, но и, например, `HTMLButtonElement`, указав третий параметр `{ extends: 'button' }`, но тогда `<button is="my-button">` (не `<my-button>`) — требуется [атрибут `is`](/html/is/).
