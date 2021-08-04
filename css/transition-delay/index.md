---
title: "transition-delay"
authors:
  - ezhkov
keywords:
  - задержка
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

Глобальные значения:

```css
.selector {
  transition-delay: inherit;
  transition-delay: initial;
  transition-delay: unset;
}
```

## Как это понять

Синтаксически свойство полностью аналогично [`transition-duration`](/css/transition-duration), но использование их вместе помогает достичь интересных эффектов. Например, создать цепочку последовательных изменений свойств:

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="css,result" data-user="ezhkov" data-slug-hash="yLOYrOK" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="transition-delay">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/yLOYrOK">
  transition-delay</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Подсказки

💡В краткой записи свойства [`transition`](/css/transition) свойство `transition-delay` стоит на третьем месте сразу после указания длительности перехода: `transition: color .3s .5s`. Использовать свойство `transition-delay` отдельно от сокращённой записи стоит, если переход комплексный и анимируется несколько свойств с разными задержками.

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
