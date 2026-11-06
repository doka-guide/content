---
title: "Web Components"
description: "Как создавать собственные HTML-элементы с инкапсулированной функциональностью и использовать их в веб-приложениях."
authors:
  - drakesbot12
keywords:
  - web components
  - кастомные элементы
  - переиспользуемые компоненты
  - инкапсуляция
  - shadow dom
  - custom elements
related:
  - js/window-customelements
  - html/slot
  - css/host
tags:
  - article
---

## Что такое Web Components?

Представьте, что вы создали сложный UI-компонент — например, интерактивную галерею или кастомный слайдер. Этот компонент работает отлично, но когда вы пытаетесь использовать его на другой странице или передать другому разработчику, начинаются проблемы: стили конфликтуют, скрипты ломаются, структура нарушается.

Именно для решения таких проблем были созданы Web Components — набор технологий, которые позволяют создавать переиспользуемые HTML-элементы с инкапсулированной функциональностью. Это как конструктор LEGO для веб-разработки: вы создаёте блоки, которые можно комбинировать в любом порядке, и они всегда работают одинаково.

Web Components состоят из трёх основных технологий:
- [**Custom Elements**](/js/window-customelements/) — API для создания собственных HTML-тегов
- [**Shadow DOM**](/js/shadowdom/) — инкапсуляция стилей и структуры
- [**HTML Templates**](/html/template/) — переиспользуемые шаблоны разметки

## Как работают Web Components?

### Основные принципы

Web Components следуют принципу инкапсуляции — каждый компонент изолирован от остального кода. Это означает, что:

- Стили компонента не влияют на внешние элементы
- Внутренняя структура скрыта от внешних скриптов
- Компонент работает одинаково в любом контексте

```javascript
class MyButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          padding: 10px 20px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s ease-in-out;
        }
        :host(:hover) {
          background: #0056b3;
        }
      </style>
      <slot></slot>
    `;
  }
}

customElements.define('my-button', MyButton);
```

```html
<my-button>Крутая кнопочка</my-button>
```

<iframe title="Просто синяя кнопка" src="demos/my-button/" height="150"></iframe>

### Жизненный цикл компонента

Каждый Web Component проходит через определённые этапы жизни:

1. **Определение** — компонент регистрируется в браузере
2. **Создание** — экземпляр компонента создаётся в [DOM](/js/dom/)
3. **Подключение** — компонент добавляется на страницу
4. **Обновление** — атрибуты компонента изменяются
5. **Отключение** — компонент удаляется со страницы

```javascript
class LifecycleExample extends HTMLElement {
  constructor() {
    super();
    console.log('Конструктор вызван');
  }

  connectedCallback() {
    console.log('Компонент подключен к DOM');
  }

  disconnectedCallback() {
    console.log('Компонент отключен от DOM');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Атрибут ${name} изменился с ${oldValue} на ${newValue}`);
  }
}
```

## Custom Elements

### Автономные элементы

Самый простой тип — создание полностью нового HTML-тега:

```javascript
class MyCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 16px;
          max-width: 300px;
        }
        .title {
          font-weight: bold;
          margin-bottom: 8px;
        }
        .content {
          color: #666;
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

<iframe title="Просто красивая карточка" src="demos/my-card/" height="200"></iframe>

### Расширенные встроенные элементы

Можно расширять существующие HTML-элементы:

```javascript
class FancyButton extends HTMLButtonElement {
  constructor() {
    super();
    this.addEventListener('click', () => {
      this.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    });
  }
}

customElements.define('fancy-button', FancyButton, { extends: 'button' });
```

```html
<button is="fancy-button">Нажми меня!</button>
```

<iframe title="Прикольная кнопка" src="demos/fancy-button/" height="200"></iframe>

## Shadow DOM для инкапсуляции

[Shadow DOM](/js/shadowdom/) создаёт изолированное дерево [DOM](/js/dom/) для компонента:

```javascript
class EncapsulatedComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        /* Эти стили не повлияют на внешние элементы */
        .internal {
          color: red;
          padding: 10px;
          border: 2px solid blue;
        }
        /* :host позволяет стилизовать сам элемент */
        :host {
          display: block;
          margin: 10px;
        }
      </style>
      <div class="internal">
        <slot>Изолированное содержимое</slot>
      </div>
    `;
  }
}
```

### Режимы Shadow DOM

**Открытый режим** (`mode: 'open'`):
```javascript
const shadow = element.attachShadow({ mode: 'open' });
console.log(element.shadowRoot); // Доступен
```

**Закрытый режим** (`mode: 'closed'`):
```javascript
const shadow = element.attachShadow({ mode: 'closed' });
console.log(element.shadowRoot); // null
```

## HTML Templates и слоты

### Использование [`<template>`](/html/template/)

Шаблоны позволяют создавать переиспользуемую разметку:

```html
<template id="user-card">
  <style>
    .card {
      border: 1px solid #ccc;
      padding: 16px;
      border-radius: 8px;
    }
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .name {
      font-weight: bold;
      margin: 8px 0;
    }
  </style>
  <div class="card">
    <img class="avatar" src="" alt="Avatar">
    <div class="name"></div>
    <div class="email"></div>
    <slot name="actions"></slot>
  </div>
</template>
```

```javascript
class UserCard extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById('user-card');
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));

    // Заполняем данными
    const avatar = shadow.querySelector('.avatar');
    const name = shadow.querySelector('.name');
    const email = shadow.querySelector('.email');

    avatar.src = this.getAttribute('avatar') || 'default-avatar.png';
    name.textContent = this.getAttribute('name') || 'Имя не указано';
    email.textContent = this.getAttribute('email') || 'email@example.com';
  }
}

customElements.define('user-card', UserCard);
```

### Работа со слотами

Слоты ([`<slot>`](/html/slot/)) позволяют вставлять внешний контент в компонент:

```javascript
shadow.innerHTML = `
  <div class="header">
    <slot name="header">Заголовок по умолчанию</slot>
  </div>
  <div class="body">
    <slot>Содержимое по умолчанию</slot>
  </div>
  <div class="footer">
    <slot name="footer">Футер по умолчанию</slot>
  </div>
`;
```

```html
<my-component>
  <h1 slot="header">Мой заголовок</h1>
  <p>Моё содержимое</p>
  <button slot="footer">Действие</button>
</my-component>
```

## События и взаимодействие

### Создание кастомных событий

```javascript
class EventComponent extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', () => {
      // Создаём кастомное событие
      const event = new CustomEvent('my-event', {
        detail: { message: 'Привет из компонента!' },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
    });
  }
}
```

### Слушание событий

```javascript
const component = document.querySelector('event-component');
component.addEventListener('my-event', (event) => {
  console.log(event.detail.message);
});
```

## Что дальше?

Web Components — это мощная технология, которая меняет подход к созданию веб-интерфейсов. Она позволяет создавать действительно переиспользуемые компоненты, которые работают в любом контексте.

## Когда использовать Web Components?

🛠 **Используйте Web Components когда:**
- Создаёте библиотеку компонентов
- Нужна максимальная переиспользуемость
- Компонент должен работать в любом контексте
- Требуется полная инкапсуляция

**НЕ используйте когда:**
- Нужна максимальная гибкость стилизации
- Компонент должен адаптироваться к дизайн-системе
- Требуется простое решение без сложностей
