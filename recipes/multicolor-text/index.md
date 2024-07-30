---
title: "Разноцветный текст"
description: "Один цвет для текста — это прошлый век. Красим в разные!"
authors:
  - furtivite
related:
  - css/background-image
  - recipes/dragndrop-upload
  - css/background-clip
tags:
  - article
---

## Задача

Вам необходимо покрасить текст в разные цвета, например, в радужный градиент. Но как это сделать, если свойство [`color`](/css/color/) может принимать только один цвет?

## Готовое решение

```css
h1 {
  background-image:
    linear-gradient(250deg,
      #833AB4 0%,
      #FD1D1D 50%,
      #FCB045 100%
    );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
```

<iframe title="Радужный текст" src="demos/rainbow/" height="450"></iframe>

## Разбор решения

Напишем текст и начнём думать, как решить задачу.

```html
<h1>Отпуск — это хорошо!</h1>
```

Чтобы сделать разноцветный фон, понадобится свойство [`background-image`](/css/background-image/). Свойство [`background-color`](/css/background-color/) не подходит, потому что оно не поддерживает градиенты.

Добавим стилей:

```css
body {
  color: white;
}
h1 {
  background-image:
    linear-gradient(250deg,
      #833AB4 0%,
      #FD1D1D 50%,
      #FCB045 100%
    );
}
```

Теперь текст визуально находится поверх разноцветного фона:

<iframe title="Белый текст на разноцветном фоне" src="demos/step-1/" height="450"></iframe>

Затем превратим текст в трафарет. Для этого понадобиться свойство [`background-clip`](/css/background-clip/) со значением `text`.

Свойство не поддерживается Internet Explorer и другими старыми браузерами, а Google Chrome (и браузеры на основе Chromium) могут требовать вендорный префикс. Учтём это:

```css
h1 {
  ...
  background-clip: text;
  -webkit-background-clip: text;
}
```

<iframe title="Белый текст на чёрном фоне" src="demos/step-2/" height="450"></iframe>

Текст снова стал белым, потому что в `body` указано это значение. Сделаем его прозрачным и удалим лишние значения. Получаем вот такой результат:

```css
h1 {
  background-image:
    linear-gradient(250deg,
      #833AB4 0%,
      #FD1D1D 50%,
      #FCB045 100%
    );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
```

<iframe title="Радужный текст" src="demos/rainbow/" height="450"></iframe>

## А если не градиент?

Таким же образом можно поставить фоном для текста любое изображение:

<iframe title="Текст с фоном-картинкой" src="demos/sunshine/" height="450"></iframe>

Главное — не забывать, что текст должен контрастировать с фоном, чтобы его было удобно читать.
