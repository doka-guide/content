---
title: "`row`"
description: "Роль строки таблицы или сетки."
authors:
  - doka-dog
related:
  - a11y/role-treegrid
  - a11y/role-grid
  - html/tables
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для строки таблицы, а также обычной или древовидной сетки.

В HTML эта роль есть у [`<tr>`](/html/tables/#tr) по умолчанию.

## Как пишется

Тегам  можно установить атрибут `role="row". Чаще всего эта роль используется для тега `<tr>`, но можно использовать эту роль и для тегов [`<div>`](/html/div/) или [`<span>`](/html/span/)

Строка обязательно должна быть вложена в контейнер с ролями [`grid`](/a11y/role-grid/), [`treegrid`](/a11y/role-treegrid/), [`rowgroup`](/a11y/role-rowgroup/) или [`table`](/a11y/role-table/), которая есть по умолчанию у [`<table>`](/html/tables/).

Внутри строки с `row` должен находится как минимум один элемент с [`cell`](/a11y/role-cell/), [`gridcell`](/a11y/role-gridcell/), [`columnheader`](/a11y/role-columnheader/) или [`rowheader`](/a11y/role-rowheader/).

В случае обычной сетки или таблицы элементу с ролью `row` можно задавать атрибуты [`aria-expanded`](/a11y/aria-expanded/), [`aria-posinset`](/a11y/aria-posinset/), [`aria-setsize`](/a11y/aria-setsize/) и [`aria-level`](/a11y/aria-level/).

Элементам с ролью `row` также можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy), а также некоторые [атрибуты связи](/a11y/aria-attrs/#atributy-svyazi) — [`aria-colindex`](/a11y/aria-colindex/) и [`aria-rowindex`](/a11y/aria-rowindex/).
