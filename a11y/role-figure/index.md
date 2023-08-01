---
title: "`figure`"
description: "Роль для иллюстраций, схем и похожего автономного содержимого."
authors:
  - doka-dog
related:
  - a11y/aria-roles
  - a11y/aria-label
  - html/figure-figcaption
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для автономного содержимого в виде изображений, иллюстраций и прочего, обычно с подписью к нему.

В HTML эта роль есть у [`<figure>`](/html/figure-figcaption/) по умолчанию.

## Как пишется

Задайте тегу `role="figure"`, лучше всего [`<div>`](/html/div/) или [`<span>`](/html/span/). В большинстве случаев лучше использовать `<figure>`.

У элементов с `figure` может быть подпись или подробное описание с ролью [`caption`](/a11y/role-caption/). Подпись можно добавить напрямую к `figure` с помощью [`aria-label`](/a11y/aria-label/). Когда используете `caption` с краткой подписью, не забудьте связать основной элемент с ней благодаря [`aria-labelledby`](/a11y/aria-labelledby/), а если это более расширенное описание — [`aria-describedby`](/a11y/aria-describedby/).

Внутри элемента `figure` может быть интерактивный контент.

Не забывайте ссылаться и подробно описывать содержимое `figure` в тексте до или после элемента. При этом `figure` может находиться на одной странице с текстом с отсылкой и описанием и на отдельной.

Для элементов с ролью `figure` можно использовать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy).
