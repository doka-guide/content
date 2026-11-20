---
title: "`animation-name`"
description: "Чтобы анимацию к чему-то применить её нужно сначала назвать."
baseline:
  - group: animations-css
    features:
      - css.properties.animation-name
authors:
  - solarrust
  - goingtogogo
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
  animation-name: left-to-right;
}
```

<iframe title="Слева направо — animation-name — Дока" src="demos/default/" height="300"></iframe>

## Как понять

Благодаря `animation-name` браузер понимает, какие именно ключевые кадры нужно применять к выбранному элементу.

## Как пишется

В качестве значения указывается имя, заданное для ключевых кадров анимации в директиве [`@keyframes`](/css/keyframes/). Предположим, у нас есть две анимации:

```css
@keyframes left-to-right {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(100vw - 250px));
  }
}

@keyframes bottom-to-top {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(calc(-100vh + 250px));
  }
}
```

С помощью свойства `animation-name` мы указываем, какую анимацию нужно применить к элементу.

<iframe title="Применяем разные названия анимаций — animation-name — Дока" src="demos/multiple/" height="500"></iframe>

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
