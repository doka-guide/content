---
title: "`animation-iteration-count`"
description: "Бесконечная анимация? Легко! Для этого есть отдельное свойство."
baseline:
  - group: animations-css
    features:
      - css.properties.animation-iteration-count
authors:
  - solarrust
editors:
  - tachisis
keywords:
  - количество повторов анимации
related:
  - css/numeric-types
  - css/animation-duration
  - css/animation
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

<aside>

🦄 Подробнее об анимациях написано в статье «[CSS-анимации](/css/animation/)».

</aside>
