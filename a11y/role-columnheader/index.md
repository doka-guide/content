---
title: "`columnheader`"
description: "Роль заголовка ячейки или строки таблицы и обычной сетки."
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

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для заголовка ячейки или строки таблицы и обычной сетки.

В HTML эта роль есть по умолчанию у [`<th>`](/html/tables/#th) с атрибутом `scope="col`.

## Как пишется

Задайте тегу `role="columnheader"`, лучше всего [`<div>`](/html/div/) или [`<span>`](/html/span/). В большинстве случаев используйте тег `<th scope="col">`.

Элемент `columnheader` можно вкладывать в контейнер с ролью [`grid`](/a11y/role-grid/) или [`table`](/a11y/role-table/), которая есть по умолчанию у [`<table>`](/html/tables/).

Внутри заголовка с `columnheader` должна находится минимум одна строка с [`row`](/a11y/role-row/). Эта роль по умолчанию есть у тега [`<tr>`](/html/tables/#tr).

Если это обычная и древовидная сетка, то у элемента с `columnheader` могут быть атрибуты [`aria-readonly`](/a11y/aria-readonly/) и [`aria-required`](/a11y/aria-required/).

Элементам с ролью `columnheader` также можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy) и ещё один атрибут виджета [`aria-sort`](/a11y/aria-sort/).
