---
title: "`aria-haspopup`"
description: "Атрибут, который рассказывает вспомогательным технологиям о попапах."
authors:
  - tatianafokina
keywords:
  - a11y
  - доступность
  - ARIA
  - ARIA-атрибут
  - попап
  - popup
related:
  - a11y/role-menu
  - a11y/role-listbox
  - a11y/role-dialog
tags:
  - doka
---

## Кратко

[Свойство виджета](/a11y/aria-attrs/#atributy-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya). Означает, что элемент может раскрывает _попап_ — блок с содержимым, который появляется поверх всего остального на странице. Например, диалоговое окно или выпадающее меню как в десктопной программе.

<aside>

⚠️ `aria-haspopup` *не подходит* для тултипов и простой навигации по сайту со ссылками на другие страницы.

</aside>

## Пример

```html
<div role="menubar">
  <button
    role="menuitem"
    type="button"
    aria-expanded="false"
    aria-controls="fonts"
    aria-haspopup="menu"
  >
    Начертание
  </button>
  <ul role="menu" id="fonts">
    <!-- Элементы попапа -->
  </ul>

  <!-- Остальные элементы меню -->
</div>
```

<iframe title="Меню редактора текста" src="demos/app-menu/" height="600"></iframe>

Скринридер прочитает код из демки примерно так: «».

## Как пишется

Добавьте к плдъодящему тегу или [ARIA-роли](/a11y/aria-roles/) атрибут `aria-haspopup` с одним из значений:

- `false` (по умолчанию) — у элемента нет попапа.
- `true` или `menu` — попап с ролью «настоящего» меню [`menu`](/a11y/role-menu/).
- `listbox` — попап с ролью выпадающего списка [`listbox`](/a11y/role-listbox/).
- `tree` — попап с ролью древовидного списка [`tree`](/a11y/role-tree/).
- `grid` — попап с ролью сетки [`grid`](/a11y/role-grid/).
- `dialog` — попап с ролью модального окна [`dialog`](/a11y/role-dialog/).

Значение `aria-haspopup` должно совпадать с ролью попапа.

Вот роли и теги, которым можно задавать `aria-haspopup`:

- [`<button>`](/html/button/), [`<summary>`](/html/details/), [`<input>` c типами](/html/input/#type) `button`, `image`, `reset`, `submit` или [роли `button`](/a11y/role-button/).
- [`<a>`](/html/link/) или [роли `link`](/a11y/role-link/).
- [`<input type="range">`](/html/input/#type) или [роли `slider`](/a11y/role-slider/).
- [`<textarea>`](/html/textarea/), [`<input>` с типами](/html/input/#type) `text`, `email`, `tel`, `url` или [роли `textbox`](/a11y/role-textbox/).
- [`<select>`](/html/select/) или [роли `combobox`](/a11y/role-combobox/).
- [`tab`](/a11y/role-tab/).
- [`application`](/a11y/role-application/).
- [`gridcell`](/a11y/role-gridcell/).
- [`menuitem`](/a11y/role-menuitem/).
- [`treeitem`](/a11y/role-treeitem/).

Часто у элементов с попапами есть визуальный указатель на то, что они что-то открывают. Это может быть иконка с треугольником, стрелкой, точками или линиями как в бургерном меню.

Пока что [`aria-haspopup` хорошо поддерживают JAWS и NVDA](https://html5accessibility.com/stuff/2023/06/20/aria-haspopup-less-is-more/), начиная с версий 2023 года. Также с атрибутом знакомы все современные браузеры. Более старые версии [скринридеров](/a11y/screenreaders/) могут не поддерживать все значения атрибута, игнорировать его у ссылок и кнопок, а ещё не рассказывать о типе попапа.
