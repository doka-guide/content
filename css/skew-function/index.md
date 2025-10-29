---
title: "`skew()`"
description: "Искажаем элементы с пониманием."
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

`skew()` — это функция для CSS-трансформаций ([`transform`](/css/transform/)), которая искажает элемент вдоль осей _x_ и _y_, создавая эффект перекоса.

<aside>

📖 О других функциях CSS-трансформаций можно узнать из статьи «[Функции CSS-трансформации](/css/transform-function/)».

</aside>

## Пример

Искажаем элемент на 30 градусов вдоль оси _x_:

```css
div {
  transform: skew(30deg);
}
```

## Как пишется

Угол искажения должен указываться в [единицах измерения углов](/css/numeric-types/#edinicy-izmereniya-uglov). В случае, если в скобках указано одно значение, это величина искажения по оси _x_. Для искажения по оси _y_ нужно дописать второе значение. Если мы хотим исказить элемент только по оси _y_, значение для _x_ будет 0.

`x` — угол искажения по горизонтали (ось _x_) в градусах (deg).

`y` — (опционально) угол искажения по вертикали (ось _y_).

```css
/* Искажение по X на 20 градусов */
.skew-x {
  transform: skew(20deg);
}

/* Искажение по Y на 10 градусов */
.skew-y {
  transform: skew(0, 10deg);
}
```

Можно исказить элемент сразу по обеим осям:

```css
/* Искажение по X на 20° и по Y на 10° */
.skew-both {
  transform: skew(20deg, 10deg);
}
```

### skewX, skewY

Существует написание функции `skew()` в виде отдельных значений — `skewX()`, `skewY()`. Сейчас такая форма записи считается [устаревшей](https://drafts.csswg.org/css-transforms/#funcdef-transform-skew), сохраняется ради обратной совместимости и не рекомендуется к использованию в новых проектах.

Эти функции обозначают величину искажения элемента по конкретной оси:

```css
/* Искажение по X на 20° */
.skew {
  transform: skewX(20deg);
}

/* Эквивалентно современной записи */
.skew-both {
  transform: skew(20deg);
}
```

```css
/* Искажение по Y на 20° */
.skew {
  transform: skewY(20deg);
}

/* Эквивалентно современной записи */
.skew-both {
  transform: skew(0, 20deg);
}
```

Можно исказить элемент сразу по обеим осям:

```css
/* Искажение по X на 20° и по Y на 40° */
.skew-both {
  transform: skew(20deg, 40deg);
}

/* Эквивалентная запись, которая считается устаревшей */
.skew-both {
  transform: skewX(20deg) skewY(40deg);
}
```

<iframe title="Демонстрация разных значений skew" src="demos/basic/" height="400"></iframe>

## Как понять

`skew()` искажает стороны элемента, сохраняя параллельность линий. В отличие от [`scale()`](/css/scale/), размеры элемента остаются прежними. По умолчанию точка трансформации элемента — его центр. Можно комбинировать `skew()` с другими трансформациями ([`rotate`](/css/rotate/), [`translate()`](/css/transform-function/#translate-x-y)).

<iframe title="Демонстрация свойства skew вместе с другими свойствами трансформации" src="demos/combination/" height="400"></iframe>

## Важно

💡 Нужно учитывать, что искажение влияет на весь элемент вместе с его содержимым. Например, текстом. Можно задать обратное искажение содержимому, если хочется сохранить его внешний вид.

## Полезные инструменты

Для генерации искажения можно использовать такие генераторы `skew()`, как [Webcode](https://webcode.tools/css-generator/skew), [CSS-Generator](https://css-generator.netlify.app/transform-skew) и другие.
