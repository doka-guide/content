---
title: "ARIA-роль `heading`"
description: "Как сделать заголовок с помощью WAI-ARIA."
authors:
  - doka-dog
keywords:
  - доступность
  - ARIA
  - ARIA-роль
related:
  - a11y/aria-intro
  - a11y/aria-roles
  - html/h1-h6
tags:
  - doka
  - placeholder
---

## Кратко

[ARIA-роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) для заголовка.

Роль `heading` есть у [`<h1>`–`<h6>`](/html/h1-h6/) по умолчанию.

## Пример

```html
<div role="heading" aria-level="1">Главный заголовок</div>
<div role="heading" aria-level="2">Второстепенный заголовок</div>
<div role="heading" aria-level="3">Ещё менее значимый заголовок</div>
```

## Как пишется

Добавьте к тегу `role="heading"`. Лучше, чтобы это были семантически нейтральные [`<div>`](/html/div/) или [`<span>`](/html/span/). Одно из [правил использования ARIA](/a11y/aria-intro/#pravila-ispolzovaniya) — не перезаписывать роли без необходимости.

В большинстве случаев лучше использовать `<h1>`–`<h6>` вместо роли `heading`.

У элемента с явно заданной ролью `heading` обязательно должен быть атрибут [`aria-level`](/a11y/aria-level/) с нужными значениями от `1` до `6`. Если значение атрибута не задано, по умолчанию применится `2`.

Также для этой роли можно использовать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy).

## Как понять

Роль нужна для создания заголовков, когда нет возможности использовать подходящие HTML-теги.
