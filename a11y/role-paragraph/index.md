---
title: "`paragraph`"
description: "Роль, которая есть у абзаца текста."
authors:
  - doka-dog
related:
  - a11y/aria-intro
  - a11y/aria-roles
  - html/p
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для параграфа или абзаца текста.

В HTML эта роль есть у [`<p>`](/html/p/) по умолчанию.

## Как пишется

Задайте тегу `role="paragraph"`, лучше всего [`<div>`](/html/div/) или [`<span>`](/html/span/). В большинстве случаев используйте тег `<p>`.

Элементам с ролью `paragraph` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy), кроме [`aria-label`](/a11y/aria-label/) и [`aria-labelledby`](/a11y/aria-labelledby/).
