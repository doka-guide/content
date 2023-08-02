---
title: "`aria-setsize`"
description: "ARIA-атрибут для общего числа элементов из группы, когда не все они есть сейчас на странице."
authors:
  - doka-dog
related:
  - a11y/role-menuitem
  - a11y/role-treeitem
  - a11y/role-tab
tags:
  - doka
  - placeholder
---

## Кратко

[Свойство связи](/a11y/aria-attrs/#atributy-svyazi) и [виджета](/a11y/aria-attrs/#atributy-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для обозначения общего количества элементов из группы, когда не все они сейчас есть в [DOM](/js/dom/). Так обычно бывает с интерактивными списками, в которые можно добавлять новые пункты и удалять из них старые.

## Как пишется

Добавьте к нужным элементам списка `aria-setsize` со значением в виде целого числа. Например, `10` или `20`. Когда общее количество элементов неизвестно, используйте `-1`.

`aria-setsize` можно задавать только некоторым тегам и ролям:

- [`<article>`](/html/article/) или роли [`article`](/a11y/role-article/).
- [`<tr>`](/html/tables/#tr) или [`row`](/a11y/role-row/).
- [`<li>`](/html/li/) и [`listitem`](/a11y/role-listitem/).
- [`<option>`](/html/option/) или [`option`](/a11y/role-option/).
- [`<input type="radio">`](/html/input/#type) или [`radio`](/a11y/role-radio/).
- [`tab`](/a11y/role-tab/).
- [`menuitem`](/a11y/role-menuitem/), [`menuitemcheckbox`](/a11y/role-menuitemcheckbox/), [`menuitemradio`](/a11y/role-menuitemradio/).
- [`treeitem`](/a11y/role-treeitem/).
- [`comment`](/a11y/role-comment/).
- [`associationlistitemkey`](/a11y/role-associationlistitemkey/), [`associationlistitemvalue`](/a11y/role-associationlistitemvalue/).
