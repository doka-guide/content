---
title: "`animation-delay`"
description: "Если хочется, чтобы анимация начиналась не сразу."
baseline:
  - group: animations-css
    features:
      - css.properties.animation-delay
authors:
  - solarrust
editors:
  - tachisis
keywords:
  - задержка анимации
related:
  - css/numeric-types
  - css/animation-play-state
  - css/animation-timing-function
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

<aside>

🦄 Подробнее об анимациях написано в статье «[CSS-анимации](/css/animation/)».

</aside>
