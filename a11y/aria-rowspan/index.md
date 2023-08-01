---
title: "`aria-rowspan`"
description: "ARIA-атрибут для числа строк, которые объединены в ячейку таблицы и обычной или древовидной сетки."
authors:
  - doka-dog
related:
  - a11y/aria-rowindex
  - a11y/aria-rowcount
  - html/tables
tags:
  - doka
  - placeholder
---

## Кратко

[Свойство связи](/a11y/aria-attrs/#atributy-svyazi) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для обозначения количества строк, которые объединены в одну ячейку таблицы, а также обычной или древовидной сетки.

Эквивалент в HTML — [`rowspan`](/html/tables/#atributy).

## Как пишется

Добавьте к тегу `aria-rowspan` со значением в виде целого числа, которое меньше или равно 0. Например, `0` или `-1`. Атрибут лучше использовать только для кастомных таблиц и сеток. Если используете [`<table>`](/html/tables/) без явно указанной ARIA-роли и нативные возможности HTML, лучше задавать `rowspan`.

`aria-rowspan` можно задавать только некоторым тегам и [ARIA-ролям](/a11y/aria-roles/) — [`<td>`](/html/tables/#td) или роли [`cell`](/a11y/role-cell/), [`<th>`](/html/tables/#th) или [`columnheader`](/a11y/role-columnheader/) и [`rowheader`](/a11y/role-rowheader/).
