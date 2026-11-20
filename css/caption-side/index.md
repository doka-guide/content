---
title: "`caption-side`"
description: "Способ управлять положением подписи к таблице"
baseline:
  - group: table
    features:
      - css.properties.caption-side
authors:
  - solarrust
related:
  - html/caption
  - a11y/screenreaders
  - css/position
tags:
  - doka
---

## Кратко

Свойство для управления положением текста, оформленного при помощи тега [`<caption>`](/html/caption/).

## Пример

В примере ниже подпись «Сводная таблица лайков» будет находиться под таблицей.

```html
<table>
  <caption>Сводная таблица лайков</caption>
  ...
</table>
```

```css
caption {
  caption-side: bottom;
}
```

## Как пишется

- `top` — подпись находится над таблицей (значение по умолчанию);
- `bottom` — подпись находится под таблицей.

## Подсказки

💡 Не важно где визуально будет отображаться подпись [скринридер](/a11y/screenreaders/) прочитает её перед таблицей.
