---
title: "`menuitem`"
description: "Роль пункта списка из меню как в программе, операционной системе или приложении."
authors:
  - doka-dog
related:
  - a11y/aria-intro
  - a11y/role-menubar
  - a11y/role-menu
tags:
  - doka
  - placeholder
---

## Кратко

[Самостоятельная роль виджета](/a11y/aria-roles/#roli-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для пункта из «настоящего» меню как в программе, операционной системе или приложении.

В HTML нет тега с этой ролью.

## Как пишется

Задайте `role="menuitem"` любому тегу, лучше всего [`<div>`](/html/div/), [`<span>`](/html/span/) или [`<li>`](/html/li/).

Элемент с `menuitem` нужно обязательно вкладывать внутрь другого с [`menu`](/a11y/role-menu/) или [`menubar`](/a11y/role-menubar/).

Не забудьте добавить пункт меню `menuitem` в порядок фокуса с помощью [`tabindex`](/html/global-attrs/#tabindex).

Элементам с ролью `menuitem` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy) и некоторые [атрибуты виджетов](/a11y/aria-attrs/#atributy-vidzhetov) — [`aria-disabled`](/a11y/aria-disabled/), [`aria-expanded`](/a11y/aria-expanded/), [`aria-haspopup`](/a11y/aria-haspopup/), [`aria-posinset`](/a11y/aria-posinset/) и [`aria-setsize`](/a11y/aria-setsize/).
