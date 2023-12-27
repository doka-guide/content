---
title: "`aria-level`"
description: "ARIA-атрибут для определения места элемента в иерархии."
authors:
  - doka-dog
keywords:
  - доступность
  - ARIA
  - ARIA-атрибут
related:
  - a11y/role-listitem
  - a11y/role-heading
  - html/h1-h6
tags:
  - doka
  - placeholder
---

## Кратко

[Свойство виджета](/a11y/aria-attrs/#atributy-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya), которое определяет место одного элемента в иерархии других.

## Пример

```html
<div role="heading" aria-level="1">Заголовок первого уровня</div>
```

## Как пишется

Добавьте к тегу `aria-level` со значением от `1` и выше. Атрибут можно использовать только для некоторых тегов и [ролей](/a11y/aria-roles/):

- [`<h1>`–`<h6>`](/html/h1-h6/) или роль [`heading`](/a11y/role-heading/).
- [`<li>`](/html/li/), [`<dt>`](/html/dl-dd-dt/) или роль [`listitem`](/a11y/role-listitem/).
- [`<tr>`](/html/tables/#tr) или роль [`row`](/a11y/role-row/).
- Роль [`comment`](/a11y/role-comment/).
- Роль [`associationlistitemkey`](/a11y/role-associationlistitemkey/).

У элемента с явно заданной ролью `heading` обязательно должен быть атрибут `aria-level` со значениями от `1` до `6`. Если в этом случае значение атрибута не задано, по умолчанию применится `2`.

## Как понять

Иерархия важна для заголовков, древовидных списков, вложенных сеток и других похожих элементов.
