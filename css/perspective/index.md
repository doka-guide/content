---
title: "`perspective`"
description: "Перспектива есть всегда, даже в двумерном вебе."
authors:
  - sqlzzy
contributors:
  - denis-gh
related:
  - css/transform
  - css/transition
  - css/hover
tags:
  - doka
---

## Кратко

Свойство `perspective` определяет расстояние от пользователя до плоскости экрана по оси _z_. При уменьшении значения свойства `perspective` элементы (или части элементов), расположенные выше плоскости экрана по оси _z_ (ближе к зрителю) увеличиваются в размерах, а те, что дальше —  уменьшаются. Таким образом можно придать глубину элементу, к которому применяется свойство [`transform`](/css/transform/). Эффект заметен только при 3D-трансформациях.

Свойство `perspective` влияет на _вложенные элементы_ контейнера, для которого указано, а не на сам контейнер.

## Пример

```css
.parent {
  perspective: 50px;
}

.child {
  transform: rotateX(10deg);
}
```

## Как пишется

Значение по умолчанию — `none`. Оно отменяет перспективу.

Значением может быть положительное число в доступных [единицах измерения](/css/numeric-types/).

## Влияние на элемент

С применением свойства `perspective` и свойства [`transform`](/css/transform/) элемент может отображаться по-разному.

```css
.perspective-50 {
  perspective: 50px;
}

.perspective-100 {
  perspective: 100px;
}

.transform-rotate-x {
  background-color: #F498AD;
  transform: rotateX(50deg);
}

.transform-rotate-y {
  background-color: #2E9AFF;
  transform: rotateY(20deg);
}
```

```html
<div class="parent perspective-50">
  <div class="transform-rotate-x">
    Перспектива 50 градусов по <i>x</i>
  </div>
</div>

<div class="parent perspective-100">
  <div class="transform-rotate-y">
    Перспектива 20 градусов по <i>y</i>
  </div>
</div>
```

<iframe title="Пример использования" src="demos/static/" height="200"></iframe>

## Интерактивная песочница

<iframe title="Интерактивная песочница" src="demos/dynamic/" height="500"></iframe>
