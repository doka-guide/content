---
title: "`generic`"
description: "Роль элемента-контейнера без имени и семантики."
authors:
  - doka-dog
related:
  - a11y/role-presentation-none
  - html/div
  - html/span
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya). Означает, что у элемента нет семантики и имени.

В HTML роль `generic` есть у [`<div>`](/html/div/) и [`<span>`](/html/span/).

## Как пишется

Роль `generic` нужна только браузерам, и её не рекомендуют явно задавать элементам. Если хотите сбросить встроенную роль тега, используйте [`presentation`](/a11y/role-presentation-none/) или `none`.

Элементам с ролью `generic` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy), кроме атрибутов для имён и описаний. Это [`aria-label`](/a11y/aria-label/), [`aria-labelledby`](/a11y/aria-labelledby/), [`aria-roledescription`](/a11y/aria-roledescription/) и [`aria-brailleroledescription`](/a11y/aria-brailleroledescription/).
