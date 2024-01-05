---
title: "`rowgroup`"
description: "Роль строк с заголовком, её основным содержимым и итоговым результатом в таблице или сетке."
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

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для строк таблицы или сетки с заголовком, её основным содержимым и итоговым результатом.

Эквиваленты в HTML — [`<tbody>`](/html/tables/#tbody), [`<thead>`](/html/tables/#thead) и [`<tfoot>`](/html/tables/#tfoot).

## Как пишется

Задайте тегу `role="rowgroup"`, лучше всего [`<div>`](/html/div/) или [`<span>`](/html/span/). В большинстве случаев используйте тег `<tr>`.

Элемент `rowgroup` обязательно должен быть вложен в контейнер с ролями [`grid`](/a11y/role-grid/), [`treegrid`](/a11y/role-treegrid/) или [`table`](/a11y/role-table/), которая есть по умолчанию у [`<table>`](/html/tables/).

Внутри строки с `rowgroup` должна находится минимум одна строка с [`row`](/a11y/role-row/). Эта роль по умолчанию есть у тега [`<tr>`](/html/tables/#tr).

Элементам с ролью `rowgroup` также можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy).
