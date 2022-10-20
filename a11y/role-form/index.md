---
title: "ARIA-роль `form`"
description: "Как добавить ориентир формы на страницу с помощью WAI-ARIA."
authors:
  - doka-dog
keywords:
  - доступность
  - ARIA
  - ARIA-роль
  - ориентир
  - форма
related:
  - a11y/aria-intro
  - a11y/aria-roles
  - html/form
tags:
  - doka
  - placeholder
---

## Кратко

[ARIA-роль ориентира](/a11y/aria-roles/#roli-orientirov), которая определяет область формы. Форма обычно состоит из нескольких полей с подписями и кнопки для отправки введённых данных на сервер.

Роль `form` есть у [`<form>`](/html/form/) по умолчанию.

## Пример

```html
<div role="form" method="get" aria-labelledby="desc">
  <p id="desc">Подписка на новостную рассылку</p>
  <label for="email">Электронная почта</label>
  <input type="text" name="email" id="email" required>
  <button type="submit">Подписаться</button>
</div>
```

## Как пишется

Добавьте к тегу `role="form"`. Лучше, чтобы это были семантически нейтральные [`<div>`](/html/div/) или [`<span>`](/html/span/). Одно из [правил использования ARIA](/a11y/aria-intro/#pravila-ispolzovaniya) — не перезаписывать роли без необходимости.

В большинстве случаев лучше использовать `<form>` вместо роли `form`. К тому же, тег лучше поддерживают вспомогательные технологии.

Для элемента с ролью `form` можно использовать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy).

## Как понять

Роль `form` создаёт ориентир на странице. Это значит, что пользователи скринридеров могут быстро переместиться к этой части страницы с помощью горячих клавиш или через меню ориентирами.
