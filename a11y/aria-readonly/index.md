---
title: "`aria-readonly`"
description: "ARIA-атрибут для неизменяемых интерактивных элементов, с которыми можно как-то взаимодействовать."
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
  - html/input
tags:
  - doka
  - placeholder
---

## Кратко

[Свойство виджета](/a11y/aria-attrs/#atributy-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya). Указывает на то, что элемент нельзя изменять, но с ним всё равно можно взаимодействовать.

Так же работает HTML-атрибут [`readonly`](/html/input/#prochie-atributy).

## Пример

```html
<span role="checkbox" aria-labelledby="label" aria-checked="true" aria-readonly="true"></span>
<span id="label">Не против обработки моих данных</span>
```

## Как пишется

Добавьте к тегу атрибут `aria-readonly` с одним из значений:

- `true` — в элемент нельзя ничего ввести или изменить его.
- `false` (по умолчанию) — в элемент можно ввести или изменить в нём данные.

`aria-readonly` можно задавать только некоторым тегам и [ролям](/a11y/aria-roles/):

- [`<textarea>`](/html/textarea/), [`<input>` с типами](/html/input/#type) `text`, `email`, `tel`, `url` или для роли `textbox`.
- [`<input type="checkbox">`](/html/input/#type) или `checkbox`.
- [`<input type="number">`](/html/input/#type) или `spinbutton`.
- [`<select>`](/html/select/) или `combobox`, `listbox`.
- [`<input type="range">`](/html/input/#type) или `slider`.
- [`<div>`](/html/div/), [`<span>`](/html/span/) или `generic`.
- `radiogroup`.
- `grid`.
- `gridcel`.

Для [`<input>`](/html/input/) лучше использовать атрибут `readonly`, если он поддерживается в нужном типе поля.

## Как понять

На элементе с `aria-readonly` пользователи могут сделать фокус, узнать о его роли и состоянии, а также скопировать из него данные.

Такое поведение может быть у элементов формы с неизменяемыми, автоматически подгружаемыми данными, автоматические рассчитанной ценой как в корзине с товарами, а ещё у заголовков сеток.
