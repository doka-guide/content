---
title: "`CSSStyleDeclaration`"
description: "Объект, который хранит информацию о ваших CSS-стилях."
authors:
  - doka-dog
related:
  - js/object
  - js/objects-objects-everywhere
  - js/document-design-mode
tags:
  - doka
  - placeholder
---

## Кратко

Интерфейс `CSSStyleDeclaration` представляет объект, в котором хранится информацию о CSS-стилях и связанных с ними методах и свойствах.

`CSSStyleDeclaration`-объект возвращают другие [API](https://doka.guide/tools/api/) — `HTMLElement.style`, `CSSStyleSheet` и `Window.getComputedStyle()`.

## Как пишется

### Атрибуты и свойства

Через `CSSStyleDeclaration` можете обращаться ко всем CSS-свойствам. Для этого укажите название нужного свойства в CamelCase. Например, `maxWidth` или `flexDirection`.

Специальные атрибуты и свойства:

- `cssText` — текстовое представление блока c CSS-правилами.
- `length` — количество свойств. Только для чтения.
- `parentRule` — CSS-правила для родительского элемента. Только для чтения.
- `cssFloat` — алиас для [CSS-свойства `float`](/css/float/).

### Методы

- `.setProperty()` — изменяет или задаёт новое CSS-свойство.
- `.removeProperty()` — удаляет CSS-свойство.
- `.getPropertyValue()` — возвращает значение свойства по его названию.
- `.getPropertyCSSValue()` — возвращает значение свойства в виде интерфейса `CSSPrimitiveValue` или `null` для сокращённых CSS-свойств.
- `.item()` — возвращает название свойства.
- `.getPropertyPriority()` — возвращает необязательный приоритет [`!important`](https://doka.guide/css/important/).
