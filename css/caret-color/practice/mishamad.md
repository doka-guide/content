🛠 Добавим немного радуги в инпут:

```html
<input type="text">
```

```css
@keyframes rainbow {
  0% { caret-color: red; }
  20% { caret-color: orange; }
  40% { caret-color: yellow; }
  60% { caret-color: green; }
  80% { caret-color: blue; }
  100% { caret-color: purple; }
}

input {
  display: block;
  width: 60vw;
  height: 50px;
  font-family: "Roboto", sans-serif;
  font-size: 50px;
  caret-color: red;
  background-color: rgb(255 255 255 / 0.1);
  color: #eee;
  border-radius: 1rem;
  border: 2px dotted rgb(255 255 255 / 0.1);
}

input:focus {
  animation: 3s infinite rainbow;
}
```

<iframe title="Анимированная радужная каретка" src="../demos/rainbow-input/" height="330" sandbox></iframe>
