---
title: "`math`"
description: "Роль для математических выражений."
authors:
  - doka-dog
related:
  - a11y/aria-intro
  - a11y/aria-roles
  - html/span
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для математических выражений.

В HTML нет тега с такой ролью, а в [MathML](https://developer.mozilla.org/ru/docs/Web/MathML) она есть у [`<math>`](https://www.w3.org/TR/MathML/chapter2.html#interf.toplevel).

## Как пишется

Задайте тегу `role="math"`, лучше всего [`<div>`](/html/div/), [`<span>`](/html/span/) или [`<img>`](/html/img/). В тег с этой ролью можно вкладывать текст и картинки. Если используете картинку, не забудьте описать её содержимое в атрибуте `alt`.

Элементам с ролью `math` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy).
