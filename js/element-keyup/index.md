---
title: "`keyup`"
description: "Событие, когда клавишу отпустили."
authors:
  - stegur
contributors:
  - nlopin
  - vitalybaev
  - inventoris
keywords:
  - события
  - клавиатура
related:
  - js/dom
  - js/event
  - js/events
tags:
  - doka
---

## Кратко

[Событие](/js/events/) `keyup` фиксирует момент отпускания клавиши после нажатия. Таким образом, `keyup` это вторая фаза нажатия, первая фаза — [`keydown`](/js/element-keydown/).

## Как пишется

Современный способ с [addEventListener](/js/element-addeventlistener/):

```js
const input = document.querySelector('input')

input.addEventListener('keyup', function (event) {
  alert('Нажата клавиша ' + event.key)
})
```

Также можно обработать событие через [встроенный обработчик событий](/js/element/#vstroennye-obrabotchiki-sobytiy), но этот способ считается устаревшим.

```js
input.onkeyup = function (event) {
  alert('Нажата клавиша ' + event.key)
}
```

## Как понять

Демо меняет цвет фона при наступлении события `keyup` на любой клавише. Если зажать любую клавишу на клавиатуре и не отпускать, то цвет меняться не будет:

<iframe title="Пример события keyup" src="demos/keyup/" height="200"></iframe>
