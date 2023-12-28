---
title: "`aria-sort`"
description: "ARIA-атрибут для сортировки содержимого в колонке (столбце) или строке таблицы и сетки."
authors:
  - doka-dog
related:
  - a11y/role-rowheader
  - a11y/role-columnheader
  - html/tables
tags:
  - doka
  - placeholder
---

## Кратко

[Свойство виджета](/a11y/aria-attrs/#atributy-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya). Сообщает о том, как было отсортировано содержимое таблицы или сетки в колонке (столбце) или строке.

## Как пишется

Добавьте к тегу атрибут `aria-sort` с одним из нескольких значений:

- `none` (по умолчанию) — элементы не отсортированы.
- `ascending` — сортировка по возрастанию.
- `descending` — сортировка по убыванию.
- `other` — другой способ сортировки.

`aria-sort` можно задавать только заголовкам таблиц или сеток — [`<th>`](/html/tables/#th) или ролям [`columnheader`](/a11y/role-columnheader/) и [`rowheader`](/a11y/role-rowheader/).
