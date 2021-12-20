---
title: "`font`"
authors:
  - doka-dog
tags:
  - doka
  - placeholder
---

## Кратко

Шорткат `font` позволяет одновременно указать значение для нескольких свойств, относящихся к стилизации шрифта:

- [`font-family`](/css/font-family/)
- [`font-size`](/css/font-size/)
- [`font-stretch`](/css/font-stretch/)
- [`font-style`](/css/font-style/)
- [`font-variant`](/css/font-variant/)
- [`font-weight`](/css/font-weight/)
- [`line-height`](/css/line-height/)

## Как пишется

Обязательными являются значения для свойств [`font-size`](/css/font-size/) и [`font-family`](/css/font-family/). Остальные значения опциональны.

Если нужно указать высоту строки, то она записывается через слэш (/) после размера шрифта.

```css
div {
  font: 12px/1.2 sans-serif;
}
```

Любые не указанные значения сбрасываются до дефолтных. Хотя значения для свойств [`font-size-adjust`](/css/font-size-adjust/) и [`font-kerning`](/css/font-kerning/) не могут быть указаны внутри шортката `font`, они тоже сбрасываются до дефолтных.
