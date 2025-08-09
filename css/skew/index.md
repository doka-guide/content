---
title: "`skew`"
description: "Искажаем и наклоняем элементы с пониманием."
baseline:
  - group: transforms2d
    features:
      - css.types.transform-function.skew
      - css.types.transform-function.skewX
      - css.types.transform-function.skewY
authors:
  - anastasiayarosh
related:
  - css/will-change
  - css/rotate
  - css/transform
tags:
  - doka
---

## Кратко

`skew()` — это функция для CSS-трансформаций(transform), которая наклоняет (искажает) элемент вдоль осей `x` и `y`, создавая эффект перекоса.

## Пример

Наклоняем элемент на 30 градусов по оси `x`:

```css
div {
  transform: skewX(30deg);
}
```

## Как пишется

Угол наклона должен указываться в [единицах измерения углов](/css/numeric-types/#edinicy-izmereniya-uglov).

`x` — угол наклона по горизонтали (ось X) в градусах (deg).

`y` — (опционально) угол наклона по вертикали (ось Y).

```css
/* Искажение по X на 20 градусов */
.skew-x {
  transform: skewX(20deg);
}

/* Искажение по Y на 10 градусов */
.skew-y {
  transform: skewY(10deg);
}
```

Можно наклонять элемент сразу по обеим осям:

```css
/* Искажение по X на 20° и по Y на 10° */
.skew-both {
  transform: skew(20deg, 10deg);
}

/* Эквивалентная запись */
.skew-both {
  transform: skewX(20deg) skewY(10deg);
}
```

<iframe title="Демонстрация разных значений skew" src="demos/basic/" height="400"></iframe>

## Как понять

`skew()` наклоняет стороны элемента, сохраняя параллельность линий. В отличие от `scale`, размеры элемента остаются прежними. По умолчанию точка трансформации элемента — его центр. Можно комбинировать `skew()` с другими трансформациями (rotate, translate).

<iframe title="Демонстрация свойства skew вместе с другими свойствами трансформации" src="demos/combination/" height="400"></iframe>

## Важно

💡 Нужно учитывать, что искажение влияет на весь элемент вместе с его содержимым (например, текстом). Можно задать обратное искажение содержимому, если хочется сохранить его внешний вид.

## Полезные инструменты

Для генерации искажения можно использовать такие генераторы skew, как [Webcode](https://webcode.tools/css-generator/skew), [CSS-Generator](https://css-generator.netlify.app/transform-skew) и другие.
