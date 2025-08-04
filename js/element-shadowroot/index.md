---
title: "`.shadowRoot`"
description: "Свойство возвращает корневой узел теневого DOM, если он есть, иначе — null"
authors:
  - drakesbot12
keywords:
  - shadowroot
  - теневой
  - дом
  - shadow
  - dom
  - веб-компоненты
related:
  - js/element-attachshadow
  - html/slot
  - css/part
tags:
  - doka
---

## Кратко

Свойство `.shadowRoot` возвращает корневой узел Shadow DOM, если он был создан через [`.attachShadow()`](/js/element-attachshadow/) с `mode: "open"`. В противном случае — возвращает `null`.

## Пример

```html
<my-box></my-box>

<script>
  class MyBox extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.innerHTML = `<p>Это из теневого DOM</p>`
    }
  }

  customElements.define('my-box', MyBox)

  document.addEventListener('DOMContentLoaded', () => {
    const el = document.querySelector('my-box')
    console.log(el.shadowRoot) // 👉 ShadowRoot {...}
  })
</script>
```

## Как пишется

```js
const shadow = element.shadowRoot
```

Если Shadow DOM не был создан или создан с `mode: "closed"` — вернётся `null`.

## Как понять

Теневой DOM изолирует разметку и стили внутри компонента. Но доступ к нему возможен, **только если он открыт** (`mode: 'open'`).

Если вы пишете:

```js
this.attachShadow({ mode: 'closed' })
```

То `element.shadowRoot` всегда будет `null`, даже если Shadow DOM существует.

## Подсказки

💡 Вы можете использовать `shadowRoot` для динамического обновления содержимого внутри компонента:

```js
this.shadowRoot.querySelector('p').textContent = 'Новый текст'
```

💡 В дебаггере браузера `shadowRoot` удобно смотреть прямо в DOM-панели — откройте компонент и разверните вложенный `#shadow-root`.
