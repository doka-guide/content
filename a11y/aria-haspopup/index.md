---
title: "`aria-haspopup`"
description: "ARIA-атрибут, который нужен для попапов."
authors:
  - doka-dog
keywords:
  - доступность
  - ARIA
  - ARIA-атрибут
  - попап
related:
  - a11y/aria-intro
  - a11y/aria-attrs
  - a11y/aria-roles
tags:
  - doka
  - placeholder
---

## Кратко

[Свойство виджета](/a11y/aria-attrs/#atributy-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya). Означает, что элемент может раскрыть попап. Например, это может быть диалоговое окно или выпадающее меню как в десктопной программе.

## Пример

```html
<button type="button" id="menubutton" aria-controls="real-menu" aria-haspopup="true">
  Настройки профиля <span class="chevron-icon"></span>
</button>
<ul role="menu" id="real-menu" aria-labelledby="menubutton">
  <li role="menuitem" data-selector-id="editProfile">
    Редактировать профиль
  </li>
  <li role="menuitem" data-selector-id="showNotification">
    Посмотреть уведомления
  </li>
</ul>
```

## Как пишется

Добавьте к тегу атрибут `aria-haspopup` с одним из значений:

- `false` (по умолчанию) — у элемента нет попапа.
- `true`, `menu` — у элемента попап с ролью `menu`.
- `listbox` — у элемента попап с ролью `listbox`.
- `tree` — у элемента попап с ролью `tree`.
- `grid` — у элемента попап с ролью `grid`.
- `dialog` — у элемента попап с ролью `dialog`.

Значение `aria-haspopup` должно совпадать с ролью попапа.

Атрибут можно использовать только для некоторых тегов и ролей:

- [`<button>`](/html/button/), [`<summary>`](/html/details/), [`<input>` c типами](/html/input/#type) `button`, `image`, `reset`, `submit` или роли [`button`](/a11y/role-button/).
- [`<a>`](/html/link/) или [`link`](/a11y/role-link/).
- [`<input type="range">`](/html/input/#type) или `slider`.
- [`<textarea>`](/html/textarea/) или [`<input>` с типами](/html/input/#type) `text`, `email`, `tel`, `url` и роли `textbox`.
- [`<select>`](/html/select/) или `combobox`.
- `tab`.
- `application`.
- `gridcell`.
- `menuitem`.
- `treeitem`.

## Как понять

`aria-haspopup` нужен для сложных элементов, которые раскрывают попап — блок с содержимым, который появляется поверх всего остального на странице. У таких элементов есть визуальный указатель на то, что они открывают попап. Это может быть иконка с треугольником, стрелкой или точками или линиями как в бургерном меню.

Этот атрибут *не подходит* для тултипов и простой навигации по сайту со ссылками на другие страницы.
