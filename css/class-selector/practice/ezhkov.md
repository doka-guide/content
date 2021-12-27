🛠 Селектор по классу является основным селектором для стилизации любой веб-страницы. Благодаря тому, что одному элементу можно задать несколько классов, а нескольким элементам — один и тот же класс, мы получаем очень гибкий способ стилизации страниц любой сложности.

Например, мы можем уточнить один селектор по классу другим:

```html
<form>
  <label class="form-label invalid" for="input">Ваш email</label>
  <input class="form-input invalid" type="email" id="input">
</form>
```

```css
.form-label.invalid {
  color: pink;
}

.form-input.invalid {
  border-color: pink;
  background-color: #623D45;
}
```

<iframe title="Несколько классов" src="../demos/specific-class-selector/" height="300"></iframe>

А можем добавить класс родительскому элементу, чуть изменить селекторы и получить тот же результат:

```html
<form class="invalid">
  <label class="form-label" for="input">Ваш email</label>
  <input class="form-input" type="email" id="input">
</form>
```

```css
.invalid .form-label {
  color: pink;
}

.invalid .form-input {
  border-color: pink;
  background-color: #623D45;
}
```

<iframe title="Вложенный селектор по классу" src="../demos/parent-child-selector/" height="300"></iframe>

Самое сложное в вёрстке — выбрать способ решения задачи, потому что любая задача решается двумя и более способами 🙂
