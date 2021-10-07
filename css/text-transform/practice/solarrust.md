🛠 Довольно часто в макетах встречаются пункты меню, написанные заглавными буквами. Не нужно в разметке набирать текст заглавными. Скопируй текст из макета и примени свойство `text-transform`.

```html
<div class="element">
  <a href="#" class="logo">
    <img src="../images/logo.png" alt="Company logo">
  </a>
  <nav class="menu">
    <ul class="menu-list">
      <li class="menu-list__item">
        <a href="#" class="menu-list__link">Главная</a>
      </li>
      <li class="menu-list__item">
        <a href="#" class="menu-list__link">О компании</a>
      </li>
      <li class="menu-list__item">
        <a href="#" class="menu-list__link">Проекты</a>
      </li>
      <li class="menu-list__item">
        <a href="#" class="menu-list__link">Контакты</a>
      </li>
    </ul>
  </nav>
</div>
```

```css
.menu-list {
  text-transform: uppercase;
}
```

<iframe title="Вёрстка навигации" src="../demos/menu/" height="120"></iframe>

Теперь если даже в меню добавится ещё пара пунктов, то они также будут отображаться заглавными буквами.
