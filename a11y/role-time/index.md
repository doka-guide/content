---
title: "`time`"
description: "Роль для дат, времени или целого периода времени."
authors:
  - doka-dog
related:
  - a11y/aria-roles
  - html/time
  - html/span
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya), которая нужна для дат, времени или периода времени.

В HTML роль `time` есть у [`<time>`](/html/time/) по умолчанию.

## Как пишется

Задайте тегу `role="time"`. Для этого больше всего подходит [`<span>`](/html/span/). В большинстве случаев используйте тег `<time>`.

Пока что для роли `time` нет ARIA-атрибута, который бы повторял функциональность [`datetime`](/html/time/#kak-pishetsya). Так что пока эту роль лучше не задавать элементам явно.

Элементам с ролью `time` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy).
