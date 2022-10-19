🛠 Дизайнеры любят оформлять цитаты красивыми большими кавычками. Стоит помнить, что от одного лишь применения тега `<blockquote>` эти самые кавычки не появятся. Нужно будет добавить их. Я обычно делаю это при помощи [псевдоэлементов](/css/pseudoelements/). Так разметка не засоряется лишними тегами, а внешний вид кавычек можно будет гибко менять через стили.

```css
.quote {
  position: relative;
}

.quote::before {
  content: "“";
  position: absolute;
  left: 5rem;
  top: 5rem;
  font-family: sans-serif;
}
```

<iframe title="Цитата" src="../demos/blockquote/" height="590"></iframe>
