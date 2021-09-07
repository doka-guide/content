---
title: "`font-variation-settings`"
description: ""
authors:
  - doka-dog
tags:
  - doka
  - placeholder
---

## Кратко

Свойство `font-variation-settings` обеспечивает низкоуровневый контроль над изменяемыми характеристиками шрифта.

## Как пишется

В качестве значения пишем в кавычках четыре буквы, обозначающие, какое свойство шрифта мы будем менять, а после, через пробел, пишем значение.

```css
div {
  font-variation-settings: 'wght' 850;
}
```

### Сокращения свойств

- `"wght"` — [`font-weight`](/css/font-weight)
- `"wdth"` — [`font-stretch`](/css/font-stretch)
- `"slnt"` — [`font-style`](/css/font-style): oblique + angle
- `"ital"` — [`font-style`](/css/font-style): italic
- `"opsz"` — [`font-optical-sizing`](/css/font-optical-sizing)
