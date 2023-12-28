---
title: "`suggestion`"
description: "Роль для предложения по изменению содержимого."
authors:
  - doka-dog
related:
  - a11y/aria-description
  - a11y/role-comment
  - html/del
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для предложений по изменению содержимого, правок. К примеру, такая роль может быть у предложений по изменению кода как в GitHub.

В HTML нет тега с такой ролью.

<aside>

👶 Эта роль из [черновика ARIA 1.3](https://w3c.github.io/aria/). Она пока плохо поддерживается, так что сейчас её лучше не использовать.

</aside>

## Как пишется

Задайте тегу `role="suggestion"`. Для этого больше всего подходит [`<span>`](/html/span/) или [`div`](/html/div/).

Внутри контейнера с ролью `suggestion` обязательно должен быть один или оба элемента с ролями [`insertion`](/a11y/role-insertion/) или [`deletion`](/a11y/role-deletion/). Роль `insertion` по умолчанию есть у [`<ins>`](/html/ins/), а `deletion` — у [`<del>`](/html/del/).

Предложение с `suggestion` можно связывать с относящейся к нему информацией с помощью [`aria-details`](/a11y/aria-details/) или дополнительным описанием благодаря [`aria-description`](/a11y/aria-description/).

Элементам с ролью `suggestion` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy), кроме [`aria-label`](/a11y/aria-label/) или [`aria-labelledby`](/a11y/aria-labelledby/).
