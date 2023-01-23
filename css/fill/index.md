---
title: "`fill`"
description: "Свойство для заливки SVG."
authors:
  - realetive
keywords:
  - svg-заливка
related:
  - css/stroke
  - css/background-color
  - html/svg
tags:
  - doka
---

## Кратко

CSS-свойство `fill`, как и у одноимённого SVG-атрибута, используется для оформления цвета заливки SVG-элемента. По умолчанию — `black`.

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

<iframe title="Изменение цвета по ховеру" src="demos/fill-hover/" height="196"></iframe>
