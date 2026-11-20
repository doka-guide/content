---
title: "`attr()`"
description: "Хотите сделать атрибут элемента видимым на странице? Используйте эту функцию!"
baseline:
  - group: attr-contents
    features:
      - css.types.attr
authors:
  - ezhkov
contributors:
  - skorobaeus
editors:
  - tachisis
keywords:
  - вывод атрибута на страницу
related:
  - css/before
  - css/after
  - css/content
tags:
  - doka
---

## Кратко

`attr()` — это CSS-функция, которая умеет получать значение любого атрибута элемента, а потом использовать это значение прямо в стилях.

## Пример

```html
<div class="element" title="На самом деле внутри нет никакого текста"></div>
```

```css
div::before {
  content: "Элемент с классом " attr(class);
}

div::after {
  content: "Подсказка: " attr(title);
}
```

<iframe title="Подсказка" src="demos/tooltip/" height="295"></iframe>

## Как пишется

```css
div::before {
  content: attr(data-title);
  content: attr(href);
}
```

С указанием типа:

```css
div::before {
  content: attr(src url);
  content: attr(data-count number);
  content: attr(data-width px);
}
```

С указанием фолбэка, то есть запасного значения:

```css
div::before {
  content: attr(data-count number, 0);
  content: attr(src url, "");
  content: attr(data-width px, inherit);
  content: attr(data-something, "default");
}
```

## Подсказки

💡 Функцию `attr()` можно использовать в качестве значения любого CSS-свойства, однако полностью поддерживается только свойство [`content`](/css/content/). Для остальных свойств поддержка экспериментальная и может различаться от браузера к браузеру. Актуальную информацию о поддержке можно посмотреть на [Can I use](https://caniuse.com/css3-attr).

💡 Написание с указанием типа или фолбэка пока имеет статус экспериментальной технологии и не поддерживается браузерами. Но в будущем это позволит гораздо сильнее расширить область применения функции `attr()`. Например, мы сможем написать так:

```css
.colored {
  background-image: attr(data-src url);
}
```

Тут мы указали, что в качестве значения для свойства [`background-image`](/css/background-image/) мы хотим использовать значение атрибута `data-src`. При этом уточнили, что значение атрибута `data-src` — это не просто строка, а корректный URL.

Примеры записи с указанием типа или фолбэка кажутся довольно перспективными, но, к сожалению, пока не поддерживаются ни одним из браузеров.
