---
title: ":required"
authors:
  - ezhkov
editors:
  - tachisis
keywords:
  - валидация
  - форма
  - form
  - обязательное
tags:
  - doka
---

## Кратко

Псевдокласс `:required`, дополняющий основной селектор, поможет выбрать элементы [`<input>`](/html/input), [`<textarea>`](/html/textarea) или [`<select>`](/html/select), у которых задан атрибут `required`.

## Пример

Обязательное для заполнения поле ввода будет иметь синюю обводку:

```html
<form>
  <div class="form-row">
    <label for="first_name">Имя*</label>
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
  outline: 2px solid blue;
}
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="css,result" data-user="ezhkov" data-slug-hash="BaLbMKG" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title=":required">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/BaLbMKG">
  :required</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

## Как это понять

Если нужно как-то выделить обязательные для заполнения элементы форм, можно использовать в селекторе псевдокласс `:required`.

:::callout ☝️

Обратите внимание, что использование этого псевдокласса эквивалентно [селектору по атрибуту](/css/attribute-selector) `[required]`.

Использование псевдокласса `:required` допускается исключительно с селекторами полей формы. Использовать с другими селекторами его бесполезно.

:::
