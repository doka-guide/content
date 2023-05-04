---
title: "`aria-activedescendant`"
description: "ARIA-атрибут для обозначения активного интерактивного элемента из группы других."
authors:
  - doka-dog
related:
  - a11y/aria-intro
  - a11y/aria-attrs
  - a11y/role-tablist
tags:
  - doka
  - placeholder
---

## Кратко

[Свойство связи](/a11y/aria-attrs/#atributy-svyazi) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для обозначения текущего, активного элемента из [составного интерактивного элемента](/a11y/aria-roles/#roli-vidzhetov). Например, из меню, сетки, комбинированного списка и так далее.

## Как пишется

Добавьте к родительскому элементу `aria-activedescendant` со значением в виде ID и свяжите с ним активный дочерний элемент с помощью атрибута `id` с таким же значением.

`aria-activedescendant` можно задавать только некоторым тегам и [ролям](/a11y/aria-roles/):

- [`<textarea>`](/html/textarea/), [`<input>`](/html/input/) с типами `text`, `email`, `tel`, `url` или роли `textbox`.
- [`<details>`](/html/details/), [`<fieldset>`](/html/fieldset/), [`<optgroup>`](/html/optgroup/) или `group`.
- [`<select>`](/html/select/) или `combobox`.
- `application`.

Этот атрибут есть по умолчанию у `<select>` с ролью `listbox`, [`<tr>`](/html/tables/#tr) или `row`, [`<input type="search">`](/html/input/#type) или `searchbox`, `<input type="number">` или `spinbutton`, `radiogroup`, [`tablist`](/a11y/role-tablist/), `grid`, `toolbar`, `menu`, `menubar`, `tree` и `treegrid`.
