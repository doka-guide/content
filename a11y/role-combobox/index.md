---
title: "`combobox`"
description: "ARIA-роль для комбинированного списка (поля со списком)."
authors:
  - doka-dog
related:
  - a11y/aria-roles
  - html/input
  - html/select
tags:
  - doka
  - placeholder
---

## Кратко

[Составная роль виджета](https://doka.guide/a11y/aria-roles/#roli-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для комбинированного списка. Также его иногда называют полем со списком. В такое поле можно ввести данные или заполнить его, выбрав опцию из связанного с ним выпадающего списка.

В HTML эта роль есть у [`<select>`](/html/select/) без атрибута [`multiple`](/html/multiple/) и с `size` со значением `1`.

## Как пишется

Задайте `role="combobox"` любому тегу, лучше всего [`<div>`](/html/div/), [`<span>`](/html/span/) или [`<input>`](/html/input/).

ARIA-роли не изменяют внешний вид и поведение элементов, поэтому не забудьте стилизовать список и добавить поддержку клавиатуры с помощью JavaScript и [`tabindex`](/html/global-attrs/#tabindex), когда используете неинтерактивный элемент.

Элемент `combobox` важно связать с выпадающим списком с опциями для выбора из элементов с [`listbox`](/a11y/role-listbox/), [`tree`](/a11y/role-tree/), [`grid`](/a11y/role-grid/) или [`dialog`](/a11y/role-dialog/) с помощью [`aria-controls`](/a11y/aria-controls/).

У комбинированного списка обязательно должен быть атрибут [`aria-expanded`](/a11y/aria-expanded/).

Для `combobox` можно также использовать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy), [атрибуты виджетов](/a11y/aria-attrs/#atributy-vidzhetov) [`aria-autocomplete`](/a11y/aria-autocomplete/), [`aria-errormessage`](/a11y/aria-errormessage/), [`aria-haspopup`](/a11y/aria-haspopup/), [`aria-invalid`](/a11y/aria-invalid/), [`aria-readonly`](/a11y/aria-readonly/), [`aria-required`](/a11y/aria-required/) и ещё один [атрибут связи](/a11y/aria-attrs/#atributy-svyazi) [`aria-activedescendant`](/a11y/aria-activedescendant/).

По умолчанию у роли `combobox` есть атрибут `aria-haspopup` со значением `listbox`.
