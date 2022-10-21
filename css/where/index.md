---
title: "`:where()`"
description: "Псевдокласс для упрощения перечисления нескольких селекторов."
authors:
  - kotosha-real
tags:
  - doka
---

## Кратко

Функция-псевдокласс `:where()` принимает один или несколько селекторов в качестве аргумента. Браузер при чтении применяет стили к любому из селекторов-аргументов.

`:where()` похож на [`:is()`](/css/is/) по своей механике и также полностью поддерживается во всех стабильных браузерах с [января 2021 года](https://caniuse.com/mdn-css_selectors_where). Различие заключается в [специфичности](/css/specificity/): у `:where()` она нулевая, а у `:is()` равна наиболее специфичному из переданных селекторов.

## Пример

Применим стили для ссылок, вложенных в [`<header>`](/html/header/), [`<main>`](/html/main/) или [`<footer>`](/html/footer/):

```css
:where(header, main, footer) a {
  color: blue;
}
```

Без использования `:where()` пришлось бы [перечислять селекторы](/css/selector-list/):

```css
header a,
main a,
footer a {
  color: blue;
}
```

## Как пишется

Любой из переданных селекторов:

```css
:where(header, main, footer) {
  color: blue;
}
```

`<header>` с любым из переданных классов:

```css
header:where(.content-header, .section-header) {
  color: blue;
}
```

## Как понять

Можно объяснить работу `:where()` как «возьми все селекторы из списка, но не добавляй им веса». Это полезно, если вы хотите применить стили к нескольким селекторам и при этом обойтись без перечисления, вдобавок не переживая о повышенной специфичности итогового селектора. Пример ниже демонстрирует возможность легко переопределить свойства, заданные с помощью `:where()`:

<iframe title="Объяснение работы :where()" src="demos/basic" height="500"></iframe>

## Разница специфичности между `:where()` и `:is()`

Не забываем про разницу в специфичности `:where()` и `:is()`. Несмотря на то, что `:where()` расположен ниже, текст ссылок будет окрашен в красный цвет за счёт специфичности селекторов, переданных в псевдокласс `:is()`:

```css
:is(header, main, footer) a {
  color: red;
}

:where(header, main, footer) a {
  color: blue;
}
```

По этой же причине текст внутри [`<div>`](/html/div/) с классом `meow` будет синим:

```css
div.meow {
  color: blue;
}

div:where(.meow) {
  color: red;
}
```

<iframe title="Разница в специфичности :where() и :is()" src="demos/specificity-battle" height="700"></iframe>

## Прощающие селекторы

Псевдоклассы `:where()` и `:is()` относятся к [«прощающему списку селекторов»](https://drafts.csswg.org/selectors-4/#typedef-forgiving-selector-list). Невалидный селектор в списке аргументов _не приведёт_ к игнорированию валидных селекторов.

Стили ниже применятся к [`<span>`](/html/span/), а нерабочий селектор `:some-unsupported-feature` будет проигнорирован:

```css
:where(span, :some-unsupported-feature) {
  color: blue;
}
```

Тут та же история:

```css
:is(span, :some-unsupported-feature) {
  color: blue;
}
```

А вот если указать неподдерживаемое свойство `:some-unsupported-feature` в перечислении, то всё сломается, не сработает ни один из селекторов:

```css
span,
:some-unsupported-feature {
  color: red;
}
```
