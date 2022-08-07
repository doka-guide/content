---
title: "`text-decoration-style`"
description: "Стилизует декоративные линии текста."
authors:
  - doka-dog
contributors:
  - inventoris
keywords:
  - стиль декоративной линии
tags:
  - doka
  - placeholder
---

## Кратко

Свойство `text-decoration-style` управляет стилем декоративной линии для текста (подчёркивание, перечёркивание и другие), назначенной свойством [`text-decoration-line`](/css/text-decoration-line/).

## Пример

```css
.subject {
  text-decoration-style: solid;
}

.participle {
  text-decoration-style: dotted;
}

.predicate {
  text-decoration-style: double;
}
```

<iframe title="Пример стилизации подчёркивания" src="demos/basic/" height="250"></iframe>

## Как пишется

Возможные значения:

- `solid` — сплошная линия (значение по умолчанию).
- `double` — двойная сплошная линия.
- `dotted` — пунктирная линия точками.
- `dashed` — пунктирная линия чёрточками.
- `wavy` — волнистая линия.

С помощью свойства `text-decoration-style` можно сделать текстовые линии красивее и информативнее. Например, подчеркнуть слово с орфографической ошибкой:

```css
span {
  text-decoration-line: underline;
  text-decoration-color: red;
  text-decoration-style: wavy;
}
```

<iframe title="Пример стилизации подчёркивания в виде ошибки" src="demos/incorrect-word/" height="250"></iframe>

Или сделать необычную ссылку:

```css
a {
  color: #ffffff;
  text-decoration-color: orange;
  text-decoration-style: dotted;
}
```

<iframe title="Пример стилизации ссылки" src="demos/dotted-link/" height="250"></iframe>
