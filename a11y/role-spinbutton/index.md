---
title: "`spinbutton`"
description: "Роль для поля, в которое вводят число."
authors:
  - doka-dog
related:
  - a11y/aria-valuenow
  - a11y/aria-valuemin
  - a11y/aria-valuemax
tags:
  - doka
  - placeholder
---

## Кратко

[Самостоятельная роль виджета](/a11y/aria-roles/#roli-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) поля для ввода числа. В таком поле известно максимальное и минимальное значения.

В HTML эта роль есть у [`<input type="number">`](/html/input/) по умолчанию.

## Как пишется

Задайте `role="spinbutton"` любому тегу, но лучше всего [`<div>`](/html/div/) или [`<span>`](/html/span/). В большинстве случаев лучше использовать `<input type="number">`.

Для кастомного поля `spinbutton` обязательно вложите внутрь [`<textarea>`](/html/textarea/) или `<input type="text">` и/или две кнопки [`<button>`](/html/button/).

У `spinbutton` должны быть атрибуты [`aria-valuemin`](/a11y/aria-valuemin/) для минимального значения, [`aria-valuemax`](/a11y/aria-valuemax/) для максимального и [`aria-valuenow`](/a11y/aria-valuenow/) для текущего. По умолчанию роли задан `aria-valuenow="0"`.

Элементам с ролью `spinbutton` также можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy)и атрибуты виджетов [`aria-errormessage`](/a11y/aria-errormessage/), [`aria-invalid`](/a11y/aria-invalid/), [`aria-readonly`](/a11y/aria-readonly/), [`aria-required`](/a11y/aria-required/) и [`aria-valuetext`](/a11y/aria-valuetext/).
