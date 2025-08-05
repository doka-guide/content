---
title: "`ShadowRoot`"
description: "Корневой узел Shadow DOM, который создаёт изолированное дерево DOM для кастомных элементов."
authors:
  - drakesbot12
keywords:
  - shadowroot
  - shadow
  - dom
  - web-components
  - изолированный dom
  - attachshadow
  - инкапсуляция
related:
  - js/element-attachshadow
  - html/slot
  - css/slotted
tags:
  - doka
---

## Кратко

`ShadowRoot` — это корневой узел [Shadow DOM](/js/shadowdom/), который создаёт изолированное дерево [DOM](/js/dom/), отделённое от основного документа. Позволяет инкапсулировать стили и структуру кастомных элементов.

## Пример

```javascript
class MyCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          border: 1px solid #ccc;
          padding: 16px;
          border-radius: 8px;
        }
        .title {
          font-weight: bold;
          color: #333;
        }
      </style>
      <div class="title">
        <slot name="title">Заголовок</slot>
      </div>
      <div class="content">
        <slot>Содержимое карточки</slot>
      </div>
    `;
  }
}

customElements.define('my-card', MyCard);
```

```html
<my-card>
  <span slot="title">Моя карточка</span>
  <p>Это содержимое карточки</p>
</my-card>
```

<iframe title="Демонстрация ShadowRoot с изолированными стилями" src="demos/basic/" height="180"></iframe>

## Как пишется

```javascript
// Создание ShadowRoot
const shadow = element.attachShadow({ mode: 'open' });

// Доступ к существующему ShadowRoot
const shadowRoot = element.shadowRoot;

// Работа с содержимым
shadowRoot.innerHTML = '<div>Содержимое</div>';
shadowRoot.appendChild(element);
```

### Параметры `attachShadow()`

- **`mode`** — режим доступа:
  - `'open'` — ShadowRoot доступен через `element.shadowRoot`
  - `'closed'` — ShadowRoot недоступен извне

### Свойства

- #### `activeElement`

Возвращает элемент в Shadow Tree, который имеет фокус.

```javascript
const focusedElement = shadowRoot.activeElement;
console.log(focusedElement); // Элемент с фокусом или null
```

- #### `adoptedStyleSheets`

Массив конструктивных таблиц стилей для использования в [Shadow DOM](/js/shadowdom/).

```javascript
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync('div { color: red; }');
shadowRoot.adoptedStyleSheets = [stylesheet];
```

- #### `clonable`

Булево значение, указывающее, можно ли клонировать ShadowRoot.

```javascript
console.log(shadowRoot.clonable); // true или false
```

- #### `delegatesFocus`

Булево значение, указывающее, делегирует ли ShadowRoot фокус при выборе нефокусируемого узла.

```javascript
console.log(shadowRoot.delegatesFocus); // true или false
```

- #### `fullscreenElement`

Элемент, который в данный момент находится в полноэкранном режиме в этом Shadow Tree.

```javascript
const fullscreenEl = shadowRoot.fullscreenElement;
console.log(fullscreenEl); // Элемент в полноэкранном режиме или null
```

<aside>

⚠️ Некоторые браузеры могут иметь не полную поддержку данного свойства, проверяйте поддержку на [MDN](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot#browser_compatibility)

</aside>

- #### `host`

Возвращает ссылку на [DOM](/js/dom/)-элемент, к которому прикреплён ShadowRoot.

```javascript
const hostElement = shadowRoot.host;
console.log(hostElement); // Элемент-хост
```

- #### `innerHTML`

Устанавливает или возвращает содержимое ShadowRoot.

```javascript
// Получение содержимого
console.log(shadowRoot.innerHTML);

// Установка содержимого
shadowRoot.innerHTML = '<div>Новое содержимое</div>';
```

- #### `mode`

Режим ShadowRoot: `'open'` или `'closed'`.

```javascript
console.log(shadowRoot.mode); // 'open' или 'closed'
```

- #### `pictureInPictureElement`

Элемент в Shadow Tree, который в данный момент представлен в режиме "картинка в картинке".

```javascript
const pipElement = shadowRoot.pictureInPictureElement;
console.log(pipElement); // Элемент в PiP режиме или null
```

<aside>

⚠️ Некоторые браузеры могут не поддерживать данное свойство, проверяйте поддержку на [MDN](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot#browser_compatibility)

</aside>


- #### `serializable`

Булево значение, указывающее, можно ли сериализовать ShadowRoot.

```javascript
console.log(shadowRoot.serializable); // true или false
```

- #### `slotAssignment`

Тип назначения слотов: `'manual'` или `'named'`.

```javascript
console.log(shadowRoot.slotAssignment); // 'manual' или 'named'
```

- #### `styleSheets`

Список `CSSStyleSheet` объектов для таблиц стилей в Shadow Tree.

```javascript
const stylesheets = shadowRoot.styleSheets;
console.log(stylesheets.length); // Количество таблиц стилей
```

### Методы

- #### `getAnimations()`

Возвращает массив всех активных анимаций в Shadow Tree.

```javascript
const animations = shadowRoot.getAnimations();
animations.forEach(animation => {
  console.log(animation.animationName);
});
```

### События

ShadowRoot поддерживает события через всплытие от `HTMLSlotElement`:

- #### `slotchange`

Событие, которое срабатывает при изменении содержимого слота.

```javascript
shadowRoot.addEventListener('slotchange', (event) => {
  console.log('Содержимое слота изменилось');
});
```

## Как понять

`ShadowRoot` создаёт изолированное дерево [DOM](/js/dom/), которое:

- **Инкапсулирует стили** — CSS внутри [Shadow DOM](/js/shadowdom/) не влияет на внешние элементы
- **Скрывает структуру** — внутренние элементы недоступны из основного DOM
- **Обеспечивает переиспользование** — компонент работает независимо от контекста

### Основные концепции:

- **Хост-элемент** — элемент, к которому прикреплён ShadowRoot
- **Shadow Tree** — дерево [DOM](/js/dom/) внутри ShadowRoot
- **Light DOM** — обычные дочерние элементы хост-элемента
- **Слоты** — точки вставки Light DOM в Shadow Tree

## Подсказки

💡 Доступ к ShadowRoot возможен только если `mode: 'open'`.
💡 Используйте `<slot>` для вставки Light DOM в Shadow Tree.
💡 Стили в Shadow DOM не проникают наружу, но внешние стили могут влиять на `:host`.
💡 Используйте `mode: 'open'` для отладки, `mode: 'closed'` для максимальной инкапсуляции.
