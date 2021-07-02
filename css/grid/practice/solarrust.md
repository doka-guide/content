🛠 Возможны и более сложные комбинации значений этого свойства. Например, можно сразу задать имена областям:

```css
.container {
  grid:
    [row1-start] "header header header" 1fr [row1-end]
    [row2-start] "footer footer footer" 25px [row2-end]
    / auto 50px auto;
}
```

Что аналогично:

```css
.container {
  grid-template-areas:
    "header header header"
    "footer footer footer";
  grid-template-rows: [row1-start] 1fr [row1-end row2-start] 25px [row2-end];
  grid-template-columns: auto 50px auto;
}
```
