---
title: "`table`"
description: "Роль таблицы из WAI-ARIA."
authors:
  - doka-dog
related:
  - html/tables
  - a11y/role-grid
  - a11y/role-treegrid
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya), которая есть у простых таблиц с любыми данными.

В HTML роль `table` есть у [`<table>`](/html/tables/) по умолчанию.

## Как пишется

Задайте тегу `role="table"`. Для этого больше всего подходят [`<div>`](/html/div/) или [`<span>`](/html/span/). В большинстве случаев используйте `<table>`.

Когда создаёте свою таблицу, внутри `table` обязательно должны быть отдельные элементы с ролью [`row`](/a11y/role-row/) или вложенные внутрь [`rowgroup`](/a11y/role-rowgroup/).

Элементам с ролью `table` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy) и два [атрибута связи](/a11y/aria-attrs/#atributy-svyazi) [`aria-colcount`](/a11y/aria-colcount/) и [`aria-rowcount`](/a11y/aria-rowcount/).

## Как понять

Роль `table` нужна для обычных таблиц, с которыми нельзя особо взаимодействовать. Если это сложная таблица как в Exel, в которой можно менять колонки местами, сортировать данные несколькими способами и как-то ещё взаимодействовать, используйте роли [`grid`](/a11y/role-grid/) или [`treegrid`](/a11y/role-treegrid/).
