---
title: "`insertion`"
description: "Роль для добавленного содержимого."
authors:
  - doka-dog
related:
  - a11y/role-deletion
  - html/ins
  - html/del
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для добавленного содержимого.

Роль `insertion` есть у [`<ins>`](/html/ins/) по умолчанию.

## Как пишется

Задайте тегу `role="insertion"`. Для этого больше всего подходит [`<span>`](/html/span/). В большинстве случаев лучше использовать тег `<ins>`.

Элементам с ролью `insertion` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy), кроме [`aria-label`](/a11y/aria-label/) и [`aria-labelledby`](/a11y/aria-labelledby/).
