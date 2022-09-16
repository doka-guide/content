---
title: "ARIA-роли `img`, `image`"
description: "Как превратить элемент в картинку с помощью WAI-ARIA."
authors:
  - doka-dog
keywords:
  - доступность
  - ARIA
  - ARIA-роль
  - картинка
  - img
related:
  - a11y/aria-intro
  - a11y/aria-roles
  - html/img
tags:
  - doka
  - placeholder
---

## Кратко

[ARIA-роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) для одного или нескольких изображений.

В [WAI-ARIA 1.3](/a11y/aria-intro/#specifikaciya) появится синоним для роли `img` — `image`. Они делают одно и то же, но поддержка `img` пока лучше.

Роль `img` или `image` есть у [`<img>`](/html/img/) по умолчанию.

## Пример

```html
<div role="img" aria-label="Общее описание для всех картинок.">
  <img src="picture-1.png" alt="">
  <img src="picture-2.png" alt="">
</div>
```

## Как пишется

Добавьте к тегу `role="img"`. Лучше, чтобы это были семантически нейтральные [`<div>`](/html/div/) или [`<span>`](/html/span/). Одно из [правил использования ARIA](/a11y/aria-intro/#pravila-ispolzovaniya) — не перезаписывать роли без необходимости.

В большинстве случаев для одной картинки лучше использовать `<img>` вместо ролей `img` или `image`.

Обязательно добавляйте для элемента с `img` или `image` атрибуты [`aria-label`](/a11y/aria-label/) или [`aria-labelledby`](/a11y/aria-labelledby/). Они нужны для подписи картинки вместо `alt`. Также для этих ролей можно использовать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy).

## Как понять

`img` или `image` нужны для создания контейнера для одного или нескольких изображений, когда никак не использовать возможности HTML.
