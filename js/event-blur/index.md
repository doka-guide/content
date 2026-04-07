---
title: "blur"
description: "Событие потери фокуса элементом"
authors:
  - lira_bazh
related:
  - js/events
  - js/event-change
  - js/element-blur
tags:
  - doka
---

## Кратко

Событие `blur` вызывается, когда элемент теряет фокус. У этого события нет [фазы всплытия](/js/events/#vsplytie-sobytiy).

<aside>

💡 Похожее событие — `focusout` (вызывается перед потерей элементом фокуса, всплывает). Противоположное событие — `focus` (получение фокуса).

</aside>

## Пример

`blur` удобно использовать, например, для валидации введённых данных:

<iframe title="Пример валидации с помощью blur" src="demos/validation/" height="220"></iframe>

## Как пишется

```js
element.addEventListener('blur', (event) => {
  console.log('Элемент потерял фокус')
})
```

## Как понять

Событие `blur` инициируется в момент, когда интерактивный элемент теряет фокус и он перемещается на другой элемент (например, по клику или нажатию `Tab`).

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

Чтобы `blur` работал на произвольном элементе (например, на `<div>`), добавьте ему атрибут `tabindex="0"` или атрибут `contenteditable="true"`.

`tabindex="0"` указывает браузеру, что на элементе можно сфокусироваться (а, значит, и потерять фокус).

`contenteditable="true"` указывает браузеру, что элемент может редактироваться пользователем.

```html
<div tabindex="0">
  Здесь можно сфокусироваться и потерять фокус
</div>

<div contenteditable="true">
  Здесь так же можно сфокусироваться и потерять фокус
</div>
```
### Пример

В примере ниже одинаковый обработчик события окрашивает границы блока при потере фокуса. Кликните на блок, а затем на любое другое место:

```html
<div class="wrapper">
  <div>Блок не может получить и потерять фокус:</div>
  <div class="block" id="block1"></div>
</div>
<div class="wrapper">
  <div>Блок может получить и потерять фокус (с tabindex):</div>
  <div class="block" id="block2" tabindex="0"></div>
</div>
<div class="wrapper">
  <div>Блок может получить и потерять фокус (с contenteditable):</div>
  <div class="block" id="block3" contenteditable="true"></div>
</div>
```

```js
const block1 = document.getElementById("block1");
const block2 = document.getElementById("block2");
const block3 = document.getElementById("block3");

function blurHandler(event) {
  event.target.classList.add('green')
  event.target.innerHTML = '👋 Я потерял фокус'
}

block1.addEventListener('blur', blurHandler);
block2.addEventListener('blur', blurHandler);
block3.addEventListener('blur', blurHandler);
```

<iframe title="Пример добавления blur на div" src="demos/focusable-elements/" height="400"></iframe>

## Делегирование события

Из-за того, что у события `blur` нет фазы всплытия, его нельзя просто так [делегировать родительскому элементу](/js/events/#lira-sovetuet). Вариант решения этой проблемы — передать в метод `addEventListener` параметр `{ capture: true }`.

Обычно слушатель обрабатывает события на [фазе всплытия](/js/events/#vsplytie-sobytiy), но, если установлен параметр `{ capture: true }`, будет обрабатывать событие раньше, на [фазе захвата](/js/events/#zahvat-sobytiy). Нужно иметь в виду, что в этом случае событие будет обработано родительским элементом раньше, чем целевым (дочерним), т.к. [фаза захвата](/js/events/#zahvat-sobytiy) происходит до того, как событие [достигает целевого элемента](/js/events/#rasprostranenie-sobytiy).

```js
parentElement.addEventListener(
  'blur',
  (event) => {
    console.log('Элемент потерял фокус')
  },
  { capture: true }
)

//либо эквивалентная запись:

parentElement.addEventListener(
  'blur',
  (event) => {
    console.log('Элемент потерял фокус')
  },
  true //тоже самое, что прописать { capture: true }
)
```
### Пример

В примере ниже одинаковый обработчик события, выводящий ошибку о незаполненном поле, вешается на две формы. В первой форме параметр `{ capture: true }` не установлен, во второй установлен.

```html
<form class="form" id="form1">
  <div class="form-row">
    <label for="name1">Введите имя:</label>
    <input id="name1" type="text">
  </div>
  <div class="form-row">
    <label for="city1">Введите город:</label>
    <input id="city1" type="text">
  </div>
</form>
```

```js
const form1 = document.getElementById("form1");
const form2 = document.getElementById("form2");

function blurHandler(event) {
  const input = event.target;

  if (!event.target.value) {
    input.classList.add('invalid');
    const error = document.createElement('div');
    error.textContent = 'Поле обязательно для заполнения!';
    error.classList.add('error-message');
    input.insertAdjacentElement('afterend', error);
  }
}

form1.addEventListener('blur', blurHandler);
form2.addEventListener('blur', blurHandler, { capture: true });
```

<iframe title="Пример делегирования blur" src="demos/delegation/" height="600"></iframe>
