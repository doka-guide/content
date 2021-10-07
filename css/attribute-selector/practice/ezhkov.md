🛠 При помощи селектора по атрибуту круто стилизовать ссылки, основываясь на значении атрибута `href`. Можно визуально разделять ссылки, ведущие на соседние страницы сайта, и ссылки, ведущие на другие сайты:

```html
<a href="http://mysite.ru/about">О нас</a>
<a href="http://mysite.ru/delivery">Доставка</a>
<a href="http://mysite.ru/contacts">Контакты</a>
<a href="http://medium.com/mysite-blog">Мы на Medium</a>
```

Все ссылки будут с иконкой стрелочки:

```css
[href^="http"]::after {
  content: '';
  display: inline-block;
  background-image: url(arrow-top-right.svg);
}
```

Внутренние ссылки — без иконок:

```css
[href*="/mysite.ru/"]::after {
  display: none;
}
```

<iframe title="Иконка для внешней ссылки" src="../demos/link-icon/" height="140"></iframe>
