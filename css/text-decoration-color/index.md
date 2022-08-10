---
title: "`text-decoration-color`"
description: "Раскрашивает декоративные линии текста во все цвета радуги."
authors:
  - inventoris
keywords:
  - цвет декоративной линии
tags:
  - doka
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
```

<iframe title="Базовый пример" src="demos/basic/" height="250"></iframe>

## Как пишется

Значение `text-decoration-color` по умолчанию — `currentColor`, то есть цвет такой же, что и у текста.

```css
body {
  color: #735184;
}

span {
  text-decoration-line: underline;
  text-decoration-style: double;
}
```

<iframe title="Цвет декоративной линии по умолчанию" src="demos/text-decoration-color-default/" height="250"></iframe>

В примере выше цвет двойного подчёркивания серобуромалиновый, поскольку для самого текста задан этот цвет, а значит и `currentColor` для `text-decoration-color` будет значиться серобуромалиновым. 

Это можно легко поменять: `text-decoration-color` принимает [цвет](/css/web-colors/) в любом доступном формате, например, жёлтый `yellow` или фиолетовый `#8b00ff`.

Раскрасить можно не только `text-decoration-line`, но и линии, обозначенные в html-разметке тегами, как [`<u>`](/html/u/) или [`<del>`](/html/del/). У `text-decoration-color` краски хватит на всех!

```css
del {
  text-decoration-color: orange;
}
```

<iframe title="Пример цвета для линии из html-разметки" src="demos/html-line-color/" height="250"></iframe>
