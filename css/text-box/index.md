---
title: "`text-box`"
description: "Свойство шорткат, управляющее тем, сколько вертикального пространства обрезается у текстового блока, чтобы выровнять его по важным типографским линиям."
baseline:
  - group: text-box
    features:
      - css.properties.text-box
      - css.properties.text-box-edge
      - css.properties.text-box-edge.auto
      - css.properties.text-box-trim
      - css.properties.text-box-trim.none
      - css.properties.text-box-trim.trim-both
      - css.properties.text-box-trim.trim-end
      - css.properties.text-box-trim.trim-start
      - css.properties.text-box.normal
      - css.types.text-edge
      - css.types.text-edge.alphabetic
      - css.types.text-edge.cap
      - css.types.text-edge.ex
      - css.types.text-edge.text
authors:
  - drakesbot12
keywords:
  - text-box-trim
  - text-box-edge
  - шорткат
  - обрезка отступов
related:
  - css/text-box-trim
  - css/text-box-edge
  - css/line-height
tags:
  - doka
---

## Кратко

Свойство `text-box` является шорткатом и объединяет в себе [`text-box-trim`](/css/text-box-trim/) и [`text-box-edge`](/css/text-box-edge/). Оно позволяет обрезать лишнее вертикальное пространство над и под текстом, подгоняя его под важные линии шрифта: верхушки заглавных букв (`cap`), высоту строчных (`ex`), базовую линию (`alphabetic`) и другие.

## Пример

```css
.one {
  text-box: trim-end cap alphabetic;
}

.two {
  text-box: trim-both ex alphabetic;
}
```

<iframe title="Два параграфа с разной обрезкой text-box" src="demos/basic/" height="180"></iframe>

## Как пишется

```css
.something {
  text-box: text-box-trim text-box-edge;
}
```

Cвойство text-box — это шорткат, который объединяет два свойства:

- [`text-box-trim`](/css/text-box-trim/) — указывает, какие края текстового блока обрезать: сверху (`trim-start`), снизу (`trim-end`) или оба сразу (`trim-both`);
- [`text-box-edge`](/css/text-box-edge/) — указывает, по каким линиям шрифта происходит обрезка: например, по верхней границе заглавных букв (`cap`), по высоте строчной буквы **х** (`ex`), по базовой линии (`alphabetic`) или по умолчанию ничего не обрезать (`text`).

### Значения [`text-box-trim`](css/text-box-trim/)

- `none` — не обрезать;
- `trim-start` — обрезать только верхний край;
- `trim-end` — обрезать только нижний край;
- `trim-both` — обрезать оба края (значение по умолчанию).

### Значения [`text-box-edge`](css/text-box-edge/)
Можно указать один или два ориентира:

- Один (применяется к обоим краям):

```css
.something {
  text-box: trim-both cap;
}
```

- Два (первое — для верхнего края, второе — для нижнего):

```css
.something {
  text-box: trim-both cap alphabetic;
}
```

Возможные ориенты:

- `cap` — верх заглавных букв;
- `ex` — верх строчной буквы `x`;
- `alphabetic` — базовая линия;
- `ideographic`, `ideographic-ink` — дополнительные линии из азиатской типографики;
- `auto` — выбор браузера (по умолчанию).


## Как понять

Когда браузер отрисовывает текст, он добавляет вертикальные отступы сверху и снизу строки. Эти отступы зависят от шрифта и включают:

- подступы для восходящих элементов (h, k, d);
- подступы для нисходящих (g, y, p);
- внутренние отступы шрифта (называются `leading`).

Из-за этого текст может выглядеть как будто «висит» в блоке, а фон или рамка оказываются не выровнены по буквам.
Свойство text-box позволяет убрать эти лишние отступы и сделать так, чтобы:

- верхний край блока совпадал, например, с верхушками заглавных букв (`cap`);
- нижний край — с базовой линией (`alphabetic`) или высотой строчных (`ex`).

<aside>
📐 Это особенно полезно, когда выравнивание важно — например, в кнопках, карточках, сайдбарах. Вместо хаотичных отступов вы получаете точное выравнивание текста по визуальным ориентирам шрифта.
</aside>

<iframe title="Интерактивная демка text-box" src="demos/practis/" height="500"></iframe>

## Подсказки

💡 Отличный способ визуализировать эффект — добавить бордеры сверху и снизу текста. Так можно сразу увидеть разницу.
💡 Часто используемая значение шортката `text-box: trim-both cap alphabetic;` оно убирает ненужные воздушные карманы сверху и снизу.
💡 Лучше всего работает в комбинации с `line-height`, когда нужен плотный вертикальный ритм в дизайне.
💡 На момент 2025 года свойство поддерживается только в Safari и Chrome 133+ (и Opera на том же движке).
