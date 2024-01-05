---
title: "`scrollbar`"
description: "Роль для кастомной полосы прокрутки."
authors:
  - doka-dog
related:
  - a11y/aria-orientation
  - a11y/aria-controls
  - a11y/aria-valuenow
tags:
  - doka
  - placeholder
---

## Кратко

[Самостоятельная роль виджета](/a11y/aria-roles/#roli-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для полосы прокрутки.

В HTML нет тега с такой ролью.

## Как пишется

Задайте `role="scrollbar"` любому тегу, лучше всего [`<div>`](/html/div/) или [`<span>`](/html/span/). Не забудьте добавить `scrollbar` в порядок фокуса с помощью [`tabindex`](/html/global-attrs/#tabindex).

У элемента со `scrollbar` обязательно должны быть атрибуты [`aria-controls`](/a11y/aria-controls/) и [`aria-valuenow`](/a11y/aria-valuenow/).

С ролью `scrollbar` можно сочетать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy) и некоторые другие [атрибуты виджетов](/a11y/aria-attrs/#atributy-vidzhetov) — [`aria-disabled`](/a11y/aria-disabled/), [`aria-orientation`](/a11y/aria-orientation/), [`aria-valuemax`](/a11y/aria-valuemax/), [`aria-valuemin`](/a11y/aria-valuemin/) и [`aria-valuetext`](/a11y/aria-valuetext/).

По умолчанию у `scrollbar` есть атрибуты `aria-orientation="vertical"`, `aria-valuemin="0"` и `aria-valuemax="100"`.
