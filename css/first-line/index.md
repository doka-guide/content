---
title: "`::first-line`"
description: "Стилизуем первую строку текста."
authors:
  - punkmachine
keywords:
  - псевдоэлемент
  - первая строка
related:
  - css/first-letter
  - css/text-decoration
  - css/text-shadow
tags:
  - doka
---

## Кратко

Псевдоэлемент `::first-line` позволяет задать стили для первой строки текста, расположенного внутри блочного элемента. Текст, попадающий под действие этого псевдоэлемента, вычисляется динамически при изменении ширины блока.

## Пример

Напишем код, который видоизменит первую строку текста:

```css
p::first-line {
  text-transform: uppercase;
  text-decoration: underline;
  font-weight: bold;
  color: deepPink;
}
```

<iframe title="Псевдоэлемент ::first-line" src="demos/first-line/" height="300"></iframe>

## Как пишется

Для псевдоэлемента сработает лишь небольшой набор CSS-свойств:

- шорткат [`font`](/css/font/) и шрифтовые свойства, начинающиеся на `font-`;
- шорткат [`background`](/css/background/) и свойства фона, начинающиеся на `background-`;
- цвет текста [`color`](/css/color/);
- текстовые свойства [`text-decoration`](/css/text-decoration/), [`text-shadow`](/css/text-shadow/), [`text-transform`](/css/text-transform/), [`letter-spacing`](/css/letter-spacing/), [`word-spacing`](/css/word-spacing/), [`line-height`](/css/line-height/), [`text-decoration-color`](/css/text-decoration-color/), [`text-decoration-line`](/css/text-decoration-line/), [`text-decoration-style`](/css/text-decoration-style/), [`box-shadow`](/css/box-shadow/), [`float`](/css/float/), [`vertical-align`](/css/vertical-align/).

## Подсказки

💡 Первая строка в блоке может быть пустой, например если после тега [`<p>`](/html/p/) сразу идёт тег [`<br>`](/html/br/), а после него остальной текст. В таком случае стили будут применяться к первой пустой строке и видимого результата не будет.
