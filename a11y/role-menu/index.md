---
title: "`menu`"
description: "Роль меню в виде выпадающего списка с интерактивными элементами как в программе или приложении."
authors:
  - doka-dog
related:
  - a11y/role-menuitemradio
  - a11y/role-menuitemcheckbox
  - a11y/role-menuitem
tags:
  - doka
  - placeholder
---

## Кратко

[Самостоятельная роль виджета](/a11y/aria-roles/#roli-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для «настоящего» меню со списком кнопок, чекбоксов, радиокнопок и других интерактивных элементов, которые что-то изменяют в интерфейсе. Такое меню обычно открывается по желанию пользователя, а пункты в нём расположены вертикально — друг под другом.

В HTML нет тега с этой ролью.

## Как пишется

Задайте `role="menu"` любому тегу, лучше [`<div>`](/html/div/), [`<span>`](/html/span/) или [`<ul>`](/html/ul/).

Вложите внутрь контейнера с `menu` как минимум один пункт списка с [`menuitem`](/a11y/role-menuitem/), [`menuitemcheckbox`](/a11y/role-menuitemcheckbox/) или [`menuitemradio`](/a11y/role-menuitemradio/).

Не забудьте о навигации с клавиатуры по пунктам меню и поработайте над порядком фокуса. С этим помогут JavaScript и атрибут [`tabindex`](/html/global-attrs/#tabindex).

У роли `menu` есть встроенное свойство [`aria-orientation="vertical"`](/a11y/aria-orientation/).

Для меню можно использовать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy), ещё один [атрибут виджета](/a11y/aria-attrs/#atributy-vidzhetov) [`aria-disabled`](/a11y/aria-disabled/) и [атрибут связи](/a11y/aria-attrs/#atributy-svyazi) [`aria-activedescendant`](/a11y/aria-activedescendant/).

## Как понять

Меню на сайтах состоит из ссылок. Для него используйте `<ul>`, вложенный в [`<nav>`](/html/nav/).

В классическом, «настоящем» меню, как в редакторе текста, размещают кнопки или другие элементы, которые что-то изменяют в интерфейсе. Как раз для такого меню пригодится роль `menu`.
