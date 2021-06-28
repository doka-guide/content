---
tags:
  - practice
permalink: false
---

🛠 При помощи селектора по атрибуту круто стилизовать ссылки, основываясь на значении атрибута `href`. Можно визуально разделять ссылки, ведущие на соседние страницы сайта, и ссылки, ведущие на другие сайты:

```html
<a href="http://mysite.ru/about">О нас</a>
<a href="http://mysite.ru/delivery">Доставка</a>
<a href="http://mysite.ru/contacts">Контакты</a>
<a href="http://medium.com/mysite-blog">Мы на Medium</a>
```

```css
/* Все ссылки будут с иконкой стрелочки */
[href^="http"]::after {
  content: "↗️";
}

/* внутренние ссылки — без иконок */
[href*="/mysite.ru/"]::after {
  display: none;
}
```

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="ezhkov" data-slug-hash="qBaaYJX" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="attribute selector (div[attr] {})">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/qBaaYJX">
  attribute selector (div[attr] {})</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
