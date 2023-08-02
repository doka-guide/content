---
title: "`associationlistitemvalue`"
description: "Роль для значение ключа из ассоциативного списка."
authors:
  - doka-dog
keywords:
  - a-list
  - ассоциативный массив
  - хэш-массив
  - хэш
  - cons-ячейки
  - список пар
  - cdr-элемент
  - datum
related:
  - a11y/role-associationlist
  - a11y/aria-posinset
  - a11y/aria-setsize
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) значения ключа в ассоциативном списке.

В HTML нет тега с такой ролью.

<aside>

👶 Эта роль из [черновика ARIA 1.3](https://w3c.github.io/aria/). Она пока плохо поддерживается, так что сейчас её лучше не использовать.

</aside>

## Как пишется

Задайте тегу `role="associationlistitemvalue"`. Для этого больше всего подходит [`<span>`](/html/span/) или [`div`](/html/div/).

Элемент `associationlistitemvalue` обязательно должен быть вложен внутрь ассоциативного списка с ролью [`associationlist`](/a11y/role-associationlist/). Также рядом с ним должен находиться связанный с ним ключ с [`associationlistitemkey`](/a11y/role-associationlistitemkey/).

Элементам с ролью `associationlistitemvalue` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy) и атрибуты виджетов [`aria-posinset`](/a11y/aria-posinset/) и [`aria-setsize`](/a11y/aria-setsize/).
