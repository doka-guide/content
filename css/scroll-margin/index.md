---
title: "`scroll-margin`"
description: "Свойство CSS `scroll-margin` позволяет задать отступ между краем области прокрутки и элементом, к которому осуществляется прокрутка. Полезно при работе с якорными ссылками и scrollIntoView."
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
keywords:
  - якорь
  - scrollIntoView
  - scroll
  - scroll-margin-top
related:
  - css/scroll-padding
  - js/element-scrollintoview
  - css/scroll-behavior
tags:
  - doka
---

## Кратко

Свойство `scroll-margin` добавляет отступ между краем области прокрутки (контейнера со скроллом) и элементом, к которому происходит прокрутка внутри этого контейнера. Такой элемент называют "прокручиваемым" или "элементом назначения". Применяется, когда к элементу прокручивают страницу с помощью якоря (`#anchor`) или JavaScript ([`scrollIntoView()`](/js/element-scrollintoview/)).

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

Свойство `scroll-margin` работает аналогично обычному [`margin`](/css/margin/), только применяется при прокрутке. Существует как шорткат, так и сторонам по отдельности:

```css
.element {
  scroll-margin: 1rem; /* отступ со всех сторон */
}
```

```css
.element {
  scroll-margin-top: 2rem;
  scroll-margin-bottom: 1rem;
  scroll-margin-left: 0.5rem;
  scroll-margin-right: 0.5rem;
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

Когда вы скроллите к элементу — например, нажимаете ссылку `<a href="#target">` или вызываете [`element.scrollIntoView()`](/js/element-scrollintoview/) — браузер старается разместить этот элемент у одной из границ области просмотра (например, у верхнего или нижнего края видимой части окна браузера). Но иногда вам нужно, чтобы элемент не прижимался вплотную к этому краю. Вот тут и нужен `scroll-margin`.

Наиболее частый случай — при фиксированной шапке сайта: элемент, к которому происходит прокрутка, может оказаться скрытым под ней. Используя `scroll-margin-top`, можно это предотвратить.

## Подсказки

💡 `scroll-margin` не влияет на визуальное расположение элементов — только на прокрутку.
💡 Совместимость хорошая: свойство поддерживается во всех современных браузерах, включая мобильные.
💡 `scroll-margin` применяется только к элементу, который является целью прокрутки, не к его родителю.
💡 Хорошо работает вместе с [`scroll-behavior: smooth`](/css/scroll-behavior/) — так пользователь чётко видит, как элемент "остановился" не у самого края.
