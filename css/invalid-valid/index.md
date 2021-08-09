---
title: ":invalid и :valid"
authors:
  - ezhkov
editors:
  - tachisis
keywords:
  - invalid
  - valid
  - валидация
  - форма
tags:
  - doka
---

## Кратко

Псевдоклассы используются для стилизации полей формы:

- `:invalid` для заполненных с ошибкой;
- `:valid` для заполненных верно.

## Пример

```html
<form>
  <div class="form-row">
    <label for="first-name">Имя:</label>
    <input type="text" name="first-name" id="first-name" required>
    <span class="validity-icon"></span>
  </div>
  <div class="form-row">
    <label for="email">E-mail:</label>
    <input type="email" name="email" id="email">
    <span class="validity-icon"></span>
  </div>
  <div class="form-row">
    <label>
      <input type="checkbox" name="agree" id="agree" required>
      Я согласен с политикой обработки персональных данных
    </label>
  </div>
  <div class="form-row">
    <button type="submit">Отправить</button>
  </div>
</form>
```

```css
input:invalid {
  border: 2px solid red;
}

input:invalid + .validity-icon::before {
  content: '✖';
  color: red;
}

input:valid + .validity-icon::before {
  content: '✓';
  color: green;
}

[type="checkbox"]:invalid {
  outline: 2px solid red;
  outline-offset: 2px;
}
```

## Как это понять

Часто на сайтах мы встречаем формы. Это могут быть формы регистрации или формы оплаты покупки в интернет-магазине. Некоторые поля ввода и другие элементы управления в этих формах могут иметь особые требования к заполнению. Например, какие-то поля ввода должны быть обязательно заполнены, какие-то — иметь определённый формат данных (например, текст в поле с типом `email` должен содержать знак `@` и точку).

Чтобы показать, что поле ввода заполнено корректно, к нему можно применить особые стили, используя псевдокласс `:valid`. Аналогично, для некорректно заполненного поля мы можем применить особые стили, используя псевдокласс `:invalid`.

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="css,result" data-user="ezhkov" data-slug-hash="ZEpdbje" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title=":invalid / :valid">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/ZEpdbje">
  :invalid / :valid</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

В примере выше можно увидеть пару моментов:

- Поле ввода имени и чекбокс обязательны к заполнению, но не заполнены, поэтому псевдокласс `:invalid` применяется к ним сразу же.
- Поле ввода электронной почты не обязательно к заполнению, поэтому к нему сразу же применён псевдокласс `:valid`.

Но если ввести в поле хотя бы один символ, браузер запускает проверку на корректность ввода email (из-за того, что мы указали `type="email"`) и применяет псевдокласс `:invalid` до тех пор, пока не будет введён корректный адрес электронной почты.

## Как пишется

К любому селектору добавляем двоеточие и ключевое слово `invalid` или `valid`. Селектор должен указывать на интерактивный элемент, у которого предусмотрены правила проверки. Например, абзац браузер не умеет проверять на правильность, а значит селектор `p:invalid` будет бесполезен.

Например, так выглядит селектор по классу:

```css
.element:invalid {
  /* Стили */
}

.element:valid {
  /* Стили */
}
```

## Подсказки

💡 Если в форме есть группа связанных радиокнопок (`<input type="radio">`), то если хотя бы у одной есть [атрибут `required`](/html/form/#атрибуты), псевдокласс `:invalid` будет применён ко всем радиокнопкам сразу.
