---
title: "`text-decoration-style`"
description: "Делает декоративные линии текста стильными."
authors:
  - inventoris
keywords:
  - стиль декоративной линии
related:
  - html/del
  - css/first-line
  - css/first-letter
tags:
  - doka
---

## Кратко

Свойство `text-decoration-style` управляет стилем декоративной линии для текста (подчёркивание, перечёркивание и другие).

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

- `solid` — сплошная линия (значение по умолчанию);
- `double` — двойная сплошная линия;
- `dotted` — пунктирная линия точками;
- `dashed` — пунктирная линия чёрточками;
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

Добавить декоративную линию и навести красоту можно с помощью псевдоэлементов [`::first-line`](/css/first-line/) для первой строки текста или [`::first-letter`](/css/first-letter/) для первой буквы в нём.

```css
.dotted::first-line {
  text-decoration-line: underline;
  text-decoration-style: dashed;
}

.double::first-letter {
  text-decoration-line: underline;
  text-decoration-style: double;
}
```

<iframe title="Пример создания и стилизации линий с помощью псевдоэлементов" src="demos/pseudo-element-line/" height="250"></iframe>

Стилизуются и другие линии, кроме назначенных свойством [`text-decoration-line`](/css/text-decoration-line/). Например, созданные внутри HTML-разметки с помощью тегов вроде [`<del>`](/html/del/) или [`<u>`](/html/u/).

```css
u {
  text-decoration-style: wavy;
}
```

<iframe title="Пример стилизации линии, созданной html-тегом" src="demos/html-line/" height="250"></iframe>
