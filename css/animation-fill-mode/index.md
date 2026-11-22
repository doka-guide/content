---
title: "`animation-fill-mode`"
description: "Свойство, решающее, что будет после окончания анимации."
baseline:
  - group: animations-css
    features:
      - css.properties.animation-fill-mode
authors:
  - solarrust
contributors:
  - starhamster
editors:
  - tachisis
keywords:
  - поведение ключевых кадров
related:
  - css/animation
  - css/animation-play-state
  - css/animation-direction
tags:
  - doka
---

## Кратко

`animation-fill-mode` сообщает браузеру, нужно ли применять стили ключевых кадров **до** или **после** проигрывания анимации.

## Пример

```css
.element {
  animation-name: grow;
  animation-duration: 3s;
  animation-fill-mode: forwards;
}
```

## Как пишется

- `none` - **значение по умолчанию**, стили анимации не применяются до и после проигрывания анимации.
- `forwards` — после окончания анимации элемент сохранит стили последнего ключевого кадра.
- `backwards` - после окончания анимации к элементу будут применены стили первого ключевого кадра.
- `both` — до начала анимации к элементу применяется первый ключевой кадр, а после окончания анимации элемент останется в состоянии последнего ключевого кадра.

Для лучшего понимания работы этих значений посмотрите демо 👇

<iframe title="Светофоры с разными режимами animation-fill-mode" src="demos/traffic-lights/" height="610"></iframe>

## Подсказки

<aside>

🦄 Подробнее об анимациях написано в статье «[CSS-анимации](/css/animation/)».

</aside>
