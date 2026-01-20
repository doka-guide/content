---
title: "`anchor-name`"
description: "Объявляет элемент якорным."
baseline:
  - group: anchor-positioning
    features:
      - css.properties.anchor-name
      - css.properties.anchor-name.none
authors:
  - akhmadullin
related:
  - css/position
  - css/position-anchor
  # - css/anchor-scope
tags:
  - doka
---

## Кратко

Свойство `anchor-name` задаёт якорное имя для элемента.

## Пример

```css
.anchor {
  anchor-name: --my-anchor;
}
```

## Как пишется

Возможные значения `anchor-name`:

- `none` — значение по умолчанию, якорное имя не задаётся;
- `<anchor-name>` — якорное имя, должно начинаться с двух дефисов.

## Как понять

Свойство `anchor-name` объявляет элемент якорным. Оно задаёт имя, с помощью которого другие элементы могут сослаться на текущий, чтобы спозиционироваться относительно него.
