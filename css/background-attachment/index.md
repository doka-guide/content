---
title: "`background-attachment`"
description: "Одним свойством создаём эффектный параллакс."
baseline:
  - group: background-attachment
    features:
      - css.properties.background-attachment
      - css.properties.background-attachment.fixed
      - css.properties.background-attachment.local
      - css.properties.background-attachment.scroll
      - css.properties.background-attachment.multiple_backgrounds
authors:
  - doka-dog
keywords:
  - закрепление фона
related:
  - css/background
  - css/background-position
  - css/radial-gradient
tags:
  - doka
  - placeholder
---

## Кратко

Свойство `background-attachment` определяет будет ли фон прокручиваться вместе со страницей или будет зафиксирован на одном месте. Часто используется для создания так называемого эффекта параллакса.

## Как пишется

Доступные значения:

- `fixed` — фон фиксируется и не прокручивается вместе с элементом.
- `local` — фон фиксируется с учётом поведения элемента. Если элемент имеет прокрутку, то фон будет прокручиваться вместе с содержимым, но фон выходящий за рамки элемента остаётся на месте.
- `scroll` — значение по умолчанию, фон перемещается вместе с содержимым элемента.
