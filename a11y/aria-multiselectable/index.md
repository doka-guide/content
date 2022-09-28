---
title: "`aria-multiselectable`"
description: "ARIA-атрибут для ситуации, когда пользователь вспомогательной технологии может выбрать сразу несколько элементов."
authors:
  - doka-dog
keywords:
  - доступность
  - ARIA
  - ARIA-атрибут
related:
  - a11y/aria-intro
  - a11y/aria-attrs
  - html/multiple
tags:
  - doka
  - placeholder
---

## Кратко

[Свойство виджета](/a11y/aria-attrs/#atributy-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya). Означает, что пользователь может выбрать несколько элементов.

В HTML точно так же работает атрибут [`multiple`](/html/multiple/).

## Пример

```html
<p id="hint">Выберите пару любимых цветов.</p>
<ul
  role="listbox"
  aria-labelledby="hint"
  tabindex="0"
  aria-multiselectable="true"
>
  <li role="option" id="green" aria-selected="false">Зелёный</li>
  <li role="option" id="blue" aria-selected="true">Синий</li>
  <li role="option" id="yellow" aria-selected="true">Жёлтый</li>
</ul>
```

## Как пишется

Добавьте к тегу атрибут с одним из значений:

- `true` — можно выбрать несколько элементов.
- `false` (по умолчанию) — можно выбрать что-то одно.

Атрибут можно использовать только для некоторых [ролей](/a11y/aria-roles/):

- `listbox`.
- `tablist`.
- `grid`.
- `tree`.

`aria-multiselectable` пригодится, если решили написать свой выпадающий список или создаёте сложный элемент вроде древовидного списка, сетки или панели вкладок.

Не забудьте добавить `aria-selected` с нужным значением для элементов внутри контейнера с `aria-multiselectable`, которые могут выбрать пользователя.

Для [`<select>`](/html/select/) лучше использовать `multiple`.

## Как понять

`aria-multiselectable` нужен для родительского элемента, внутри которого есть несколько дочерних на выбор. Например, как у выпадающего или древовидного списков.
