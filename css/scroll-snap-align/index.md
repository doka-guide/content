---
title: "`scroll-snap-align`"
description: "Задаёт выравнивание элемента при прокрутке внутри контейнера."
authors:
  - akhmadullin
related:
  - css/overflow
  - css/scroll-snap-type
  - css/scroll-snap-stop
tags:
  - doka
---

## Кратко

Свойство `scroll-snap-align` задаёт выравнивание элемента внутри прокручиваемого контейнера при остановке скролла.

## Пример

```css
.element {
  scroll-snap-align: start;
}
```

## Как понять

Свойство `scroll-snap-type` управляет тем, в каком месте прокручиваемой оси остановится элемент: начало, середина или конец.

## Как пишется

Возможные значения `scroll-snap-align`:

- `none` — отключает привязку, значение по умолчанию;
- `start` — элемент привязывается к началу прокручиваемой оси;
- `center` — элемент привязывается к середине прокручиваемой оси;
- `end` — элемент привязывается к концу прокручиваемой оси.

## Использование

```css
.scroll-snap-align-start {
  scroll-snap-align: start;
}

.scroll-snap-align-center {
  scroll-snap-align: center;
}

.scroll-snap-align-end {
  scroll-snap-align: end;
}
```

Попробуйте прокрутить каждый из контейнеров.

<iframe title="Варианты значений" src="demos/values/" height="600"></iframe>
