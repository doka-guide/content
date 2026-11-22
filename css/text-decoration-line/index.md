---
title: "`text-decoration-line`"
description: "Свойство чтобы подводить черту!"
baseline:
  - group: text-decoration
    features:
      - css.properties.text-decoration-line
authors:
  - inventoris
keywords:
  - декоративная линия
related:
  - css/web-colors
  - css/border-color
  - css/outline-color
tags:
  - doka
---

## Кратко

Свойство `text-decoration-line` создаёт декоративные линии в тексте.

Заодно их можно разукрасить при помощи свойства [`text-decoration-color`](/css/text-decoration-color/) и стилизовать с помощью [`text-decoration-style`](/css/text-decoration-style/) 👀

## Пример

Украсим текст парой линий.

```css
.underline {
  text-decoration-line: underline;
}

.line-through {
  text-decoration-line: line-through;
}
```

<iframe title="Базовый пример" src="demos/basic/" height="300"></iframe>

## Как пишется

Возможные значения:

- `none` — линия не выводится (значение по умолчанию);
- `underline` — линия выводится под текстом, подчёркивание;
- `overline` — линия выводится над текстом, надчёркивание;
- `line-through` — линия выводится по центру текста, перечёркивание.

Из линий можно создавать комбинации, например:

- `underline overline` — линия выводится сверху и снизу текста;
- `underline line-through` — линия выводится снизу и по центру текста;
- `overline line-through` — линия выводится сверху и по центру текста.

Или вовсе добавить сразу три значения:

- `overline underline line-through` — линия выводится везде.

## Подсказки

💡 С помощью свойства `text-decoration-line` можно легко убрать дефолтное подчёркивание ссылки: достаточно указать значение `none`.

```css
a {
  text-decoration-line: none;
}
```

<iframe title="Пример ссылки без подчёркивания" src="demos/link-without-underline/" height="250"></iframe>
