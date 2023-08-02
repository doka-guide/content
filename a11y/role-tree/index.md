---
title: "`tree`"
description: "Роль древовидного списка."
authors:
  - doka-dog
related:
  - a11y/role-treeitem
  - a11y/role-treegrid
  - html/ul
tags:
  - doka
  - placeholder
---

## Кратко

[Самостоятельная роль виджета](/a11y/aria-roles/#roli-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для древовидного списка. Это список, в котором видна иерархия элементов. С такими списками встречались в файловых системах, где видны папки и их вложенность.

В HTML нет тега с этой ролью.

## Как пишется

Задайте `role="tree"` любому тегу, лучше всего [`<div>`](/html/div/), [`<span>`](/html/span/) или [`<ul>`](/html/ul/).

Внутри элемента с ролью `tree` должны быть один или несколько пунктов списка с ролью [`treeitem`](/a11y/role-treeitem/).

ARIA-роли не изменяют внешний вид и поведение элементов, поэтому не забудьте стилизовать древовидный список и добавить поддержку клавиатуры с помощью JavaScript и [`tabindex`](/html/global-attrs/#tabindex).

Для `tree` можно использовать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy), а также некоторые [атрибуты виджетов](/a11y/aria-attrs/#atributy-vidzhetov) — [`aria-errormessage`](/a11y/aria-errormessage/), [`aria-invalid`](/a11y/aria-invalid/), [`aria-multiselectable`](/a11y/aria-multiselectable/) и [`aria-required`](/a11y/aria-required/).

У `tree` по умолчанию есть атрибут [`aria-orientation`](/a11y/aria-orientation/) со значением `vertical`.
