---
title: "`treegrid`"
description: "ARIA-роль для древовидной сетки."
authors:
  - doka-dog
related:
  - a11y/role-tree
  - a11y/role-treeitem
  - html/tables
tags:
  - doka
  - placeholder
---

## Кратко

[Самостоятельная роль виджета](/a11y/aria-roles/#roli-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для древовидной сетки.

Древовидная сетка похожа на таблицу и состоит из нескольких ячеек, которые можно раскрыть или скрыть. При этом данные внутри ячеек расположены в определённой иерархии. К примеру, древовидные сетки встречали в почтовых клиентах, в которых важно показать как письма связаны друг с другом.

В HTML нет тега с этой ролью.

## Как пишется

Задайте `role="treegrid"` любому тегу, но лучше всего [`<div>`](/html/div/), [`<span>`](/html/span/) или [`<table>`](/html/tables/).

Внутри элемента с ролью `treegrid` должна быть одна или несколько ячеек с ролью [`row`](/a11y/role-row/). Эта роль есть по умолчанию у тега [`<tr>`](/html/tables/#tr).

ARIA-роли не изменяют внешний вид и поведение элементов, поэтому не забудьте стилизовать древовидную сетку с помощью CSS и добавить поддержку клавиатуры с помощью JavaScript и [`tabindex`](/html/global-attrs/#tabindex).

Для `treegrid` можно использовать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy), [атрибуты виджетов](/a11y/aria-attrs/#atributy-vidzhetov) [`aria-disabled`](/a11y/aria-disabled/), [`aria-invalid`](/a11y/aria-invalid/), [`aria-readonly`](/a11y/aria-readonly/), [`aria-multiselectable`](/a11y/aria-multiselectable/), [`aria-orientation`](/a11y/aria-orientation/) и [`aria-required`](/a11y/aria-required/), а также [атрибуты связи](/a11y/aria-attrs/#atributy-svyazi) [`aria-activedescendant`](/a11y/aria-activedescendant/), [`aria-colcount`](/a11y/aria-colcount/) и [`aria-rowcount`](/a11y/aria-rowcount/).
