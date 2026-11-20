---
title: "Атрибуты `minlength` и `maxlength`"
description: "Как задать минимальное и максимальное количество символов, которое принимает поле?"
baseline:
  - group: input
    features:
      - html.elements.input.minlength
      - html.elements.input.maxlength
  - group: textarea
    features:
      - html.elements.textarea.minlength
      - html.elements.textarea.maxlength
authors:
  - zeddybig
  - tatianafokina
contributors:
  - skorobaeus
keywords:
  - валидация
  - validation
related:
  - html/input
  - html/textarea
  - html/required
tags:
  - doka
---

## Кратко

Атрибуты `minlength` и `maxlength` устанавливают минимальное и максимальное количество символов, которые можно ввести в поля [`<input>`](/html/input/) или [`<textarea>`](/html/textarea/).

## Пример

В этом примере в `<input>` можно ввести минимум 4 символа и максимум 8, а в `<textarea>` — минимум 50 и максимум 1000.

```html
<input minlength="4" maxlength="8">

<textarea minlength="50" maxlength="1000">
```

Теперь создадим поле с паролем и ограничим количество допустимых символов:

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

<iframe title="Поле для пароля с ограничениями по количеству символов" src="demos/input/" height="220"></iframe>

## Как пишется

Значения для `minlength` и `maxlength` — целые числа от 0 и выше. К примеру, `0`, `14` или `1000`. Если не указать значение или задать его неверно, у поля не будет ограничений по длине. Также значение `maxlength` не может быть меньше значения `minlength`. Поле всегда будет заполнено неправильно, если максимальное значение меньше минимального.

Браузеры используют кодировку UTF-16 для расчёта длины поля. Это значит, что длина равна количеству символов в случае букв, чисел и знаков. Например, если задали `minlength="3"`, то поле с введёнными `abc` и `123` соответствуют минимальному ограничению по символам.

`minlength` и `maxlength` часто используют вместе с другим атрибутом [`required`](/html/required/), который делает поле обязательным.

### Валидация

В JavaScript есть специальный интерфейс `ValidityState`, который даёт доступ к проверке полей. С помощью свойств `tooLong` и `tooShort` можно проверять длину поля с атрибутами `minlength` и `maxlength`. Оба свойства возвращают `true`, если пользователь ввёл слишком много или слишком мало символов, и `false`, когда введённые данные правильной длины. Форму лучше валидировать после нажатия на кнопку для отправки данных.

### Странности с `<input type="number">`

Когда задаёте ограничения по длине полю с типом `number`, атрибуты `minlength` и `maxlength` не ограничивают минимальное и максимальное количество символов, которое можно ввести с клавиатуры.

Попробуйте ввести в этой демке больше, чем 3 цифры.

```html
<label for="items">
  Выберите количество (максимум 999):
</label>
<input
  type="number"
  min="1"
  max="999"
  maxlength="3"
  id="items"
>
```

<iframe title="Поле по умолчанию с типом number" src="demos/default-input-type-number/" height="220"></iframe>

Чтобы обойти странность, используйте JavaScript или регулярные выражения. К примеру, в это поле можем ввести только 3 символа благодаря обработке события `onKeyPress`. Когда попытаетесь ввести больше символов, скрипт просто не даст это сделать.

```html
<label for="items">
  Выберите количество (максимум 999):
</label>
<input
  type="number"
  id="items"
  pattern="\d+"
  min="1"
  max="999"
  onKeyPress="if(this.value.length === 3) return false"
>
```

<iframe title="Работающее поле с типом number" src="demos/fixed-input-type-number/" height="220"></iframe>

### Стилизация

Поля с неправильными данными можно стилизовать через псевдоклассы [`:invalid`](/css/invalid-valid/) или `:user-invalid` для всех полей или [`:out-of-range`](/css/in-range-out-of-range/) для полей с `type="number"`.

<aside>

👩‍🎨 Добавляйте к неправильно заполненным полям не только цветную обводку и заливку, но и иконку, а также текстовое описание ошибки.

</aside>

К полю, стилизованному через `:invalid`, стили применятся в пустом состоянии и в состоянии, когда в него ввели неправильное количество символов.

```css
input:invalid {
  border-color: #2E9AFF;
  background-color: rgb(46, 154, 255, 0.1);
  outline: none;
}
```

<iframe title="Поле со стилями для invalid" src="demos/input-invalid-styles/" height="220"></iframe>

Стили из `:user-invalid` применятся к полю только тогда, когда пользователь ввёл неверное количество символов и при этом начал взаимодействовать с другими элементами на странице.

```css
input:user-invalid {
  border-color: #2E9AFF;
  background-color: rgb(46 154 255 / 0.1);
  outline: none;
}
```

<iframe title="Поле со стилями для user-invalid" src="demos/input-userinvalid-styles/" height="220"></iframe>
