---
title: "`radio`"
description: "ARIA-роль для радиокнопки."
authors:
  - doka-dog
related:
  - html/input
  - a11y/role-radiogroup
  - a11y/aria-checked
tags:
  - doka
  - placeholder
---

## Кратко

[Самостоятельная роль виджета](/a11y/aria-roles/#roli-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для радиокнопки.

В HTML эта роль есть у [`<input type="radio">`](/html/input/#type) по умолчанию.

## Как пишется

Задайте `role="radio"` любому тегу, лучше [`<div>`](/html/div/) или [`<span>`](/html/span/).

Если решили делать кастомный элемент, не забудьте добавить его в порядок фокуса с помощью [`tabindex`](/html/global-attrs/#tabindex), когда задаёте роль `radio` статическому элементу, с которым нельзя взаимодействовать.

Также обязательно укажите для кастомной радиокнопки состояние [`aria-checked`](/a11y/aria-checked/) со значением `true`, когда элемент выбран. Если элемент не выбран, значение должно быть `false`. Только у одной радиокнопки из группы может быть `aria-checked="true"`. Чтобы всё работало правильно понадобится JavaScript.

Для элемента с ролью `radio` можно также задавать [`aria-posinset`](/a11y/aria-posinset/), [`aria-setsize`](/a11y/aria-setsize/) и все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy).

Радиокнопки могут располагаться на странице одни или в группе. Если это группа кастомных радиокнопок, разместите их рядом или внутри элемента с ролью [`radiogroup`](/a11y/role-radiogroup/).
