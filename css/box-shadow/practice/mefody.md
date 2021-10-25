🛠 При помощи теней можно рисовать в стиле _пиксель-арт_. Для этого создаётся базовый «пиксель», от которого тенями рисуется остальная картинка.

```html
<div class="pixel-art"></div>
```

```css
:root {
  /* размер ячейки */
  --s: 5px;
}

.pixel-art {
  height: var(--s);
  width: var(--s);
  /* по умолчанию тень берёт цвет из currentColor */
  color: #000;
  box-shadow:
    calc(var(--s) * 4) calc(var(--s) * 8) 0 0,
    calc(var(--s) * 5) calc(var(--s) * 8) 0 0,
    calc(var(--s) * 18) calc(var(--s) * 8) 0 0,
    /* ... */
    calc(var(--s) * 90) calc(var(--s) * 33) 0 0,
    calc(var(--s) * 91) calc(var(--s) * 33) 0 0;
}

```

<iframe title="Пиксель-арт" src="../demos/pixelart/" height="180"></iframe>
