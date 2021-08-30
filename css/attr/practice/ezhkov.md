🛠 Самый распространённый случай использования функции `attr()` - отображение значения атрибута `href` после текста ссылки при печати страницы.

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

<iframe title="Название — attr() — Дока" src="../demos/ezhkov-JjbGeoM/"></iframe>
