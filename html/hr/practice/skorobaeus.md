🛠 Дизайнеры любят пользоваться линией как средством выразительности. Почти никогда такая линия не является смысловым разделителем, и поэтому не стоит верстать её как `<hr>`. Пользуйтесь этим тегом в том случае, когда без разделителя информация теряет смысл или в ней становится трудно разобраться.

В демо ниже все линии декоративные и потому свёрстаны как псевдоэлемент [`::after`](/css/after/), а разделяющий визуально одинаковые, но разные по смыслу абзацы `<hr>` представлен в виде звёздочек.

```html
<span class="tag">Типографика</span>
<h1 class="title">Астеризм</h1>
<p class="paragraph">Астеризм это типографский символ...</p>
<hr>
<p class="paragraph">Одиночная звёздочка...</p>
```

```css
.tag, .title {
  position: relative;
}

.tag::after, .title::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  background-color: black;
}

.tag::after {
  height: 1px;
}

.title::after {
  height: 2px;
}

hr {
  border: none;
  text-align: center;
}

hr::before {
  content: "***";
}
```

<iframe title="Декоративные линии и семантика hr" src="../demos/semantics/" height="630"></iframe>
