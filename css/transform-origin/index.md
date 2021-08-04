---
title: "transform-origin"
authors:
  - ezhkov
keywords:
  - трансформация
  - точка
tags:
  - doka
---

## Кратко

Свойство задаёт положение точки, относительно которой применяются [трансформации](/css/transform).

## Пример

```html
<div class="element"></div>
```

```css
.element {
  transform-origin: 0 0;
  transform: rotate(-30deg);
}
```

Здесь элемент поворачивается относительно верхнего левого угла.

## Как это понять

Некоторые [трансформации](/css/transform) выполняются относительно какой-то точки. Возьмём для примера поворот. По умолчанию он происходит относительно центра элемента. То есть, в центре элемента есть некая неподвижная точка, вокруг которой происходит поворот. Но что, если мы хотим повернуть элемент не относительно центра, а относительно угла? То есть, при повороте угловая точка элемента должна остаться неподвижной, а остальной элемент будет поворачиваться вокруг неё. В этом случае нам поможет свойство `transform-origin`. Оно задаёт координаты точки, относительно которой будет выполняться трансформация. В примере выше мы задали координаты `(0, 0)`. Это значит, что поворот выполнится вокруг левого верхнего угла элемента.

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="css,result" data-user="ezhkov" data-slug-hash="zYoWGbX" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="transform-origin 1">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/zYoWGbX">
  transform-origin 1</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Как пишется

Способов записи несколько, но мы можем их комбинировать.

Можно записать одним числовым значением:

```css
.element {
  transform-origin: 5px;
}
```

...или одним ключевым словом:

```css
.element {
  transform-origin: top;
}
```

Можно использовать два значения:

```css
.element {
  transform-origin: 5px 10%;
  transform-origin: 3cm 2px;
  transform-origin: left 2px;
  transform-origin: right top;
  transform-origin: top right;
}
```

...или три значения:

```css
.element {
  transform-origin: 2px 30% 10px;
  transform-origin: left 5px -3px;
  transform-origin: right bottom 2cm;
  transform-origin: bottom right 2cm;
}
```

Также, не забываем про глобальные значения:

```css
.element {
  transform-origin: inherit;
  transform-origin: initial;
  transform-origin: unset;
}
```

Если одно значение является числовым, то оно воспринимается, как смещение вдоль оси X. Например: `transform-origin: 5px` это то же самое, что и `transform-origin: 5px center`.

Если это ключевое слово `center`, то оно воспринимается, как **два** значения: `transform-origin: center center`, то есть, точка трансформации устанавливается в центр элемента.

Если это другое ключевое слово (`top`, `left`, `right`, `bottom`), то в зависимости от значения точка трансформации смещается либо вдоль оси X, либо вдоль оси Y: `transform-origin: top` это то же самое, что и `transform-origin: center top`.

## Подсказки

💡 Два значения задаются для осей X и Y соответственно. Три значения — для X, Y и Z. Для осей X и Y можно задавать ключевые слова: `top`, `bottom`, `left`, `right`, `center`. Для оси Z можно задавать только числовые значения.

::: callout 🔔

Не лишним будет напомнить, что в CSS начало осей X, Y, Z — это левый верхний угол элемента. Ось X направлена **вправо**, ось Y направлена **вниз**, ось Z — от плоскости экрана к пользователю.

:::

💡 Свойство не наследуется.
