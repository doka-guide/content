---
title: "`radiogroup`"
description: "Роль для группы радиокнопок."
authors:
  - doka-dog
related:
  - a11y/role-radio
  - html/input
  - html/fieldset
tags:
  - doka
  - placeholder
---

## Кратко

[Составная роль виджета](/a11y/aria-roles/#roli-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya), которая нужна для группы радиокнопок. Внутри элемента с этой ролью должно быть несколько элементов с ролями [`radio`](/a11y/role-radio/).

Нативные радиокнопки [`<input type="radio">`](/html/input/) лучше вкладывать внутрь [`<fieldset>`](/html/fieldset/).

## Как пишется

Задайте тегу `role="radiogroup"`. Лучше всего подойдут [`<div>`](/html/div/) и [`<span>`](/html/span/).

Когда на странице есть группа радиокнопок, можно выбрать только одну. Не изменяйте это поведение с помощью ARIA и следите за тем, чтобы [`aria-checked="true"`](/a11y/aria-checked/) был только у одной кастомной радиокнопки.

С ролью `radiogroup` можно сочетать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy) и некоторые [атрибуты виджетов](/a11y/aria-attrs/#atributy-vidzhetov):

- [`aria-errormessage`](/a11y/aria-errormessage/);
- [`aria-invalid`](/a11y/aria-invalid/);
- [`aria-readonly`](/a11y/aria-readonly/);
- [`aria-required`](/a11y/aria-required/).
