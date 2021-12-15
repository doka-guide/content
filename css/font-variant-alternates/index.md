---
title: "`font-variant-alternates`"
authors:
  - doka-dog
tags:
  - doka
  - placeholder
---

## Кратко

Свойство `font-variant-alternates` управляет использованием альтернативных глифов. Имена альтернативных глифов могут быть определены в директиве [`@font-feature-values`](https://developer.mozilla.org/ru/docs/Web/CSS/@font-feature-values).

## Как пишется

- `normal` — отключает альтернативные глифы (значение по умолчанию).
- `historical-forms` — используются исторические формы — глифы, которые были распространены в прошлом.
- `stylistic()` — изменяет стили для отдельных символов.
- `styleset()` — используются стилистические альтернативы для набора символов.
- `character-variant()` — определённые стилистические варианты для символов. Похож на `styleset()`, но не устанавливает точного соответствия между символами.
- `swash()` — включает глифы с хвостиками.
- `ornaments()` — включает декоративные шрифтовые символы.
- `annotation()` — включает символы аннотации (обведённые цифры или инвертированный символ).

В функции в качестве параметра передаётся имя конкретного шрифта, сопоставленное с числом.

```css
@font-feature-values "Leitura Display Swashes" {
  @swash { fancy: 1 }
}

body {
  font-family: Leitura Display Swashes, serif;
  font-variant-alternates: swash(fancy);
}
```
