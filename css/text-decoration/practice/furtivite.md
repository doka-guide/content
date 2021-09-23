🛠 Иногда вам может потребоваться управлять расстоянием между текстом и линией ниже. Обычно это делается, через свойство [`line-height`](/css/line-height). Чем больше высота строки, тем ниже будет полоса подчёркивания.

К сожалению, этот способ подходит не всегда. Например, когда дизайнер задумал элемент несколько иначе. На примере ниже отказываемся от `text-decoration` и используем [`border-bottom`](/css/border).

```html
<header>
  <div class="container top">
    <nav>
      <ul class="navigation">
        <li class="navigation__item">
          <a href="#" class="navigation__link">О магазине</a>
        </li>
        <li class="navigation__item">
          <a href="#" class="navigation__link">Новости</a>
        </li>
        <li class="navigation__item">
          <a href="#" class="navigation__link">Акции</a>
        </li>
        <li class="navigation__item">
          <a href="#" class="navigation__link">Личный кабинет</a>
        </li>
      </ul>
    </nav>
  </div>
  <div class="container">
    <h1>Магазин «лето»</h1>
  </div>
</header>
```

```css
.navigation__link, .navigation__link:visited {
  /* делаем элементы строчно-блочными */
  display: inline-block;
  color: #18191C;
  /* убираем подчёркивание */
  text-decoration: none;
  padding-top: 16px;
  padding-bottom: 16px;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 15px;
}

.navigation__link:hover {
  /* нивелируем размеры рамки */
  padding-bottom: 14px;
  /* добавляем рамку снизу */
  border-bottom: 2px solid #18191C;
}
```

<iframe title="Рамка вместо подчёркивания — text-decoration — Дока" src="../demos/header/" height="150"></iframe>
