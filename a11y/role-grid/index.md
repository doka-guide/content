---
title: "`grid`"
description: "ARIA-роль для сетки как в Exel."
authors:
  - doka-dog
related:
  - a11y/aria-multiselectable
  - a11y/role-gridcell
  - html/tables
tags:
  - doka
  - placeholder
---

## Кратко

[Составная роль виджета](/a11y/aria-roles/#roli-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для сетки.

Сетка чем-то похожа на таблицу. Она состоит из колонок и строк с ячейками, на которых можно делать фокус и перемещаться между ними с помощью стрелок в разных направлениях. С сетками, например, могли сталкиваться в Exel.

В HTML нет тега с этой ролью.

## Как пишется

Задайте `role="grid"` любому тегу, но лучше всего [`<div>`](/html/div/), [`<span>`](/html/span/) или [`<table>`](/html/tables/).

Внутри элемента с ролью `grid` должно быть несколько ячеек с ролью [`gridcell`](/a11y/role-gridcell/).

ARIA-роли не изменяют внешний вид и поведение элементов, поэтому не забудьте стилизовать сетку с помощью CSS и добавить поддержку клавиатуры с помощью JavaScript и [`tabindex`](/html/global-attrs/#tabindex).

Для `grid` можно использовать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy), а также [атрибуты виджетов](/a11y/aria-attrs/#atributy-vidzhetov) [`aria-readonly`](/a11y/aria-readonly/) и [`aria-multiselectable`](/a11y/aria-multiselectable/).
