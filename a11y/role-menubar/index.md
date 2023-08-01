---
title: "`menubar`"
description: "Роль строки меню, пункты которой всегда видны и расположены горизонтально как в программе."
authors:
  - doka-dog
related:
  - a11y/role-menuitem
  - a11y/role-menuitemcheckbox
  - a11y/role-menu
tags:
  - doka
  - placeholder
---

## Кратко

[Самостоятельная роль виджета](/a11y/aria-roles/#roli-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для «настоящего» меню, в котором элементы всегда видны и расположены горизонтально. Ещё его называют строкой меню. Такое меню встретите в операционных системах и программах.

В HTML нет тега с этой ролью.

## Как пишется

Задайте `role="menubar"` любому тегу, лучше [`<div>`](/html/div/), [`<span>`](/html/span/) или [`<ul>`](/html/ul/).

Внутри контейнера с этой ролью должен быть минимум один пункт списка с [`menuitem`](/a11y/role-menuitem/), [`menuitemcheckbox`](/a11y/role-menuitemcheckbox/) или [`menuitemradio`](/a11y/role-menuitemradio/).

Не забудьте о навигации с клавиатуры по пунктам меню и поработайте над порядком фокуса. С этим помогут JavaScript и глобальный атрибут [`tabindex`](/html/global-attrs/#tabindex).

У роли `menubar` есть встроенное свойство [`aria-orientation="horizontal"`](/a11y/aria-orientation/).

Для строки меню можно использовать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy), ещё один [атрибут виджета](/a11y/aria-attrs/#atributy-vidzhetov) [`aria-disabled`](/a11y/aria-disabled/) и [атрибут связи](/a11y/aria-attrs/#atributy-svyazi) [`aria-activedescendant`](/a11y/aria-activedescendant/).

## Как это понять

Меню на сайтах обычно состоит из ссылок и для него достаточно использовать `<ul>`, вложенный в [`<nav>`](/html/nav/).

В классической, «настоящей» строке меню, как в компьютерной программе, обычно размещают часто используемые кнопки или другие элементы. Как раз для такого меню пригодится роль `menubar`.
