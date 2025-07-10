---
title: "`scroll-snap-stop`"
description: "Задаёт обязательность остановки прокрутки в каждой точке привязки."
authors:
  - akhmadullin
related:
  - css/overflow
  - css/scroll-snap-type
  - css/scroll-snap-align
tags:
  - doka
---

## Кратко

Свойство `scroll-snap-stop` определяет, должен ли скролл обязательно останавливаться в каждой точке привязки при прокрутке.

## Пример

```css
.element {
  scroll-snap-stop: always;
}
```

## Как понять

Свойство `scroll-snap-stop` управляет тем, насколько строго должна останавливаться прокрутка: на каждом элементе или с возможным пропуском элементов.

## Как пишется

Возможные значения `scroll-snap-stop`:

- `normal` — прокрутка может проскочить несколько элементов, значение по умолчанию;
- `always` — прокрутка должна остановиться на каждом элементе.

## Использование

```css
.scroll-snap-stop-normal {
  scroll-snap-stop: normal;
}

.scroll-snap-stop-always {
  scroll-snap-stop: always;
}
```

Попробуйте прокрутить каждый из контейнеров с небольшим ускорением. Эффект от свойства можно увидеть на тач-экранах или устройствах с тачпадом.

<iframe title="Варианты остановки во время прокрутки" src="demos/values/" height="550"></iframe>
