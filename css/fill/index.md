---
title: "fill"
authors:
  - realetive
keywords:
  - svg-заливка
tags:
  - doka
---

## Кратко

CSS-свойство `fill`, как и у одноимённого SVG-атрибут, используется для оформления цвета заливки SVG-элемента. По умолчанию — `black`.

## Пример

```css
.eye {
  fill: blue;
}
```

## Как пишется

Свойство соответствует SVG-атрибуту `fill` и содержит обозначение цвета.

Помимо стандартных форматов: именованного цвета (`orange`, `rebeccapurple` и др.), RGB(A), HEX и HSL(A), `fill` поддерживает формат ссылки на SVG-элемент, который будет как паттерн заполнять площадь элемента:

```css
.pacman {
  fill: url(#pattern);
}
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="html,result" data-user="css-tricks" data-slug-hash="qbmZNw" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="fill property">
  <span>See the Pen <a href="https://codepen.io/team/css-tricks/pen/qbmZNw">
  fill property</a> by CSS-Tricks (<a href="https://codepen.io/css-tricks">@css-tricks</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Подсказки

💡 Через CSS-свойство можно управлять цветом заливки SVG-элементов с помощью других возможностей CSS, например, при наведении курсора:

```css
.pacman {
  fill: url(#pattern);
}

.pacman:hover {
  fill: yellow;
}
```

<iframe title="Название — fill — Дока" src="demos/Realetive-KKMoVza/"></iframe>
