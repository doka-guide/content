---
title: "`::placeholder`"
description: "Стилизуем плейсхолдеры в полях ввода."
baseline:
  - group: placeholder
    features:
      - css.selectors.placeholder
authors:
  - ezhkov
contributors:
  - skorobaeus
editors:
  - tachisis
keywords:
  - плейсхолдер
  - placeholder
  - подсказка
related:
  - css/pseudoelements
  - html/input
  - css/text-shadow
tags:
  - doka
---

## Кратко

Псевдоэлемент `::placeholder` используется для стилизации текста-подсказки (плейсхолдера) в полях ввода [`<input>`](/html/input/) и [`<textarea>`](/html/textarea/).

## Пример

```html
<input class="form-input" type="email" placeholder="Например: mygre@ema.il">
```

```css
.form-input::placeholder {
  color: gray;
}
```

<iframe title="Подсказка в поле ввода" src="demos/example/" height="240"></iframe>

## Как понять

Элементам [`<input>`](/html/input/) и [`<textarea>`](/html/textarea/) можно задавать атрибут [`placeholder`](/html/placeholder/). Текст, содержащийся в этом атрибуте, будет отображаться внутри поля ввода, пока пользователь ничего не ввёл. Этот текст можно стилизовать, используя псевдоэлемент `::placeholder`. Стили для введённого текста и текста-подсказки в общем случае должны различаться.

## Как пишется

Два двоеточия и ключевое слово `placeholder`.

Стиль применится ко всем подсказкам на странице:

```css
::placeholder {
  color: gray;
}
```

Стиль применится только к подсказкам у полей ввода с классом `email-input`:

```css
.email-input::placeholder {
  color: darkblue;
}
```

## Подсказки

💡 Для стилизации подсказки можно использовать только следующие свойства:

- все шрифтовые свойства, начинающиеся с `font` (например, [`font-size`](/css/font-size/) или [`font-style`](/css/font-style/));
- все свойства для работы с фоном, начинающиеся с `background-` (например, [`background-color`](/css/background-color/) или [`background-size`](/css/background-size/));
- свойство [`color`](/css/color/);
- свойства [`word-spacing`](/css/word-spacing/), [`letter-spacing`](/css/letter-spacing/), [`text-decoration`](/css/text-decoration/), [`text-transform`](/css/text-transform/) и [`line-height`](/css/line-height/);
- свойства [`text-shadow`](/css/text-shadow/), группу свойств [`text-decoration`](/css/text-decoration/) и [`vertical-align`](/css/vertical-align/).
