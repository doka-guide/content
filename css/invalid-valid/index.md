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
  - solarrust
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

Псевдоклассы помогают стилизовать поля формы, саму форму и филдсет ([`<fieldset>`](/html/fieldset/)):

- `:invalid` — для полей с ошибкой;
- `:valid` — для верно заполненных полей.

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

У полей формы бывают требования к заполнению. Одни поля обязательны. В других данные должны быть в определённом формате: например, в поле с типом `email` нужен знак `@`.

Если поле выполняет все требования, браузер применяет к нему псевдокласс `:valid`. Если нет — `:invalid`. Через эти псевдоклассы можно задать стили верным и ошибочным полям.

<iframe title="Стилизация элементов формы" src="demos/form-inputs/" height="420"></iframe>

В примере выше браузер проверяет поля сразу, ещё до отправки формы:

- Поле имени и чекбокс обязательны. Имя не введено, чекбокс не отмечен, поэтому браузер применяет к ним `:invalid`.
- Поле ввода электронной почты необязательно. Пустое необязательное поле браузер считает верным, поэтому браузер применяет к нему `:valid`.

Браузер пересчитывает псевдоклассы прямо во время ввода. Как только в поле почты появляется текст, браузер проверяет его формат, потому что мы указали `type="email"`. Пока текст не похож на адрес вида `name@example.com`, браузер применяет к полю `:invalid`.

Проверка простая: она пропустит и `a@b`. Поэтому проверку на сервере она не заменяет.

Псевдоклассы работают и для самой формы, и для филдсета. Если хотя бы одно поле внутри не проходит проверку, срабатывает `:invalid`, иначе — `:valid`. Форма учитывает все свои поля, а филдсет — только вложенные.

<iframe title="Стилизация формы при помощи псевдоклассов :invalid и :valid" src="demos/form-invalid/" height="560"></iframe>

Цвет рамок меняют такие стили:

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

К любому селектору добавляем двоеточие и ключевое слово `invalid` или `valid`.

Селектор должен указывать на поле ввода, [`<select>`](/html/select/), [`<textarea>`](/html/textarea/), кнопку, форму или филдсет. Другие элементы браузер не проверяет: например, селектор `p:invalid` бесполезен. Поле без правил проверки всегда получает `:valid`.

Так выглядит селектор по классу:

```css
.field:invalid {
  color: red;
}

.field:valid {
  color: green;
}
```

## Подсказки

💡 Радиокнопки ([`<input type="radio">`](/html/input/)) с одинаковым `name` браузер проверяет как группу. Если хотя бы у одной из них есть [атрибут `required`](/html/required/), `:invalid` получают все радиокнопки группы. Псевдокласс держится, пока пользователь не выберет одну из них.

💡 Филдсет без полей всегда получает `:valid`.
