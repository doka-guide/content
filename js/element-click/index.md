---
title: "`click`"
description: "Клик мышкой, касание пальцем и нажатие Enter на кнопке создают одно и то же событие."
baseline:
  - group: mouse-events
    features:
      - api.Element.click_event
authors:
  - nlopin
contributors:
  - solarrust
related:
  - html/button
  - js/element-addeventlistener
  - js/dom
tags:
  - doka
---

## Кратко

[Событие](/js/events/) клика на HTML-элементе. Когда пользователь кликает мышкой по странице, браузер определяет, на каком элементе произошёл клик, и создаёт событие `click`. Это же событие браузер создаёт при касании пальцем и при нажатии <kbd>Enter</kbd> или <kbd>Пробела</kbd> на кнопке в фокусе.

На события можно подписаться и выполнять JavaScript-код, когда событие произошло.

## Пример

Посчитаем клики по кнопке:

```html
<button class="button" type="button">Кликов: 0</button>
```

```js
const button = document.querySelector('.button')
let count = 0

button.addEventListener('click', function () {
  count += 1
  button.textContent = `Кликов: ${count}`
})
```

## Как пишется

Подписаться на все клики на странице:

```js
document.addEventListener('click', function () {
  alert('Вы кликнули по странице!')
})
```

Подписаться только на клики по кнопке (она должна быть на странице):

```js
const button = document.getElementsByTagName('button')[0]

// Добавляем обработчик события click
button.addEventListener('click', function () {
  alert('Вы кликнули по кнопке!')
})
```

Также можно обработать событие через [встроенный обработчик событий](/js/element/#vstroennye-obrabotchiki-sobytiy):

```js
button.onclick = function () {
  alert('Вы кликнули по кнопке!')
}
```

Так можно повесить только один обработчик, поэтому чаще используют [`addEventListener()`](/js/element-addeventlistener/).

## Как понять

Браузер передаёт в обработчик объект события с подробностями о клике. Чтобы получить к нему доступ, функция-обработчик должна принимать на вход параметр:

```js
button.addEventListener('click', function (event) {
  // Покажет количество кликов подряд
  alert(event.detail)
})
```

Самые полезные свойства объекта события:

- `target` — элемент, по которому кликнули. Если кликнуть по иконке внутри кнопки, то `target` будет иконкой. Элемент, на котором висит обработчик, лежит в `currentTarget`.
- `detail` — количество кликов подряд: _1_ для одиночного клика, _2_ для двойного и так далее. Если клик создала не мышь, палец или стилус, а, например, нажатие <kbd>Enter</kbd> или вызов `element.click()`, то `detail` равен _0_.
- `clientX` и `clientY` — координаты точки клика относительно вьюпорта. У клика с клавиатуры они ничего не значат: Chrome и Firefox ставят _0_, а Safari — центр элемента.
- `pointerType` — чем кликнули: `mouse`, `touch` или `pen`. Для клика с клавиатуры это пустая строка.

Объект события `click` стал [`PointerEvent`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) в Chrome 92, Firefox 129 и Safari 18.2. В более старых версиях свойства `pointerType` нет.

На iPhone касание может прийти с `pointerType` равным `mouse`. Поэтому на iPhone на это значение не полагайтесь.

Проверьте в демке:

1. Кликните по кнопке мышкой.
1. Перейдите к кнопке клавишей <kbd>Tab</kbd> (в Safari на macOS клавишами <kbd>Option</kbd> + <kbd>Tab</kbd>) и нажмите <kbd>Enter</kbd>.
1. Сравните значение `detail`.

<iframe title="Демо события click" src="demos/Lopinopulos-gJZxeK/" height="240"></iframe>
