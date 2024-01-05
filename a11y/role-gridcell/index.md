---
title: "`gridcell`"
description: "Роль ячейки из сетки как в Exel."
authors:
  - doka-dog
related:
  - a11y/aria-attrs
  - a11y/role-grid
  - html/tables
tags:
  - doka
  - placeholder
---

## Кратко

[Самостоятельная роль виджета](/a11y/aria-roles/#roli-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для ячейки из обычной или древовидной сетки.

Сетка чем-то похожа на таблицу. Она состоит из колонок и строк с ячейками, на которых можно делать фокус и перемещаться между ними с помощью стрелок в разных направлениях. С сетками, например, могли сталкиваться в Exel.

В HTML нет тега с такой ролью.

## Как пишется

Задайте `role="gridcell"` любому тегу, лучше всего [`<div>`](/html/div/), [`<span>`](/html/span/) или [`<td>`](/html/tables/#td).

`gridcell` обязательно должна быть вложена или связана с другим элементом с ролью [`row`](/a11y/role-row/). Роль `row` уже есть у [`<tr>`](/html/tables/#tr). Если это полностью кастомная сетка, не забудьте про заголовки ячеек или строк с ролями `rowheader` или `columnheader`, связанные со строками `row`.

Элемент с `gridcell` обязательно должен находится внутри другого с [`grid`](/a11y/role-grid/) или [`treegrid`](/a11y/role-treegrid/).

Ячейки можно редактировать, выбирать и делать на них фокус. С этим помогут JavaScript и глобальный атрибут [`tabindex`](/html/global-attrs/#tabindex).

Внутри ячеек могут быть интерактивные элементы. Например, ссылки, кнопки или чекбоксы.

Элементам с ролью `gridcell` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy) и [атрибуты виджетов](/a11y/aria-attrs/#atributy-vidzhetov) — [`aria-disabled`](/a11y/aria-disabled/), [`aria-errormessage`](/a11y/aria-errormessage/), [`aria-expanded`](/a11y/aria-expanded/), [`aria-haspopup`](/a11y/aria-haspopup/), [`aria-invalid`](/a11y/aria-invalid/), [`aria-readonly`](/a11y/aria-readonly/), [`aria-required`](/a11y/aria-required/) и [`aria-selected`](/a11y/aria-selected/).
