---
title: "`scroll-margin`"
description: "Задаём отступ от края окна до элемента, к которому прокручиваем страницу."
baseline:
  - group: scroll-snap
    features:
      - css.properties.scroll-margin
      - css.properties.scroll-margin-left
      - css.properties.scroll-margin-right
      - css.properties.scroll-margin-top
      - css.properties.scroll-margin-block
      - css.properties.scroll-margin-inline
authors:
  - drakesbot12
related:
  - css/scroll-padding
  - js/element-scrollintoview
  - css/scroll-behavior
tags:
  - doka
---

## Кратко

Свойство `scroll-margin` добавляет отступ между краем области прокрутки (контейнера со скроллом) и элементом, к которому происходит прокрутка внутри этого контейнера. Такой элемент называют «прокручиваемым» или «элементом назначения». Применяется, когда к элементу прокручивают страницу с помощью якоря (`#anchor`) или JavaScript ([`scrollIntoView()`](/js/element-scrollintoview/)).

## Пример

```html
<div class="container">
  <a href="#target">Перейти к секции</a>
  <h2 id="target">Заголовок секции</h2>
</div>
```

```css
h2 {
  scroll-margin-bottom: 2rem;
}
```

<iframe title="Отступ сверху при прокрутке к элементу" src="demos/basic/" height="300"></iframe>

## Как пишется

Свойство `scroll-margin` работает аналогично обычному [`margin`](/css/margin/), только применяется при прокрутке. Можно задать отступы сторонам по отдельности:

```css
.element {
  scroll-margin-top: 2rem;
  scroll-margin-bottom: 1rem;
  scroll-margin-left: 0.5rem;
  scroll-margin-right: 0.5rem;
}
```

Шорткат для свойства:

```css
.element {
  /* Отступ со всех сторон */
  scroll-margin: 1rem;
}
```

Также доступны логические свойства:

```css
.element {
  scroll-margin-block-start: 2rem;
  scroll-margin-inline-end: 1rem;
}
```

## Как понять

Когда вы скроллите к элементу — например, нажимаете ссылку `<a href="#target">` или вызываете [`element.scrollIntoView()`](/js/element-scrollintoview/) — браузер старается разместить этот элемент у одной из границ области просмотра. Это может быть верхний, нижний или другой край видимой части окна браузера. Иногда нужно, чтобы элемент не прижимался вплотную к этому краю. Вот тут и нужен `scroll-margin`.

`scroll-margin` часто используют при фиксированной шапке сайта: элемент, по направлению к которому прокручиваем страницу, может оказаться скрытым под ней. Это можно предотвратить, если использовать `scroll-margin-top` или `scroll-margin-block-start`.

## Подсказки

💡 `scroll-margin` не влияет на визуальное расположение элементов — только на прокрутку.
💡 `scroll-margin` применяется только к элементу, который является целью прокрутки, а не к его родителю.
💡 Хорошо работает вместе со [`scroll-behavior: smooth`](/css/scroll-behavior/) — так пользователь чётко видит, как элемент «остановился» не вплотную к краю интерфейса.
