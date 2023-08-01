---
title: "`aria-colspan`"
description: "ARIA-атрибут для числа колонок (столбцов), которые объединены в ячейку таблицы и обычной или древовидной сетки."
authors:
  - doka-dog
related:
  - a11y/role-columnheader
  - a11y/aria-colindex
  - html/tables
tags:
  - doka
  - placeholder
---

## Кратко

[Свойство связи](/a11y/aria-attrs/#atributy-svyazi) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для обозначения количества колонок (столбцов), которые объединены в одну ячейку таблицы, а также обычной или древовидной сетки.

Эквивалент в HTML — [`colspan`](/html/tables/#atributy).

## Как пишется

Добавьте к тегу `aria-colspan` со значением в виде целого числа, которое больше или равно 1. Например, `1` или `2`. Атрибут лучше использовать только для кастомных таблиц и сеток. Если используете [`<table>`](/html/tables/) и нативные возможности HTML, лучше задавать `colspan`.

`aria-colspan` можно использовать только для некоторых тегов и [ARIA-ролей](/a11y/aria-roles/) — [`<td>`](/html/tables/#td) или роли [`cell`](/a11y/role-cell/), [`<th>`](/html/tables/#th) или [`columnheader`](/a11y/role-columnheader/) и [`rowheader`](/a11y/role-rowheader/).
