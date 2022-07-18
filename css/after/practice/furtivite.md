🛠 Псевдоэлемент `::after` можно использовать и для того, чтобы вывести важную информацию во время печати. Например, содержимое ссылок, которые есть на странице:

```html
<a href="https://doka.guide/css/pseudoelements/">Узнать больше про псевдоэлементы в Доке</a>
```

```css
@media print {
  a {
    text-decoration: none;
  }

  a::after {
    content: " (ссылка: " attr(href) ")";
  }
}
```

Тогда на печати мы получим следующее:

<iframe title="Добавления в ::after ссылки" src="../demos/print/" height="150"></iframe>
