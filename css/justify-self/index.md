---
title: "`justify-self`"
description: "Выравниваем грид-элемент вопреки правилам грид-контейнера."
baseline:
  - group: grid
    features:
      - css.properties.justify-self
authors:
  - solarrust
keywords:
  - выравнивание грид-элемента
related:
  - css/justify-items
  - css/grid-guide
  - css/align-items
tags:
  - doka
---

## Кратко

С помощью этого свойства можно установить горизонтальное выравнивание для отдельного элемента, отличное от выравнивания, заданного грид-родителю.

## Пример

```css
.container {
  justify-items: stretch;
}

.item1 {
  justify-self: center;
}
```

![Пример реализации свойства justify-self](images/1.png)

## Как пишется

Возможные значения аналогичны значениям свойства [`justify-items`](/css/justify-items/).

## Подсказки

<aside>

📝 Полный список свойств гридов можно посмотреть в [гайде по grid](/css/grid-guide/).

</aside>
