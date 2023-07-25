---
title: "`option`"
description: "Роль пункта из выпадающего списка."
authors:
  - doka-dog
related:
  - a11y/role-listbox
  - html/option
  - html/select
tags:
  - doka
  - placeholder
---

## Кратко

[Самостоятельная роль виджета](/a11y/aria-roles/#roli-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для пункта из выпадающего списка.

В HTML эта роль есть у [`<option>`](/html/option/) по умолчанию.

## Как пишется

Задайте тегу `role="option"`. Для этого больше всего подходит [`<span>`](/html/span/). В большинстве случаев используйте тег `<option>`.

Элемент с ролью `option` обязательно должен находится внутри или быть связан с выпадающим списком с ролью [`listbox`](/a11y/role-listbox/), которая есть по умолчанию у [`<select>`](/html/select/). Пункты выпадающего списка также можно группировать и вкладывать внутрь элемента с ролью `group`, которая уже встроена в тег [`<fieldset>`](/html/fieldset/).

Элементам с ролью `option` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy) и некоторые [атрибуты виджетов](/a11y/aria-attrs/#atributy-vidzhetov) — [`aria-selected`](/a11y/aria-selected/), [`aria-checked`](/a11y/aria-checked/), [`aria-posinset`](/a11y/aria-posinset/) и [`aria-setsize`](/a11y/aria-setsize/).

У роли `option` по умолчанию задано состояние `aria-selected="false"`.
