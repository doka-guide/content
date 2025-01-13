---
title: "`listitem`"
description: "Роль пункта из нумерованного или маркированного списка."
authors:
  - tatianafokina
related:
  - html/ul
  - a11y/role-list
  - html/li
tags:
  - doka
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для пункта нумерованного или маркированного списка.

В нумерованных списках пункты начинаются с цифр, а в маркированных — с маркеров (буллитов).

В HTML роль `listitem` уже есть у [`<li>`](/html/li/).

## Пример

Кастомный список без дополнительных ARIA-атрибутов.

```html
<div role="list">
  <span role="listitem">годы;</span>
  <span role="listitem">берут;</span>
  <span role="listitem">своё.</span>
</div>
```

## Как пишется

В большинстве случаев используйте `<li>`. Если создаёте кастомный список, то `role="listitem"` лучше всего задать [`<div>`](/html/div/) или [`<span>`](/html/span/).

Пункт с `listitem` обязательно должен быть вложен в список с ролью [`list`](/a11y/role-list/). Это может быть кастомный список с явной ролью `list` или [`<ul>`](/html/ul/) и [`<ol>`](/html/ol/), в которые роль встроена по умолчанию.

```html
<div role="list">
  <span role="listitem">Горлица.</span>
</div>
```

Элементам с ролью `listitem` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy) и два дополнительных свойства [`aria-posinset`](/a11y/aria-posinset/) и [`aria-setsize`](/a11y/aria-setsize/).

В `aria-setsize` задают итоговое количество пунктов, когда они появляются в списке не сразу. Например, как в бесконечной новостной ленте.

`aria-posinset` указывает на позицию или номер пункта в списке, содержимое которого загружается постепенно.

Если список со всеми элементами появляется на странице сразу, браузеры автоматически считают количество пунктов и определяют положение.

```html
<h2 id="list-label">Новости</h2>
<div
  role="list"
  aria-labelledby="list-label"
>
  <span role="listitem">
    <a href="#">Горлица съела кусочек хлеба</a>
  </span>
  <span role="listitem">
    <a href="#">Голубь упал со стола</a>
  </span>
  <span role="listitem">
    <a href="#">Стриж свил гнездо на льдине</a>
  </span>
  <span
    role="listitem"
    aria-setsize="100"
    aria-posinset="1"
  >
    <a href="#">Калибри спасла пчелу</a>
  </span>
  <span
    role="listitem"
    aria-setsize="100"
    aria-posinset="2"
  >
    <a href="#">Соловей начал сольную карьеру</a>
  </span>
  <!-- Элементы, подгружающиеся по мере прокрутки -->
</div>
```

ARIA-роли не влияют на стили, поэтому стилизуйте пункты с `listitem` руками.

```css
.list__item {
  position: relative;
  padding-left: 25px;
  text-transform: lowercase;
}

.list__item::before {
  content: "";
  position: absolute;
  top: 13px;
  left: 0;
  width: 14px;
  height: 14px;
  background-color: #10F3AF;
}

.list__item::after {
  content: ";";
}

.list__item:last-of-type::after {
  content: ".";
}
```

<iframe title="Стилизованные пункты кастомного списка" src="demos/styled-listitems/" height="350"></iframe>
