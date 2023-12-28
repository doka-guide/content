---
title: "`cell`"
description: "Роль ячейки обычной таблицы."
authors:
  - doka-dog
related:
  - a11y/role-row
  - a11y/role-table
  - html/tables
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для ячейки таблицы.

В HTML эта роль есть у [`<td>`](/html/tables/#td) по умолчанию.

## Как пишется

Задайте тегу `role="cell"`, лучше всего [`<div>`](/html/div/) или [`<span>`](/html/span/). В большинстве случаев используйте тег `<td>`.

Ячейка обязательно должна быть вложена в контейнер с ролью [`row`](/a11y/role-row/), которая есть по умолчанию у [`<tr>`](/html/tables/#tr).

Элементам с ролью `cell` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy), а также некоторые [атрибуты связи](/a11y/aria-attrs/#atributy-svyazi) — [`aria-colindex`](/a11y/aria-colindex/), [`aria-colspan`](/a11y/aria-colspan/), [`aria-rowindex`](/a11y/aria-rowindex/) и [`aria-rowspan`](/a11y/aria-rowspan/).
