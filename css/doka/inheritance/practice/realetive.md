---
tags:
  - practice
permalink: false
---

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

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="result" data-user="solarrust" data-slug-hash="MWeBpma" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="MWeBpma">
  <span>See the Pen <a href="https://codepen.io/solarrust/pen/MWeBpma">
  MWeBpma</a> by Alena (<a href="https://codepen.io/solarrust">@solarrust</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
