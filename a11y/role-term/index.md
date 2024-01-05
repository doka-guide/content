---
title: "`term`"
description: "ARIA-роль для термина."
authors:
  - doka-dog
related:
  - a11y/role-definition
  - a11y/aria-details
  - html/dl-dd-dt
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для термина.

В HTML эта роль есть у [`<dt>`](/html/dl-dd-dt/) и [`<dfn>`](/html/dfn/).

## Как пишется

Задайте подходящему тегу `role="term"`, лучше всего [`<div>`](/html/div/) или [`<span>`](/html/span/). Эту роль нельзя задавать интерактивным элементам. В большинстве случаев используйте `<dt>` или `<dfn>`.

Когда у кастомного элемента с термином есть определение, используйте для определения роль [`definition`](/a11y/role-definition/) и свяжите с ним термин с помощью [`aria-details`](/a11y/aria-details/). В HTML для определения подойдёт [`<dd>`](/html/dl-dd-dt/).

Элементам с ролью `term` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy), кроме [`aria-label`](/a11y/aria-label/) и [`aria-labelledby`](/a11y/aria-labelledby/).
