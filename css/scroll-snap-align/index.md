---
title: "`scroll-snap-align`"
description: "Задаёт выравнивание элемента при прокрутке внутри контейнера."
baseline:
  - group: scroll-snap
    features:
      - css.properties.scroll-snap-align
      - css.properties.scroll-snap-align.center
      - css.properties.scroll-snap-align.end
      - css.properties.scroll-snap-align.none
      - css.properties.scroll-snap-align.start
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

Свойство `scroll-snap-type` управляет тем, в каком месте прокручиваемой оси остановится элемент: начале, середине или конце.

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

<iframe title="Варианты выравнивания элементов во время прокрутки" src="demos/values/" height="550"></iframe>

## Подсказки

💡 Чтобы привязка к указанной точке начала работать, необходимо также задать свойство [scroll-snap-type](/css/scroll-snap-type/) контейнеру, в котором находится элемент.
