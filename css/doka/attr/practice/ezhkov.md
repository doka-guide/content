---
tags:
  - practice
permalink: false
---

🛠 Самый распространённый случай использования функции `attr()` - отображение значения атрибута `href` после текста ссылки при печати страницы на принтере.

```html
<p>
  Подробнее о скидках и акциях можно узнать
  <a href="http://best-site.ru/sales">по ссылке</a>
</p>
```

```css
@media print {
  a::after {
    content: " [" attr(href) "]";
  }
}
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="html,result" data-user="ezhkov" data-slug-hash="JjbGeoM" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="attr()">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/JjbGeoM">
  attr()</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
