---
title: "`::first-letter`"
description: "Стилизация первой буквы с помощью ::first-letter"
authors:
  - doka-dog
contributors:
  - punkmachine
keywords:
  - первая буква
  - псевдоэлемент
tags:
  - doka
  - placeholder
---

## Кратко

Псевдоэлемент `::first-letter` позволяет задать стили для первой буквы первой строки блочного элемента, если перед текстом нет другого содержимого.

## Как пишется

Для псевдоэлемента сработает лишь небольшой набор CSS-свойств:

- шрифтовые свойства, начинающиеся на `font-`, а также [`line-height`](/css/line-height/);
- свойства фона, начинающиеся на `background-`;
- внешние отступы, начинающиеся на `margin-`;
- внутренние отступы, начинающиеся на `padding-`;
- рамки, начинающиеся на `border-`;
- цвет текста `color`;
- текстовые свойства [`text-decoration`](/css/text-decoration/), [`text-shadow`](/css/text-shadow/), [`text-transform`](/css/text-transform/), [`letter-spacing`](/css/letter-spacing/), [`word-spacing`](/css/word-spacing/), [`line-height`](/css/line-height/), [`text-decoration-color`](/css/text-decoration-color/), [`text-decoration-line`](/css/text-decoration-line/), [`text-decoration-style`](/css/text-decoration-style/), [`box-shadow`](/css/box-shadow/), [`float`](/css/float/), [`vertical-align`](/css/vertical-align/).

## Пример

Сделаем код, выделяющий первую букву в цитате:

```
blockquote::first-letter {
  font-size: 1.86rem;
  font-weight: 700;
  font-style: italic;
  letter-spacing: 0.12rem;
}
```

<iframe title="Псевдоэлемент ::first-letter" src="demos/quote/" height="300"></iframe>

## Подсказки

💡 Знаки препинания, которые предшествуют первой букве или непосредственно следуют за ней, попадают под `::first-letter`. Как в примере выше, знак кавычки также имеет стили, заданные для первой буквы.

💡 Если вы создаете содержимое с помощью `::before` и `content`, стили указанные в `::first-letter` все равно будут распространяться на первую букву.