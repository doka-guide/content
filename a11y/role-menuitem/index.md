---
title: "`menuitem`"
description: "Роль пункта меню или подменю как в программе, операционной системе или в приложении."
authors:
  - tatianafokina
contributors:
  - skorobaeus
related:
  - a11y/aria-intro
  - a11y/role-menubar
  - a11y/role-menu
tags:
  - doka
---

## Кратко

[Самостоятельная роль виджета](/a11y/aria-roles/#roli-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для пункта «настоящего» меню, как в операционной системе или приложении, или из связанного с ним подменю.

В HTML нет тега с ролью `menuitem`.

## Пример

```html
<div role="menubar" class="menu">
  <button
    role="menuitem"
    type="button"
    aria-expanded="false"
    aria-haspopup="menu"
    aria-controls="fonts"
  >
    Начертание
  </button>

  <ul
    role="menu"
    id="fonts"
  >
    <!-- Пункты подменю -->
  </ul>

  <!-- Другие пункты меню -->

  <button
    role="menuitem"
    type="button"
    tabindex="-1"
  >
    Новая дока
  </button>
</div>
```

<iframe title="Меню веб-редактора текста" src="demos/app-menu/" height="600"></iframe>

## Как пишется

Задайте `role="menuitem"` любому тегу. Это может быть [`<div>`](/html/div/), [`<span>`](/html/span/), [`<li>`](/html/li/) и даже [`<button>`](/html/button/).

Пункты `menuitem` обязательно должны находиться внутри меню [`menubar`](/a11y/role-menubar/) или подменю [`menu`](/a11y/role-menu/). При этом пункты могут располагаться отдельно или группироваться внутри другого элемента-обёртки с [ролью `group`](/a11y/role-group/).

У элементов `menuitem` обязательно должны быть имена. Лучше всего добавлять визуальные подписи, как «Начертание» в этом примере:

```html
<span
  role="menuitem"
  tabindex="0"
>
  Начертание
</span>
```

У пунктов меню с ролью `menuitem` могут быть все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy) и некоторые [атрибуты виджетов](/a11y/aria-attrs/#atributy-vidzhetov):

- [`aria-disabled`](/a11y/aria-disabled/) — неактивный пункт.
- [`aria-expanded`](/a11y/aria-expanded/) — пункт, раскрывающий попап.
- [`aria-haspopup`](/a11y/aria-haspopup/) — какой тип попапа раскрывает пункт. Это может быть подменю `menu`, диалоговое окно [`dialog`](/a11y/role-dialog/), выпадающий список [`listbox`](/a11y/role-listbox/), древовидный список [`tree`](/a11y/role-tree/) или сетка [`grid`](/a11y/role-grid/).
- [`aria-setsize`](/a11y/aria-setsize/) — сколько всего пунктов в группе с учётом тех, которые пока что не появились на странице.
- [`aria-posinset`](/a11y/aria-posinset/) — порядковый номер или положение пункта меню в группе, если он загружается из-за действий пользователя и пока его нет на странице.

### Навигация с клавиатуры

#### Управление фокусом

Не забудьте добавить пункт меню `menuitem` в порядок фокуса с помощью [`tabindex`](/html/global-attrs/#tabindex).

## Как понять

Роль `menuitem` по свойствам и поведению близка к кнопке [`<button>`](/html/button/). Конечно, её поведение надо ещё закодить руками, но какие-то Accessibility API распознают эту роль как `menubutton`, особенно если у элемента есть атрибут `aria-haspopup`.

`menuitem` — одним из элементов строки меню. Анатомия в виде схемы:
