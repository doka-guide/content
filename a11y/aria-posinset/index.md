---
title: "`aria-posinset`"
description: "Атрибут для обозначения текущего порядкового номера или положения элемента из группы, особенно когда не все они есть сейчас на странице."
authors:
  - doka-dog
related:
  - a11y/aria-attrs
  - a11y/aria-setsize
  - a11y/role-tab
tags:
  - doka
  - placeholder
---

## Кратко

[Свойство связи](/a11y/aria-attrs/#atributy-svyazi) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для обозначения текущего порядкового номера или положения элемента из группы, когда не все они есть сейчас в [DOM](/js/dom/). Так обычно бывает с интерактивными списками, в которые можно добавлять новые пункты и удалять старые.

## Как пишется

Добавьте к нужным элементам списка `aria-posinset` со значением в виде целого числа. Например, `1`, `2` или `3`.

`aria-posinset` можно задавать только некоторым тегам и ролям:

- [`<article>`](/html/article/) или роли `article`.
- [`<tr>`](/html/tables/#tr) или `row`.
- [`<li>`](/html/li/) и `listitem`.
- [`<option>`](/html/option/) или `option`.
- [`<input type="radio">`](/html/input/#type) или `radio`.
- [`tab`](/a11y/role-tab/).
- [`menuitem`](/a11y/role-menuitem/).
- [`menuitemcheckbox`](/a11y/role-menuitemcheckbox/).
- [`menuitemradio`](/a11y/role-menuitemradio/).
- `treeitem`.
- `comment`.
- `associationlistitemkey`.
- `associationlistitemvalue`.

Если используете `aria-posinset`, не забудьте указать общее число элементов из списка в [`aria-setsize`](/a11y/aria-setsize/).
