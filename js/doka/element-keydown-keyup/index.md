---
title: "Element.Keydown/Keyup"
name: element-keydown-keyup
author: stegur
contributors:
  - nlopin
tags:
  - sprint-4
  - sprint-6
summary:
  - события
  - клавиатура
---

Эта статья связана с обработкой событий в JavaScript. Зачем нужны события и как с ними работать читайте в статье [События](/js/doka/events)

## Кратко

[События](/js/doka/events) на HTML элементе. Когда пользователь нажимает на клавишу клавиатуры, происходит событие `keydown`, как только пользователь отпустил клавишу — произойдёт событие `keyup`.

<video autoplay muted loop>
  <source src="video/1.mp4" type="video/mp4" width="580" poster="images/poster.png">
</video>

Событие `keydown` фиксирует момент нажатия клавиши, до того как эта клавиша будет отпущена, что, по сути, является первой фазой нажатия. Продолжением является событие `keyup` — момент, когда клавиша будет отпущена.

## Как пишется

### keydown

```js
const spy = document.getElementById("keyboardSpy")

spy.addEventListener("keydown", function (event) {
  alert("Нажата клавиша " + event.key + ". Её код - " + event.keyCode)
})
```

### keyup

```js
const spy = document.getElementById("keyboardSpy")

spy.addEventListener("keyup", function (event) {
  alert("Клавиша " + event.key + " отпущена. Её код - " + event.keyCode)
})
```

## Как понять

В функцию-обработчик также передаётся объект события, в котором есть информация о нажатой кнопке:

- `code` — название клавиши. `KeyS`, `KeyZ`, `KeyU` и т.д.
- `key` — символьное значение. *`s`, `Я` , `U`* и т.д.
- `keyCode` — код нажатой клавиши. `83`*,* `90`*,* `85` и т.д.
- `altKey` — `true` или `false`, была ли одновременно нажата/отпущена клавиша Alt
- `ctrlKey` — `true` или `false`, была ли одновременно нажата/отпущена клавиша Ctrl
- `shiftKey` — `true` или `false`, была ли одновременно нажата/отпущена клавиша Shift

### Пример Keydown

При нажатии на любую клавишу в демо ниже, будет срабатывать событие `keydown`, которое будет выводить подсказку о нажатых клавишах:

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="result" data-user="Stegur" data-slug-hash="BajbpoB" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Событие keydown">
  <span>See the Pen <a href="https://codepen.io/Stegur/pen/BajbpoB">
  Событие keydown</a> by Stegur (<a href="https://codepen.io/Stegur">@Stegur</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

### Пример Keyup

В следующем демо, квадрат будет сохранять красный цвет до тех пор пока не будет зафиксировано событие `keyup` на клавише "Shift"

<p class="codepen" data-height="448" data-theme-id="light" data-default-tab="result" data-user="Stegur" data-slug-hash="poyEKpL" style="height: 448px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Keyup">
  <span>See the Pen <a href="https://codepen.io/Stegur/pen/poyEKpL">
  Keyup</a> by Stegur (<a href="https://codepen.io/Stegur">@Stegur</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Событие `keydown` выполняется бесконечное множество раз, до тех пор, пока клавиша будет зажата. Событие `keyup` будет выполнено только один раз — в момент, когда пользователь отпустит клавишу
