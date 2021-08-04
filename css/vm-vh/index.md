---
title: "vm, vh, vmin, vmax"
tags:
  - doka
authors:
  - ezhkov
keywords:
  - относительные размеры
---

## Кратко

Это относительные единицы измерения. Все они задают размер относительно размеров окна браузера (viewport), то есть видимой части документа.

## Пример

```css
.block {
  min-width: 30vw;
  height: 50vh;
}
```

## Как это понять

Часто возникает необходимость задавать такой размер блока, который зависел бы не от размера родителя, а напрямую от размеров вьюпорта. Например, указать, что секция должна быть высотой ровно один экран.

### `vh`

Размер указывается в процентах от **высоты** вьюпорта (**v**iewport **h**eight). `100vh` соответствует полной высоте вьюпорта. `1vh` = 1% высоты вьюпорта.

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="css,result" data-user="ezhkov" data-slug-hash="QWEmPYg" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="vh">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/QWEmPYg">
  vh</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

### `vw`

Размер в процентах от **ширины** вьюпорта (**v**iewport **w**idth). `100vw` соответствует полной ширине вьюпорта. `1vw` = 1% ширины вьюпорта.

### `vmin`

Размер в процентах от **меньшей** размерности вьюпорта. Если высота меньше ширины (например, горизонтальная ориентация телефона), то расчёт будет вестись относительно высоты.

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="html,result" data-user="ezhkov" data-slug-hash="abZYxrP" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="vmin">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/abZYxrP">
  vmin</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### `vmax`

Размер в процентах от **большей** размерности вьюпорта. Если высота больше ширины (например, нормальная ориентация телефона), то расчёт будет вестись относительно высоты.
