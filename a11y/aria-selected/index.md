---
title: "`aria-selected`"
description: "ARIA-атрибут, который нужен для вкладок, пунктов выпадающих списков, строк таблиц и ячеек сеток."
authors:
  - doka-dog
keywords:
  - доступность
  - ARIA
  - ARIA-атрибут
related:
  - a11y/aria-intro
  - a11y/aria-attrs
  - a11y/aria-multiselectable
tags:
  - doka
  - placeholder
---

## Кратко

[Состояние виджета](/a11y/aria-attrs/#atributy-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya). Означает, что элемент выбран. Это может быть пункт выпадающего списка, вкладка, интерактивные строки таблицы или ячейки сетки.

## Пример

```html
<div class="tab-interface">
  <div role="tablist" aria-label="Панель вкладок">
    <span
      role="tab"
      aria-controls="panel-1"
      id="tab-1"
      tabindex="0"
      aria-selected="true"
    >
      Ёжики
    </span>
  </div>
  <div role="tabpanel"aria-labelledby="tab-1"  id="panel-1" tabindex="0">
    <p>Ёжики любят купаться и есть червяков.</p>
  </div>
</div>
```

## Как пишется

Добавьте к тегу атрибут `aria-selected` с одним из значений:

- `true` — элемент выбран.
- `false` — элемент пока не выбран.
- `undefined` (по умолчанию) — элемент не выбирается.

Атрибут можно использовать только для некоторых [ролей](/a11y/aria-roles/):

- `option`.
- `tab`.
- `row`.
- `gridcell`.

Атрибут указывает на выбор одного или нескольких элементов. Когда можно выбрать несколько элементов, используйте для их контейнера атрибут [`aria-multiselectable`](/a11y/aria-multiselectable/).

## Как понять

Обычно `aria-selected` используют для элементов, которые находятся внутри сложных интерактивных виджетов. Например, для вкладки из панели вкладок или для пункта выпадающего списка.
