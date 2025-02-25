---
title: "`user-select`"
description: "Свойство CSS, которое разрешает или запрещает возможность выбора текста."

baseline:
  - group: user-select
    features:
      - css.properties.user-select
      - css.properties.user-select.all
      - css.properties.user-select.auto
      - css.properties.user-select.none
      - css.properties.user-select.text
authors:
  - punkmachine
contributors:
  - vitya-ne
keywords:
  - выделение текста мышкой
related:
  - css/pointer-events
  - css/selection
  - css/cursor
tags:
  - doka
---

## Кратко

Свойство `user-select` определяет, может ли пользователь выбрать текст в элементе, для которого это свойство задано.

## Пример

Добавим к тексту `user-select`, чтобы он не выделялся мышкой.

```css
p {
  user-select: none;
}
```

<iframe title="Свойство user-select" src="demos/user-select/" height="350"></iframe>

## Как пишется

- `none` — текст внутри элемента нельзя выделить и, как следствие, скопировать.
- `text` — текст может быть выделен.
- `all` — весь текст, включая текст в дочерних элементах, быть выделен автоматически при клике.
- `auto` — значение вычисляется в зависимости от элемента:
  - для редактируемого элемента (атрибут [`contenteditable`](/html/global-attrs/#contenteditable)) значение будет `contain`;
  - для псевдоэлементов [`::before`](/css/before/) и [`::after`](/css/after/) значение будет `none`;
  - значения `user-select: all` и `user-select: none` наследуются от родителя.
  - иначе значение будет `text`.
- `contain` — может быть выделен только текст элемента, которому задано свойство.

⚠️ Обратите внимание: значение `contain` определено в спецификации, но не поддерживается браузерами.

## Подсказки

💡 Обычно свойство используется для интерактивных элементов на которые можно нажать, но выделение текста у них при этом нежелательно.
