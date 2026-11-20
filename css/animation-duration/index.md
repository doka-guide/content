---
title: "`animation-duration`"
description: "Сколько продлится анимация? Секунду, две или всего пару миллисекунд?"
baseline:
  - group: animations-css
    features:
      - css.properties.animation-duration
authors:
  - solarrust
editors:
  - tachisis
keywords:
  - длительность анимации
related:
  - css/animation
  - css/animation-timing-function
  - css/animation
tags:
  - doka
---

## Кратко

При помощи свойства `animation-duration` прописывается длительность одного цикла анимации.

## Пример

```css
.element {
  animation-name: circle-to-square;
  animation-duration: 2s;
}
```

## Как понять

Браузер понимает, за какой промежуток времени нужно проиграть все ключевые кадры анимации.

## Как пишется

Значение этого свойства указывается в секундах `s` или миллисекундах `ms`.

<aside>

👌 Если указать `0s`, то ключевые кадры будут пропущены, анимация применится мгновенно.

</aside>

## Подсказки

💡 В одной секунде 1000 миллисекунд 🤓

<aside>

🦄 Подробнее об анимациях написано в статье «[CSS-анимации](/css/animation/)».

</aside>
