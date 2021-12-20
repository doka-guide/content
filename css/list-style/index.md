---
title: "`list-style`"
authors:
  - doka-dog
tags:
  - doka
  - placeholder
---

## Кратко

Шорткат `list-style` позволяет одновременно задать значение для следующих свойств:

- [`list-style-type`](/css/list-style-type/)
- [`list-style-position`](/css/list-style-position/)
- [`list-style-image`](/css/list-style-image/)

## Как пишется

Значения свойства можно задавать в любом порядке и в любом количестве от 1 до 3:

```css
ul {
  /* type */
  list-style: none;
  /* type, position */
  list-style: disc inside;
  /* type, image, position */
  list-style: decimal url('marker.png') outside;
}
```

Браузер сам найдёт подходящие значения для нужных свойств.
