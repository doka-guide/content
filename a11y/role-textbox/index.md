---
title: "`textbox`"
description: "Роль текстового поля."
authors:
  - doka-dog
related:
  - a11y/aria-multiline
  - html/input
  - html/textarea
tags:
  - doka
  - placeholder
---

## Кратко

[Самостоятельная роль виджета](/a11y/aria-roles/#roli-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для поля с текстом.

В HTML эта роль по умолчанию есть у [`<textarea>`](/html/textarea/) и [`<input>`](/html/input/) с типами `text`, `email`, `tel` и `url`.

## Как пишется

Задайте `role="textbox"` любому тегу, лучше всего [`<div>`](/html/div/) или [`<span>`](/html/span/). В большинстве случаев лучше использовать `<textarea>` и `<input>` с типами `text`, `email`, `tel` или `url`.

Если решили делать кастомный элемент, не забудьте добавить его в порядок фокуса с помощью [`tabindex`](/html/global-attrs/#tabindex). Ещё укажите атрибут [`contenteditable`](/html/global-attrs/#contenteditable). Благодаря атрибуту пользователи смогут вводить данные в кастомное поле.

Элементам с ролью `textbox` также можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy), [атрибуты связи](/a11y/aria-attrs/#atributy-svyazi) [`aria-activedescendant`](/a11y/aria-activedescendant/) и [`aria-errormessage`](/a11y/aria-errormessage/), а также несколько [атрибутов виджетов](/a11y/aria-attrs/#atributy-vidzhetov) — [`aria-autocomplete`](/a11y/aria-autocomplete/), [`aria-haspopup`](/a11y/aria-haspopup/), [`aria-invalid`](/a11y/aria-invalid/), [`aria-multiline`](/a11y/aria-multiline/), [`aria-placeholder`](/a11y/aria-placeholder/), [`aria-readonly`](/a11y/aria-readonly/) и [`aria-required`](/a11y/aria-required/).
