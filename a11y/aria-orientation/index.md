---
title: "`aria-orientation`"
description: "ARIA-атрибут для обозначения расположения и ориентации интерактивного элемента на странице."
authors:
  - doka-dog
related:
  - a11y/role-separator
  - a11y/role-menu
  - a11y/role-tablist
tags:
  - doka
  - placeholder
---

## Кратко

[Свойство виджета](/a11y/aria-attrs/#atributy-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya). Отражает ориентацию интерактивного элемента на странице — горизонтальную, вертикальную или неизвестную.

Благодаря `aria-orientation` пользователи [скринридеров](/a11y/screenreaders/) поймут, с помощью каких клавиш могут перемещаться внутри элемента. Например, стрелками вверх и вниз.

## Как пишется

Добавьте к тегу атрибут `aria-orientation` с одним из значений:

- `undefined` (по умолчанию) — положение элемента неизвестно или его сложно определить.
- `horizontal` — элемент расположен горизонтально.
- `vertical` — элемент расположен вертикально.

Можно использовать `aria-orientation` для следующих тегов и [ARIA-ролей](/a11y/aria-roles/): [`<input type="range">`](/html/input/#type) или `slider`, [`tablist`](/a11y/role-tablist/), `scrollbar`, `separator`, `toolbar`, `menu`, `menubar`, `tree` и `listbox`.

У этих тегов и ролей `aria-orientation` есть по умолчанию, но его значение можно менять в зависимости от ситуации. Например, `tablist` задан `aria-orientation="horizontal"`, а `scrollbar` — `aria-orientation="vertical"`.
