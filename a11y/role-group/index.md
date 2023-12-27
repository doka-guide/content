---
title: "`group`"
description: "Роль для отдельной группы элементов, которая не является частью основного содержимого страницы."
authors:
  - doka-dog
related:
  - a11y/aria-activedescendant
  - a11y/role-radiogroup
  - html/fieldset
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для группы элементов, которая не является частью основного содержимого. К примеру, внутри такой группы могут быть пункты выпадающего списка.

В HTML эта роль есть у [`<details>`](/html/details/), [`<fieldset>`](/html/fieldset/) и [`<optgroup>`](/html/optgroup/) по умолчанию.

## Как пишется

Задайте тегу `role="group"`.лучше всего [`<div>`](/html/div/) или [`<span>`](/html/span/). В большинстве случаев используйте тег `<fieldset>`.

Элементам с ролью `group` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy), атрибут связи [`aria-activedescendant`](/a11y/aria-activedescendant/) и атрибут виджета [`aria-disabled`](/a11y/aria-disabled/).
