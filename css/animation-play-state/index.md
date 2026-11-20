---
title: "`animation-play-state`"
description: "Раз, два, три, CSS-анимация замри! Ставим на паузу и запускаем снова анимации."
baseline:
  - group: animations-css
    features:
      - css.properties.animation-play-state
authors:
  - solarrust
editors:
  - tachisis
keywords:
  - пауза анимации
related:
  - css/hover
  - css/animation
  - css/keyframes
tags:
  - doka
---

## Кратко

Свойство, позволяющее ставить CSS-анимацию на паузу и запускать снова.

## Пример

```css
.element:hover {
  animation-play-state: paused;
}
```

## Как пишется

- `running` — **значение по умолчанию**, анимация проигрывается.
- `paused` — анимация ставится на паузу. При повторном запуске анимации она продолжается с того места, где была остановлена.

## Подсказки

<aside>

🦄 Подробнее об анимациях написано в статье «[CSS-анимации](/css/animation/)».

</aside>
