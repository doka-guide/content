---
title: "`justify-items`"
description: "Свойство для выравнивания грид-элементов по горизонтали."
authors:
  - solarrust
keywords:
  - выравнивание по горизонтальной оси
related:
  - css/justify-self
  - css/grid-guide
  - css/justify-content
tags:
  - doka
---

## Кратко

Свойство, с помощью которого задаётся выравнивание грид-элементов по горизонтальной оси. Применяется ко всем элементам внутри грид-родителя.

## Пример

```css
.container {
  display: grid;
  grid-template-columns: 1fr 400px 1fr;
  grid-template-rows: repeat(3, 170px);
  gap: 20px;

  justify-items: start;
}

.item {
  min-width: 300px;
}
```

![Пример реализации свойства justify-items со значением start](images/1.png)

## Как пишется

- `start` — выравнивает элемент по начальной (левой для русского языка) линии.
- `end` — выравнивает элемент по конечной (правой для русского языка) линии.
- `center` — выравнивает элемент по центру грид-ячейки.
- `stretch` — растягивает элемент на всю ширину грид-ячейки.

## Подсказки

💡 Можно управлять выравниванием отдельных грид-элементов при помощи свойства [`justify-self`](/css/justify-self/).

<aside>

📝 Полный список свойств гридов можно посмотреть в [гайде по grid](/css/grid-guide/).

</aside>
