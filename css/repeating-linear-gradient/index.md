---
title: "`repeating-linear-gradient()`"
description: "Создаёт узоры из повторяющихся линий."
authors:
  - inventoris
related:
  - css/conic-gradient
  - css/radial-gradient
  - css/linear-gradient
tags:
  - doka
---

## Кратко

Создаёт фон в виде полос из повторяющегося линейного градиента.

## Пример

Зададим узор из чёрно-оранжевых полос.

```css
div {
  background-image:
    repeating-linear-gradient(
      -45deg,
      black 0,
      black 25px,
      orange 25px,
      orange 50px
    );
}
```

<iframe title="Базовый пример" src="demos/basic/" height="500"></iframe>

## Как пишется

Повторяющийся линейный градиент принимает те же аргументы, что и обычный [`linear-gradient`](/css/linear-gradient/). Но, в отличие от него, повторяет узор из линий до тех пор, пока не заполнит весь элемент.

Лучше всего разница между двумя градиентами видна на примерах. Зададим повторяющийся линейный градиент в виде зебры.

```css
div {
  background-image:
    repeating-linear-gradient(
      to right,
      white 0 10%,
      black 10% 20%
    );
}
```

<iframe title="Пример зебры через повторяющийся линейный градиент" src="demos/zebra_repeating-linear-gradient" height="500"></iframe>

Когда полоска чёрного цвета заканчивается на 20%, градиент снова наполняется белыми и чёрными полосами, хотя мы не задавали их снова, — поэтому он называется повторяющимся линейным градиентом. Такой эффект не сработает с обычным [`linear-gradient`](/css/linear-gradient/).

```css
div {
  background-image:
    linear-gradient(
      to right,
      white 0 10%,
      black 10% 20%
    );
}
```

<iframe title="Пример зебры через обычный линейный градиент" src="demos/zebra_linear-gradient" height="500"></iframe>

Когда чёрная полоска достигла 20%, градиент не повторился, а лишь заполнил фон элемента последним цветом.

Полосы `repeating-linear-gradient()` не обязательно всегда такие ровные. Если каждый следующий цвет не начинается в точке окончания предыдущего, то линии смажутся, и фон примет иной вид.

```css
div {
  background-image:
    repeating-radial-gradient(
      0.50turn,
      yellow 0 30px,
      white 70px 80px,
      aqua 100px 130px
    );
}
```

<iframe title="Пример смазанного градиента" src="demos/blurred_gradient" height="500"></iframe>
