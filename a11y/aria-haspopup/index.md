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
<div role="menubar" class="menu">
  <button role="menuitem" type="button" class="menu__button" aria-expanded="false" aria-controls="popup" aria-haspopup="menu">
    Настройки профиля
    <span class="menu__button__arrow"></span>
  </button>
  <ul role="menu" class="menu__popup" id="popup">
    <li role="menuitem" class="menu__popup__item">
      Добавить почту
    </li>
    <li role="menuitem" class="menu__popup__item">
      Сменить пароль
    </li>
  </ul>
  <button role="menuitem" class="menu__button" type="button">
    Уведомления
  </button>
  <button role="menuitem" class="menu__button" type="button">
    Выйти из профиля
  </button>
</div>


```

## Как пишется

Добавьте к тегу или [ARIA-роли](/a11y/aria-roles/) атрибут `aria-haspopup` с одним из значений:

- `false` (по умолчанию) — у элемента нет попапа.
- `true`, `menu` — попап с ролью «настоящего» меню [`menu`](/a11y/role-menu/).
- `listbox` — попап с ролью выпадающего списка [`listbox`](/a11y/role-listbox/).
- `tree` — попап с ролью древовидного списка [`tree`](/a11y/role-tree/).
- `grid` — попап с ролью сетки [`grid`](/a11y/role-grid/).
- `dialog` — попап с ролью модального окна [`dialog`](/a11y/role-dialog/).

Значение `aria-haspopup` должно совпадать с ролью попапа. Этот атрибут *не подходит* для тултипов и простой навигации по сайту со ссылками на другие страницы.

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

`aria-haspopup` нужен для сложных элементов, которые раскрывают _попап_ — блок с содержимым, который появляется поверх остального на странице. У таких элементов есть визуальный указатель на то, что они открывают попап. Это может быть иконка с треугольником, стрелкой или точками или линиями как в бургерном меню.
