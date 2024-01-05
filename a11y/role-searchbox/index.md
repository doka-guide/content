---
title: "`searchbox`"
description: "Роль поля поиска."
authors:
  - doka-dog
related:
  - a11y/aria-roles
  - a11y/role-search
  - html/input
tags:
  - doka
  - placeholder
---

## Кратко

[Самостоятельная роль виджета](/a11y/aria-roles/#roli-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для поля поиска.

В HTML эта роль есть у [`<input type="search">`](/html/input/#type).

## Как пишется

Задайте `role="searchbox"` любому тегу, лучше всего [`<div>`](/html/div/) или [`<span>`](/html/span/). В большинстве случаев лучше использовать [`<input>`](/html/input/) с `type="search"`.

Если решили делать кастомное поле поиска, не забудьте добавить его в порядок фокуса с помощью [`tabindex`](/html/global-attrs/#tabindex). Ещё укажите атрибут [`contenteditable`](/html/global-attrs/#contenteditable). Благодаря ему пользователи смогут вводить данные в кастомное поле.

Элементам с ролью `searchbox` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy).
