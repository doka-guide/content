---
title: "ARIA-роль `button`"
description: "Как превратить элемент в кнопку с помощью WAI-ARIA."
authors:
  - doka-dog
keywords:
  - доступность
  - ARIA
  - ARIA-роль
  - кнопка
  - button
related:
  - a11y/aria-intro
  - a11y/aria-roles
  - html/button
tags:
  - doka
  - placeholder
---

## Кратко

[ARIA-роль виджета](/a11y/aria-roles/#roli-vidzhetov) для кнопки. Это самостоятельная роль, поэтому элемент с ней может располагаться на странице отдельно или быть частью другого составного элемента.

Роль `button` по умолчанию есть у [`<button>`](/html/button/), [`<summary>`](/html/details/) и [`<input>`](/html/input/) c типами `button`, `image`, `reset`, `submit`.

## Пример

```html
<div role="button">Оплатить</div>
```

## Как пишется

Добавьте к тегу `role="button"`. Лучше, чтобы это были семантически нейтральные [`<div>`](/html/div/) или [`<span>`](/html/span/). Одно из [правил использования ARIA](/a11y/aria-intro/#pravila-ispolzovaniya) — не перезаписывать роли без необходимости.

Лучше использовать `<button>`, `<summary>` или `<input>` с типами `button`, `image`, `reset`, `submit` вместо роли `button`. Теги ведут себя как ссылки по умолчанию. Если используете роль `button`, то не обойтись без JavaScript.

Для `button` можно использовать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy) и пару [атрибутов виджетов](/a11y/aria-attrs/#atributy-vidzhetov) — [`aria-disabled`](/a11y/aria-disabled/), [`aria-haspopup`](/a11y/aria-haspopup/), [`aria-expanded`](/a11y/aria-expanded/) и [`aria-pressed`](/a11y/aria-pressed/).

## Как понять

Роль нужна для создания кнопок — элементов, при взаимодействии с которыми происходят какие-то действия. Например, открывается окно, отправляются данные из формы, скрывается или показывается блок текста и другое.
