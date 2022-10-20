---
title: "ARIA-роль `link`"
description: "Как превратить элемент в ссылку с помощью WAI-ARIA."
authors:
  - doka-dog
keywords:
  - доступность
  - ARIA
  - ARIA-роль
  - ссылка
  - link
related:
  - a11y/aria-intro
  - a11y/aria-roles
  - html/a
tags:
  - doka
  - placeholder
---

## Кратко

[ARIA-роль виджета](/a11y/aria-roles/#roli-vidzhetov) для ссылки. Это самостоятельная роль, поэтому элемент с ней может располагаться на странице отдельно или быть частью другого составного элемента.

Роль `link` есть по умолчанию у [`<a>`](/html/a/).

## Пример

```html
<span role="link" data-href="https://en.wikipedia.org/wiki/Capybara" tabindex="0">Узнать больше о капибарах</span>
```

## Как пишется

Добавьте к тегу `role="link"`. Лучше, чтобы это были семантически нейтральные [`<div>`](/html/div/) или [`<span>`](/html/span/). Одно из [правил использования ARIA](/a11y/aria-intro/#pravila-ispolzovaniya) — не перезаписывать роли без необходимости.

В большинстве случаев лучше использовать `<a>` вместо роли `link`. Тег ведёт себя как ссылка по умолчанию. Если используете роль `link`, то не обойтись без JavaScript.

Для `button` можно использовать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy) и пару [атрибутов виджетов](/a11y/aria-attrs/#atributy-vidzhetov) — [`aria-disabled`](/a11y/aria-disabled/), [`aria-haspopup`](/a11y/aria-haspopup/) и [`aria-expanded`](/a11y/aria-expanded/).

## Как понять

Роль нужна для создания ссылок — элементов, которые ведут пользователей на другую страницу или на её определённую часть.
