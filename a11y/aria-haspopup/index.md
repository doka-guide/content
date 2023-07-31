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
  - a11y/role-menu
  - a11y/role-listbox
  - a11y/role-dialog
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
- `true`, `menu` — у элемента попап с ролью [`menu`](/a11y/role-menu/).
- `listbox` — у элемента попап с ролью [`listbox`](/a11y/role-listbox/).
- `tree` — у элемента попап с ролью [`tree`](/a11y/role-tree/).
- `grid` — у элемента попап с ролью [`grid`](/a11y/role-grid/).
- `dialog` — у элемента попап с ролью [`dialog`](/a11y/role-dialog/).

Значение `aria-haspopup` должно совпадать с ролью попапа.

Атрибут можно использовать только для некоторых тегов и ролей:

- [`<button>`](/html/button/), [`<summary>`](/html/details/), [`<input>` c типами](/html/input/#type) `button`, `image`, `reset`, `submit` или роли [`button`](/a11y/role-button/).
- [`<a>`](/html/link/) или [`link`](/a11y/role-link/).
- [`<input type="range">`](/html/input/#type) или [`slider`](/a11y/role-slider/).
- [`<textarea>`](/html/textarea/) или [`<input>` с типами](/html/input/#type) `text`, `email`, `tel`, `url` и роли [`textbox`](/a11y/role-textbox/).
- [`<select>`](/html/select/) или [`combobox`](/a11y/role-combobox/).
- [`tab`](/a11y/role-tab/).
- [`application`](/a11y/role-application/).
- [`gridcell`](/a11y/role-gridcell/).
- [`menuitem`](/a11y/role-menuitem/).
- [`treeitem`](/a11y/role-treeitem/).

## Как понять

`aria-haspopup` нужен для сложных элементов, которые раскрывают попап — блок с содержимым, который появляется поверх всего остального на странице. У таких элементов есть визуальный указатель на то, что они открывают попап. Это может быть иконка с треугольником, стрелкой или точками или линиями как в бургерном меню.

Этот атрибут *не подходит* для тултипов и простой навигации по сайту со ссылками на другие страницы.
