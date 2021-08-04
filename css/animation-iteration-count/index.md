---
title: "animation-iteration-count"
authors:
  - solarrust
editors:
  - tachisis
keywords:
  - CSS-анимации
  - количество повторов анимации
tags:
  - doka
---

## Кратко

При помощи свойства `animation-iteration-count` можно указать, сколько раз будет проигрываться CSS-анимация.

## Пример

```css
.element {
  animation-name: circle-to-square;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}
```

## Как понять

По значению этого свойства браузер понимает, сколько раз нужно проиграть анимацию, сколько циклов должно быть.

## Как пишется

В качестве значения указывается число, означающее количество повторений, или ключевое слово `infinite`. Если указано `infinite`, то анимация будет повторяться бесконечно. Это значение встречается чаще всего!

## Подсказки

:::callout 🦄

Подробнее об анимациях написано в статье «[CSS-анимации](/css/animation)».

:::
