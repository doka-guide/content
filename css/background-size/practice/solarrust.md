🛠 Если для задания фона используется шорткат `background`, то значение для `background-size` указывается последним, после слэша `/`. Пример: `background: url('example.jpg') no-repeat center / **cover**`

🛠 Свойство `background-size` очень пригодится, если хочется сделать фон с повторяющимся элементом. Так называемым паттерном.

```html
<div class="element"></div>
```

```css
.element {
  height: 100vh;
  background-color: #f1f1f1; /* Фоновый цвет */
  /* Маленькая фоновая картинка */
  background-image: url("pattern.svg");
  /* Нет background-repeat, а значит картинка будет повторяться по горизонтали и вертикали*/
  background-size: 40px auto; /* Размер картинки 40 пикселей по ширину и auto по высоте */
}
```

<iframe title="Паттерн на фоне" src="../demos/pattern/" height="400"></iframe>

Попробуй поменять размеры фоновой картинки и посмотреть, как будет меняться фоновый паттерн.
