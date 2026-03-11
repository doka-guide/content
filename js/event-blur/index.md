---
title: "blur"
description: "Событие потери фокуса элементом"
authors:
  - lira-bazh
related:
  - js/events
  - js/event-change
  - js/element-blur
tags:
  - doka
---

## Кратко

Событие `blur` вызывается, когда элемент теряет фокус. У этого события нет фазы всплытия.

<aside>

💡 Похожее событие — `focusout` (вызывается перед потерей элементом фокуса, всплывает). Противоположное событие — `focus` (получение фокуса).

</aside>

## Как пишется

```js
element.addEventListener('blur', (event) => {
  console.log('Элемент потерял фокус')
})
```

## Как понять

`blur` — это момент, когда пользователь уходит с элемента, кликает куда-то ещё или нажимает `Tab` и переключается на следующее поле формы.

Это событие удобно использовать, например, для валидации введённых данных:

<iframe title="Пример валидации с помощью blur" src="demos/validation/" height="250"></iframe>

## Делегирование события

Из-за того, что у события `blur` нет фазы всплытия, его нельзя просто так делегировать родительскому элементу. Вариант решения этой проблемы — установить параметр `useCapture` метода `addEventListener` на `true`.

```js
parentElement.addEventListener(
  'blur',
  (event) => {
    console.log('Элемент потерял фокус')
  },
  true)
```

В примере ниже одинаковый обработчик события, окрашивающий поле в зелёный цвет при потере фокуса, вешается на две формы. В первой `useCapture` не установлено, во второй установлено.

```html
<form class="form" id="form1">
  <div class="form-row">
    <label for="name1" class="row-label">Делегирование не работает</label>
    <input id="name1" class="input" type="text">
  </div>
</form>
<form class="form" id="form2">
  <div class="form-row">
    <label for="name2" class="row-label">Делегирование работает</label>
    <input id="name2" class="input" type="text">
  </div>
</form>
```

```js
const form1 = document.getElementById("form1");
const form2 = document.getElementById("form2");

function blurHandler(event) {
  event.target.classList.add('green')
}

form1.addEventListener('blur', blurHandler);
form2.addEventListener('blur', blurHandler, true);
```

<iframe title="Пример делегирования blur" src="demos/delegation/" height="250"></iframe>
