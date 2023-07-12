---
title: "`slider`"
description: "Роль ползунка для выбора чисел из заданного диапазона."
authors:
  - doka-dog
related:
  - a11y/aria-valuenow
  - a11y/aria-orientation
  - html/input
tags:
  - doka
  - placeholder
---

## Кратко

[Самостоятельная роль виджета](/a11y/aria-roles/#roli-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для ползунка для выбора чисел из заданного диапазона.

В HTML эта роль есть у [`<input type="range">`](/html/input/#type) по умолчанию.

## Как пишется

Задайте `role="slider"` любому тегу, но лучше всего [`<div>`](/html/div/) или [`<span>`](/html/span/). В большинстве случаев лучше используйте [`<input>`](/html/input/) с `type="range"`.

Если решили делать кастомный элемент, не забудьте добавить его в порядок фокуса с помощью [`tabindex`](/html/global-attrs/#tabindex), когда задаёте роль `slider` статическому элементу, с которым нельзя взаимодействовать. Также обязательно укажите текущее значение в [`aria-valuenow`](/a11y/aria-valuenow/) и дополнительно [`aria-valuemin`](/a11y/aria-valuemin/) для минимального значения и [`aria-valuemax`](/a11y/aria-valuemax/) для максимального.

У `slider` по умолчанию есть [`aria-orientation`](/a11y/aria-orientation/) со значением `horizontal`.

Ещё элементам с ролью `slider` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy).
