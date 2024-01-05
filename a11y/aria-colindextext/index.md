---
title: "`aria-colindextext`"
description: "Атрибут для индекса или позиции колонки (столбца) в виде текста из таблицы или сетки."
authors:
  - doka-dog
related:
  - a11y/aria-colindex
  - a11y/aria-rowindextext
  - a11y/role-cell
tags:
  - doka
  - placeholder
---

## Кратко

[Свойство связи](/a11y/aria-attrs/#atributy-svyazi) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для индекса или позиции колонки (столбца) в виде текста у таблицы, а также обычной и древовидной сеток.

На это свойство похоже [`aria-colindex`](/a11y/aria-colindex/). Главная разница в том, что `aria-colindextext` содержит текстовое описание индекса колонки, а `aria-colindex` — в виде числа.

<aside>

👶 Это атрибут из [черновика ARIA 1.3](https://w3c.github.io/aria/). Он пока плохо поддерживается, так что сейчас его лучше не использовать.

</aside>

## Как пишется

Добавьте к родительскому элементу `aria-colindextext` со значением в виде текста. Например, `Один`, `Два` или `Десять`. Значение должно быть равно номеру колонки в таблице или сетке.

Используйте `aria-colindextext` вместе с [`aria-colindex`](/a11y/aria-colindex/) и только тогда, когда одного числового значения не хватает для полного понимания положения пользователя в таблице или сетке. К примеру, в электронной таблице.

`aria-colindextext` можно задавать только некоторым тегам и ARIA-ролям — [`<td>`](/html/tables/#td) или роли [`cell`](/a11y/role-cell/), а также [`gridcell`](/a11y/role-gridcell/).
