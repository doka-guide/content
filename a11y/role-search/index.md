---
title: "ARIA-роль `search`"
description: "Как добавить ориентир для поиска по сайту с помощью WAI-ARIA."
authors:
  - doka-dog
keywords:
  - доступность
  - ARIA
  - ARIA-роль
  - ориентир
related:
  - a11y/aria-intro
  - a11y/aria-roles
  - html/form
tags:
  - doka
  - placeholder
---

## Кратко

[ARIA-роль ориентира](/a11y/aria-roles/#roli-orientirov), которая определяет область с поиском по сайту. В этой области может находиться не только поисковая строка, но фильтры или ссылки, которые связаны с поиском.

В HTML нет аналога для этой роли.

## Пример

```html
<form role="search">
  <label for="search-field">Поиск по сайту</label>
  <input type="search" id="search-field" name="search">
  <input type="submit" value="Submit">
</form>
```

## Как пишется

Добавьте к тегу `role="search"`. Это может быть [`<div>`](/html/div/), [`<span>`](/html/span/) или [`<form>`](/html/form/), в который вложен [`<input type="search">`](/html/input/#type).

Для элемента с ролью `search` можно использовать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy).

## Как понять

Роль `search` создаёт ориентир на странице. Это значит, что пользователи скринридеров могут быстро переместиться к этой части страницы с помощью горячих клавиш или через меню с ориентирами.
