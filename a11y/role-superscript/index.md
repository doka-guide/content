---
title: "`superscript`"
description: "Роль для надстрочного текста."
authors:
  - doka-dog
related:
  - a11y/role-subscript
  - html/sub
  - html/sup
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для надстрочного текста. Например, как в математических формулах.

Роль `superscript` есть у [`<sup>`](/html/sup/) по умолчанию.

## Как пишется

Задайте тегу `role="superscript"`. Для этого больше всего подходит [`<span>`](/html/span/). В большинстве случаев лучше использовать тег `<sup>`.

Элементам с ролью `superscript` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy), кроме [`aria-label`](/a11y/aria-label/) и [`aria-labelledby`](/a11y/aria-labelledby/).
