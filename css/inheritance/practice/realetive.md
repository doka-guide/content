🛠 Удобно делать всякие трюки, используя `currentColor`. Мы не меняем явно цвет рамки по наведению курсора, но он меняется вслед за `color`.

```html
<button class="magick-btn">Волшебная кнопка</button>
```

```css
.magick-btn {
  padding: 15px;
  color: pink;
  border: 1px solid;
  border-color: currentColor;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.magick-btn:hover {
  color: darkblue;
}
```

<iframe title="currentColor — Наследование в CSS — Дока" src="../demos/current-color/"></iframe>
