---
title: "`font-variation-settings`"
description: "Панель управления настройками вариативного шрифта."
baseline:
  - group: font-variation-settings
    features:
      - css.properties.font-variation-settings
authors:
  - doka-dog
related:
  - css/font-variant
  - css/font-style
  - css/font-stretch
tags:
  - doka
  - placeholder
---

## Кратко

Свойство `font-variation-settings` контролирует характеристики вариативных шрифтов с помощью четырёхбуквенных имён осей: стандартных или специфичных для шрифта. Эти имена зашиты прямо в шрифте.

## Как пишется

В качестве значения указывается четырёхбуквенный псевдоним оси в кавычках и через пробел записывается значение. Доступные для управления оси в шрифте могут варьироваться от стандартных (то есть самых распространённых) до произвольных, которые авторы шрифта решили внедрить.

```css
div {
  font-variation-settings: "wght" 850;
}
```

### Названия стандартных осей

- `"wght"` — [`font-weight`](/css/font-weight/);
- `"wdth"` — [`font-stretch`](/css/font-stretch/);
- `"slnt"` — [`font-style`](/css/font-style/): oblique + угол наклона;
- `"ital"` — [`font-style`](/css/font-style/): italic;
- `"opsz"` — [`font-optical-sizing`](/css/font-optical-sizing/).

<aside>

🚨 Внимание! Названия осей регистрозависимы: стандартные нужно записывать строчными `slnt`, а произвольные — прописными `XHGT`.

</aside>
