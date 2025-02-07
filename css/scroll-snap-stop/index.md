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

Попробуйте прокрутить каждый из контейнеров с небольшим ускорением.

<iframe title="Варианты значений" src="demos/values/" height="400"></iframe>
