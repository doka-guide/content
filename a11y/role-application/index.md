---
title: "`application`"
description: "Роль для части страницы, которая ведёт себя как приложение."
authors:
  - doka-dog
related:
  - a11y/aria-roles
  - a11y/aria-invalid
  - a11y/role-document
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для части страницы с динамически изменяющимся содержимым как в приложении. Обычно с содержимым приложений можно взаимодействовать разными способами — с клавиатуры, мышкой, жестами и касаниями. Например, как в редакторе презентаций или текста.

В HTML нет тега с такой ролью.

## Как пишется

Задайте тегу `role="application"`, лучше всего [`<div>`](/html/div/) или [`<span>`](/html/span/). Используйте эту роль только когда точно не подходит никакая другая.

Внутри контейнера с ролью `application` могут находиться интерактивные элементы и обычный текст внутри элементов с ролями [`document`](/a11y/role-document/) или [`article`](/a11y/role-article/).

Элементам с ролью `application` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy), [атрибут связи](/a11y/aria-attrs/#atributy-svyazi) [`aria-activedescendant`](/a11y/aria-activedescendant/) и некоторые [атрибуты виджетов](/a11y/aria-attrs/#atributy-vidzhetov) — [`aria-disabled`](/a11y/aria-disabled/), [`aria-errormessage`](/a11y/aria-errormessage/), [`aria-expanded`](/a11y/aria-expanded/), [`aria-haspopup`](/a11y/aria-haspopup/) и [`aria-invalid`](/a11y/aria-invalid/).
