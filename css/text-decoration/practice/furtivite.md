🛠 Иногда вам может потребоваться управлять расстоянием между текстом и линией ниже. Обычно это делается, через свойство [`line-height`](/css/line-height/). Чем больше высота строки, тем ниже будет полоса подчёркивания.

К сожалению, этот способ подходит не всегда. Например, когда дизайнер задумал элемент несколько иначе. На примере ниже отказываемся от `text-decoration` и используем [`border-bottom`](/css/border/) или логический аналог `border-block-end`.

```html
<header>
  <div class="container top">
    <nav>
      <ul class="navigation">
        <li class="navigation__item">
          <a href="#" class="navigation__link">О магазине</a>
        </li>
        <li class="navigation__item">
          <a href="#" class="navigation__link">О тыквах</a>
        </li>
        <li class="navigation__item">
          <a href="#" class="navigation__link">О нас</a>
        </li>
        <li class="navigation__item">
          <a href="#" class="navigation__link">Контакты</a>
        </li>
      </ul>
    </nav>
  </div>
  <div class="container">
    <h1>Магазин «Резная тыква»</h1>
  </div>
</header>
```

```css
.navigation__link, .navigation__link:visited {
  /* делаем элементы строчно-блочными */
  display: inline-block;
  /* убираем подчёркивание */
  text-decoration: none;
}

.navigation__link:hover {
  /* нивелируем размеры рамки */
  padding-bottom: 20px;
  /* добавляем рамку снизу */
  border-bottom: 4px solid currentColor;
}
```

<iframe title="Рамка вместо подчёркивания" src="../demos/header/" height="460"></iframe>
