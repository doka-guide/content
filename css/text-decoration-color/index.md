---
title: "`text-decoration-color`"
description: "Раскрашивает декоративные линии текста."
authors:
  - doka-dog
contributors:
  - inventoris
keywords:
  - цвет декоративного элемента
tags:
  - doka
  - placeholder
---

## Кратко

Свойство `text-decoration-color` определяет цвет декоративной линии (подчёркивания, зачёркивания и других), заданной при помощи [`text-decoration-line`](/css/text-decoration-line/).

## Пример

Зададим для слов, обозначающих цвет в тексте, двойное нижнее подчёркивание, и разукрасим линии в нужные цвета: 

```css
span {
  text-decoration-line: underline;
  text-decoration-style: double;
}

.red {
  text-decoration-color: red;
}

.yellow {
  text-decoration-color: yellow;
}

.white {
  text-decoration-color: white;
}

.black {
  text-decoration-color: black;
}
```

<iframe title="Базовый пример" src="demos/basic/" height="250"></iframe>

## Как пишется

Значением `text-decoration-color` может быть [цвет](/css/web-colors/) в любом доступном формате.
