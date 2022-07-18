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
  content: "💜";
  margin-right: 5px;
}
```

<iframe title="Нестандартный маркер" src="../demos/list/" height="300"></iframe>

🛠 Пример с пустым свойством `content`:

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
  padding-left: 25px;
}

li::before {
  /* Не забываем о свойстве content */
  content: "";
  width: 14px;
  height: 14px;
  background-color: #2E9AFF;
  position: absolute;
  left: 0;
  top: 5px;
}
```

<iframe title="Пустое свойство content" src="../demos/empty-content/" height="300"></iframe>
