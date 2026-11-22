---
title: "`transition-delay`"
description: "Откладываем изменение элемента на некоторое время."
baseline:
  - group: transitions
    features:
      - css.properties.transition-delay
authors:
  - ezhkov
contributors:
  - skorobaeus
keywords:
  - задержка
related:
  - css/transition
  - css/transition-timing-function
  - css/will-change
tags:
  - doka
---

## Кратко

Если нужно плавно изменить какое-то CSS-свойство, но запустить изменение не сразу, а с задержкой, то используем `transition-delay`.

## Пример

Анимация будет запущена через 0.3 секунды:

```css
.box {
  transition-property: color, padding;
  transition-duration: .3s;
  transition-delay: .3s;
}
```

## Как пишется

Значения времени:

```css
.selector {
  transition-delay: 3s; /* Одно значение в секундах */
  transition-delay: 2s, 4ms; /* Несколько значений в секундах и миллисекундах */
}
```

## Как понять

Синтаксически свойство полностью аналогично [`transition-duration`](/css/transition-duration/), но использование их вместе помогает достичь интересных эффектов. Например, создать цепочку последовательных изменений свойств:

<iframe title="Кнопка с трансформацией по наведению" src="demos/button-transform/" height="210"></iframe>

## Подсказки

💡В краткой записи свойства [`transition`](/css/transition/) свойство `transition-delay` стоит на третьем месте сразу после указания длительности перехода: `transition: color .3s .5s`. Использовать свойство `transition-delay` отдельно от сокращённой записи стоит, если переход комплексный и анимируется несколько свойств с разными задержками.

💡 Хорошо всегда помнить о том, что мы можем стилизовать плавное изменение свойства в две стороны:

- от базового состояния → к изменённому состоянию;
- от изменённого состояния → к базовому состоянию.

Поэтому важно указывать `transition-delay` для обоих состояний. При убирании курсор мыши сразу начнёт меняться padding, а через 500 мс — цвет текста:

```css
.box {
  color: red;
  padding: 12px;
  transition-property: color, padding;
  transition-duration: .5s, .5s;
  transition-delay: .5s, 0s
}
```

При наведении мыши сразу начнёт меняться цвет текста, а через 500 мс — `padding`:

```css
.box:hover {
  color: green;
  padding: 24px;
  transition-property: color, padding;
  transition-duration: .5s, .5s;
  transition-delay: 0s, .5s
}
```
