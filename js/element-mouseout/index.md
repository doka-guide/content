---
title: "Element.mouseout"
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

[Событие](/js/events/) на HTML элементе. Происходит, когда пользователь передвигает курсор, который находится на элементе, за пределы элемента.

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
const figure = document.querySelector('.figure');

figure.addEventListener('mouseout', function() {
  figure.style = `background-color: ${getColor()};`;
});

function getColor() {
  const colors = ["#49A16C", "#064236", "#ED6742", "#F498AD", "#AFC9DA", "#FFD829", "#282A2E", "#979797", "#E6E6E6", "#FFFFFF"];
  return colors[Math.floor(Math.random() * colors.length)];
}
```

<iframe title="Смена цвета при событии mouseout" src="demos/index.html"></iframe>
