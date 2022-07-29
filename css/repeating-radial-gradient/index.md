---
title: "`repeating-radial-gradient()`"
description: "Создаёт градиент из повторяющихся круговых или эллиптических узоров."
authors:
  - inventoris
related:
  - css/radial-gradient
  - css/linear-gradient
  - css/background-image
tags:
  - doka
---

## Кратко

Функция `repeating-radial-gradient()` создаёт бесконечно повторяющийся радиальный (круговой или эллиптический) градиент.

## Пример

Пример ниже создаёт узор из чередующихся кругов белого и бирюзового цвета.

```css
.element {
  background-image:
    repeating-radial-gradient(
      circle at center,
      #ffffff 0,
      #ffffff 10px,
      #40e3e0 10px,
      #40e3e0 20px
    );
}
```

<iframe title="Базовый пример" src="demos/basic/" height="500"></iframe>

## Как пишется

Для повторяющегося радиального градиента подходят те же аргументы, что и для обычного [`radial-gradient`](/css/radial-gradient/).

```css
.element {
  background-image:
    repeating-radial-gradient(
      ellipse farthest-corner at left,
      blue 0,
      blue 10px,
      white 10px,
      white 20px,
      aqua 20px,
      aqua 30px
    );
}
```

<iframe title="Пример аргументов" src="demos/example-of-arguments/" height="500"></iframe>

Функция `repeating-radial-gradient()` имеет несколько особенностей. Если не указать форму градиента в начале (`circle` или `ellipse`), то он будет иметь вид эллипса по умолчанию.

А ещё без указания размеров для цветов браузер просто растянет их до краёв элемента, так что функция будет похожа на обычный [`radial-gradient`](/css/radial-gradient/).

```css
.element {
  background-image:
    repeating-radial-gradient(
      blue,
      white,
      blue
    );
}
```

<iframe title="Пример без указания размеров" src="demos/without-sizes/" height="500"></iframe>
