---
title: "`aria-disabled`"
description: "ARIA-атрибут для неизменяемых интерактивных элементов, с которыми всё равно можно взаимодействовать."
authors:
  - doka-dog
keywords:
  - доступность
  - ARIA
  - ARIA-атрибут
  - readonly
related:
  - a11y/aria-intro
  - a11y/aria-attrs
  - html/disabled
tags:
  - doka
  - placeholder
---

## Кратко

[Состояние виджета](/a11y/aria-attrs/#atributy-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya). Указывает на то, что элемент нельзя изменять и взаимодействовать с ним как-то ещё.

Так же работает HTML-атрибут [`disabled`](/html/disabled/).

## Пример

```html
<div role="button" aria-disabled="true" tabindex="-1">Редактировать</div>
```

## Как пишется

Добавьте к тегу атрибут `aria-disabled` с одним из значений:

- `true` — элемент неактивен.
- `false` (по умолчанию) — элемент активен, с ним можно взаимодействовать.

`aria-disabled` можно задавать только некоторым тегам и [ролям](/a11y/aria-roles/):

- [`<button>`](/html/button/), [`<summary>`](/html/details/), [`<input>` c типами](/html/input/#type) `button`, `image`, `reset`, `submit` или для роли [`button`](/a11y/role-button/).
- [`<a>`](/html/a/) или [`link`](/a11y/role-link/).
- [`<details>`](/html/details/), [`<fieldset>`](/html/fieldset/), [`<optgroup>`](/html/optgroup/) или `group`.
- [`<hr>`](/html/hr/) или `separator`.
- [`<div>`](/html/div/), [`<span>`](/html/span/) или `generic`.
- `tab`.
- `scrollbar`.
- `application`.
- `gridcell`.
- `menuitem`.

Для HTML-тегов лучше использовать атрибут `disabled` вместо `aria-disabled` там, где он поддерживается.

Если задаёте `aria-disabled` родительскому элементу, его дети становятся тоже неактивными.

Чтобы элемент с `aria-disabled` был по-настоящему неактивен, нужны CSS и JavaScript.

## Как понять

На элементе с `aria-disabled` пользователи не могут сделать фокус, узнать о его роли и состоянии, а также скопировать из него данные.

Такое поведение может быть у временно неактивных элементов. К примеру, когда в форме заполнены не все поля или какое-то действие в процессе выполнения.
