🛠 Самый крутой лайфхак — это круглые элементы при помощи `border-radius`. Они часто нужны для всяких лейблов на странице.

```html
<button class="icon" data-notifications="3"></button>
```

```css
.icon {
  background-image: url(eyes.png);
}

.icon::after {
  content: attr(data-notifications);
  width: 25px; /* равные ширина */
  height: 25px; /* и высота */
  border-radius: 50%; /* закругляем углы на 50% */
  color: #ffffff;
  background-color: #ed4242;
}
```

<iframe title="Счётчик уведомлений" src="../demos/notification/" height="250"></iframe>
