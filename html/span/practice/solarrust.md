🛠 Тег `<span>` удобен, если нужно оформить другими стилями отдельное слово или словосочетание в тексте. Этот приём очень любят дизайнеры, чтобы акцентировать внимание на какой-то информации.

Например, выделим цветом важное для нас сообщение внутри заголовка на первом экране:

```html
<header class="header">
  <h1 class="header__title">
    We are
    <span class="header__title-accent header__title-accent_color">
      the best
    </span>
    <span class="header__title-accent"> company </span>
  </h1>
</header>
```

```css
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 480px;
  background: #18191c url("../images/background.svg") no-repeat center / cover;
  z-index: 0;
  color: #ffffff;
}

.header__title {
  max-width: 500px;
  color: #fff;
  font-family: "Roboto", sans-serif;
  font-size: 25px;
  text-align: center;
  text-transform: uppercase;
  font-weight: normal;
  line-height: 30px;
  letter-spacing: 1px;
}

/* задаём стили для текста, который нужно выделить */
.header__title-accent {
  display: block; /* перенос на новую строку */
  font-size: 55px;
  line-height: 58px;
  font-weight: bold;
}

/* цветовой акцент */
.header__title-accent_color {
  color: #000000;
  background-color: #FF8630;
}
```

<iframe title="Цветовой акцент" src="../demos/company/" height="480"></iframe>
