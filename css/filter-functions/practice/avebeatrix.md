🛠 С помощью `drop-shadow()` мы можем создать тень по форме самого изображения. Функция учитывает альфа-канал картинки и способна отбрасывать не только прямоугольную тень, как в случае с [`box-shadow`](/css/box-shadow/).

```css
.box-shadow {
  box-shadow: 4px 4px 10px red;
}
.drop-shadow {
  filter: drop-shadow(4px 4px 10px red);
}
```

<iframe title="drop-shadow() и альфа-канал" src="../demos/drop-shadow-alpha/" height="370"></iframe>
