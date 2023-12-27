---
title: "`code`"
description: "Роль для примера программного кода."
authors:
  - doka-dog
related:
  - a11y/aria-roles
  - html/code
  - html/span
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya), которая нужна для примеров программного кода.

Благодаря этой роли [скринридеры](/a11y/screenreaders/) правильно распознают язык, произносят слова с сохранением пунктуации и не опускают символы, которые не надо зачитывать. Например дефисы или точки с запятой.

В HTML роль `code` есть у [`<code>`](/html/code/) по умолчанию.

## Как пишется

Задайте тегу `role="code"`. Для этого больше всего подходит [`<span>`](/html/span/). В большинстве случаев используйте тег `<code>`.

Элементам с ролью `code` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy), кроме [`aria-label`](/a11y/aria-label/) и [`aria-labelledby`](/a11y/aria-labelledby/).
