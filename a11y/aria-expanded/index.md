---
title: "`aria-expanded`"
description: "Как рассказать скринридерам, что элемент что-то разворачивает и сворачивает."
authors:
  - tatianafokina
contributors:
  - skorobaeus
keywords:
  - a11y
  - доступность
  - ARIA
  - ARIA-атрибут
  - expandable widget
related:
  - a11y/aria-owns
  - a11y/aria-haspopup
  - a11y/aria-controls
tags:
  - doka
---

## Кратко

[Состояние виджета](/a11y/aria-attrs/#atributy-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya). Сообщает вспомогательным технологиям, что элемент разворачивает и сворачивает другое содержимое.

`aria-expanded` нужен для компонентов, которые изменяют видимость содержимого. Например для кнопки, которая показывает или скрывает список ссылок на сайте.

## Пример

```html
<nav>
  <button
    aria-label="Список товаров"
    aria-expanded="false"
    aria-controls="subnav"
  >
    <!-- Иконка -->
  </button>

  <div id="subnav">
    <ul>
      <li>
        <a href="/dogs-pools/">
          Бассейны для собак
        </a>
      </li>
      <li>
        <a href="/cats-boxes/">
          Коробки для кошек
        </a>
      </li>
      <li>
        <a href="/rats-water-bowls/">
          Поилки для крыс
        </a>
      </li>
    </ul>
  </div>
</nav>
```

<iframe title="Бургер-меню" src="demos/burger-menu/" height="360"></iframe>

[Скринридер](/a11y/screenreaders/) при фокусе на кнопке расскажет о ней примерно так: «Список товаров, кнопка, свёрнуто». Когда пользователь раскроет список, скринридер просто сообщит «развёрнуто» без повторения информации о кнопке.

## Как пишется

Добавьте к элементу атрибут `aria-expanded` с одним из трёх значений:

- `undefined` (по умолчанию) — у элемента нет содержимого, которое разворачивается и сворачивается.
- `true` — содержимое или другие элементы развёрнуты.
- `false` — содержимое или другие элементы свёрнуты.

`aria-expanded` используют для интерактивных элементов, с которыми могут взаимодействовать пользователи. Так что атрибут подходит только для некоторых HTML-тегов и [ARIA-ролей](/a11y/aria-roles/):

- ссылок [`<a>`](/html/a/) или [роли `link`](/a11y/role-link/);
- кнопок [`<button>`](/html/button/) или [роли `button`](/a11y/role-button/);
- чекбоксов [`<input type="checkbox">`](/html/input/#type) или [роли `checkbox`](/a11y/role-checkbox/);
- выпадающих списков [`<select>`](/html/select/) или ролей [`combobox`](/a11y/role-combobox/), [`listbox`](/a11y/role-listbox/);
- интерактивных строк таблиц [`<tr>`](/html/tables/#tr) или [`row`](/a11y/role-row/);
- интерактивных заголовков ячеек или строк таблиц [`<th>`](/html/tables/#th) или [`rowheader`](/a11y/role-rowheader/);
- приложений [`application`](/a11y/role-application/);
- вкладок [`tab`](/a11y/role-tab/);
- пунктов меню как в программе [`menuitem`](/a11y/role-menuitem/);
- пунктов древовидных списков [`treeitem`](/a11y/role-treeitem/);
- ячеек сеток [`gridcell`](/a11y/role-gridcell/).

Атрибут повысит доступность бургер-меню, кастомных аккордеонов, выпадающих или древовидных списков, а ещё сеток — интерактивных таблиц как в Excel.

`aria-expanded` хорошо сочетается с атрибутами связи [`aria-controls`](/a11y/aria-controls/) и [`aria-owns`](/a11y/aria-owns/). `aria-controls` указывает на связь между управляющим и управляемым элементами, а `aria-owns` — на связь между родительским и дочерним.

Чтобы скринридеры правильно рассказали о том, свёрнут или развёрнут элемент, задействуйте магию JavaScript 🪄 Например, слушайте [событие `click`](/js/events/) на элементе и, если содержимое развёрнуто, задавайте кнопке `aria-expanded="true"`, если свёрнуто — `aria-expanded="false"`. Значения можно переключать методом `.setAttribute()`.
