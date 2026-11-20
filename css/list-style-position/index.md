---
title: "`list-style-position`"
description: "Можно двигать маркеры списка внутрь или наружу строки."
baseline:
  - group: list-style
    features:
      - css.properties.list-style-position
authors:
  - ezhkov
contributors:
  - skorobaeus
keywords:
  - list-style-position
related:
  - css/list-style
  - html/ul
  - html/li
tags:
  - doka
---

## Кратко

Свойство `list-style-position` задаёт положение маркера списка относительно элемента списка.

## Пример

```css
.inside {
  list-style-position: inside;
  list-style-type: square;
}
```

## Как пишется

Ключевые слова:

```css
.selector {
  list-style-position: inside;
  list-style-position: outside;
}
```

## Как понять

Свойство указывает, будет ли маркер являться частью содержимого в элементе списка (`inside`), либо будет находиться вне элемента (`outside`).

<iframe title="Положение маркеров" src="demos/list-style-position/" height="470"></iframe>

## Подсказки

💡 По умолчанию свойство имеет значение `outside`.

💡 Это свойство применяется к элементам, у которых свойство `display` имеет значение `list-item`. Как правило, это элементы списка [`<li>`](/html/li/). Но так как это свойство наследуется, то обычно его задают самому списку [`<ul>`](/html/ul/), чтобы оно применилось ко всем элементам списка сразу.
