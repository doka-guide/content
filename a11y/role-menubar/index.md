---
title: "`menubar`"
description: "Роль для кастомной строки меню как в программе."
authors:
  - tatianafokina
contributors:
  - skorobaeus
related:
  - a11y/role-menu
  - a11y/role-menuitem
  - a11y/role-menuitemcheckbox
tags:
  - doka
---

## Кратко

[Самостоятельная роль виджета](/a11y/aria-roles/#roli-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для строки меню. Этот элемент встретите в операционных системах и программах.

Строки меню состоят из интерактивных элементов, которые расположены горизонтально и всегда видны пользователям.

В HTML нет тега с ролью `menubar`.

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
    <!-- Содержимое попапа -->
  </ul>
  <!-- Остальные элементы строки меню -->
</div>
```

<iframe title="Меню веб-редактора текста" src="demos/app-menu/" height="600"></iframe>

## Как пишется

Задайте атрибут `role="menubar"` любому HTML-тегу, лучше [`<div>`](/html/div/) или [`<ul>`](/html/ul/).

Строка меню, как и любая навигация, должна состоять как минимум из одного вложенного в неё элемента. Это может быть обычный пункт меню [`menuitem`](/a11y/role-menuitem/), опционально раскрывающий попап [`menu`](/a11y/role-menu/), пункт в виде чекбокса [`menuitemcheckbox`](/a11y/role-menuitemcheckbox/) или пункт в виде радиокнопки [`menuitemradio`](/a11y/role-menuitemradio/).

Пункты строки меню могут распологаться отдельно или быть объединены в группу с ролью `group`. Также в строке меню может быть неинтерактивный разделитель с ролью `separator`. В этом случае он логически отделяет одну группу элементов от другой или других.

```html
<ul role="menubar">
  <span role="group">
    <li role="presentation">
      <button
        role="menuitemcheckbox"
        type="button"
        aria-selected="true"
      >
        Показать превью
      </button>
    </li>
    <li role="presentation">
      <button
        role="menuitemcheckbox"
        type="button"
        aria-selected="false"
      >
        Скрыть неразрывные пробелы
      </button>
    </li>
  </span>

  <span
    role="separator"
    aria-orientation="vertical"
  >
  </span>

  <li role="presentation">
    <button
      role="menuitem"
      type="button"
    >
      Сохранить
    </button>
  </li>
  <!-- Остальные элементы строки меню -->
</ul>
```

У роли `menubar` есть встроенное свойство [`aria-orientation="horizontal"`](/a11y/aria-orientation/). Благодаря ему пользователи скринридеров знают, что могут перемещаться по пунктам меню с помощью клавишей со стрелками влево и вправо.

Также `menubar` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy) и дополнительно несколько специальных атрибутов для виджетов:

- [`aria-disabled`](/a11y/aria-disabled/), когда все элементы меню пока неактивны, но на них можно сделать фокус с клавиатуры;
- [`aria-activedescendant`](/a11y/aria-activedescendant/).

При работе над навигацией с клавиатуры не обойтись без глобального атрибута [`tabindex`](/html/global-attrs/#tabindex) с отрицательным или нулевым значениями.

One of the following approaches is used to enable scripts to move focus among items in a menu as described in the practice for Keyboard Navigation Inside Components:
The menu container has tabindex set to -1 or 0 and aria-activedescendant set to the ID of the focused item.
Each item in the menu has tabindex set to -1, except in a menubar, where the first item has tabindex set to 0.

### Навигация с клавиатуры

Строка меню — составной виджет. Это означает, что у него особая навигация с клавиатуры, над которой придётся попотеть.

На строку меню попадают с помощью <kbd>Tab</kbd> или <kbd>Shift Tab</kbd>. Если впервые попали в строку меню, в фокусе должен оказаться первый пункт, а во второй раз — последний активный элемент. Когда находитесь на пункте строки меню и нажали на <kbd>Tab</kbd>, фокус перемещается на следующий интерактивный элемент после меню, а на <kbd>Tab Shift</kbd> — на предыдущий. Если при этом в меню открыты попапы, они должны закрыться.

Между пунктами горизонтальной строки меню перемещаются клавишами со стрелками влево <kbd>←</kbd> и вправо <kbd>→</kbd>. Если это вертикальное меню и пункты расположены друг под другом, по ним перемещаются стрелками вверх <kbd>↑</kbd> и вниз <kbd>↓</kbd>.

Во время фокуса на пункте строки меню при нажатии на Enter должен либо выпадать попап, либо нажиматься чекбокс или выбираться радиокнопка.

Home должна переносить на первый список строки меню, если вы сейчас сделали фокус на ней, а End на последний.

Дополнительно можно поддерживать нажатия на клавиши с буквами или символами. Благодаря этому пользователи могут быстро перемещаться к нужным пунктам, которые начинаются с буквы или символа, на которы еони нажали на клавиатуре.

Опционально также можно поддерживтаь пробел.

## Как понять

Меню на сайтах обычно состоит из ссылок, так что для него достаточно использовать список `<ul>`, вложенный в [`<nav>`](/html/nav/).

В классической, «настоящей» строке меню размещают часто используемые кнопки, чекбоксы, радиокнопки или другие интерактивные элементы, которые раскрывают попапы, изменяют внешний вид и содержимое других элементов на странице. Как раз в этом случае и пригодится роль `menubar`.

Анатомия меню как в программе в виде схемы:
