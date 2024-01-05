---
title: "`deletion`"
description: "Роль для удалённого содержимого."
authors:
  - doka-dog
related:
  - a11y/role-insertion
  - html/ins
  - html/del
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для удалённого содержимого, которое при это отображается на странице.

Роль `deletion` есть у [`<del>`](/html/del/) по умолчанию.

## Как пишется

Задайте тегу `role="deletion"`. Для этого больше всего подходит [`<span>`](/html/span/). В большинстве случаев лучше использовать тег `<del>`.

Элементам с ролью `deletion` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy), кроме [`aria-label`](/a11y/aria-label/) и [`aria-labelledby`](/a11y/aria-labelledby/).
