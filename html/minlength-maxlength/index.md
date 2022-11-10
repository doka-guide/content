---
title: "Атрибуты `minlength` и `maxlength`"
description: "Атрибуты `minlength` и `maxlength` устанавливают полям ввода минимальное и максимальное количество символов."
authors:
  - zeddybig
keywords:
  - валидация
related:
  - html/input
  - html/textarea
  - html/required
tags:
  - doka
  - placeholder
---

## Кратко

Атрибуты `minlength` и `maxlength` позволяют устанавливать минимальное и максимальное количество символов в полях ввода [`<input>`](/html/input/) или [`<textarea>`](/html/textarea/).

## Как пишется

```html
<input minlength="4" maxlength="8">
<textarea minlength="50" maxlength="1000">
```

## Пример

Создадим поле для ввода пароля и ограничим количество допустимых символов:

```html
<label for="password">Введите пароль (от 8 до 16 символов):</label>

<input
  type="password"
  id="password"
  name="password"
  required
  minlength="8"
  maxlength="16"
>
```


<iframe title="Поле ввода пароля с ограничениями по количеству символов" src="demos/input-example" height="150"></iframe>

## Как понять

Атрибуты `minlength` и `maxlength` устанавливают минимальное и максимальное количество символов в полях ввода `<input>` или `<textarea>`. Значением атрибутов должно быть целое число от 0 и выше. Если значение атрибутов не указано, или указано неправильно, ограничений по длине у поля не будет.

При добавлении полю обоих атрибутов, значение `minlength` всегда должно быть меньше значения `maxlength`. Если за этим не уследить, то поле всегда будет невалидным.
