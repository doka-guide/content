---
title: "`strong`"
description: "Роль для выделения важного слова или фразы."
authors:
  - doka-dog
related:
  - a11y/aria-roles
  - html/strong
  - html/em
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для подчёркивания важности слова или фразы.

Эквивалент роли `strong` в HTML — [`<strong>`](/html/strong/).

## Как пишется

Задайте тегу `role="strong"`. Для этого больше всего подходит [`<span>`](/html/span/). Хотя `strong` пока не встроена в тег `<strong>` по умолчанию, всё равно лучше использовать возможности HTML.

Элементам с ролью `strong` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy), кроме [`aria-label`](/a11y/aria-label/) и [`aria-labelledby`](/a11y/aria-labelledby/).
