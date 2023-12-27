---
title: "`emphasis`"
description: "Роль для смыслового акцента на слове или фразе."
authors:
  - doka-dog
related:
  - a11y/aria-roles
  - html/em
  - html/strong
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для смыслового акцента на слове или фразе.

Эквивалент роли `emphasis` в HTML — [`<em>`](/html/em/).

## Как пишется

Задайте тегу `role="emphasis"`. Для этого больше всего подходит [`<span>`](/html/span/). Хотя роль `emphasis` пока не встроена в тег `<em>` по умолчанию, всё равно лучше использовать возможности HTML.

Элементам с ролью `emphasis` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy), кроме [`aria-label`](/a11y/aria-label/) и [`aria-labelledby`](/a11y/aria-labelledby/).
