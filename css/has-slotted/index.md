---
title: "`:has-slotted`"
description: "CSS-псевдокласс для стилизации <slot> в Shadow DOM в зависимости от наличия пользовательского контента."
authors:
  - drakesbot12
keywords:
  - has-slotted
  - slot
  - web-components
  - shadow
  - dom
  - css
  - псевдокласс
related:
  - html/slot
  - css/slotted
  - js/shadowdom
tags:
  - doka
---

## Кратко

`:has-slotted` — CSS-псевдокласс, который позволяет определить, содержит ли [`<slot>`](/html/slot/) в [Shadow DOM](/js/shadowdom/) пользовательский контент (не только значение по умолчанию). Работает только внутри стилей, размещённых в [Shadow DOM](/js/shadowdom/).

## Пример

```html
<template id="my-element-template">
  <style>
    :has-slotted {
      color: green;
    }
    :not(:has-slotted) {
      color: red;
    }
  </style>
  <slot><code>:has-slotted</code> Не работает!</slot>
</template>

<div class="container">
  <my-element>
    <code>:has-slotted</code> Работает!
  </my-element>

  <my-element></my-element>
</div>
```

```js
class MyElement extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const template = document.getElementById('my-element-template');
    shadow.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('my-element', MyElement);
```

<iframe title=":has-slotted — пример" src="demos/basic/" height="200"></iframe>

## Как пишется

```css
:has-slotted {
  /* Стили для слотов с пользовательским контентом */
}

:not(:has-slotted) {
  /* Стили для слотов без пользовательского контента */
}
```

Псевдокласс применяется только к элементу [`<slot>`](/html/slot/) внутри [Shadow DOM](/js/shadowdom/).

## Как понять

`:has-slotted` позволяет стилизовать [`<slot>`](/html/slot/), если в него был передан контент из Light DOM (то есть если слот не пустой и не использует значение по умолчанию). Даже если в слот передан **только пробел** или **текстовый узел**, псевдокласс сработает.

Это удобно для создания адаптивных компонентов, которые меняют внешний вид в зависимости от наличия пользовательского контента.

## Подсказки

💡 Работает только внутри CSS, размещённого в [Shadow DOM](/js/shadowdom/).
💡 Если слот пустой или использует только значение по умолчанию, `:has-slotted` не применяется.
💡 Даже пробел или невидимый текст считаются контентом для этого псевдокласса.
💡 Для стилизации содержимого слота используйте также [`::slotted`](/css/slotted/).
