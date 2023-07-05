---
title: "`toolbar`"
description: "ARIA-роль для тулбара или панели инструментов."
authors:
  - doka-dog
related:
  - a11y/aria-roles
  - a11y/role-menubar
  - a11y/aria-orientation
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для панели с часто используемыми элементами управления интерфейсом — тулбара или панели инструментов.

В HTML нет тега с этой ролью.

## Как пишется

Задайте тегу `role="toolbar"`, лучше всего [`<div>`](/html/div/) или [`<span>`](/html/span/). Обычно элементы с `toolbar` находятся внутри [`menubar`](/a11y/role-menubar/).

Если на странице несколько тулбаров, задайте им общее название с помощью [`aria-label`](/a11y/aria-label/) или другим способом.

Не забудьте о навигации с клавиатуры по пунктам меню и поработайте над порядком фокуса. С этим помогут JavaScript и атрибут [`tabindex`](/html/global-attrs/#tabindex).

Элементам с ролью `toolbar` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/), а ещё [`aria-activedescendant`](/a11y/aria-activedescendant/) и [`aria-orientation`](/a11y/aria-orientation/).

По умолчанию `toolbar` задан `aria-orientation="horizontal"`.
