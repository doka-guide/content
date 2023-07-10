---
title: "`separator`"
description: "Роль той самой горизонтальной черты, которая разделяет блоки на странице."
authors:
  - doka-dog
related:
  - a11y/aria-valuemin
  - a11y/aria-valuenow
  - html/hr
tags:
  - doka
  - placeholder
---

## Кратко

[Самостоятельная роль виджета](/a11y/aria-roles/#roli-vidzhetov) и [структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для разделителя. Обычно это горизонтальная черта, которая разделяет смысловые блоки на странице.

В HTML эта роль есть у [`<hr>`](/html/hr/), если это обычный, неинтерактивный разделитель.

## Как пишется

Задайте `role="separator"` любому тегу, лучше [`<div>`](/html/div/) или [`<span>`](/html/span/).

Чаще всего разделители статические, однако бывают ситуации, когда пользователи могут взаимодействовать с ними.

Визуально статические разделители выглядят как горизонтальная черта и для них лучше использовать `<hr>`.

Интерактивные разделители можно перемещать и они не обязательно располагаются горизонтально. Такие разделители могли встречать в меню программ и текстовых редакторах. У них должен быть атрибут [`aria-valuenow`](/a11y/aria-valuenow/) с числовым значением, которое означает позицию элемента. Ещё не забудьте задать [`aria-valuemin`](/a11y/aria-valuemin/) и [`aria-valuemax`](/a11y/aria-valuemax/).

У роли `separator` есть встроенное свойство [`aria-orientation="horizontal"`](/a11y/aria-orientation/).

Для обычных разделителей можно использовать [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy), а для интерактивных некоторые другие [атрибуты виджетов](/a11y/aria-attrs/#atributy-vidzhetov) — [`aria-disabled`](/a11y/aria-disabled/) и [`aria-valuetext`](/a11y/aria-valuetext/).
