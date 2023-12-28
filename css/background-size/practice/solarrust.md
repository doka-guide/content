🛠 Если для задания фона используется шорткат `background`, то значение для `background-size` указывается последним, после слэша `/`. Пример: `background: url('example.jpg') no-repeat center / cover`

🛠 Свойство `background-size` очень пригодится, если хочется сделать фон с повторяющимся элементом. Так называемым паттерном.

```html
<div class="element"></div>
```

```css
.element {
  height: 100vh;
  background-color: #18191C;
  background-image: url("pattern.svg");
  background-size: 100px auto;
}
```

<iframe title="Паттерн на фоне" src="../demos/pattern/" height="400"></iframe>

Попробуйте поменять размеры фоновой картинки и посмотреть, как будет меняться фоновый паттерн.
