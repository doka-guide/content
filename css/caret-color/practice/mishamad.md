🛠 Добавим немного радуги в инпут:

```html
<input type="text">
```

```css
@keyframes rainbow {
  0% { caret-color: #F498AD; }
  20% { caret-color: #FF8630; }
  40% { caret-color: #FFD829; }
  60% { caret-color: #41E847; }
  80% { caret-color: #2E9AFF; }
  100% { caret-color: #F498AD; }
}

input:focus {
  animation: 3s infinite rainbow;
}
```

<iframe title="Анимированная радужная каретка" src="../demos/rainbow-input/" height="230"></iframe>
