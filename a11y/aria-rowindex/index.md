---
title: "`aria-rowindex`"
description: "ARIA-атрибут для числового индекса или позиции строки таблицы, а также обычной и древовидной сетки."
authors:
  - doka-dog
related:
  - a11y/aria-attrs
  - a11y/aria-rowcount
  - html/tables
tags:
  - doka
  - placeholder
---

## Кратко

[Свойство связи](/a11y/aria-attrs/#atributy-svyazi) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для индекса или позиции строки таблицы, обычной или древовидной сетки в виде числа.

## Как пишется

Добавьте к родительскому элементу `aria-rowindex` со значением в виде целого числа, больше 1. Например, `1`, `2` или `10`. Значение должно быть равно номеру строки в таблице или сетке.

`aria-rowindex` можно задавать только некоторым тегам и [ARIA-ролям](/a11y/aria-roles/) — [`<td>`](/html/tables/#td) или [`cell`](/a11y/role-cell/), [`<tr>`](/html/tables/#tr) или [`row`](/a11y/role-row/).
