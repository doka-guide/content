---
title: "`article`"
description: "Роль для законченного и самодостаточного раздела документа — поста в блоге, новости и другого."
authors:
  - doka-dog
related:
  - a11y/aria-posinset
  - html/article
  - a11y/role-feed
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для законченного и самодостаточного раздела документа. Например, пост в социальной сети, блоге или новость.

Роль `article` не является ориентиром для скринридеров, поэтому пользователи не могут быстро переместиться к ней как, например, к навигации [`navigation`](/a11y/role-navigation/). [Некоторые скринридеры](https://www.matuzo.at/blog/2023/article-screen-readers/) считают `article` ориентиром.

В HTML эта роль есть у [`<article>`](/html/article/) по умолчанию.

## Как пишется

Задайте тегу `role="article"`, лучше всего [`<div>`](/html/div/) или [`<span>`](/html/span/). В большинстве случаев используйте тег `<article>`.

Элемент с `article` может быть расположен отдельно на странице, а может находиться внутри фида с ролью [`feed`](/a11y/role-feed/). В этом случае задайте `article` два атрибута — [`aria-posinset`](/a11y/aria-posinset/) и [`aria-setsize`](/a11y/aria-setsize/).

Элементам с ролью `article` также можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy).
