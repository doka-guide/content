---
title: "`aria-checked`"
description: "ARIA-атрибут, который нужен для чекбоксов, переключателей, радиокнопок и пунктов выпадающего списка."
authors:
  - doka-dog
keywords:
  - доступность
  - ARIA
  - ARIA-атрибут
  - флажок
  - чекбокс
  - радиокнопка
  - переключатель
related:
  - a11y/aria-intro
  - a11y/aria-attrs
  - a11y/aria-roles
tags:
  - doka
  - placeholder
---

## Кратко

[Состояние виджета](/a11y/aria-attrs/#atributy-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya). Означает состояние, в котором сейчас находятся чекбокс или по-другому флажок, радиокнопка или пункт выпадающего списка.

Так же ведёт себя HTML-атрибут `checked`.

## Пример

```html
<span role="checkbox" aria-labelledby="label" tabindex="0" aria-checked="false"></span>
<label id="label">Получать рассылку</label>
```

## Как пишется

Добавьте к тегу атрибут `aria-checked` с одним из значений:

- `true` — элемент отмечен или выбран.
- `false` — элемент не отмечен или не выбран.
- `mixed` — у элементов смешанное состояние.
- `undefined` (по умолчанию) — элемент нельзя отметить или выбрать.

Значение `mixed` поддерживают элементы с ролями `checkbox` и `menuitemcheckbox`.

`aria-checked` можно использовать только для некоторых [ролей](/a11y/aria-roles/):

- `option`.
- `radio`.
- `checkbox`.
- `menuitemcheckbox`.
- `switch`.

Если используете [`<input type="radio">`](/html/input/#type), [`<input type="checkbox">`](/html/input/#type) и [`<option>`](/html/option/), им не нужен атрибут `aria-checked`.

## Как понять

Чекбоксы, переключатели, радиокнопки и пункты выпадающего списка обычно бывают в двух состояниях — выбранном или нет. У групп чекбоксов иногда бывает смешанное состояние, когда выбраны не все чекбоксы.
