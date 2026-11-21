---
title: "`:defined`"
description: "Псевдокласс `:defined` позволяет применять стили только к тем элементам, которые уже зарегистрированы как кастомные компоненты."
authors:
  - drakesbot12
keywords:
  - кастомные
  - элементы
  - web-components
  - custom-elements
  - :defined
  - shadow
  - dom
related:
  - css/host
  - html/part
  - js/element-attachshadow
tags:
  - doka
---

## Кратко

Псевдокласс `:defined` выбирает только те элементы, которые уже зарегистрированы в браузере как кастомные. Это позволяет стилизовать только определённые компоненты и, например, задать разные стили до и после их инициализации.

## Пример

```html
<div class="container">
  <custom-element>
    <h1 slot="title">Кастомный элемент</h1>
    <p slot="content">Контент появился после инициализации</p>
  </custom-element>
  <button id="btn">Определить элемент</button>
</div>

<template id="custom-element-template">
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
  <div class="card">
    <slot name="title">Пустой элемент 😔</slot>
    <slot name="content"></slot>
  </div>
</template>
```

```css
custom-element:not(:defined) {
  border-color: grey;
  color: grey;
  background: #222;
}

custom-element:defined {
  background-color: wheat;
  border-color: black;
  color: black;
}
```

```js
const btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
  if (!customElements.get("custom-element")) {
    class CustomElement extends HTMLElement {
      constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const template = document.getElementById("custom-element-template");
        shadow.appendChild(template.content.cloneNode(true));
      }
    }
    customElements.define("custom-element", CustomElement);
  }
  btn.remove();
});
```

<iframe title="Демонстрация :defined" src="demos/basic/" height="320"></iframe>

## Как пишется

Псевдокласс используется как обычный селектор:

```css
web-component:defined {
  /* стили, когда компонент зарегистрирован */
}
```

Можно комбинировать с другими селекторами:

```css
my-box:defined:hover {
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
}
```

## Как понять

Когда вы вставляете на страницу кастомный элемент вроде `<my-widget>`, он сначала появляется как неизвестный тег. До тех пор, пока скрипт не выполнится и не вызовет [`customElements.define('my-widget', ...)`](/js/window-customelements/), он считается неопределённым.

Псевдокласс `:defined` позволяет разделить стили до и после определения. Это особенно удобно для:

- Плавной загрузки интерфейса
- Предотвращения странной отрисовки до инициализации
- Анимаций и переходов после готовности

## Подсказки

💡 Если компонент уже определён до вставки в [DOM](/js/dom/) — `:defined` сработает сразу.
💡 Полезно использовать `:not(:defined)`, чтобы стилизовать «заглушки» до загрузки компонентов.
💡 Работает только с кастомными тегами — вроде `<my-dialog>`. Не применимо к обычным HTML-тегам.
💡 Можно использовать как индикатор загрузки — например, показывать лоадер внутри неинициализированного компонента.
