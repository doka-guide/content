🛠 Возьмём тот же пример с тремя колонками из начала статьи. Пусть у каждой из колонок будет внешний отступ по 40 px с каждой из сторон. Если зададим свойства _в лоб_, то ничего не выйдет, последний блок _падает_ на новую строку.

```html
<div class="parent">
  <div class="child">
    <h2>Газеты</h2>
  </div>
  <div class="child">
    <h2>Заводы</h2>
  </div>
  <div class="child">
    <h2>Пароходы</h2>
  </div>
</div>
```

```css
.child {
  display: inline-block;
  width: 33.3%;
  margin-left: 40px;
  margin-right: 40px;
}
```

<iframe title="Вёрстка трёх колонок" src="./demos/nonfit/" height="355"></iframe>

Можно использовать [флексбокс](/css/flexbox-guide/). Избежим падения, но получим проблему сужения блоков, чтобы уместиться в ряд. Как всего этого избежать? Высчитывать размер блоков с учётом этих боковых отступов!

```css
.child {
  display: inline-block;
  width: calc(33.3% - 80px);
  margin-left: 40px;
  margin-right: 40px;
}
```

<iframe title="Вёрстка трёх колонок исправленная" src="./demos/fit/" height="355"></iframe>
