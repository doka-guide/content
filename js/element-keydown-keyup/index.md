---
title: "События `keydown` и `keyup`"
authors:
  - stegur
contributors:
  - nlopin
  - skorobaeus
keywords:
  - события
  - клавиатура
tags:
  - doka
---

Эта статья связана с обработкой событий в JavaScript. Зачем нужны события и как с ними работать читайте в статье [События](/js/events/).

## Кратко

[События](/js/events/) на HTML-элементе. Когда пользователь нажимает на клавишу клавиатуры, происходит событие `keydown`, как только пользователь отпустил клавишу — произойдёт событие `keyup`.

<video controls width="580" poster="images/poster.png">
  <source src="video/1.mp4" type="video/mp4">
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
- `altKey` — `true` или `false`, была ли одновременно нажата/отпущена клавиша <kbd>Alt</kbd>
- `ctrlKey` — `true` или `false`, была ли одновременно нажата/отпущена клавиша <kbd>Ctrl</kbd>
- `shiftKey` — `true` или `false`, была ли одновременно нажата/отпущена клавиша <kbd>Shift</kbd>

### Пример Keydown

При нажатии на любую клавишу в демо ниже, будет срабатывать событие `keydown`, которое будет выводить подсказку о нажатых клавишах:

<iframe title="Подсказки о нажатой клавише при событии keydown — Element.Keydown/Keyup — Дока" src="demos/keydown/" height="440"></iframe>

### Пример Keyup

Следующее демо будет сохранять цвет до тех пор пока не будет зафиксировано событие `keyup` на клавише <kbd>Shift</kbd>.

<iframe title="Событие keyup — Element.Keydown/Keyup — Дока" src="demos/keyup/" height="160"></iframe>

Событие `keydown` выполняется бесконечное множество раз, до тех пор, пока клавиша будет зажата. Событие `keyup` будет выполнено только один раз — в момент, когда пользователь отпустит клавишу
