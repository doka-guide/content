---
title: "`::first-line`"
authors:
  - doka-dog
keywords:
  - псевдоэлемент
  - первая строка
tags:
  - doka
  - placeholder
---

## Кратко

Псевдоэлемент `::first-line` позволяет задать стили для первой строки текста, расположенного внутри блочного элемента. Текст, попадающий под действие этого псевдоэлемента, вычисляется динамически при изменении ширины блока.

## Как пишется

Для псевдоэлемента сработает лишь небольшой набор CSS-свойств:

- шрифтовые свойства, начинающиеся на `font-` плюс [`line-height`](/css/line-height/);
- свойства фона, начинающиеся на `background-`;
- цвет текста `color`;
- текстовые свойства [`word-spacing`](/css/word-spacing/), [`letter-spacing`](/css/letter-spacing/), [`text-decoration`](/css/text-decoration/), [`text-transform`](/css/text-transform/), [`text-shadow`](/css/text-shadow/), [`text-decoration-color`](/css/text-decoration-color/), [`text-decoration-line`](/css/text-decoration-line/), [`text-decoration-style`](/css/text-decoration-style/) и [`vertical-align`](/css/vertical-align/).
