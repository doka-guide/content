---
title: "`aria-colcount`"
description: "ARIA-атрибут для числа колонок (столбцов) в таблице, а также обычной или древовидной сетке."
authors:
  - doka-dog
related:
  - a11y/role-treegrid
  - a11y/role-tree
  - html/tables
tags:
  - doka
  - placeholder
---

## Кратко

[Свойство связи](/a11y/aria-attrs/#atributy-svyazi) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для обозначения общего количества колонок (столбцов) в таблице, обычной или древовидной сетке.

## Как пишется

Добавьте к родительскому элементу `aria-colcount` со значением в виде целого числа. Например, `1`, `2` или `10`. Значение должно быть равно количеству колонок. Если их число неизвестно, используйте `-1`.

`aria-colcount` можно задавать только некоторым тегам и [ARIA-ролям](/a11y/aria-roles/) — [`<table>`](/html/tables/) или ролям [`table`](/a11y/role-table/), [`tree`](/a11y/role-tree/) и [`treegrid`](/a11y/role-treegrid/). При этом у [`<table>`] этот атрибут есть по умолчанию.
