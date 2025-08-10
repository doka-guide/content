---
title: "`:picture-in-picture`"
description: "Совпадает с элементом `<video>`, который в данный момент отображается в режиме «картинка в картинке» (Picture‑in‑Picture)."
tags:
  - doka
keywords:
  - picture-in-picture
  - pip
  - видео
  - псевдокласс
related:
  - html/video
  - html/track
  - css/has
---

## Кратко

`:picture-in-picture` — CSS‑псевдокласс, который совпадает с элементом [`<video>`](/html/video/), если он сейчас вынесен в отдельное маленькое окно «картинка в картинке» (PiP). Это удобно, чтобы менять оформление видео или скрывать кастомные элементы управления, когда ролик в PiP.

## Пример

Ниже видео. При реальном PiP к нему применятся стили. В демке есть «мок» — можно включить превью оформления без вызова PiP.

<iframe title=":picture-in-picture — оформление видео в режиме PiP" src="demos/basic/" height="520"></iframe>

## Как пишется

```css
/* Подсветить видео, которое сейчас в PiP */
video:picture-in-picture {
  outline: 2px solid #2E9AFF;
  outline-offset: 6px;
}

/* Спрятать свои контролы, когда видео в PiP */
.controls:has(+ video:picture-in-picture) {
  display: none;
}

/* Или наоборот — показывать уведомление на странице */
.pip-indicator {
  display: none;
}
video:picture-in-picture ~ .pip-indicator {
  display: block;
}
```

## Как понять

Режим PiP — это отдельное окно, где браузер показывает поток выбранного [`<video>`](/html/video/). Когда ролик вынесен в такое окно, исходный элемент на странице получает состояние `:picture-in-picture`. Это состояние снимается, когда ролик возвращается на страницу.

Псевдокласс работает только для [`<video>`](/html/video/) (не для [`<audio>`](/html/audio/)). Он описывает визуальное состояние элемента, а не запускает PiP — для запуска и выхода используется веб‑API JavaScript (`HTMLVideoElement.requestPictureInPicture()` и `document.exitPictureInPicture()`).

## Подсказки

- Скрывайте кастомные оверлеи/контролы в `:picture-in-picture`, чтобы не «залипали» поверх видео.
- Комбинируйте с соседними селекторами (`~`, `+`) и [`:has()`](/css/has/), чтобы менять другие элементы интерфейса, пока видео в PiP.
- На некоторых сайтах PiP может быть недоступен в [`<iframe>`](/html/iframe/) без соответствующих разрешений; для дизайн‑превью можно временно использовать «мок»‑селектор рядом с `:picture-in-picture`.
