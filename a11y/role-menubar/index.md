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

[Самостоятельная роль виджета](/a11y/aria-roles/#roli-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для строки меню, которая обычно встречается в операционных системах, программах и веб-приложениях.

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
  <ul
    role="menu"
    id="fonts"
    tabindex="-1"
  >
    <!-- Содержимое подменю -->
  </ul>
  <!-- Остальные элементы строки меню -->
</div>
```

<iframe title="Меню веб-редактора текста" src="demos/app-menu/" height="600"></iframe>

## Как пишется

Задайте любому HTML-тегу атрибут `role="menubar"`, лучше всего [`<div>`](/html/div/) или [`<ul>`](/html/ul/).

Строка меню, как и любая другая навигация, должна содержать как минимум один элемент. Это может быть обычный пункт [`menuitem`](/a11y/role-menuitem/), дополнительно раскрывающий подменю [`menu`](/a11y/role-menu/), пункт в виде чекбокса [`menuitemcheckbox`](/a11y/role-menuitemcheckbox/) или пункт в виде радиокнопки [`menuitemradio`](/a11y/role-menuitemradio/).

Пункты могут располагаться отдельно или объединяться в группы с [ролью `group`](/a11y/role-group/). Когда в строке несколько групп, их можно отделить друг от друга обычными (неинтерактивными) разделителями с ролью [`separator`](/a11y/role-separator/).

```html
<ul role="menubar">
  <span role="group">
    <li role="presentation">
      <span
        role="menuitemcheckbox"
        aria-selected="true"
        tabindex="0"
      >
        Показать превью
      </span>
    </li>
    <li role="presentation">
      <span
        role="menuitemcheckbox"
        aria-selected="false"
        tabindex="-1"
      >
        Показать неразрывные пробелы
      </span>
    </li>
  </span>

  <span
    role="separator"
    aria-orientation="vertical"
  >
  </span>

  <li role="presentation">
    <span
      role="menuitem"
      tabindex="-1"
    >
      Сохранить
    </span>
  </li>
  <!-- Остальные элементы -->
</ul>
```

У `menubar` есть свойство [`aria-orientation`](/a11y/aria-orientation/) со значением `horizontal` по умолчанию. Благодаря значению пользователи [скринридеров](/a11y/screenreaders/) и других вспомогательных технологий знают, что могут перемещаться по пунктам клавишами со стрелками влево <kbd>←</kbd> и вправо <kbd>→</kbd>.

Также можете задавать `menubar` все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy) и несколько специальных атрибутов виджетов:

- [`aria-disabled`](/a11y/aria-disabled/), когда все элементы строки неактивны, но на них можно сделать фокус;
- [`aria-activedescendant`](/a11y/aria-activedescendant/), когда нужно рассказать о выбранном пункте из строки или связанного подменю.

У строки может быть имя — её краткое название. Если оно видно всем, используйте [`aria-labelledby`](/a11y/aria-labelledby/). Когда оно доступно только скринридерам, задайте [`aria-label`](/a11y/aria-label/).

```html
<ul
  role="menubar"
  aria-labelledby="label"
>
  <span id="label">Редактор кода</span>
  <!-- Элементы строки меню -->
</ul>

<ul
  role="menubar"
  aria-label="Редактор кода"
>
  <!-- Элементы строки меню -->
</ul>
```

### Навигация с клавиатуры

Строка меню — составной виджет. Это означает, что у него особая навигация с клавиатуры, над которой придётся немного попотеть 🥵

На строку попадают с помощью клавиши <kbd>Tab</kbd> или сочетания <kbd>Shift Tab</kbd>. Когда оказались на ней в первый раз, фокус должен установиться на первом пункте, а в последующем — на последнем активном элементе. Когда находитесь на пункте и нажали на <kbd>Tab</kbd>, фокус перемещается на следующий интерактивный элемент после строки меню, на <kbd>Tab Shift</kbd> — на предыдущий. Если в строке открыто подменю, оно закроется.

Между пунктами горизонтальной строки перемещаются клавишами со стрелками влево <kbd>←</kbd> и вправо <kbd>→</kbd>. Если она вертикальная и элементы расположены друг под другом, по ним проходят стрелками вверх <kbd>↑</kbd> и вниз <kbd>↓</kbd>. Также клавиша <kbd>Home</kbd> должна переносить на первый пункт строки, <kbd>End</kbd> — на последний.

Отдельно поработайте над навигацией стрелками, когда раскрыто одно подменю из нескольких. При переходе к следующему или предыдущему элементам, связанное с ними подменю автоматически разворачивается, а предыдущее закрывается. В фокусе может оказаться раскрывающий его пункт строки или первый элемент в подменю.

Когда нажали на <kbd>Enter</kbd> или стрелку вниз <kbd>↓</kbd> на пункте с ролью `menuitem`, раскрывается связанное с ним подменю и фокус устанавливается на первом пункте из него. Если в фокусе радиокнопки `menuitemradio` или чекбоксы `menuitemcheckbox`, <kbd>Enter</kbd> выбирает их или отменяет предыдущий выбор.

Дополнительно можете поддерживать и пробел. Он делает то же, что и <kbd>Enter</kbd>: раскрывает подменю или выбирает и отменяет выбор чекбокса или радиокнопки.

Не обязательно, но при фокусе на строке можно отслеживать нажатие на клавиши с буквами и символами. Пользователи смогут быстро переместиться к нужным пунктам, которые начинаются со знака с нажатой клавиши. Например, попасть на пункт «Настройки» при нажатии на клавишу <kbd>H</kbd>.

#### Управление фокусом

Для правильной навигации в строке меню не обойтись без HTML-атрибута [`tabindex`](/html/global-attrs/#tabindex). Это особенно важно, когда создаёте кастомные элементы на тегах, с которыми обычно не могут взаимодействовать пользователи. К примеру, [`<span>`](/html/span/) и `<div>`.

Только у одного пункта из `menubar` может быть `tabindex="0"` — у первого элемента до того, как на строке сделали фокус, и у текущего пункта в фокусе. Остальные пункты должны быть с `tabindex="-1"`, пока их не выбрали. В том числе отрицательный `tabindex` должен быть у закрытого пока подменю.

```html
<ul role="menubar">
  <li role="presentation">
    <span
      role="menuitem"
      tabindex="0"
    >
      Прикрепить картинку
    </span>
  </li>
  <li role="presentation">
    <span
      role="menuitemcheckbox"
      aria-selected="false"
      tabindex="-1"
    >
      Показать превью
    </span>
  </li>
  <li role="presentation">
    <span
      role="menuitem"
      aria-expanded="false"
      aria-controls="color"
      aria-haspopup="menu"
      tabindex="-1"
    >
      Цвет
    </span>
  </li>
  <ul
    role="menu"
    id="color"
    tabindex="-1"
  >
    <!-- Содержимое подменю -->
  </ul>
</ul>
```

Один из многочисленных вариантов решения на JavaScript:

```js
const menuItems = Array.from(document.querySelectorAll('span[data-item]'))
let lastFocusedItem = null
let currentFocusedButtonIndex = -1

menuItems.forEach((item, index) => {
  item.addEventListener('focus', () => {
    if (lastFocusedItem && lastFocusedItem !== item) {
      lastFocusedItem.setAttribute('tabindex', '-1')
    }

    item.setAttribute('tabindex', '0')
    lastFocusedItem = item
  })
})
```

## Как понять

Обычное меню на сайтах состоит из ссылок, поэтому достаточно использовать `<ul>` внутри [`<nav>`](/html/nav/).

В классической, «настоящей» строке меню размещают кнопки, чекбоксы, радиокнопки и другие интерактивные элементы, которые раскрывают подменю и изменяют внешний вид и содержимое других элементов на странице. В этом случае и пригодится роль `menubar`. Анатомия элемента в виде схемы:

![Первая часть элемента — строка меню с ролью menubar. Она состоит из нескольких пунктов с видимыми текстовыми названиями. У первого пункта развёрнуто подменю с ролью menu. Под строкой меню находится тулбар с ролью toolbar. В нём собраны команды для выбора шрифта, выравнивания текста, проверки орфографии и поиска.](images/true-menu.png)
