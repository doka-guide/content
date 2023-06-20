---
title: "`aria-valuenow`"
description: "ARIA-атрибут для текущего значения элемента с диапазоном чисел."
authors:
  - doka-dog
related:
  - a11y/aria-attrs
  - html/input
  - html/progress
tags:
  - doka
  - placeholder
---

## Кратко

[Свойство виджета](/a11y/aria-attrs/#atributy-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для текущего значения элемента с диапазоном чисел — индикатора загрузки, поля с выбором числа, ползунка и других.

## Как пишется

Добавьте к тегу `aria-valuenow` со значением в виде целого или дробного числа. К примеру, `1`, `0`, `2` или `0.5`.

`aria-valuenow` можно задавать только некоторым тегам и [ARIA-ролям](/a11y/aria-roles/):

- [`<input type="range">`](/html/input/#type) или `range` и `slider`;
- [`<input type="number">`](/html/input/#type) или `spinbutton`;
- [`separator`](/a11y/role-separator/), когда разделитель интерактивный;
- [`<meter>`](/html/meter/) или `meter`;
- [`<progress>`](/html/progress/) или `progressbar`;
- `scrollbar`.

Когда у элемента есть максимальное и минимальное значения, не забудьте добавить ещё `aria-valuemax` и `aria-valuemin`.

Если никак не определить текущее значение, просто не используйте `aria-valuenow`.
