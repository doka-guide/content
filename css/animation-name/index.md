---
title: "`animation-name`"
description: "Чтобы анимацию к чему-то применить её нужно сначала назвать."
authors:
  - solarrust
editors:
  - tachisis
keywords:
  - имя анимации
  - название анимации
related:
  - css/keyframes
  - css/animation
  - css/hover
tags:
  - doka
---

## Кратко

Чтобы связать [ключевые кадры](/css/keyframes/) CSS-анимации с конкретным элементом, используется свойство `animation-name`.

## Пример

```css
.element {
  animation-name: circle-to-square;
}
```

## Как понять

Благодаря `animation-name` браузер понимает, какие именно ключевые кадры нужно применять к выбранному элементу.

## Как пишется

В качестве значения указывается имя, заданное для ключевых кадров анимации в директиве [`@keyframes`](/css/keyframes/).

Кроме имени анимации можно указать `none`, значение по умолчанию. Означает отсутствие анимации. Удобно использовать для сброса анимации.

Например, можно указать это значение для элемента по ховеру:

```css
.element {
  animation: some-animation;
}

.element:hover {
  animation: none;
}
```

## Подсказки

<aside>

🦄 Подробнее об анимациях написано в статье «[CSS-анимации](/css/animation/)».

</aside>
