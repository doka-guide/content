🛠 С помощью тени можно создать блок с несколькими рамками!

```html
<div class="box square"></div>
<div class="box circle"></div>
```

```css
.box {
  width: 120px;
  height: 120px;
  box-shadow:
    inset 0 0 6px 0 #c000ff,
    0 0 0 3px #c000ff,
    0 0 6px 3px #c000ff,
    0 0 0 7px #18191C,
    0 0 0 10px #6e4aff,
    0 0 6px 10px #6e4aff,
    0 0 0 14px #18191C,
    0 0 0 17px #c000ff,
    0 0 6px 17px #c000ff;
}
```

<iframe title="Неоновые рамки" src="../demos/neon/" height="250"></iframe>

🛠 Тени можно использовать для ховер-эффектов. При помощи теней кнопка сделана выпуклой, а при нажатии она становится вдавленной за счёт изменения положения теней.

```html
<button class="btn">Зажми</button>
```

```css
.btn {
  box-shadow:
    5px 5px 10px #020d18,
    inset -5px -5px 8px -4px #020d18,
    -5px -5px 10px #3185d5,
    inset 5px 5px 8px -4px #3185d5;
}

.btn:active {
  box-shadow:
    5px 5px 10px #020d18,
    inset -5px -5px 8px -4px #020d18,
    inset -6px -6px 8px 0 #3185d5,
    -5px -5px 10px #3185d5,
    inset 5px 5px 8px -4px #3185d5,
    inset 6px 6px 8px 0 #c9c9c9;
}
```

<iframe title="Скевоморфизм" src="../demos/skeuomorph/" height="200"></iframe>
