---
title: "animation-fill-mode"
authors:
  - solarrust
editors:
  - tachisis
keywords:
  - CSS-анимации
  - ключевые кадры
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

<p class="codepen" data-height="388" data-theme-id="dark" data-default-tab="result" data-user="solarrust" data-slug-hash="XWpxNZZ" data-preview="true" style="height: 388px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="XWpxNZZ">
  <span>See the Pen <a href="https://codepen.io/solarrust/pen/XWpxNZZ">
  XWpxNZZ</a> by Alena (<a href="https://codepen.io/solarrust">@solarrust</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Подсказки

:::callout 🦄

Подробнее об анимациях написано в статье «[CSS-анимации](/css/animation)».

:::
