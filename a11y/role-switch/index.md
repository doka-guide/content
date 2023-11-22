---
title: "`switch`"
description: "Как сделать элемент переключателем с помощью WAI-ARIA."
authors:
  - tatianafokina
contributors:
  - skorobaeus
related:
  - a11y/aria-intro
  - a11y/aria-roles
  - html/input
tags:
  - doka
---

## Кратко

[Роль виджета](/a11y/aria-roles/#roli-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya). Указывает на то, что элемент что-то переключает. Например, тему, оповещения или какие-то другие настройки на сайте.

К этой роли близок [`<input>` с типом `checkbox`](/html/input/#type), а в ARIA на неё похожа роль [`checkox`](/a11y/role-checkbox/). Однако они не эквиваленты `switch`.

<aside>

☝ Десктопный VoiceOver пока считает [элементы с ролью `switch` чекбоксами](https://bugs.webkit.org/show_bug.cgi?id=196354).

</aside>

## Пример

```html
<span class="label" id="label">
  Оповещения:
</span>

<button
  class="button"
  role="switch"
  aria-checked="false"
  aria-labelledby="label"
>
  <span class="button__off" aria-hidden="true">
    Выключены
  </span>
  <span class="button__on" aria-hidden="true">
    Включены
  </span>
</button>
```

<iframe title="Кнопка-переключатель" src="demos/button-with-switch-role/" height="250"></iframe>

Скринридер прочитает код примерно так: «Переключатель с ролью switch, не выбран, оповещения».

Если не уверены, что браузер и скринридер хорошо поддерживают `switch`, используйте `<input type="checkbox">`. В этом случае не нужно использовать `aria-checked`. Достаточно добавить HTML-атрибут `checked`.

## Как пишется

Добавьте к нужному элементу `role="switch"`. Роль можно задавать для всех тегов, с которыми можно взаимодействовать. Например, [`<button>`](/html/button/), [`<div>`](/html/div/) или [`<span>`](/html/span/) с `tabindex="0"`.

У элемента с ролью `switch` обязательно должен быть атрибут [`aria-checked`](/a11y/aria-checked/) со значением `true` или `false`. Менять значения атрибута нужно с помощью JavaScript.

У `aria-checked` есть ещё значение `mixed`, но его лучше не использовать в случае элемента с ролью `switch`. [Браузеры не всегда обрабатывают значение `mixed` как `false`](https://adrianroselli.com/2021/10/switch-role-support.html), хотя об этом написано в спецификации ARIA.

Если добавите внутрь контейнера с ролью `switch` семантический тег, в [дерево доступности](/a11y/screenreaders/#derevo-dostupnosti) попадёт текст из него, а роль сбросится.

Так видите код вы:

```html
<div role="switch" tabindex="0" aria-checked="false">
  <h2>Оповещения включены</h2>
</div>
```

А так видит код скринридер:

```html
<div role="switch" tabindex="0" aria-checked="false">
  Оповещения включены
</div>
```

## Как понять

У обычного чекбокса есть состояния «Выбран» и «Не выбран». Элемент с ролью `switch` бывает в состояниях «Включён» и «Выключен», в отличие от простого чекбокса.
