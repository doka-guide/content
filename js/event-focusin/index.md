---
title: 'focusin'
description: "Событие получения фокуса элементом (всплывает)"
authors:
  - lira-bazh
related:
  - js/events
  - js/event-blur
  - js/event-focus
tags:
  - doka
---

## Кратко

Событие `focusin` вызывается, когда элемент получает фокус. У этого события есть [фаза всплытия](/js/events/#vsplytie-sobytiy).

<aside>

💡 Похожее событие — [`focus`](/js/event-focus/) (вызывается после получения элементом фокуса, но не всплывает). Противоположное событие — `focusout` (потеря фокуса).

</aside>

## Пример

`focusin` можно использовать, например, для подсветки группы полей:

<iframe title="Подстветка группы полей с помощью focusin" src="demos/highlighting-group/" height="400"></iframe>

## Как пишется

Современный способ с [addEventListener](/js/element-addeventlistener/):

```js
element.addEventListener('focusin', (event) => {
  console.log('Элемент получил фокус')
})
```

Также можно обработать событие через [встроенный обработчик событий](/js/element/#vstroennye-obrabotchiki-sobytiy), но этот способ считается устаревшим.

```js
element.onfocusin = (event) => {
  console.log('Элемент получил фокус')
}
```

## Как понять

Событие `focusin` возникает сразу после того, как элемент получил фокус (например, по клику или через клавишу Tab), следуя за событием [`focus`](/js/event-focus/).

Событие срабатывает на тех html-элементах, которые имеют атрибут [tabindex](/html/tabindex/), либо атрибут [contenteditable](/html/global-attrs/#contenteditable).

Некоторые html-элементы по умолчанию имеют `tabindex="0"`:
- `<button>`;
- `<input>`;
- `<textarea>`;
- `<select>`;
- `<frame>`;
- `<iframe>`;
- `<object>`;
- `<a>` или `<area>` с атрибутом `href`;
- `<summary>` в связке с `<details>`.

## Как добавить событие на любой элемент

Чтобы `focusin` работал на произвольном элементе (например, на `<div>`), добавьте ему атрибут `tabindex="0"` или атрибут `contenteditable="true"`.

`tabindex="0"` указывает браузеру, что на элементе можно сфокусироваться (а, значит, и потерять фокус).

`contenteditable="true"` указывает браузеру, что элемент может редактироваться пользователем.

```html
<div tabindex="0">
  Здесь можно сфокусироваться
</div>

<div contenteditable="true">
  Здесь так же можно сфокусироваться
</div>
```
### Пример

В примере ниже одинаковый обработчик события окрашивает границы блока при получении фокуса. Кликните на любой блок:

```html
<div class="wrapper">
  <div>Блок не может получить фокус:</div>
  <div class="block" id="block1"></div>
</div>
<div class="wrapper">
  <div>Блок может получить фокус (с tabindex):</div>
  <div class="block" id="block2" tabindex="0"></div>
</div>
<div class="wrapper">
  <div>Блок может получить фокус (с contenteditable):</div>
  <div class="block" id="block3" contenteditable="true"></div>
</div>
```

```js
const block2 = document.getElementById('block2')
const block3 = document.getElementById('block3')
const block1 = document.getElementById('block1')

function focusinHandler(event) {
  event.target.classList.add('green')
  event.target.innerHTML = '👋 Я получил фокус'
}

block1.addEventListener('focusin', focusinHandler)
block2.addEventListener('focusin', focusinHandler)
block3.addEventListener('focusin', focusinHandler)
```

<iframe title="Пример добавления focusin на div" src="demos/focusable-elements/" height="370"></iframe>
