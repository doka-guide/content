---
title: "`keydown`"
description: "Событие, когда клавишу нажали."
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

[Событие](/js/events/) `keydown` фиксирует момент нажатия клавиши ещё до того, как эта клавиша будет отпущена. Отпускание клавиши становится событием [`keyup`](/js/element-keyup/).

## Как пишется

```js
const input = document.querySelector('input')

input.addEventListener('keydown', function (event) {
  alert('Нажата клавиша ' + event.key)
})
```

## Как понять

Нажмите в поле ввода любую клавишу, и событие `keydown` сработает. Чтобы ещё лучше понять пример, попробуйте эту клавишу не отпускать.

<iframe title="Пример события keydown" src="demos/keydown/" height="300"></iframe>
