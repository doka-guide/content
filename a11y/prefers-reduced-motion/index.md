---
title: "`prefers-reduced-motion`"
description: "Как сделать анимацию на сайте доступной."
authors:
  - doka-dog
keywords:
  - доступность
  - ＠-правило
  - media
  - media-query
related:
  - css/media
  - css/animation
  - a11y/chto-takoe-a11y
tags:
  - doka
  - placeholder
---

## Кратко

Одно из значений директивы [@media](/css/media/) для проверки пользовательских настроек. Отслеживает, отключена ли анимация в системе.

## Пример

```css
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

В примере добавляем плавную прокрутку только для пользователей, у которых не отключена анимация на уровне системы.

## Как пишется

У `prefers-reduced-motion` есть два значения:

- `no-preference` — настройки анимации по умолчанию.
- `reduce` — анимация отключена.

## Как понять

С помощью `prefers-reduced-motion` можно замедлить или полностью отключить анимацию для людей, которые не хотят её видеть.
