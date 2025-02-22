🛠️ Если необходимо отобразить обводку со скруглением, можно воспользоваться небольшим трюком.

Добавьте к стилям элемента свойство `border-radius`

```css
.block {
  border-radius: 10px;
  outline: 5px solid green;
  outline-offset: 10px;
}
```

<iframe title="Обвока со скруглением" src="demos/rounded/" height="200"></iframe>