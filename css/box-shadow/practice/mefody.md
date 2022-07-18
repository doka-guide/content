🛠 При помощи теней можно рисовать в стиле _пиксель-арт_. Для этого создаётся базовый «пиксель», от которого тенями рисуется остальная картинка.

```html
<div class="pixel-art"></div>
```

```css
:root {
  /* Размер ячейки */
  --s: 4px;
}

.pixel-art {
  height: var(--s);
  width: var(--s);
  color: #FFFFFF;
  box-shadow:
    calc(var(--s) * 4) calc(var(--s) * 8) 0 0,
    calc(var(--s) * 5) calc(var(--s) * 8) 0 0,
    calc(var(--s) * 18) calc(var(--s) * 8) 0 0,
    /* ... */
    calc(var(--s) * 90) calc(var(--s) * 33) 0 0,
    calc(var(--s) * 91) calc(var(--s) * 33) 0 0;
}
```

Если не указывать значение цвета в `box-shadow`, тень покрасится в цвет текста, который мы указали в `color`. Как если бы мы указали цвет тени с помощью `currentColor`.

<iframe title="Пиксель-арт" src="../demos/pixelart/" height="250"></iframe>
