---
title: "`meter`"
description: "Роль счётчика, который отображает числовое значение в заданном диапазоне."
authors:
  - doka-dog
related:
  - a11y/aria-roles
  - a11y/aria-valuenow
  - html/meter
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для визуального отображения числового значения в заданном диапазоне — счётчика.

В HTML эта роль есть у [`<meter>`](/html/meter/) по умолчанию.

## Как пишется

Задайте тегу `role="meter"`, лучше всего [`<div>`](/html/div/) или [`<span>`](/html/span/). В большинстве случаев используйте тег `<meter>`.

У `meter` должны быть атрибуты [`aria-valuemin`](/a11y/aria-valuemin/) для минимального значения, [`aria-valuemax`](/a11y/aria-valuemax/) для максимального и [`aria-valuenow`](/a11y/aria-valuenow/) для текущего. По умолчанию роли заданы `aria-valuemin="0"` и `aria-valuemax="100"`. Значение `aria-valuenow` не должно быть выше максимального значения и ниже минимального.

Элементам с ролью `meter` можно также задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy).
