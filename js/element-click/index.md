---
title: "Element.click"
authors:
  - nlopin
tags:
  - doka
---

## Кратко

[Событие](/js/events/) клика на HTML элементе. Когда пользователь кликает мышкой по странице, браузер определяет, на каком элементе произошёл клик и создаёт событие `click`.

На события можно подписаться и выполнять JavaScript код, когда событие произошло.

## Как пишется

Подписаться на все клики на странице:

```js
document.addEventListener("click", function () {
  alert("Вы клинкули по странице!")
})
```

Подписаться только на клики по кнопке (она должна быть на странице):

```js
let button = document.getElementsByTagName("button")[0] // получаем кнопку

// навешиваем обработчик на событие клик
button.addEventListener("click", function () {
  alert("Вы кликнули по кнопке!")
})
```

## Как понять

Подробнее о механизме событий читай в статье [«События»](/js/events/).

В функцию-обработчик так же передаётся объект события, который содержит дополнительную информацию о клике. Самые полезные свойства:

- `detail` — количество кликов, которые произвёл пользователь. `1` — для одиночного клика, `2` — для двойного и так далее.
- `button` — кнопка, которой кликнул пользователь. `0` — левая кнопка, `2` — правая, `1` — средняя кнопка (обычно это нажатие на колесо).

Чтобы получить доступ к объекту события, функция-обработчик должна принимать на вход параметр:

```js
button.addEventListener("click", function (event) {
  alert(event.button) // напечатает номер нажатой кнопки мыши
})
```

Пример, использующий эти свойства:

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="Lopinopulos" data-slug-hash="gJZxeK" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Свойства события click">
  <span>See the Pen <a href="https://codepen.io/Lopinopulos/pen/gJZxeK">
  Свойства события click</a> by Nikolai Lopin (<a href="https://codepen.io/Lopinopulos">@Lopinopulos</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
