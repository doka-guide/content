---
title: "animation-delay"
authors:
  - solarrust
editors:
  - tachisis
keywords:
  - CSS-анимации
  - задержка анимации
tags:
  - doka
---

## Кратко

Свойство задаёт задержку воспроизведения CSS-анимации.

## Пример

```css
.element {
  animation-name: circle-to-square;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;
  animation-timing-function: ease-in;
  animation-delay: 1s;
}
```

## Как пишется

Значением может быть любое число, как отрицательное, так и положительное. Если значение положительное, то будет задержка перед началом анимации. Если значение отрицательное, то анимация начнётся как бы _за кадром_.

## Подсказки

:::callout 🦄

Подробнее об анимациях написано в статье «[CSS-анимации](/css/animation)».

:::
