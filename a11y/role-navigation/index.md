---
title: "ARIA-роль `navigation`"
description: "Как добавить ориентир для навигации с помощью WAI-ARIA."
authors:
  - doka-dog
keywords:
  - доступность
  - ARIA
  - ARIA-роль
  - ориентир
  - навигация
related:
  - a11y/aria-intro
  - a11y/aria-roles
  - html/nav
tags:
  - doka
  - placeholder
---

## Кратко

[ARIA-роль ориентира](/a11y/aria-roles/#roli-orientirov), которая определяет область с навигацией по сайту.

Роль `navigation` есть у [`<nav>`](/html/nav/) по умолчанию.

## Пример

```html
<header>
  <span role="nav">
    <ul>
      <li>
        <a href="/tapirs-life/">Где обитают тапиры</a>
      </li>
      <li>
        <a href="/tapirs-food/">Как питаются тапиры</a>
      </li>
    </ul>
  </span>
</header>
```

## Как пишется

Добавьте к тегу `role="navigation"`. Лучше, чтобы это были семантически нейтральные [`<div>`](/html/div/) или [`<span>`](/html/span/). Одно из [правил использования ARIA](/a11y/aria-intro/#pravila-ispolzovaniya) — не перезаписывать роли без необходимости.

В большинстве случаев лучше использовать `<nav>` вместо роли `navigation`.

Для элемента с ролью `navigation` можно использовать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy).

## Как понять

Роль `navigation` создаёт ориентир на странице. Это значит, что пользователи скринридеров могут быстро переместиться к этой части страницы с помощью горячих клавиш или через меню с ориентирами.
