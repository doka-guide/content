---
title: "`progressbar`"
description: "Роль для прогресс-бара, индикатора выполнения задачи."
authors:
  - doka-dog
related:
  - a11y/aria-valuemin
  - a11y/role-status
  - html/progress
tags:
  - doka
  - placeholder
---

## Кратко

[Самостоятельная роль виджета](/a11y/aria-roles/#roli-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для индикатор выполнения задачи — прогресс-бара.

В HTML эта роль есть у [`<progress>`](/html/progress/) по умолчанию.

## Как пишется

Задайте `role="progressbar"` любому тегу, но лучше всего [`<div>`](/html/div/) или [`<span>`](/html/span/). В большинстве случаев лучше использовать `<progress>`.

У `progressbar` должны быть атрибуты [`aria-valuemin`](/a11y/aria-valuemin/) для минимального значения, [`aria-valuemax`](/a11y/aria-valuemax/) для максимального и [`aria-valuenow`](/a11y/aria-valuenow/) для текущего. По умолчанию роли заданы `aria-valuemin="0"` и `aria-valuemax="100"`. Значение `aria-valuenow` не должно быть выше максимального значения и ниже минимального.

Если прогресс выполнения задачи относится к определённой части страницы, свяжите прогресс-бар с ней при помощи [`aria-describedby`](/a11y/aria-describedby/) и задайте этой части страницы [`aria-busy="true"`](/a11y/aria-busy/).

Элементам с ролью `progressbar` также можно задавать остальные [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy).
