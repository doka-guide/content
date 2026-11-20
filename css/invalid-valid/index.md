---
title: "`:invalid`, `:valid`"
description: "Валидируем форму прямо в браузере. Без JavaScript, регистрации и смс."
baseline:
  - group: form-validity-pseudos
    features:
      - css.selectors.invalid
      - css.selectors.valid
authors:
  - ezhkov
contributors:
  - vchychuzhko
  - skorobaeus
editors:
  - tachisis
keywords:
  - invalid
  - valid
  - валидация
  - форма
  - филдсет
related:
  - html/form
  - css/in-range-out-of-range
  - html/input
tags:
  - doka
---

## Кратко

Псевдоклассы используются для стилизации полей формы, филдсетов, либо самой формы:

- `:invalid` для заполнений с ошибкой;
- `:valid` для верных заполнений.

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

## Как понять

Часто на сайтах мы встречаем формы. Это могут быть формы регистрации или формы оплаты покупки в интернет-магазине. Некоторые поля ввода и другие элементы управления в этих формах могут иметь особые требования к заполнению. Например, какие-то поля ввода должны быть обязательно заполнены, какие-то — иметь определённый формат данных (к примеру, текст в поле с типом `email` должен содержать знак `@`).

Чтобы показать что поле ввода заполнено корректно к нему можно применить особые стили используя псевдокласс `:valid`. Аналогично, для некорректно заполненного поля мы можем применить особые стили используя псевдокласс `:invalid`.

<iframe title="Стилизация элементов формы" src="demos/form-inputs/" height="390"></iframe>

В примере выше можно увидеть пару моментов:

- Поле ввода имени и чекбокс обязательны к заполнению, но не заполнены, поэтому псевдокласс `:invalid` применяется к ним сразу же.
- Поле ввода электронной почты необязательно к заполнению, поэтому к нему сразу же применён псевдокласс `:valid`.

Но если ввести в поле хотя бы один символ, браузер запускает проверку на корректность ввода email (из-за того, что мы указали `type="email"`) и применяет псевдокласс `:invalid` до тех пор, пока не будет введён корректный адрес электронной почты.

Также указанные псевдоклассы применяются и к самой форме, в которой находится инпут.

<iframe title="Стилизация формы при помощи псевдоклассов :invalid и :valid" src="demos/form-invalid/" height="540"></iframe>

В примере выше можно увидеть, что при наличии филдсета к нему также будет применён соответствующий псевдокласс.

```css
form:invalid {
  border-color: red;
}

form:valid {
  border-color: green;
}

fieldset:invalid {
  border-color: red;
}

fieldset:valid {
  border-color: green;
}
```

## Как пишется

К любому селектору добавляем двоеточие и ключевое слово `invalid` или `valid`. Селектор должен указывать на интерактивный элемент ввода, у которого предусмотрены правила проверки, на форму или на филдсет. Например, абзац браузер не умеет проверять на правильность, а значит, селектор `p:invalid` будет бесполезен.

Например, так выглядит селектор по классу:

```css
.element:invalid {
  color: red;
}

.element:valid {
  color: green;
}
```

## Подсказки

💡 Если в форме есть группа связанных радиокнопок ([`<input type="radio">`](/html/input/)), то если хотя бы у одной есть [атрибут `required`](/html/form/#atributy), псевдокласс `:invalid` будет применён ко всем радиокнопкам сразу.

💡 Псевдоклассы `:invalid` или `:valid` применяются и к самой форме, и к тегу [`<fieldset>`](/html/fieldset/), в зависимости от того, есть ли внутри ошибки, или все инпуты заполнены верно.

💡 В отличие от комплексной валидации формы, которая происходит при попытке её отправить, эти псевдоклассы работают в реальном времени и сохраняют свою актуальность даже во время ввода.
