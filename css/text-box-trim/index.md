---
title: "`text-box-trim`"
description: "Удаляем некрасивые воздушные карманы у текста."
authors:
  - drakesbot12
related:
  - html/p
  - css/text-wrap
  - css/text-decoration
tags:
  - doka
---

## Кратко

Свойство `text-box-trim` позволяет убирать лишние вертикальные отступы над и под текстом. Оно помогает сделать высоту блока с текстом более точной, без "воздушных" запасов, которые браузер обычно добавляет из-за особенностей шрифтов.

## Пример

```css
.trimmed {
  font-size: 3rem;
  text-box-trim: trim-both;
  text-box-edge: cap alphabetic;
  background: pink;
}

.normal {
  font-size: 3rem;
  background: lightblue;
}
```

<iframe title="Сравнение текста с использованием text-box-trim и без" src="demos/basic/" height="200"></iframe>

## Как пишется

```css
.text-box-trim-syntax {
  text-box-trim: none | trim-start | trim-end | trim-both;
}
```

`text-box-trim` управляет удалением вертикальных запасов. Возможные значения:

- `none` — не убирает лишнее пространство (по умолчанию);
- `trim-start` — убирает сверху;
- `trim-end` — убирает снизу;
- `trim-both` — убирает сверху и снизу.

## Как понять

Браузеры при рендеринге текста обычно добавляют сверху и снизу небольшие пустые зоны, чтобы не обрезать части букв (например, диакритические знаки). Эти зоны влияют на итоговую высоту блока с текстом и могут мешать точному выравниванию.

`text-box-trim` позволяет убрать эти "запасные" пространства, сделав рамку текста точной по контурам шрифта.

Данное свойство работает в связке с [`text-box-edge`](/css/text-box-edge/), которое определяет до какого уровня будут обрезаться пустые зоны.

<aside>
    ⚠️ `text-box-trim` не будет работать без [`text-box-edge`](/css/text-box-edge/)!
</aside>

## Подсказки

💡 Подходит для точного выравнивания текста в UI-компонентах, кнопках, заголовках.
💡 Можно использовать шорткат [`text-box`](css/text-box/), чтобы задать [`text-box-trim`](css/text-box-trim/) и `text-box-edge` одной строкой:
```css
.tip {
  text-box: trim-both cap alphabetic;

  /* Равнозначно: */
  text-box-trim: trim-both;
  text-box-edge: cap alphabetic;
}
```
