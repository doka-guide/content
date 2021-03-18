---
title: "::placeholder"
author: ezhkov
tags:
  - sprint-2
summary:
  - плейсхолдер
  - placeholder
---

## Кратко

Псевдоэлемент `::placeholder` используется для стилизации текста-плейсхолдера в полях ввода [`<input>`](/html/doka/input/) и [`<textarea>`](/html/doka/textarea/).

## Пример

```html
<input class="form-input" type="email" placeholder="Например: mygre@ema.il">
```

```css
.form-input::placeholder {
  color: gray;
  font-size: 1.2em;
}
```

## Как это понять

Элементам [`<input>`](/html/doka/input/) и [`<textarea>`](/html/doka/textarea/) можно задавать атрибут `placeholder`. Текст, содержащийся в этом атрибуте, будет отображаться внутри поля ввода, пока пользователь ничего не ввёл. Этот текст можно стилизовать, используя псевдоэлемент `::placeholder`. Стили для введённого текста и текста-плейсхолдера в общем случае должны различаться.

## Как пишется

```css
::placeholder {
  color: gray;
}
```

Стиль применится ко всем плейсхолдерам на странице.

```css
.email-input::placeholder {
  color: darkblue;
}
```

Стиль применится только к плейсхолдерам на полях ввода атрибут `class` которых равен `email-input`.

## Подсказки

💡 Для стилизации плейсхолдера можно использовать только следующие свойства:

- все шрифтовые свойства, начинающиеся с `font` (например, [`font-size`](/css/doka/font-size/) или [`font-style`](/css/doka/font-style/));
- все свойства для работы с фоном, начинающиеся с `background-` (например, [`background-color`](/css/doka/background-color/) или [`background-size`](/css/doka/background-size/));
- свойство [`color`](/css/doka/color/);
- свойства [`word-spacing`](/css/doka/word-spacing/), [`letter-spacing`](/css/doka/letter-spacing/), [`text-decoration`](/css/doka/text-decoration/), [`text-transform`](/css/doka/text-transform/) и [`line-height`](/css/doka/line-height/);
- свойства [`text-shadow`](/css/doka/text-shadow/), группу свойств [`text-decoration`](/css/doka/text-decoration/) и [`vertical-align`](/css/doka/vertical-align/).
