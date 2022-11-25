---
title: "`::first-letter`"
description: "Стилизация первой буквы с помощью ::first-letter"
authors:
  - punkmachine
keywords:
  - первая буква
  - псевдоэлемент
tags:
  - doka
---

## Кратко

Псевдоэлемент `::first-letter` позволяет задать стили для первой буквы первой строки блочного элемента, если перед текстом нет другого содержимого.

## Пример

Напишем код, выделяющий первую букву в цитате:

```css
blockquote::first-letter {
  font-size: 1.86rem;
  font-weight: 700;
  font-style: italic;
  letter-spacing: 0.12rem;
}
```

## Как пишется

Для псевдоэлемента сработает лишь небольшой набор CSS-свойств:

- шрифтовые свойства, начинающиеся на [`font-`](/css/font/);
- свойства фона, начинающиеся на [`background-`](/css/backgroutnd/);
- внешние отступы, начинающиеся на [`margin-`](/css/margin/);
- внутренние отступы, начинающиеся на [`padding-`](/css/padding/);
- рамки, начинающиеся на [`border-`](/css/border/);
- цвет текста [`color`](/css/color);
- текстовые свойства [`text-decoration`](/css/text-decoration/), [`text-shadow`](/css/text-shadow/), [`text-transform`](/css/text-transform/), [`letter-spacing`](/css/letter-spacing/), [`word-spacing`](/css/word-spacing/), [`line-height`](/css/line-height/), [`text-decoration-color`](/css/text-decoration-color/), [`text-decoration-line`](/css/text-decoration-line/), [`text-decoration-style`](/css/text-decoration-style/), [`box-shadow`](/css/box-shadow/), [`float`](/css/float/), [`vertical-align`](/css/vertical-align/).

<iframe title="Псевдоэлемент ::first-letter" src="demos/quote/" height="300"></iframe>

## Подсказки

💡 Знаки препинания, которые предшествуют первой букве или непосредственно следуют за ней, попадают под `::first-letter`. Как в примере выше, знак кавычки также имеет стили, заданные для первой буквы.

💡 Если вы создаете содержимое с помощью [`::before`](/css/before/) и [`content`](/css/content/), стили указанные в `::first-letter` всё равно будут распространяться на первую букву.