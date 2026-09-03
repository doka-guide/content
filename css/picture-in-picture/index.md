---
title: "`:picture-in-picture`"
description: "Совпадает с элементом `<video>`, который сейчас отображается в режиме «картинка в картинке» (Picture‑in‑Picture)."
baseline:
  - group: picture-in-picture
    features:
      - css.selectors.picture-in-picture
authors:
  - drakesbot12
tags:
  - doka
keywords:
  - picture-in-picture
  - pip
  - видео
  - псевдокласс
related:
  - html/video
  - css/has
  - css/fullscreen
---

## Кратко

`:picture-in-picture` — CSS‑псевдокласс, который совпадает с элементом [`<video>`](/html/video/), если он сейчас вынесен в отдельное маленькое окно «картинка в картинке» (PiP). Это удобно, чтобы менять оформление видео или скрывать кастомные элементы управления, когда ролик в PiP.

## Пример

Нажмите на кнопку «Включить PiP», чтобы перевести видео в режим «картинка в картинке». При этом к видео применятся стили из CSS-правила `video:picture-in-picture`.

<iframe title=":picture-in-picture — оформление видео в режиме PiP" src="demos/basic/" height="580"></iframe>

## Как пишется

```css
/* Подсветить видео, которое сейчас в PiP */
video:picture-in-picture {
  outline: 2px solid #2E9AFF;
  outline-offset: 6px;
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

💡 Скрывайте кастомные оверлеи и элементы управления в режиме «картинка в картинке», чтобы они не «залипали» поверх видео.
💡 Комбинируйте с соседними селекторами (`~`, `+`) и [`:has()`](/css/has/), чтобы менять другие элементы интерфейса, пока видео в PiP.
💡 Если видео лежит внутри [`<iframe>`](/html/iframe/), для запуска PiP нужно разрешение `allow="picture-in-picture"` на самом фрейме — без него `requestPictureInPicture()` вызовет ошибку.
