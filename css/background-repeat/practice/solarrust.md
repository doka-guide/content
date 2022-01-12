`background-repeat` — свойство простое. Написано повторять — повторяем фон. Написано не повторять — не повторяем.

🛠 С помощью повторения фона и линейного градиента ([`linear-gradient`](/css/linear-gradient/)) можно создавать полосатые фоны.

```html
<div class="element"></div>
```

```css
.element {
  height: 100vh;
  background-image: linear-gradient(
    #49a16c 50px,
    #064236 0
  );
  background-size: 100% 100px;
  background-repeat: repeat-y;
}
```

<iframe title="Паттерн при помощи градиента" src="../demos/gradient/" height="250"></iframe>
