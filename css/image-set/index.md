---
title: "image-set()"
authors:
  - doka-dog
keywords:
  - набор изображений
tags:
  - doka
  - placeholder
---

## Кратко

CSS-функция `image-set()` позволяет перечислить несколько фоновых изображений с условиями, по которым браузер решит, какое из них наиболее подходящее для загрузки в данный момент.

Похож по принципу работы на тег [`<picture>`](/html/picture).

## Как пишется

Внутри круглых скобок указываем через запятую два и более изображения при помощи функции `url()` и пишем условие для выбора этой картинки.

В качестве условия можно использовать коэффициент плотности пикселей: `1x`, `2x` и так далее. Или указываем тип изображения в формате MIME. Картинка будет загружена, если формат поддерживается браузером. Можно комбинировать условия.

```css
div {
  background-image: image-set(
    "puppy.webp" type("image/webp") 1x,
    "puppy2x.webp" type("image/webp") 2x,
    "puppy.png" type("image/png") 1x,
    "puppy2x.png" type("image/png") 2x
  );
}
```

Пока не поддерживается всеми браузерами. Нужно использовать фолбэк и запись с [вендорным префиксом](/css/vendor-prefixes):

```css
div {
  background-image: url("puppy.png");
  background-image: -webkit-image-set(url("puppy.png") 1x, url("puppy-2x.png") 2x);
  background-image: image-set("puppy.png" 1x, "puppy-2x.png" 2x);
}
```
