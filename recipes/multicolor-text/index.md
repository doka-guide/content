---
title: "Разноцветный текст"
description: "Один цвет для текста — это прошлый век. Красим в разные!"
authors:
  - furtivite
tags:
  - article
---

## Задача

Вам необходимо покрасить текст в разные цвета, например, в радужный градиент. Но как это сделать, если свойство [`color`](/css/color/) может принимать только один цвет?

## Решение

Напишем текст и начнём думать, как решить задачу.

```html
<h1>Привет мир</h1>
```

Итак, чтобы сделать фон-радугу нам понадобится свойство [`background`](/css/background/) или [`background-image`](/css/background-image/). Свойство [`background-color`](/css/background-color/) для нас не подходит, потому что оно не поддерживает нужный нам градиент. Я буду пользоваться `background-image` потому, что так код более нагляден.

Добавим стилей:

```css
body {
  color: white;
}
h1 {
  background-image:
    linear-gradient(250deg, rgba(131,58,180,1) 0%,
      rgba(253,29,29,1) 50%,
      rgba(252,176,69,1) 100%);
}
```

Теперь у нас есть текст, написанный поверх радужного фона:

<iframe title="Белый текст на градиентном фоне" src="demos/step-1/" height="450"></iframe>

Затем нам нужно спрятать фон под текст. Для этого воспользуемся свойством [`background-clip`](/css/background-clip/) со значением `text`.

Свойство не поддерживается Internet Explorer и старыми браузерами, а Google Chrome может требовать префикс. Учтём это:

```css
...
h1 {
  ...
  background-clip: text;
  -webkit-background-clip: text;
}
```

<iframe title="Белый текст на черном фоне" src="demos/step-2/" height="450"></iframe>

Текст снова стал белым, потому что у нас указано это свойство в `body`. Сделаем его прозрачным и удалим лишние значения. Получаем вот такой результат:

```css
h1 {
  background-image:
    linear-gradient(250deg, rgba(131,58,180,1) 0%,
      rgba(253,29,29,1) 50%,
      rgba(252,176,69,1) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
```

<iframe title="Радужный текст" src="demos/rainbow/" height="450"></iframe>

## А если не градиент?

Таким же образом вы можете поставить фоном для текста на сайте и любое изображение:

<iframe title="Текст с фоном-картинкой" src="demos/sunshine/" height="450"></iframe>
