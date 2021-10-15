---
title: "`gap`"
authors:
  - solarrust
editors:
  - tachisis
  - parabolabam
keywords:
  - отступы между грид-ячейками
  - отступы в флексбокс модели
  - шорткат
tags:
  - doka
---

## Кратко

Шорткат для записи значений свойств `row-gap` и `column-gap`. Значения разделяются пробелом. Работает как с `display: grid`, так и с `display: flex`.

## Как пишется

Указываете два значения размера в любых единицах измерения, разделяя их пробелом. Первым указывается значение отступа для рядов, за ним значение отступа для колонок.

Не обязательно указывать два значения. Браузер поймёт, даже если будет одно - `row-gap` и `column-gap` будут считаться равными величинами.

## Пример c grid

```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px 10px;
}
```

## Демо c grid

<iframe title="`gap` с `display: grid`" src="demos/grid-gap/" height="330"></iframe>


## Пример с флексами

```css
.flex-container {
  display: flex;
  gap: 50px 10px;
}
```

## Демо c flex

<iframe title="gap с display: flex" src="demos/flex-gap/" height="330"></iframe>

## Подсказки

💡 Есть старое свойство-аналог для браузеров старше Chrome 68+, Safari 11.2 50+ и Opera 54+: `grid-gap`.

:::callout 📝

Полный список свойств гридов можно посмотреть в [гайде по grid](/css/grid-guide/).

Полный список свойств флексов можно посмотреть в [гайде по flexbox](/css/flexbox-guide/).

:::
