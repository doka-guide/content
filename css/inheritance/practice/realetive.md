🛠 Удобно делать всякие трюки, используя `currentColor`. Мы не меняем явно цвет рамки по наведению курсора, но он меняется вслед за `color`.

```html
<button class="magick-btn">Волшебная кнопка</button>
```

```css
.magick-btn {
  border: 2px solid;
  border-color: currentColor;
  border-radius: 6px;
  padding: 9px 15px;
  color: blue;
  background-color: transparent;
}

.magick-btn:hover {
  color: pink;
}
```

<iframe title="currentColor" src="../demos/current-color/" height="240"></iframe>
