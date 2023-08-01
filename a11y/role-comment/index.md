---
title: "`comment`"
description: "Роль для комментариев."
authors:
  - doka-dog
related:
  - a11y/role-suggestion
  - a11y/aria-level
  - a11y/aria-details
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для комментариев. Комментарии можете встретить практически на всех сайтах. Это может быть блог, социальная сеть и даже новостной сайт.

В HTML нет тега с такой ролью.

<aside>

👶 Эта роль из [черновика ARIA 1.3](https://w3c.github.io/aria/). Она пока плохо поддерживается, так что сейчас её лучше не использовать.

</aside>

## Как пишется

Задайте тегу `role="comment"`. Для этого больше всего подходит [`<span>`](/html/span/) или [`div`](/html/div/).

Комментарии могут относится к содержимому на одной с ними странице или на отдельной. Чтобы связать комментарий с контентом на одной странице, используйте [`aria-owns`](/a11y/aria-owns/). Если комментарии многоуровневые, когда можно отвечать другим людям, пригодятся атрибуты [`aria-level`](/a11y/aria-level/), [`aria-posinset`](/a11y/aria-posinset/) и [`aria-setsize`](/a11y/aria-setsize/).

Когда комментарий и контент, к которому он относится, находятся на разных страницах, можно использовать для их связывания [`aria-details`](/a11y/aria-details/).

Элементам с ролью `comment` можно также задавать все остальные [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy).
