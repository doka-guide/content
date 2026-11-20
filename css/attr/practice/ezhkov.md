🛠 Чаще всего `attr()` используют, чтобы при печати показать адрес ссылки после её текста.

```html
<p>
  Подробнее о скидках и акциях можно узнать
  <a href="https://example.com/sales">по ссылке</a>
</p>
```

```css
@media print {
  a::after {
    content: " [" attr(href) "]";
  }
}
```

<iframe title="Ссылка, видная при печати" src="../demos/print-link/" height="560"></iframe>
