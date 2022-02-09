🛠 Как правило, в реальных формах обязательные к заполнению поля выделяют не так явно, как в примере выше. Обычно после текстового описания обязательного поля ставят звёздочку. В примере ниже, кроме того, показано, как можно стилизовать подсказку к полю.

```html
<form>
  <div class="form-row">
    <label class="label-required" for="first_name">Имя</label>
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
.label-required::after {
  content: "*";
  font-size: 0.7em;
}

.hint {
  color: #FFFFFF;
}

input:required + .hint {
  color: #2E9AFF;
}
```

<iframe title="Стилизация подсказки для поля ввода" src="../demos/input-hint/" height="300"></iframe>
