---
title: "`menuitemradio`"
description: "Роль пункта списка в виде радиокнопки из меню как в программе, операционной системе или приложении."
authors:
  - doka-dog
related:
  - a11y/role-menuitemcheckbox
  - a11y/role-menubar
  - a11y/role-menu
tags:
  - doka
  - placeholder
---

## Кратко

[Самостоятельная роль виджета](/a11y/aria-roles/#roli-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для пункта в виде радиокнопки из «настоящего» меню как в программе, операционной системе или приложении.

В HTML нет тега с такой ролью.

## Как пишется

Задайте `role="menuitemradio"` любому тегу, лучше всего [`<div>`](/html/div/), [`<span>`](/html/span/) или [`<li>`](/html/li/).

Элемент с `menuitemradio` обязательно должен находится внутри другого с [`menu`](/a11y/role-menu/) или [`menubar`](/a11y/role-menubar/).

Не забудьте добавить `menuitemradio` в порядок фокуса с помощью [`tabindex`](/html/global-attrs/#tabindex).

У элемента с `menuitemradio` обязательно должен быть атрибут [`aria-checked`](/a11y/aria-checked/), как у любой другой радиокнопки. Только у одного элемента в группе может быть `aria-checked="true"`.

С ролью `menuitemradio` можно сочетать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy) и некоторые другие [атрибуты виджетов](/a11y/aria-attrs/#atributy-vidzhetov) — [`aria-disabled`](/a11y/aria-disabled/), [`aria-expanded`](/a11y/aria-expanded/), [`aria-haspopup`](/a11y/aria-haspopup/), [`aria-posinset`](/a11y/aria-posinset/) и [`aria-setsize`](/a11y/aria-setsize/).
