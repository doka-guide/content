---
title: "`background-image`"
cover:
  author: kirakusto
  desktop: 'images/covers/desktop.svg'
  mobile: 'images/covers/mobile.svg'
  alt: 'Луноход стоит на камнях, на заднем плане ширма с изображением лунной поверхности'
authors:
  - doka-dog
contributors:
  - skorobaeus
keywords:
  - background-image
tags:
  - doka
---

## Кратко

Свойство `background-image` задаёт фоновую картинку элемента.

## Пример

```css
div {
  background-image: url("background.jpg");
}
```

## Как это понять

Таких картинок можно разместить сколько угодно. Они будут накладываться друг на друга, причём сверху будет видна та, что указана в списке первой. Если она не прогрузится, то пользователь увидит следующую по порядку.

Элементу можно задать одновременно и цвет фона [`background-color`](/css/background-color), и фоновую картинку. Если картинка не прогрузится, то вместо неё пользователь увидит фоновый цвет.

## Как пишется

```css
div {
  background-image: url("адрес-картинки");
}
```

Адрес картинки важно задать внутри `url("...");`.

Границы картинки и её расположение, относительно краёв элемента мы задаём с помощью [`background-clip`](/css/background-clip) и [`background-origin`](/css/background-origin).

## Значения

- `url` — адрес картинки, который пишется в скобках и кавычках: `url("cat_box.png")`.
- `none` — добавьте его, чтобы фоновая картинка не появлялась (значение по умолчанию).

## Подсказки

💡 Разные браузеры могут отображать фоновый рисунок по-разному. Например, если ты задаёшь фоновую картинку внутри таблицы для одной строки целиком, то Chrome и Safari продублируют эту картинку в каждой ячейке, когда остальные растянут картинку на всю строку.

💡 С помощью `background-image` также можно сделать градиентный фон, задав разные цвета:

```css
div {
  background-image: linear-gradient(red, yellow, green);
}
```

Подробнее о градиентах можно прочитать в статьях о [`linear-gradient`](/css/line-height) и [`radial-gradient`](/css/radial-gradient).

## Пример

Добавим на фон сразу цвет и картинку. Цветной фон появится сразу — браузер делает это моментально, потому что ничего загружать не надо. А вот картинка может грузиться какое-то время, в зависимости от скорости интернета:

```css
body {
  background-image: url(background.png);
  background-color: #09ff00;
}
```

<iframe title="Фоновый рисунок" src="demos/basic/" height="150"></iframe>

Чтобы фоновая картинка отображалась так, как нужно, задайте ей параметры с помощью других свойств:

```css
.hero-image {
  height: 500px;
  background-image: url("photographer.jpg");
  background-color: #cccccc;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
```

Если хочется наложить одну картинку на другую, то просто перечисляем их через запятую. Первое изображение в списке окажется сверху. Вторую картинку будет видно, если у первой будет прозрачный фон:

```css
.selector {
  background-image: url("images/star.png"),
                    url("images/lizard.png");
}
```
