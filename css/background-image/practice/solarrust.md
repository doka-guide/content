🛠 Если задаём фоновую картинку для блока со светлым текстом, то обязательно задаём и фоновый цвет.

Почему это важно: если при загрузке страницы картинка будет долго загружаться или вообще не загрузится, то светлый текст на белом будет совершенно не виден. Пользователь потеряет контекст и, вероятнее всего, интерес к вашей странице.

Пример ниже не пустой, но в нём не загрузилась фоновая картинка:

```html
<div class="element">
  <h1 class="main-title">Фронтенд-блог: чиним вёрстку одной строкой</h1>
</div>
```

```css
.element {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("broken-link-to-image.png");
}

.main-title {
  width: 80%;
  margin: 0 auto;
  color: white;
  text-align: center;
  text-transform: uppercase;
  font-family: sans-serif;
  font-size: 3rem;
}
```

Демка будет наглядной, если на сайте включить светлую тему ☀️

<iframe title="Ошибка загрузки" src="../demos/fix/" height="150"></iframe>

Чиним одной строкой:

```css
.element {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("broken-link-to-image.png");
  background-color: gray;
}
```

<iframe title="Ошибка загрузки" src="../demos/fix-2/" height="150"></iframe>

Да, будет не так красиво, как нарисовал дизайнер, но вся информация будет доступна.

🛠 Кроме линейного градиента можно задавать радиальный — круглый — градиент. Для этого нужно написать следующее:

```html
<div class="parent">
  <div class="spread-gradient"></div>
  <div class="smooth-circle"></div>
  <div class="sharp-circle"></div>
</div>
```

```css
.parent {
  display: flex;
  justify-content: space-around;
  padding: 5%;
  background-color: #1a5ad7;
}

.spread-gradient,
.smooth-circle,
.sharp-circle {
  width: 200px;
  height: 200px;
}

.spread-gradient {
  background-image: radial-gradient(#e6e6e6, #1a5ad7);
}

.smooth-circle {
  background-image: radial-gradient(#e6e6e6, #1a5ad7 70%);
}

.sharp-circle {
  background-image: radial-gradient(#e6e6e6 70%, #1a5ad7 70%);
}
```

<iframe title="Радиальные градиенты" src="../demos/gradient/" height="400"></iframe>
