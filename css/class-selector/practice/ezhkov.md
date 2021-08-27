🛠 Селектор по классу является основным селектором для стилизации любой веб-страницы. Благодаря тому, что одному элементу можно задать несколько классов, а нескольким элементам — один и тот же класс, мы получаем очень гибкий способ стилизации страниц любой сложности.

Например, мы можем уточнить один селектор по классу другим:

```html
<form action="">
  <label class="form-label invalid" for="input">Ваш email</label>
  <input class="form-input invalid" type="email">
</form>
```

```css
.form-label.invalid {
  color: red;
}

.form-input.invalid {
  border-color: red;
  background-color: #ff000022;
}
```

https://codepen.io/ezhkov/pen/wvzqMVg

А можем добавить класс родительскому элементу, чуть изменить селекторы и получить тот же результат:

```html
<form action="" class="invalid">
  <label class="form-label" for="input">Ваш email</label>
  <input class="form-input" type="email">
</form>
```

```css
.invalid .form-label {
  color: red;
}

.invalid .form-input {
  border-color: red;
  background-color: #ff000022;
}
```

<iframe title="Название — Селектор по классу — Дока" src="../demos/ezhkov-JjRyGgV/index.html"></iframe>

Самое сложное в вёрстке — выбрать способ решения задачи, потому что любая задача решается двумя и более способами 🙂
