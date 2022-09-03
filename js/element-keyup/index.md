---
title: "`keyup`"
description: "Событие, когда клавишу отпустили."
authors:
  - stegur
contributors:
  - nlopin
  - skorobaeus
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

[Событие](/js/events/) `keyup` фиксирует момент отпускания клавиши после нажатия. Таким образом, `keyup` это вторая фаза нажатия, первая фаза — `keydown`.

## Как пишется

```js
const input = document.querySelector('input')
input.addEventListener('keyup', function (event) {
  alert('Нажата клавиша ' + event.key)
})
```

## Как понять

Следующее демо будет сохранять цвет до тех пор, пока не будет зафиксировано событие `keyup` на любой клавише:

<iframe title="Пример события keyup" src="demos/keyup/" height="200"></iframe>
