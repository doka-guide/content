---
title: "`background-image`"
description: "Полезное свойство, если нужно поставить на фон картинку или задать декоративное изображение. Можно даже градиент!"
baseline:
  - group: background-image
    features:
      - css.properties.background-image
cover:
  author: kirakusto
  desktop: 'images/covers/desktop.svg'
  mobile: 'images/covers/mobile.svg'
  alt: 'Луноход стоит на камнях, на заднем плане ширма с изображением лунной поверхности'
authors:
  - doka-dog
contributors:
  - skorobaeus
editors:
  - tachisis
keywords:
  - фоновое изображение
  - фоновая картинка
  - декоративное изображение
related:
  - tools/file
  - css/stacking-context
  - css/background
tags:
  - doka
---

## Кратко

Свойство `background-image` задаёт элементу фоновую картинку.

## Пример

```css
div {
  background-image: url("фоновое-изображение.jpg");
}
```

## Как пишется

```css
div {
  background-image: url("адрес-картинки");
}
```

Значения:

- `url` — адрес картинки, он пишется в кавычках внутри скобок: `url("cat_box.png")`.
- `none` — сбрасывает фоновую картинку (значение по умолчанию).

Границы картинки и её расположение относительно краёв элемента мы задаём с помощью [`background-clip`](/css/background-clip/) и [`background-origin`](/css/background-origin/).

### Картинка плюс цвет

Элементу желательно задать одновременно и цвет фона [`background-color`](/css/background-color/), и фоновую картинку. Если картинка не загрузится, то вместо неё пользователь увидит фоновый цвет.

```css
body {
  background-image: url("background.png");
  background-color: #09ff00;
}
```

<iframe title="Фоновая картинка" src="demos/basic/" height="150"></iframe>

### Несколько фоновых картинок

Фоновых картинок можно задать сколько угодно. Они будут накладываться друг на друга, причём сверху будет та, которая указана в списке первой. Если у картинки прозрачный фон, то под ней будет видна следующая. И так до бесконечности.

```css
body {
  background-image: url("confetti.png"),  url("landscape.jpg");
  background-color: gray;
}
```

<iframe title="Несколько фоновых картинок" src="demos/several-imgs/" height="150"></iframe>

Если у первой картинки фон не прозрачный, то следующая по счёту картинка будет видна только в случае, если первая не загрузилась.

### Градиент на фоне

С помощью `background-image` также можно сделать градиентный фон. Например, так:

```css
div {
  background-image: linear-gradient(red, yellow, green);
}
```

Подробнее о градиентах можно прочитать в статьях о [`linear-gradient`](/css/linear-gradient/), [`radial-gradient`](/css/radial-gradient/) и [`conic-gradient()`](/css/conic-gradient/).

## Подсказки

💡 Разные браузеры могут отображать фоновую картинку по-разному. Например, если вы задаёте фоновую картинку внутри таблицы для одной строки целиком, то Chrome и Safari продублируют эту картинку в каждой ячейке, тогда как остальные растянут картинку на всю строку.
