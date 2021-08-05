---
title: "attr()"
authors:
  - ezhkov
editors:
  - tachisis
keywords:
  - content
  - псевдоэлемент
  - атрибуты
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
.element::before {
  content: "Элемент с классом " attr(class);
}

.element::after {
  content: "Подсказка: " attr(title);
}
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="css,result" data-user="ezhkov" data-slug-hash="vYyKemg" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="attr() 2">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/vYyKemg">
  attr() 2</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Как пишется

```css
.element::before {
  content: attr(data-title);
  content: attr(href);
}
```

С указанием типа:

```css
.element::before {
  content: attr(src url);
  content: attr(data-count number);
  content: attr(data-width px);
}
```

С указанием фолбэка, то есть, запасного значения:

```css
.element::before {
  content: attr(data-count number, 0);
  content: attr(src url, "");
  content: attr(data-width px, inherit);
  content: attr(data-something, "default");
}
```

## Подсказки

💡 Функцию `attr()` можно использовать в качестве значения любого CSS-свойства, однако полностью поддерживается только свойство [`content`](/css/content). Для остальных свойств поддержка экспериментальная и может различаться от браузера к браузеру. Актуальную информацию о поддержке можно посмотреть на [Can I Use](https://caniuse.com/css3-attr).

💡 Написание с указанием типа или фолбэка пока имеет статус экспериментальной технологии и не поддерживается браузерами. Но в будущем это позволит гораздо сильнее расширить область применения функции `attr()`. Например, мы сможем написать так:

```css
.colored {
  background-image: attr(data-src url);
}
```

Тут мы указали, что в качестве значения для свойства `background-image` мы хотим использовать значение атрибута `data-src`. При этом уточнили, что значение атрибута `data-src` — это не просто строка, а корректный URL.

Примеры записи с указанием типа или фолбэка кажутся довольно перспективными, но, к сожалению, пока не поддерживаются ни одним из браузеров.
