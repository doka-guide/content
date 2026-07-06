---
title: "`position-try`"
description: "Задаём фолбэки расположения и порядок их применения одновременно."
baseline:
  - group: anchor-positioning
    features:
      - css.properties.position-try
authors:
  - akhmadullin
related:
  - css/position-area
  - css/position-try-fallbacks
  - css/position-try-order
tags:
  - doka
---

## Кратко

Свойство `position-try` является шорткатом для свойств [`position-try-order`](/css/position-try-order/) и [`position-try-fallbacks`](/css/position-try-fallbacks/).

## Пример

```css
.target {
  position-try: most-width flip-inline, bottom;
}
```

## Как пишется

С помощью свойства `position-try` можно указать и фолбэки расположения, и их порядок применения.

Если одновременно указываются значения и для [`position-try-order`](/css/position-try-order/), и для [`position-try-fallbacks`](/css/position-try-fallbacks/), значение для [`position-try-order`](/css/position-try-order/) должно идти первым. Далее можно указать несколько значений для [`position-try-fallbacks`](/css/position-try-fallbacks/) через запятую.

```css
.target {
  position-try: <try-order> <fallback-1>, <fallback-2>;
}
```

Если значение для [`position-try-order`](/css/position-try-order/) будет опущено, то для него применится дефолтное значение (`normal`).

```css
.target {
  position-try: <fallback-1>, <fallback-2>;
}
```
