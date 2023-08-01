---
title: "`aria-activedescendant`"
description: "ARIA-атрибут для обозначения активного интерактивного элемента из группы других."
authors:
  - doka-dog
related:
  - a11y/aria-attrs
  - a11y/aria-current
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

- [`<textarea>`](/html/textarea/), [`<input>`](/html/input/) с типами `text`, `email`, `tel`, `url` или роли [`textbox`](/a11y/role-textbox/).
- [`<details>`](/html/details/), [`<fieldset>`](/html/fieldset/), [`<optgroup>`](/html/optgroup/) или [`group`](/a11y/role-group/).
- [`<select>`](/html/select/) или [`combobox`](/a11y/role-combobox/).
- [`application`](/a11y/role-application/).

Этот атрибут есть по умолчанию у `<select>` с ролью [`listbox`](/a11y/role-listbox/), [`<tr>`](/html/tables/#tr) или [`row`](/a11y/role-row/), [`<input type="search">`](/html/input/#type) или [`searchbox`](/a11y/role-searchbox/), `<input type="number">` или [`spinbutton`](/a11y/role-spinbutton/), [`radiogroup`](/a11y/role-radiogroup/), [`tablist`](/a11y/role-tablist/), [`grid`](/a11y/role-grid/), [`toolbar`](/a11y/role-toolbar/), [`menu`](/a11y/role-menu/), [`menubar`](/a11y/role-menubar/), [`tree`](/a11y/role-tree/) и [`treegrid`](/a11y/role-treegrid/).
