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
  - a11y/role-combobox
  - a11y/role-listbox
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

- [`<textarea>`](/html/textarea/), [`<input>` с типами](/html/input/#type) `text`, `email`, `tel`, `url` или для роли [`textbox`](/a11y/role-textbox/).
- [`<input type="checkbox">`](/html/input/#type) или [`checkbox`](/a11y/role-checkbox/).
- [`<input type="number">`](/html/input/#type) или [`spinbutton`](/a11y/role-spinbutton/).
- [`<select>`](/html/select/) или [`combobox`](/a11y/role-combobox/), [`listbox`](/a11y/role-listbox/).
- [`<input type="range">`](/html/input/#type) или [`slider`](/a11y/role-slider/).
- [`<div>`](/html/div/), [`<span>`](/html/span/) или [`generic`](/a11y/role-generic/).
- [`radiogroup`](/a11y/role-radiogroup/).
- [`grid`](/a11y/role-grid/).
- [`gridcell`](/a11y/role-gridcell/).

Для [`<input>`](/html/input/) лучше использовать атрибут `readonly`, если он поддерживается в нужном типе поля.

## Как понять

На элементе с `aria-readonly` пользователи могут сделать фокус, узнать о его роли и состоянии, а также скопировать из него данные.

Такое поведение может быть у элементов формы с неизменяемыми, автоматически подгружаемыми данными, автоматические рассчитанной ценой как в корзине с товарами, а ещё у заголовков сеток.
