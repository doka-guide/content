---
title: "`aria-required`"
description: "ARIA-атрибут, который указывает на обязательность ввода данных в элемент формы."
authors:
  - juliememe
related:
  - a11y/aria-errormessage
  - a11y/aria-attrs
  - html/required
tags:
  - doka
---

## Кратко

[Свойство виджета](/a11y/aria-attrs/#atributy-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya). Указывает на то, что элемент формы нужно обязательно заполнить или выбрать.

`aria-required` используют c кастомными элементами форм, которые свёрстаны при помощи [`<div>`](/html/div/) или [`<span>`](/html/span/).

Аналог `aria-required` в HTML — атрибут [`required`](/html/required/).

## Пример

```html
<span id="input-label">Ваша почта:</span>
<span
  role="textbox"
  aria-labelledby="input-label"
  id="email"
  aria-required="true"
  contenteditable
>
</span>
```

Ещё пример:

```html
<label for="name">Ваше имя (обязательно):</label>
<input
  id="name"
  type="text"
  name="name"
  aria-invalid="false"
  aria-required="true"
  aria-describedby="error"
>

<div class="error-message" id="error">
  Заполните это поле 🤗
</div>
```

<iframe title="Кастомное обязательное поле" src="demos/custom-required-field/" height="380"></iframe>

## Как пишется

Добавьте к тегу атрибут `aria-required` с одним из двух значений:

- `true` — нужно обязательно ввести сюда данные;
- `false` (по умолчанию) — данные вводить необязательно.

Атрибут можно использовать только для некоторых тегов и [ARIA-ролей](/a11y/aria-roles/):

- [`<input type="checkbox">`](/html/input/#type) или [`checkbox`](/a11y/role-checkbox/);
- [`<select>`](/html/select/) или [`combobox`](/a11y/role-combobox/) и [`listbox`](/a11y/role-listbox/);
- [`<textarea>`](/html/textarea/), [`<input>` с типами](/html/input/#type) `text`, `email`, `tel`, `url` или роли [`textbox`](/a11y/role-textbox/);
- [`<input type="number">`](/html/input/#type) или [`spinbutton`](/a11y/role-spinbutton/);
- [`div`](/html/div/), [`span`](/html/span/) или [`generic`](/a11y/role-generic/);
- [`radiogroup`](/a11y/role-radiogroup/);
- [`tree`](/a11y/role-tree/);
- [`gridcell`](/a11y/role-gridcell/).

Для `<input>`, `<select>` или `<textarea>` лучше использовать атрибут `required`.

## Как понять

`aria-required` можно добавлять не только к полям или чекбоксам, но и к целым группам радиокнопок или к ячейкам сеток.

```html
<form>
  <fieldset role="group" aria-labelledby="hobbies-label" aria-required="true">
    <legend id="hobbies-label">Выберите хотя бы одно увлечение:</legend>
    <label>
      <input type="checkbox" name="hobbies" value="reading">
      Книги
    </label>
    <label>
      <input type="checkbox" name="hobbies" value="sports">
      Котики
    </label>
    <label>
      <input type="checkbox" name="hobbies" value="traveling">
      Путешествия
    </label>
  </fieldset>
  <button type="submit">Отправить</button>
</form>
```

`aria-required` не влияет на функциональность и поведение элемента, а лишь помогает вспомогательным технологиям сообщать пользователям об обязательности поля.

Для сложных групп элементов, например радиокнопок или чекбоксов, используйте `aria-required`, а валидацию настройте через JavaScript.

Чтобы пользователь понял, что поле обязательное, используйте текст или символ вместе с цветом. Это важно для пользователей с особенностями зрения. Например, обязательные поля с `aria-required` можно выделить с помощью CSS-селекторов:

```css
[aria-required="true"] {
  border: 2px solid red;
}
```

Или показать подсказки:

```css
[aria-required="true"]::after {
  content: "*";
  color: red;
}
```

Если все поля формы обязательны, лучше укажите это в начале формы, а не добавляйте атрибут к каждому полю.

[Скрывайте]('https://www.accessibility-developer-guide.com/examples/forms/required/#first-approach-using-aria) дополнительные символы от скринридеров через атрибут `aria-hidden="true"`, чтобы они не мешали восприятию.

## Подсказки

💡 Атрибуты `required` и `aria-required` одинаково интерпретируются скринридерами.

💡 Чтобы форма не отправлялась с пустыми полями, настройте проверку через JavaScript.

💡 Для поддержки старых браузеров можно использовать `required` и `aria-required` одновременно. Современные браузеры проигнорируют `aria-required` и отдадут приоритет нативному `required`.
