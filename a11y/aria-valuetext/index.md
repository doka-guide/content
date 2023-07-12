---
title: "`aria-valuetext`"
description: "ARIA-атрибут для текстового описания значений элемента с диапазоном чисел."
authors:
  - doka-dog
related:
  - a11y/aria-valuenow
  - html/progress
  - html/input
tags:
  - doka
  - placeholder
---

## Кратко

[Свойство виджета](/a11y/aria-attrs/#atributy-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для текстового описания значений элемента с диапазоном чисел. Это может понадобиться, когда недостаточно числового значения, например, у индикатора загрузки или ползунка.

## Как пишется

Добавьте к тегу `aria-valuetext` со значением в виде строки текста. К примеру, если это ползунок для выбора уровня знания языка, сложно понять, что значат числа. В этом случае можно задать ему `aria-valuetext` со значениями `Начальный`, `Средний` и `Продвинутый`.

`aria-valuetext` можно задавать только некоторым тегам и [ARIA-ролям](/a11y/aria-roles/):

- [`<input type="range">`](/html/input/#type) или `range` и `slider`;
- [`<input type="number">`](/html/input/#type) или `spinbutton`;
- [`separator`](/a11y/role-separator/), когда разделитель интерактивный;
- [`<meter>`](/html/meter/) или `meter`;
- [`<progress>`](/html/progress/) или `progressbar`;
- `scrollbar`.

Когда задаёте `aria-valuetext`, не забудьте также указать [`aria-valuenow`](/a11y/aria-valuenow/), если известно текущее значение.
