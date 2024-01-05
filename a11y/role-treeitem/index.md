---
title: "`treeitem`"
description: "Роль для пункта древовидного списка."
authors:
  - doka-dog
related:
  - a11y/role-treegrid
  - a11y/role-tree
  - html/li
tags:
  - doka
  - placeholder
---

## Кратко

[Самостоятельная роль виджета](/a11y/aria-roles/#roli-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для пункта из древовидного списка.

В древовидном списке видна иерархия элементов. С такими списками встречались в файловых системах, где видны папки и их вложенность.

В HTML нет тега с такой ролью.

## Как пишется

Задайте `role="treeitem"` любому тегу, лучше всего [`<div>`](/html/div/), [`<span>`](/html/span/) или [`<li>`](/html/li/).

Элемент с `treeitem` обязательно должен находится внутри [`tree`](/a11y/role-tree/).

Элементам с ролью `treeitem` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy) и некоторые [атрибуты виджетов](/a11y/aria-attrs/#atributy-vidzhetov) — [`aria-disabled`](/a11y/aria-disabled/), [`aria-expanded`](/a11y/aria-expanded/), [`aria-haspopup`](/a11y/aria-haspopup/), [`aria-level`](/a11y/aria-level/), [`aria-checked`](/a11y/aria-checked/), [`aria-posinset`](/a11y/aria-posinset/), [`aria-selected`](/a11y/aria-selected/) и [`aria-setsize`](/a11y/aria-setsize/).
