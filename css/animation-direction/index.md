---
title: "`animation-direction`"
description: "Решаем, в каком направлении будет проигрываться анимация."
baseline:
  - group: animations-css
    features:
      - css.properties.animation-direction
authors:
  - solarrust
editors:
  - tachisis
keywords:
  - направление анимации
related:
  - css/animation-play-state
  - css/animation-name
  - css/animation-iteration-count
tags:
  - doka
---

## Кратко

Свойство `animation-direction` сообщает браузеру, должна ли анимация проигрываться в обратном порядке.

## Пример

```css
.element {
  animation-name: circle-to-square;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
```

## Как пишется

- `normal` — **значение по умолчанию**, анимация воспроизводится от начала до конца, после чего возвращается к начальному кадру.
- `reverse` — анимация проигрывается в обратном порядке, от последнего ключевого кадра до первого, после чего возвращается к последнему кадру.
- `alternate` — каждый нечётный повтор (первый, третий, пятый) анимации воспроизводится в прямом порядке, а каждый чётный повтор (второй, четвёртый, шестой) анимации воспроизводится в обратном порядке.
- `alternate-reverse` — аналогично значению `alternate`, но чётные и нечётные повторы меняются местами.

## Подсказки

<aside>

🦄 Подробнее об анимациях написано в статье «[CSS-анимации](/css/animation/)».

</aside>
