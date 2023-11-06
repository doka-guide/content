---
title: "Атрибуты `minlength` и `maxlength`"
description: "Как задать минимальное и максимальное количество символов, которое принимает поле?"
authors:
  - zeddybig
  - tatianafokina
contributors:
  - skorobaeus
keywords:
  - валидация
related:
  - html/input
  - html/textarea
  - html/required
tags:
  - doka
---

## Кратко

Атрибуты `minlength` и `maxlength` устанавливают минимальное и максимальное количество символов в полях ввода [`<input>`](/html/input/) или [`<textarea>`](/html/textarea/).

## Пример

В этом примере в `<input>` можно ввести минимум 4 символа и максимум 8, а в `<textarea>` — минимум 50 и максимум 1000.

```html
<input minlength="4" maxlength="8">
<textarea minlength="50" maxlength="1000">
```

Теперь создадим поле для пароля и ограничим количество допустимых символов:

```html
<label for="password">
  Введите пароль (от 8 до 16 символов):
</label>

<input
  type="password"
  id="password"
  name="password"
  minlength="8"
  maxlength="16"
  required
>
```

<iframe title="Поле для пароля с ограничениями по количеству символов" src="demos/input-example/" height="200"></iframe>

## Как пишется

Значения для `minlength` и `maxlength` — целое число от 0 и выше. К примеру, `0`, `14` или `1000`. Если не указать значение или задать его неверно, у поля не будет ограничений по длине. Также значение `maxlength` не может быть меньше значения `minlength`. Поле всегда будет заполнено неправильно, если максимальное значение меньше минимального.

Браузеры используют кодировку UTF-16 для расчёта длины поля. Это значит, что длина равна количеству символов в случае букв, чисел и знаков. Например, если задали `minlength="3"` и `maxlength="10"`, то поле с введёнными `abc` и `123` соответвуют минимальному ограничению по символам.

`minlength` и `maxlength` часто используют вместе с другим атрибутом [`required`](/html/required/). Он делает поле обязательным.

### Валидация

В JavaScript есть специальный интерфейс `ValidityState`, который даёт доступ к проверке полей. С помощью свойств `tooLong` и `tooShort` можно проверять длину поля с ограничениями по ней. Оба свойства возвращают `true` в случае, если пользователь ввёл слишком много или слишком мало символов, и `false`, когда у поля правильная длина. Форму лучше валидировать после нажатия на кнопку для отправки данных.

### Странности с `<input type="number">`

`minlength` и `maxlength` не работают, когда задаёте ограничения по количеству символов для поля с типом `number`.

<iframe title="Поле по умолчанию с типом number" src="demos/default-input-type-number/" height="200"></iframe>

Чтобы обойти странность, используйте JavaScript или регулярные выражения. К примеру, в это поле можем ввести только три символа:

```html
<label for="items">
  Выберите количество (максимум 999):
</label>
<input
  type="number"
  id="items"
  onKeyPress="if(this.value.length===3) return false"
>
```

<iframe title="Работающее поле с типом number" src="demos/fixed-input-type-number/" height="200"></iframe>

### Стилизация

Поля с неправильными данным можно стилизовать через псевдоклассы `:invalid` или `:out-of-range`.

<aside>

Обозначайте неверно заполненные поля не только цветом, но и описанием ошибки в виде текста рядом с этими полями.

</aside>

К полю с `:invalid` применятся стили в пустом состоянии и в состоянии, когда в него ввели нужное количество символов.

```css
input {
  border: 2px solid currentcolor;
}

input:invalid {
  border: 2px dashed red;
}

input:invalid:focus {
  background-image: linear-gradient(pink, lightgreen);
}
```

Когда используете `required`, браузеры показывают стили для невалидных полей до тех пор, пока пользователи не введут в них правильные данные.

К полю с `:out-of-range` стили сработают в случае, когда значение ниже минамального и выше максимального.

```css
input {
  display: block;
  margin-top: 1em;
}

input:out-of-range {
  background-color: orangered;
}
```
