---
title: "`font`"
description: "Одно свойство для всех настроек шрифта."
baseline:
  - group: font-shorthand
    features:
      - css.properties.font
      - css.properties.font.caption
authors:
  - drakesbot12
related:
  - css/font-family
  - css/font-stretch
  - css/line-height
tags:
  - doka
---

## Кратко

Свойство `font` — это сокращение (шорткат), которое позволяет одной строкой задать сразу несколько параметров шрифта: стиль, насыщенность, размер, высоту строки и семейство шрифта. Удобно, когда нужно быстро применить полный набор шрифтовых настроек.

## Пример

```css
p {
  font: normal 400 18px/1.6 "Roboto", sans-serif;
}
```
В этом примере задан обычный стиль, нормальная жирность, размер 18 пикселей, межстрочный интервал 1.6 и шрифт Roboto, с запасным sans-serif.

<iframe title="Пример использования font" src="demos/basic/" height="150"></iframe>

## Как пишется

```css
.font-shortcat {
  font: italic normal bold 16px/1.5 "Roboto", sans-serif;

  /* или с помощью системных шрифтов */
  font: caption;
}
```

Порядок важен:

```css
.font-shortcat {
  font: [style] [variant] [weight] [size][/line-height] [family];
}
```

Также важно отметить, что части `[size]` ([`font-size`](/css/font-size/)) и `[family]` ([`font-family`](/css/font-family/)) являются обязательными, в отличие от остальных параметров.

## Как понять

Свойство `font` объединяет сразу несколько свойств:

- [`font-style`](/css/font-style/) — курсив (`italic`), обычный (`normal`) и другие;
- [`font-variant`](/css/font-variant/) — обычно `normal` или `small-caps`;
- [`font-weight`](/css/font-weight/) — от 100 до 900 или слова (`bold`, `normal`);
- [`font-size`](/css/font-size/) — размер текста (например, `16px`, `1em`);
- [`line-height`](/css/line-height/) — высота строки, через слэш после размера;
- [`font-family`](/css/font-family/) — список шрифтов, разделённых запятыми.

Если не указать `font-size` и `font-family`, браузер проигнорирует весь шорткат.

Кроме задания собственных параметров, `font` позволяет использовать системные шрифты вроде `caption`, `icon`, `menu`, `message-box`, `small-caption`, `status-bar`. Они соответствуют шрифтам, используемым в интерфейсах ОС, во всём, включая размер и жирность. При помощи [`font-family`](/css/font-family/) такого не провернуть.

## Подсказки

💡 Часто в дизайн-системах или при использовании [`@font-face`](/css/font-face/) применяют шорткат `font` для унификации внешнего вида текстов на всех элементах.
💡 Любые не указанные значения сбрасываются до дефолтных. Хотя значения для свойств [`font-size-adjust`](/css/font-size-adjust/) и [`font-kerning`](/css/font-kerning/) не могут быть указаны внутри шортката `font`, они тоже сбрасываются до дефолтных.
