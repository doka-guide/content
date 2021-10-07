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
  /* равные ширина */
  width: 25px;
  /* и высота */
  height: 25px;
  /* закругляем углы на 50% */
  border-radius: 50%;
  color: #ffffff;
  background-color: #ed4242;
}
```

<iframe title="Счётчик уведомлений" src="../demos/notification/" height="200"></iframe>
