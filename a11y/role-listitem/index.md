---
title: "`listitem`"
description: "Роль для пункта из нумерованного или ненумерованного списка."
authors:
  - doka-dog
related:
  - html/ul
  - a11y/role-list
  - html/li
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для пункта из списка. Без разницы это нумерованный или ненумерованный список.

В HTML эта роль есть у [`<li>`](/html/li/).

## Как пишется

Задайте тегу `role="listitem"`, лучше всего [`<div>`](/html/div/) или [`<span>`](/html/span/). В большинстве случаев используйте `<li>`.

Элемент с `listitem` всегда должен находится внутри другого с [`list`](/a11y/role-list/). Роль `list` уже есть у [`<ul>`](/html/ul/) и [`<ol>`](/html/ol/).

Элементам с ролью `listitem` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy).
