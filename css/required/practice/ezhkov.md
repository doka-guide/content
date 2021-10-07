🛠 Как правило, в реальных формах обязательные к заполнению поля выделяют не так явно, как в примерах выше. Обычно после текстового описания обязательного поля ставят звёздочку. В примере ниже, кроме того, показано, как можно стилизовать подсказку к полю.

```html
<form>
  <div class="form-row">
    <label for="first_name">Имя*</label>
    <input type="text" id="first_name" required>
    <span class="hint">Обязательно к заполнению</span>
  </div>
  <div class="form-row">
    <label for="last_name">Фамилия</label>
    <input type="text" id="last_name">
    <span class="hint">Необязательно</span>
  </div>
</form>
```

```css
.hint {
  color: #555555;
}

input:required + .hint {
  color: lightcoral;
}
```

<iframe title="Стилизация подсказки для поля ввода" src="../demos/input-hint/" height="300"></iframe>
