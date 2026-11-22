🛠 Браузер применяет стили `:invalid` к полю с ошибкой сразу же, ещё до того, как пользователь начал что-то вводить. Форма встречает пользователя красными рамками, хотя он ещё ничего не сделал не так.

Чтобы показывать ошибку только после того, как пользователь поработал с полем, используйте псевдоклассы [`:user-invalid` и `:user-valid`](/css/user-valid-invalid/). Браузер начинает применять их, когда пользователь изменил значение поля или попытался отправить форму.

```html
<form>
  <div class="form-row">
    <label for="first-name">Имя:</label>
    <input
      type="text"
      name="first-name"
      id="first-name"
      required
    >
    <span class="validity-icon"></span>
  </div>
  <div class="form-row">
    <label for="email">E-mail:</label>
    <input
      type="email"
      name="email"
      id="email"
    >
    <span class="validity-icon"></span>
  </div>
  <div class="form-row">
    <button type="submit">Отправить</button>
  </div>
</form>
```

```css
input:user-invalid {
  border: 2px solid red;
}

input:user-invalid + .validity-icon::before {
  content: '✖';
}

input:user-valid + .validity-icon::before {
  content: '✓';
}
```

<iframe title="Валидация формы после ввода" src="../demos/form-validation/" height="340"></iframe>

У текстовых полей изменение засчитывается, когда пользователь уходит из поля. У чекбоксов, радиокнопок и выпадающих списков — сразу после выбора.

Учтите: при попытке отправить форму браузер включает проверку у всех полей. Пустое необязательное поле тоже получает `:user-valid`, и у него появляется галочка.

Раньше похожего поведения добивались хаком с псевдоклассом [`:placeholder-shown`](/css/placeholder-shown/). Хак работал только для текстовых полей. Сейчас `:user-invalid` и `:user-valid` работают во всех браузерах, и хак больше не нужен.
