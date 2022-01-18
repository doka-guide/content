---
title: "Событие `mouseover`"
authors:
  - nlopin
contributors:
  - skorobaeus
tags:
  - doka
---

## Кратко

[Событие](/js/events/) на HTML-элементе. Происходит, когда пользователь передвигает курсор на сам элемент или на вложенные элементы.

На события можно подписаться и выполнять JavaScript-код, когда событие произошло.

Событие является противоположным событию [`mouseout`](/js/element-mouseout/). Эти события часто используются в паре.

## Как пишется

```js
let divEl = document.getElementsByTagName("div")[0]
divEl.addEventListener("mouseover", function () {
  alert("курсор вошел в границы элемента!")
})
```

## Как понять

Подробнее о механизме событий читай в статье [«События»](/js/events/).

Событие проще всего понять на демо. При событии `mouseover` мы устанавливаем элементу, на котором произошло событие, синий фоновый цвет:

```js
let current = undefined;

function onMouseover() {
  if (current) {
    current.classList.remove('mouseover');
  }
  this.classList.add('mouseover');
  current = this;
  // Записываем текущий пункт,
  // чтобы удалить с него класс
  // при переходе курсора на новый элемент
}

let items = document.getElementsByTagName('li');
for (let i=0; i < items.length; ++i) {
  let item = items[i];
  item.addEventListener('mouseover', onMouseover);
}
```

<iframe title="Ховер-эффект при помощи события mouseover — Element.mouseover — Дока" src="demos/index/" height="250"></iframe>
