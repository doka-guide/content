🛠 Поскольку `:root` — это псевдокласс, его [специфичность](/css/specificity/) будет выше, чем селекторов по тегу `html` или `svg`.

В примере ниже фон документа окрасится в персиковый цвет, а не в томатный.

```css
:root {
  background-color: peachpuff;
}

html {
  background-color: tomato;
}
```

<iframe title="Псевдокласс :root — Дока" src="../demos/root/" height="250"></iframe>
