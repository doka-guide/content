---
title: "`aria-colindex`"
description: "ARIA-атрибут для числового индекса или позиции колонки (столбца) таблицы, обычной или древовидной сетки."
authors:
  - doka-dog
related:
  - a11y/aria-rowindex
  - a11y/aria-colcount
  - html/tables
tags:
  - doka
  - placeholder
---

## Кратко

[Свойство связи](/a11y/aria-attrs/#atributy-svyazi) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для индекса или позиции колонки (столбца) в виде числа у таблицы, обычной или древовидной сетки.

## Как пишется

Добавьте к родительскому элементу `aria-colindex` со значением в виде целого числа, больше 1. Например, `1`, `2` или `10`. Значение должно быть равно номеру колонки в таблице или сетке.

`aria-colindex` можно задавать только некоторым тегам и [ARIA-ролям](/a11y/aria-roles/) — [`<td>`](/html/tables/#td) или [`cell`](/a11y/role-cell/), [`<tr>`](/html/tables/#tr) или [`row`](/a11y/role-row/).
