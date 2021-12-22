🛠 На практике одного `text-decoration-thickness` может быть не достаточно поэтому стоит обратить внимание на такие свойства как `text-decoration-skip-ink` и [`text-underline-offset`](/css/text-underline-offset/). Ниже приведён пример совместной работы этих свойств.

```html
<nav>
  <ul class="nav-list">
    <li class="nav-list__item">
      <a class="nav-list__link orange" href="#">HTML</a>
    </li>
    <li class="nav-list__item">
      <a class="nav-list__link blue" href="#">CSS</a>
    </li>
    <li class="nav-list__item">
      <a class="nav-list__link yellow" href="#">JavaScript</a>
    </li>
    <li class="nav-list__item">
      <a class="nav-list__link green" href="#">Инструменты</a>
    </li>
  </ul>
</nav>
```

```css
.nav-list__links {
  display: inline-block;
  color: #fff;
  font-size: 36px;
  line-height: 48px;
  padding: 6px 10px;
  text-decoration-skip-ink: none;
  text-decoration-thickness: 4px;
  text-underline-offset: -40px;
  transition: 150ms ease-in-out;
}

.nav-list__link:hover,
.nav-list__link:focus {
  text-decoration-thickness: 2px;
  text-underline-offset: 10px;
  text-decoration-color: currentColor;
}

.orange {
  text-decoration-color: #ff852e;
}

.blue {
  text-decoration-color: #2e9aff;
}

.yellow {
  text-decoration-color: #ffd829;
}

.green {
  text-decoration-color: #40e746;
}
```

<iframe title="Пример навигации" src="../demos/navigation/" height="200"></iframe>

О значении `currentColor` читайте в статье «[Цвета в вебе](/css/web-colors/#currentcolor)»
