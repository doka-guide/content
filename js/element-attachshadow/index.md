---
title: "`.attachShadow()`"
description: "Создаёт и прикрепляет Shadow DOM к элементу, позволяя инкапсулировать стили и разметку"
authors:
  - drakesbot12
keywords:
  - shadow
  - attachShadow
  - web components
  - веб-компоненты
  - инкапсуляция
related:
  - html/slot
  - css/slotted
  - html/part
tags:
  - doka
---

## Кратко

`.attachShadow()` — это метод, который позволяет создать и прикрепить Shadow DOM к HTML-элементу. Он используется в веб-компонентах для инкапсуляции структуры и стилей.

## Пример

```html
<template id="my-box-template">
  <style>
    :host {
      display: block;
      padding: 1em;
      background: lightgray;
      border-radius: 6px;
    }
  </style>
  <slot></slot>
</template>

<my-box>Содержимое бокса</my-box>

<script>
  class MyBox extends HTMLElement {
    constructor() {
      super()
      const shadowRoot = this.attachShadow({ mode: 'open' })
      const template = document.getElementById('my-box-template')
      shadowRoot.appendChild(template.content.cloneNode(true))
    }
  }

  customElements.define('my-box', MyBox)
</script>
```

📦 Этот компонент инкапсулирует стили внутри себя — снаружи их не видно, и они не протекают наружу.

## Как пишется

```js
element.attachShadow({ mode: 'open' })
```

Метод принимает объект с опциями:

- `mode`: (обязательно) `open` (по умолчанию) или `closed`. В режиме `open` можно получить доступ к `element.shadowRoot` извне. В `closed` — нет.
- `delegatesFocus`: (опционально) `true`, если нужно передавать фокус внутрь компонента.
- `slotAssignment`: (опционально) `named` или `manual` — режим работы со слотами (по умолчанию `named`).
- `clonable`, `serializable`: (опционально) экспериментальные, пока редко используются.

## Как понять

Если вы создаёте свой HTML-элемент (`customElements.define(...)`), то скорее всего захотите добавить Shadow DOM для:

- изоляции CSS от внешней среды;
- использования слотов (`<slot>`) для вставки содержимого;
- лучшего контроля над внутренней структурой компонента.

Без вызова `attachShadow()` компонент остаётся обычным элементом.

<aside>

Есть некоторые ограничения на добавление ShadowDOM к элементам, вот список **разрешённых** элементов:
- любой кастомный анонимный компонент с [правильным названием](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name);
- [`<article>`](/html/article/);
- [`<aside>`](/html/aside/);
- [`<blockquote>`](/html/blockquote/);
- [`<body>`](/html/body/);
- [`<div>`](/html/div/);
- [`<footer>`](/html/footer/);
- [`h1 - h6`](/html/h1-h6/);
- [`<header>`](/html/header/);
- [`<main>`](/html/main/);
- [`<nav>`](/html/nav/);
- [`<p>`](/html/p/);
- [`<section>`](/html/section/);
- [`<span>`](/html/span/).

</aside>

## Подсказки

💡 Если Shadow DOM в режиме `closed`, получить его через `element.shadowRoot` будет невозможно — даже из консоли.
💡 Shadow DOM — отличный способ инкапсуляции, но не подходит, если вам нужно, чтобы внешние стили влияли на компонент.
