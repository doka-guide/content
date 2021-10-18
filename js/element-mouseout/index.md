---
title: "Событие `mouseout`"
authors:
  - nlopin
contributors:
  - skorobaeus
keywords:
  - мышь
tags:
  - doka
---

## Кратко

[Событие](/js/events/) на HTML-элементе. Происходит, когда пользователь передвигает курсор, который находится на элементе, за пределы элемента.

Событие является противоположным событию [`mouseover`](/js/element-mouseover/). Эти события часто используются в паре.

## Как пишется

```js
let divEl = document.getElementsByTagName("div")[0]
divEl.addEventListener("mouseout", function () {
  alert("курсор вышел за границы элемента!")
})
```

## Как понять

Подробнее о механизме событий читай в статье [«События»](/js/events/).

Событие проще всего понять на демо. При событии `mouseout` мы меняем цвет фигуры на случайный. Чтобы событие произошло, нужно навести курсор на фигуру, а затем убрать его:

```js
const figure = document.querySelector('.figure')
const text = document.querySelector('.text')

figure.addEventListener('mouseout', function() {
  let currentColor = getColor()
  figure.style.backgroundColor = currentColor
  text.style.color = currentColor
})

function getColor() {
  const colors = ['#41E847', '#286C2D', '#2E9AFF', '#123E66', '#F498AD', '#623D45', '#FF8630', '#663613', '#FFD829', '#665610']
  return colors[Math.floor(Math.random() * colors.length)]
}
```

<iframe title="Смена цвета при событии mouseout — Element.mouseout — Дока" src="demos/index/" height="300"></iframe>
