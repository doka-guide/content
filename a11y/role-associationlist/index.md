---
title: "`associationlist`"
description: "Роль для ассоциативного списка."
authors:
  - doka-dog
keywords:
  - a-list
  - ассоциативный массив
  - хэш-массив
  - хэш
related:
  - a11y/aria-posinset
  - a11y/aria-level
  - a11y/aria-setsize
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) ключа в ассоциативном списке. В таком списке хранятся пары ключей и их значений.

В HTML нет тега с такой ролью.

<aside>

👶 Эта роль из [черновика ARIA 1.3](https://w3c.github.io/aria/). Она пока плохо поддерживается, так что сейчас её лучше не использовать.

</aside>

## Как пишется

Задайте тегу `role="associationlist"`. Для этого больше всего подходит [`<span>`](/html/span/) или [`div`](/html/div/).

Внутри элемента `associationlistitemkey` обязательно должны быть ключ [`associationlistitemkey`](/a11y/role-associationlistitemkey/) и связанное с ним значение [`associationlistitemvalue`](/a11y/role-associationlistitemvalue/).

Элементам с ролью `associationlist` можно также задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy).
