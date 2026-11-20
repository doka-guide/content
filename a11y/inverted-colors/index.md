---
title: "`inverted-colors`"
description: "Значение директивы `@media`, которое отслеживает режим инвертированных цветов."
baseline:
  - group: inverted-colors
    features:
      - css.at-rules.media.inverted-colors
authors:
  - doka-dog
keywords:
  - доступность
  - ＠-правило
  - media
  - media-query
  - режим инвертированных цветов
related:
  - css/media
  - a11y/chto-takoe-a11y
  - a11y/aria-intro
tags:
  - doka
  - placeholder
---

## Кратко

Одно из значений директивы [`@media`](/css/media/) для проверки пользовательских настроек. Отслеживает режим инвертированных цветов.

<aside>

👶 Пока что `inverted-colors` [поддерживается только в Safari](https://caniuse.com/mdn-css_at-rules_media_inverted-colors).

</aside>

## Пример

```css
@media (inverted-colors: inverted) {
  img, video {
    filter: invert(100%);
  }
}
```

## Как пишется

Есть два значения:

- `none` — в системе используются цвета по умолчанию.
- `inverted` — выбран режим инвертированных цветов.

## Как понять

_Режим инвертированных цветов (inverted colors mode)_ заменяет системные цвета на противоположные, как на негативе. Цвета изменяются не только в системе, но и в браузере.
