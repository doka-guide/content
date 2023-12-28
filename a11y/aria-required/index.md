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
  - a11y/aria-errormessage
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

- [`<input type="checkbox">`](/html/input/#type) или [`checkbox`](/a11y/role-checkbox/).
- [`<select>`](/html/select/) или [`combobox`](/a11y/role-combobox/) и [`listbox`](/a11y/role-listbox/).
- [`<textarea>`](/html/textarea/), [`<input>` с типами](/html/input/#type) `text`, `email`, `tel`, `url` или роли [`textbox`](/a11y/role-textbox/).
- [`<input type="number">`](/html/input/#type) или [`spinbutton`](/a11y/role-spinbutton/).
- [`div`](/html/div/), [`span`](/html/span/) или [`generic`](/a11y/role-generic/).
- [`radiogroup`](/a11y/role-radiogroup/).
- [`tree`](/a11y/role-tree/).
- [`gridcell`](/a11y/role-gridcell/).

Для `<input>`, `<select>` или `<textarea>` лучше использовать атрибут `required`.

## Как понять

`aria-required` можно добавлять не только к полям или чекбоксам, но и к целым группам радиокнопок или к ячейкам сеток.
