---
title: "`:required`"
authors:
  - ezhkov
editors:
  - tachisis
contributors:
  - skorobaeus
keywords:
  - валидация
  - форма
  - form
  - обязательное
tags:
  - doka
---

## Кратко

Псевдокласс `:required`, дополняющий основной селектор, поможет выбрать элементы [`<input>`](/html/input/), [`<textarea>`](/html/textarea/) или [`<select>`](/html/select/), у которых задан атрибут `required`.

## Пример

Обязательное для заполнения поле ввода будет иметь оранжевую обводку и фоновый цвет:

```html
<form>
  <div class="form-row">
    <label for="first_name">Имя</label>
    <input type="text" id="first_name" required>
  </div>
  <div class="form-row">
    <label for="last_name">Фамилия</label>
    <input type="text" id="last_name">
  </div>
</form>
```


```css
input:required {
  border-width: 2px;
  border-color: #FF8630;
  background-color: rgba(255, 134, 48, 0.1);
}
```

<iframe title="Подсветка обязательного поля" src="demos/required-input/" height="300"></iframe>

## Как понять

Если нужно как-то выделить обязательные для заполнения элементы форм, можно использовать в селекторе псевдокласс `:required`.

<aside>

☝️ Обратите внимание, что использование этого псевдокласса эквивалентно [селектору по атрибуту](/css/attribute-selector/) `[required]`.

Использование псевдокласса `:required` допускается исключительно с селекторами полей формы. Использовать с другими селекторами его бесполезно.

</aside>
