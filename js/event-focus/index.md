---
title: "focus"
description: ""
authors:
  - lira_bazh
related:
  - js/events
  - js/event-blur
  - js/element-focus
tags:
  - doka
---

## Кратко

Событие `focus` вызывается, когда элемент получает фокус. У этого события нет [фазы всплытия](/js/events/#vsplytie-sobytiy).

<aside>

💡 Похожее событие — `focusin` (вызывается при получении элементом фокуса, всплывает). Противоположное событие — [`blur`](/js/event-blur/) (потеря фокуса).

</aside>

## Пример

`focus` удобно использовать, например, для отображения истории поиска при клике на поле:

<iframe title="История поиска с помощью focus" src="demos/search-history/" height="330"></iframe>

## Как пишется

Современный способ с [addEventListener](/js/element-addeventlistener/):

```js
element.addEventListener("focus", (event) => {
  console.log("Элемент получил фокус")
})
```

Также можно обработать событие через [встроенный обработчик событий](/js/element/#vstroennye-obrabotchiki-sobytiy), но этот способ считается устаревшим.

```js
element.onfocus = (event) => {
  console.log("Элемент получил фокус")
}
```

## Как понять

Событие `focus` инициируется в момент, когда интерактивный элемент получает фокус (например, по клику или переключению по `Tab`).

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

Чтобы `focus` работал на произвольном элементе (например, на `<div>`), добавьте ему атрибут `tabindex="0"` или атрибут `contenteditable="true"`.

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
const block1 = document.getElementById("block1");
const block2 = document.getElementById("block2");
const block3 = document.getElementById("block3");

function focusHandler(event) {
  event.target.classList.add("green")
  event.target.innerHTML = "👋 Я получил фокус"
}

block1.addEventListener("focus", focusHandler);
block2.addEventListener("focus", focusHandler);
block3.addEventListener("focus", focusHandler);
```

<iframe title="Пример добавления focus на div" src="demos/focusable-elements/" height="370"></iframe>

## Делегирование события

Из-за того, что у события `focus` нет фазы всплытия, его нельзя просто так [делегировать родительскому элементу](/js/events/#lira-sovetuet). Вариант решения этой проблемы — передать в метод `addEventListener` параметр `{ capture: true }`.

Обычно слушатель обрабатывает события на [фазе всплытия](/js/events/#vsplytie-sobytiy), но, если установлен параметр `{ capture: true }`, будет обрабатывать событие раньше, на [фазе захвата](/js/events/#zahvat-sobytiy). Нужно иметь в виду, что в этом случае событие будет обработано родительским элементом раньше, чем целевым (дочерним), т.к. [фаза захвата](/js/events/#zahvat-sobytiy) происходит до того, как событие [достигает целевого элемента](/js/events/#rasprostranenie-sobytiy).

```js
parentElement.addEventListener(
  "focus",
  (event) => {
    console.log("Элемент получил фокус")
  },
  { capture: true }
)

//либо эквивалентная запись:

parentElement.addEventListener(
  "focus",
  (event) => {
    console.log("Элемент потерял фокус")
  },
  true //тоже самое, что прописать { capture: true }
)
```
### Пример

В примере ниже одинаковый обработчик события, записывающий лог, вешается на две формы. В первой форме параметр `{ capture: true }` не установлен, во второй установлен.

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
...
<div class="logs">
  <h4>📝 Последние 5 событий:</h4>
  <ol reversed id="logs"></ol>
</div>
```

```js
const form1 = document.getElementById("form1");
const form2 = document.getElementById("form2");
const logs = document.getElementById("logs");
const logEntries = [];

function focusHandler(event) {
  const input = event.target;

  if (input.id) {
    const timestamp = new Date().toLocaleTimeString();
    const message = `${timestamp}: фокус на ${input.id}`;

    logEntries.unshift(message);

    if (logEntries.length > 5) {
      logEntries.pop();
    }

    logs.innerHTML = logEntries.map((entry, index) =>
      `<li>${entry}</li>`
    ).join("");
  }
}

form1.addEventListener("focus", focusHandler);
form2.addEventListener("focus", focusHandler, { capture: true });

```

<iframe title="Пример делегирования focus" src="demos/delegation/" height="950"></iframe>
