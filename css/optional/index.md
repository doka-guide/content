---
title: "`:optional`"
description: "Показывает элементы формы, которые не обязательны для заполнения."
baseline:
  - group: form-validity-pseudos
    features:
      - css.selectors.optional
authors:
  - inventoris
contributors:
  - drakesbot12
keywords:
  - псевдокласс
  - формы
  - optional
  - валидация
related:
  - html/form
  - html/required
  - css/required
tags:
  - doka
---

## Кратко

Псевдокласс `:optional` выбирает элементы формы, которые **не являются обязательными для заполнения**.

Он применяется к:
- [`<input>`](/html/input/)
- [`<select>`](/html/select/)
- [`<textarea>`](/html/textarea/)

Если у элемента **нет атрибута [`required`](/html/required/)**, он считается необязательным и попадает под `:optional`.

<aside>

♻️ Противоположный псевдокласс — [`:required`](/css/required/), он выбирает обязательные поля формы.

</aside>

## Пример

```css
input:optional {
  border-color: #2e9aff;
}
```

```html
<form>
  <label>
    Имя вашего котика:
    <input type="text" name="cat-name">
  </label>

  <label>
    Email:
    <input type="email" name="email" required>
  </label>
</form>
```

<iframe title="Демонстрация применения стилей :optional и :required" src="demos/basic/" height="200"></iframe>

## Как пишется

Псевдокласс применяется к полям формы, у которых **не указан атрибут `required`**:

```css
input:optional {
  background-color: #fff8f1;
}
```

## Как понять

Браузер автоматически определяет, какие поля формы обязательны для заполнения.

- Если у элемента есть атрибут `required`, он считается обязательным
- Если атрибута нет — поле считается необязательным и попадает под `:optional`

Это позволяет:

- визуально отделять важные поля от второстепенных
- улучшать UX форм
- уменьшать когнитивную нагрузку пользователя

## Подсказки

💡 Псевдокласс работает только с элементами формы, а не с любыми HTML-элементами.
💡 `:optional` удобно использовать для стилизации второстепенных полей — например, дополнительных данных профиля.
💡 Часто комбинируется с `:required`, чтобы явно разделить визуально важные и необязательные поля:
```css
input:required {
  border-color: #2e9aff;
}

input:optional {
  border-color: #d77d31;
}
```
