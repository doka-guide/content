---
title: "`aria-required`"
description: "ARIA-атрибут, который указывает на обязательность ввода данных в элемент формы."
authors:
  - doka-dog
keywords:
  - доступность
  - ARIA
  - ARIA-атрибут
  - форма
related:
  - a11y/aria-intro
  - a11y/aria-attrs
  - html/required
tags:
  - doka
  - placeholder
---

## Кратко

[Свойство виджета](/a11y/aria-attrs/#atributy-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya), которое определяет обязательность ввода данных в элемент формы перед их отправкой.

Аналог `aria-required` в HTML — атрибут [`required`](/html/required/).

## Пример

```html
<span id="label">Ваша почта:</span>
<span role="textbox" aria-labelledby="label" id="email" aria-required="true" contenteditable></span>
```

## Как пишется

Добавьте к тегу атрибут `aria-required` с одним из двух значений:

- `true` — нужно обязательно ввести сюда данные.
- `false` (по умолчанию) — данные вводить необязательно.

Атрибут можно использовать только для некоторых тегов и [ARIA-ролей](/a11y/aria-roles/):

- [`<input type="checkbox">`](/html/input/#type) или `checkbox`.
- [`<select>`](/html/select/) или `combobox` и `listbox`.
- [`<textarea>`](/html/textarea/), [`<input>` с типами](/html/input/#type) `text`, `email`, `tel`, `url` или роли `textbox`.
- [`<input type="number">`](/html/input/#type) или `spinbutton`.
- [`div`](/html/div/), [`span`](/html/span/) или `generic`.
- `radiogroup`.
- `tree`.
- `gridcell`.

Для `<input>`, `<select>` или `<textarea>` лучше использовать атрибут `required`.

## Как понять

`aria-required` можно добавлять не только к полям или чекбоксам, но и к целым группам радиокнопок или к ячейкам сеток.
