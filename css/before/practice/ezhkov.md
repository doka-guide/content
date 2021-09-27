🛠 Псевдоэлемент `::before` очень часто используют для стилизации нестандартных маркеров списка:

```html
<ul>
  <li>Сделать настоящее тату</li>
  <li>Посмотреть «Звездные войны»</li>
  <li>Научиться играть на укулеле</li>
  <li>Не бриться полгода</li>
  <li>Поучаствовать в чайной церемонии</li>
</ul>
```

```css
li::before {
  content: "💛";
  margin-right: 5px;
  vertical-align: middle;
}
```

<iframe title="Нестандартный маркер" src="../demos/list/" height="400" sandbox></iframe>

🛠 Пример со свойством `content`:

```html
<ul>
  <li>Милый маленький грибочек</li>
  <li>Сколопендровый листочек</li>
  <li>Жёлтой пыльки чуть</li>
</ul>
```

```css
li {
  position: relative;
}

li::before {
  /* Не забываем о свойстве content */
  content: "";
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #ed6742;
  position: absolute;
  left: -25px;
  top: 5px;
}
```

<iframe title="Пустое свойство content" src="../demos/empty-content/" height="300" sandbox></iframe>
