---
title: "`caption`"
description: "Роль для видимой подписи к таблице, сетке и автономного графического содержимого с ролью figure."
authors:
  - doka-dog
related:
  - a11y/aria-roles
  - html/caption
  - html/figure-figcaption
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для видимой подписи к таблице, обычной или древовидной сетке и автономного графического содержимого.

В HTML эта роль есть у [`<caption>`](/html/caption/) по умолчанию.

## Как пишется

Задайте тегу `role="caption"`, лучше всего [`<div>`](/html/div/) или [`<span>`](/html/span/). При этом для [`<table>`](/html/tables/) лучше использовать в первую очередь `<caption>`, а для [`<figure>`](/html/figure-figcaption/) — `<figcaption>`.

Элементы с `caption` могут быть описывать только некоторые элементы и [ARIA-роли](/a11y/aria-roles/):

- `<figure>` или роль [`figure`](/a11y/role-figure/);
- `<table>` или роль [`table`](/a11y/role-table/);
- [`grid`](/a11y/role-grid/);
- [`treegrid`](/a11y/role-treegrid/).

Элемент `caption` обязательно нужно вложить внутрь контейнеров с ролями `figure`, `table`, `grid` и `treegrid`. У `table`, `grid` и `treegrid` описание должно быть первым дочерним элементом, а у `figure` — первым или последним.

Чтобы связать подпись с ролью `caption` и элемент, к которому она относится, задайте [`aria-labelledby`](/a11y/aria-labelledby/) родительскому элементу и `id` с таким же значением для `caption`. Если хотите добавить ещё расширенное описание, его тоже можно вложить внутрь `caption` и связать с основным элементом при помощи [`aria-describedby`](/a11y/aria-describedby/).

Для элементов с ролью `caption` можно использовать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy).
