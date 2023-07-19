---
title: "`definition`"
description: "ARIA-роль для определения термина."
authors:
  - doka-dog
related:
  - a11y/aria-details
  - a11y/role-term
  - html/dl-dd-dt
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для определения термина.

В HTML эта роль есть у [`<dd>`](/html/dl-dd-dt/).

## Как пишется

Задайте подходящему тегу `role="definition"`, лучше всего [`<div>`](/html/div/) или [`<span>`](/html/span/). Эту роль нельзя задавать интерактивным тегам. В большинстве случаев используйте `<dd>`.

Элемент с `definition` обязательно должен быть связан с термином с ролью [`term`](/a11y/role-term/). Когда это кастомное определение, свяжите термин с определением с помощью [`aria-details`](/a11y/aria-details/). Для термина лучше используйте [`<dt>`](/html/dl-dd-dt/).

Элементам с ролью `definition` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy), кроме [`aria-label`](/a11y/aria-label/) и [`aria-labelledby`](/a11y/aria-labelledby/).
