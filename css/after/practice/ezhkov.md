🛠 Псевдоэлементы [`::before`](/css/before/) и `::after` можно использовать и для более сложной стилизации:

```html
<a href="#" class="link">choose me</a>
```

```css
.link {
  position: relative;
}

.link::before,
.link::after {
  content: "";
  height: 8px;
  width: 8px;
  position: absolute;
  transition: all 0.6s;
}

.link::before {
  top: -3px;
  left: -3px;
  border-top: 6px solid #000000;
  border-left: 6px solid #000000;
}

.link::after {
  bottom: -3px;
  right: -3px;
  border-bottom: 6px solid #000000;
  border-right: 6px solid #000000;
}

.link:hover::before,
.link:hover::after {
  width: 100%;
  height: 100%;
  transition: all 0.3s;
}
```

<iframe title="Стилизация — ::after — Дока" src="../demos/link.html" height="155"></iframe>

В этом примере рамки применены к псевдоэлементам [`::before`](/css/before/) и `::after`. При этом сами псевдоэлементы используются как два дополнительных стилизуемых элемента внутри ссылки `<a>`. Круто, правда? В HTML пишем один тег, а по факту можем стилизовать аж три! 🤘
