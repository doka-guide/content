---
title: "`::first-letter`"
description: "Стилизуем первую букву в тексте."
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

<iframe title="Псевдоэлемент ::first-letter" src="demos/quote/" height="300"></iframe>

## Как пишется

Для псевдоэлемента сработает лишь небольшой набор CSS-свойств:

- Шорткат [`font`](/css/font/) и шрифтовые свойства, начинающиеся на `font-`;
- Шорткат [`background`](/css/background/) и свойства фона, начинающиеся на `background-`;
- Шорткат [`margin`](/css/margin/) и внешние отступы, начинающиеся на `margin-`;
- Шорткат [`padding`](/css/padding/) и внутренние отступы, начинающиеся на `padding-`;
- Шорткат [`border`](/css/border/) и свойства рамок, начинающиеся на `border-`;
- цвет текста [`color`](/css/color/);
- текстовые свойства [`text-decoration`](/css/text-decoration/), [`text-shadow`](/css/text-shadow/), [`text-transform`](/css/text-transform/), [`letter-spacing`](/css/letter-spacing/), [`word-spacing`](/css/word-spacing/), [`line-height`](/css/line-height/), [`text-decoration-color`](/css/text-decoration-color/), [`text-decoration-line`](/css/text-decoration-line/), [`text-decoration-style`](/css/text-decoration-style/), [`box-shadow`](/css/box-shadow/), [`float`](/css/float/), [`vertical-align`](/css/vertical-align/).

## Подсказки

💡 Знаки препинания, которые предшествуют первой букве или непосредственно следуют за ней, попадают под `::first-letter`. Как в примере выше, знак кавычки также имеет стили, заданные для первой буквы.

💡 Если вы создаёте содержимое с помощью [`::before`](/css/before/) и [`content`](/css/content/), стили указанные в `::first-letter` всё равно будут распространяться на первую букву.
