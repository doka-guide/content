---
title: "`CustomStateSet`"
description: "Интерфейс для управления внутренними состояниями кастомных элементов, позволяющий стилизовать их через CSS."
authors:
  - drakesbot12
keywords:
  - customstateset
  - состояния
  - web-components
  - element
  - states
  - custom
related:
  - js/window-customelements
  - html/slot
  - css/state
tags:
  - doka
---

## Кратко

`CustomStateSet` — это интерфейс для управления внутренними состояниями автономных кастомных элементов. Позволяет добавлять и удалять состояния, которые затем можно использовать в CSS селекторах.

## Пример

```javascript
class MyCheckbox extends HTMLElement {
  constructor() {
    super();
    this._internals = this.attachInternals();
    this.addEventListener('click', () => this.toggle());
  }
  connectedCallback() {
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>
        :host { display: flex; cursor: pointer; align-items: center; gap: .5rem; }
        :host::before { content: '[ ]'; font-family: monospace; }
        :host::after { content: 'Какой-то кастомный чекбокс'; font-family: monospace; }
        :host(:state(checked))::before { content: '[x]'; }
        :host(:state(checked))::after { content: 'Чекбокс cheked!'; }
      </style>
    `;
  }
  get checked() {
    return this._internals.states.has('checked');
  }
  set checked(value) {
    if (value) {
      this._internals.states.add('checked');
    } else {
      this._internals.states.delete('checked');
    }
  }
  toggle() {
    this.checked = !this.checked;
  }
}

customElements.define('my-checkbox', MyCheckbox);
```

```html
<my-checkbox>Этот текст не будет отображаться, потому что в кастомном элементе нету тега slot</my-checkbox>
```

<iframe title="Демонстрация кастомного чекбокса" src="demos/basic/" height="150"></iframe>

## Как пишется

```javascript
// Получение CustomStateSet
const internals = element.attachInternals();
const states = internals.states;

// Добавление состояния
states.add('my-state');
// Удаление состояния
states.delete('my-state');
// Проверка наличия состояния
states.has('my-state');
// Очистка всех состояний
states.clear();
```

### Свойства

- #### `.size`

Возвращает количество состояний в наборе.

```javascript
const states = element.attachInternals().states;
states.add('loading');
states.add('error');

console.log(states.size); // 2
```

### Методы

- #### `.add(value)`

Добавляет состояние в набор. Если состояние уже существует, ничего не происходит.

```javascript
states.add('checked');
states.add('disabled');
```

- #### `.clear()`

Удаляет все состояния из набора.

```javascript
states.clear(); // Удаляет все состояния
```

- #### `.delete(value)`

Удаляет конкретное состояние из набора. Возвращает `true`, если состояние было удалено, и `false`, если его не было.

```javascript
const wasRemoved = states.delete('checked');
console.log(wasRemoved); // true или false
```

- #### `.has(value)`

Проверяет, есть ли состояние в наборе. Возвращает `true` или `false`.

```javascript
if (states.has('loading')) {
  console.log('Элемент загружается');
}
```

- #### `.forEach(callback)`

Выполняет функцию для каждого состояния в наборе.

```javascript
states.forEach((state, index) => {
  console.log(`Состояние ${index}: ${state}`);
});
```

- #### `.entries()`

Возвращает итератор с парами `[значение, значение]` для каждого состояния.

```javascript
for (const [key, value] of states.entries()) {
  console.log(`${key} = ${value}`);
}
```

- #### `.values()`

Возвращает итератор со всеми значениями состояний.

```javascript
for (const state of states.values()) {
  console.log(state);
}
```

- #### `.keys()`

Алиас для `values()`. Возвращает итератор со всеми значениями состояний.

```javascript
for (const state of states.keys()) {
  console.log(state);
}
```

### Итерация

`CustomStateSet` поддерживает итерацию, как обычный `Set`:

```javascript
// Через for...of
for (const state of states) {
  console.log(state);
}

// Через spread оператор
const stateArray = [...states];
```

## Как понять

`CustomStateSet` — это специальная коллекция, похожая на стандартный `Set`, но предназначенная для хранения и управления состояниями кастомных элементов (Web Components). Каждый элемент этого набора — это отдельное состояние, например: `checked`, `open`, `active` и т.д.

Когда вы добавляете или удаляете состояния через методы `CustomStateSet`, эти изменения автоматически отражаются на элементе и могут быть использованы для стилизации через CSS-псевдокласс [`:state()`](/css/state/). Это позволяет динамически менять внешний вид компонента в зависимости от его состояния, не прибегая к ручному управлению классами или атрибутами.

Например, если в наборе состояний элемента появляется `checked`, то в CSS можно написать:

## Подсказки

💡 Состояния автоматически обновляют CSS, не требуя перерисовки DOM.
💡 Проверяйте поддержку через `CSS.supports('selector(:state(checked))')`.
💡 Используйте [`:state()`](/css/state/) в CSS для стилизации элементов в определённом состоянии.
💡 Для состояний с несколькими значениями создавайте несколько булевых состояний, где только одно активно.
