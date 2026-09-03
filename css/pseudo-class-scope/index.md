---
title: "`:scope`"
description: "Позволяет ссылаться на текущий элемент‑корень в сложных селекторах: в JS‑поиске через querySelector* и внутри CSS‑области @scope."
baseline:
  - group: scope-pseudo
    features:
      - css.selectors.scope
authors:
  - drakesbot12
keywords:
  - scope
  - область видимости селекторов
  - querySelector
  - subject selector
related:
  - js/query-selector
  - css/has
  - css/list-style
tags:
  - doka
---

## Кратко

`:scope` — псевдокласс, который соответствует «текущему корню» селектора.

- В JavaScript, при вызове `element.querySelector(All)`, `:scope` указывает на сам `element`. Это позволяет удобно писать селекторы с комбинаторами (`>`, `+`, `~`) относительно элемента, с которого начат поиск.
- В CSS, внутри [`@scope`](/css/scope/) `:scope` соответствует корневому элементу области (селектору‑якорю правила `@scope`).

## Пример

Выделим только непосредственных детей заданного блока — с помощью `:scope > …` при поиске в JS. Полная интерактивная версия — в демо ниже.

```js
const card = document.querySelector('.card')
const directChildren = card.querySelectorAll(':scope > ul > li')
directChildren.forEach((li) => li.classList.add('highlight'))
```

<iframe title=":scope — подсветка непосредственных детей" src="demos/basic/" height="460"></iframe>

## Как пишется

Синтаксис — обычный псевдокласс в селекторе:

```css
/* Внутри @scope :scope — это корень области */
@scope (.card) {
  :scope { outline: 2px dashed #2E9AFF; }
  :scope > h2 { color: #2E9AFF; }
}
```

В JavaScript `:scope` особенно полезен с относительными комбинаторами:

```js
// Только непосредственные дочерние <li>
el.querySelectorAll(':scope > li')

// Соседний элемент того же уровня
el.querySelectorAll(':scope + .sibling')

// Все последующие элементы того же уровня
el.querySelectorAll(':scope ~ .others')
```

## Как понять

Обычно селектор вроде `> li` в DOM‑методах нельзя написать «сам по себе», потому что нужен левый операнд — от чего вести отсчёт. `:scope` выступает как явный левый операнд и указывает, что ориентир — текущий корень поиска (элемент, на котором вызван `querySelector(All)`). Поэтому `el.querySelectorAll(':scope > li')` выбирает только непосредственных детей `el`, а не всех потомков.

В стилях [`@scope`](/css/scope/) ограничивает действие селекторов подблока. Там `:scope` ссылается на корневой элемент области — это делает селекторы внутри правила выразительнее и локальнее.

## Подсказки

💡 Используйте `:scope` для надёжного выбора «только детей» при работе с вложенными списками и компонентами.
💡 У `:scope` обычная «весомость» псевдокласса. Помните, что добавляя `:scope`, вы увеличиваете специфичность селектора.
💡 В CSS без [`@scope`](/css/scope/) `:scope` обычно совпадает с корнем документа и в шаблонных стилях встречается реже; максимальную пользу псевдокласс приносит в DOM‑поиске и внутри [`@scope`](/css/scope/).
