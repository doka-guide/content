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

[Самостоятельная роль виджета](/a11y/aria-roles/#roli-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для пункта строки меню или из связанного со строкой подменю.

В HTML нет тега с ролью `menuitem`.

## Пример

```html
<div role="menubar">
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

  <!-- Другие пункты строки меню -->

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

Пункты `menuitem` должны находиться внутри строки меню [`menubar`](/a11y/role-menubar/) или в подменю [`menu`](/a11y/role-menu/). При этом они могут располагаться отдельно или группироваться внутри другого элемента-обёртки с [ролью `group`](/a11y/role-group/).

```html
<div role="menubar">
  <span
    role="menuitem"
    tabindex="0"
  >
    Редактирование
  </span>

  <div role="group">
    <span
      role="menuitem"
      tabindex="-1"
    >
      Помощь
    </span>
    <span
      role="menuitem"
      tabindex="-1"
    >
      Клавиатурные сокращения
    </span>
  </div>

  <span
    role="menuitem"
    tabindex="-1"
  >
    Сохранение
  </span>
</div>
```

У `menuitem` обязательно должно быть имя — краткое название, которое описывают цель пункта меню. Лучше всего добавлять визуальные подписи, как «Начертание» в этом примере:

```html
<span
  role="menuitem"
  tabindex="0"
>
  Начертание
</span>
```

Другой способ задать имя пункту меню, о котором будет знать только [скринридер](/a11y/screenreaders/), — атрибут [`aria-label`](/a11y/aria-label/):

```html
<span
  role="menuitem"
  aria-label="Начертание"
  tabindex="0"
>
  <!-- Иконка -->
</span>
```

Пунктам меню с ролью `menuitem` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy) и некоторые [атрибуты виджетов](/a11y/aria-attrs/#atributy-vidzhetov):

- [`aria-disabled`](/a11y/aria-disabled/) — неактивный пункт.
- [`aria-expanded`](/a11y/aria-expanded/) — пункт, раскрывающий попап.
- [`aria-haspopup`](/a11y/aria-haspopup/) — тип попапа, который раскрывает пункт. Это может быть подменю `menu`, диалоговое окно [`dialog`](/a11y/role-dialog/), выпадающий список [`listbox`](/a11y/role-listbox/), древовидный список [`tree`](/a11y/role-tree/) или сетка [`grid`](/a11y/role-grid/).
- [`aria-setsize`](/a11y/aria-setsize/) — сколько всего пунктов в группе с учётом тех, которые пока что не появились на странице.
- [`aria-posinset`](/a11y/aria-posinset/) — порядковый номер или положение пункта меню в группе, когда он загружается из-за действий пользователя и его пока нет на странице.

Если используете неинтерактивные теги для пунктов списка, не забудьте про добавление функциональности кнопки через JavaScript.

### Навигация с клавиатуры

По пунктам строки меню `menubar` перемещаются стрелками влево <kbd>←</kbd> и вправо <kbd>→</kbd>, а внутри `menu` — стрелками вверх <kbd>↑</kbd> и вниз <kbd>↓</kbd>. Для перехода к первому пункту используют <kbd>Home</kbd>, к последнему — <kbd>End</kbd>.

#### Управление фокусом

Если пишите полностью кастомные пункты `menuitem`, добавляйте их в порядок фокуса с помощью [`tabindex`](/html/global-attrs/#tabindex) со значенем `-1` по умолчанию. Когда пользователь сделал фокус на пункте, меняйте значение на `0`. Имейте в виду, что только у одного пункта строки меню или подменю может быть нулевое значение, то есть только один элемент за раз может быть в фокусе.

## Как понять

Роль `menuitem` по желаемому поведению и свойствам похожа на обычную кнопку [`<button>`](/html/button/). Пункты меню обычно раскрывают попапы или изменяют что-то в интерфейсе. Некоторые Accessibility API даже распознают эту роль как `menubutton`, особенно если у элемента есть атрибут `aria-haspopup`.

`menuitem` — базовый элемент строки меню. Два других — [`menuitemcheckbox`](/a11y/role-menuitemcheckbox/) и [`menuitemradio`](/a11y/role-menuitemradio/). Анатомия всех типов пунктов строки меню и подменю в виде схемы:
