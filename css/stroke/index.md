---
title: "stroke"
authors:
  - realetive
keywords:
  - svg-обводка
tags:
  - doka
---

## Кратко

Как и у одноимённого SVG-атрибут, задаёт цвет обводки SVG-элемента. При наличии указанного через CSS или атрибут на этом же SVG-теге свойства `stroke-width` — толщины обводки, которая должна быть больше `0`.

## Пример

```css
.circle {
    stroke: #123456;
}
```

## Как пишется

Свойство соответствует SVG-атрибуту `stroke` и содержит обозначение цвета.

Помимо стандартных форматов: именованного цвета (`orange`, `rebeccapurple` и др.), RGB(A), HEX и HSL(A), `stroke` поддерживает формат ссылки на SVG-элемент, который будет как паттерн заполнять площадь обводки:

```css
.circle {
    stroke: url(#pattern);
}
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="html,result" data-user="css-tricks" data-slug-hash="XXgerz" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="stroke property">
  <span>See the Pen <a href="https://codepen.io/team/css-tricks/pen/XXgerz">
  stroke property</a> by CSS-Tricks (<a href="https://codepen.io/css-tricks">@css-tricks</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Подсказки

💡 Через CSS-свойство можно управлять цветом обводки SVG-элементов с помощью других возможностей CSS, например, при наведении курсора:

```css
.circle {
    stroke: url(#pattern);
}

.circle:hover {
    stroke: blue;
}
```

