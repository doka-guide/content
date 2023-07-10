---
title: "`aria-valuemax`"
description: "ARIA-атрибут для максимального значения элемента с диапазоном чисел."
authors:
  - doka-dog
related:
  - a11y/aria-valunow
  - a11y/aria-valuemin
  - html/input
tags:
  - doka
  - placeholder
---

## Кратко

[Свойство виджета](/a11y/aria-attrs/#atributy-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для максимального значения элементов с диапазоном чисел — индикаторов загрузки, полей с выбором числа, ползунков и других.

В HTML на `aria-valuemax` похож атрибут `max` у [`<input>`](/html/input/).

## Как пишется

Добавьте к тегу `aria-valuemax` со значением в виде целого или дробного числа. К примеру, `1`, `0`, `2` или `0.5`. Важно, чтобы значение `aria-valuemax` было выше или таким же, как у [`aria-valuemin`](/a11y/aria-valuemin/).

`aria-valuemax` можно задавать только некоторым тегам и ролям:

- [`<input type="range">`](/html/input/#type) или ролям `range` и `slider`;
- [`<input type="number">`](/html/input/#type) или `spinbutton`;
- [`separator`](/a11y/role-separator/), когда разделитель интерактивный;
- [`<meter>`](/html/meter/) или `meter`;
- [`<progress>`](/html/progress/) или `progressbar`;
- `scrollbar`.
