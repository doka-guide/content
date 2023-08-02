---
title: "`subscript`"
description: "Роль для подстрочного текста."
authors:
  - doka-dog
related:
  - a11y/role-superscript
  - html/sub
  - html/sup
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для подстрочного текста. Например, как в химических формулах.

Роль `subscript` есть у [`<sub>`](/html/sub/) по умолчанию.

## Как пишется

Задайте тегу `role="subscript"`. Для этого больше всего подходит [`<span>`](/html/span/). В большинстве случаев лучше использовать тег `<sub>`.

Элементам с ролью `subscript` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy), кроме [`aria-label`](/a11y/aria-label/) и [`aria-labelledby`](/a11y/aria-labelledby/).
