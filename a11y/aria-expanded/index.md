---
title: "`aria-expanded`"
description: "ARIA-атрибут для элементов, которые разворачивают и сворачивают другие элементы или содержимое."
authors:
  - doka-dog
keywords:
  - доступность
  - ARIA
  - ARIA-атрибут
related:
  - a11y/aria-intro
  - a11y/aria-attrs
  - a11y/aria-roles
tags:
  - doka
  - placeholder
---

## Кратко

[Состояние виджета](/aria-attrs/#atributy-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya). Даёт вспомогательным технологиям понять, что элемент что-то разворачивает или сворачивает.

## Пример

```html
<button aria-expanded="false" aria-controls="menu">Раскрыть меню</button>
<div class="menu" id="menu">
  <ul>
    <li>
      <a href="/dogs-pools/">Бассейны для собак</a>
    </li>
    <li>
      <a href="/cats-boxes/">Коробки для кошек</a>
    </li>
  </ul>
</div>
```

## Как пишется

Добавьте к тегу атрибут `aria-expanded` с одним из трёх значений:

- `true` — содержимое или другие элементы свёрнуты.
- `false` — содержимое или другие элементы развёрнуты.
- `undefined` (по умолчанию) — у элемента нет содержимого, которое разворачивается и сворачивается.

Атрибут можно использовать только для некоторых тегов и [ARIA-ролей](/a11y/aria-roles/):

- [`<a>`](/html/a/) или `link`.
- [`<button>`](/html/button/) или `button`.
- [`<input type="checkbox">`](/html/input/#type) или `checkbox`.
- [`<select>`](/html/select/) или `combobox` и `listbox`.
- [`<tr>`](/html/tables/#tr) или `row`.
- [`<th>`](/html/tables/#th) или `rowheader`.
- `application`.
- `tab`.
- `menuitem`.
- `treeitem`.
- `gridcell`.

Используйте `aria-expanded` вместе с `aria-controls` или `aria-owns`, если контейнер с разворачивающимися элементами не вложен в главный элемент.

## Как понять

Атрибут `aria-expanded` нужен для элементов, при взаимодействии с которыми содержимое изменяет видимость. Например для кнопки, которая показывает или скрывает меню.
