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

`aria-required` не влияет на функциональность и поведение элемента, а лишь помогает вспомогательным технологиям сообщать пользователям об обязательности поля.

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

Другой пример:

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

Добавьте атрибут `aria-required` к интерактивным элементам, которые принимают данные пользователей:

- [`<input type="checkbox">`](/html/input/#type) или [`checkbox`](/a11y/role-checkbox/);
- [`<select>`](/html/select/) или [`combobox`](/a11y/role-combobox/) и [`listbox`](/a11y/role-listbox/);
- [`<textarea>`](/html/textarea/), [`<input>` с типами](/html/input/#type) `text`, `email`, `tel`, `url` или роли [`textbox`](/a11y/role-textbox/);
- [`<input type="number">`](/html/input/#type) или [`spinbutton`](/a11y/role-spinbutton/);
- [`div`](/html/div/), [`span`](/html/span/) или [`generic`](/a11y/role-generic/);
- [`radiogroup`](/a11y/role-radiogroup/);
- [`tree`](/a11y/role-tree/);
- [`gridcell`](/a11y/role-gridcell/).

У `aria-required` есть два значения:

- `true` — нужно обязательно ввести сюда данные или сделать выбор;
- `false` (по умолчанию) — данные вводить необязательно.

Для `<input>`, `<select>` или `<textarea>` лучше использовать атрибут `required`. ARIA-атрибут обычно используют c кастомными элементами форм, которые свёрстаны при помощи [`<div>`](/html/div/) или [`<span>`](/html/span/).

`aria-required` можно добавлять не только к отдельным полям и радиокнопкам, но и к целым группам элементов:

```html
<form>
  <fieldset
    aria-required="true"
  >
    <legend>
      Выберите хотя бы одно увлечение:
    </legend>
    <label>
      <input type="checkbox" name="hobbies" value="reading">
      Книги
    </label>
    <label>
      <input type="checkbox" name="hobbies" value="cats">
      Котики
    </label>
    <label>
      <input type="checkbox" name="hobbies" value="traveling">
      Путешествия
    </label>
  </fieldset>
  <button>Отправить</button>
</form>
```

При использовании `aria-required`, настройте валидацию через JavaScript.

```html
<form
  id="form"
  method="post"
  novalidate
 >
  <label for="name">Ваше имя (обязательно):</label>
  <input
    id="name"
    type="text"
    name="name"
    aria-invalid="false"
    aria-required="true"
    aria-describedby="error"
  >
  <div
    class="error-message"
    id="error"
  >
    Заполните это поле 🤗
  </div>

  <button id="button">Отправить</button>
</form>
```

```js
const form = document.getElementById('form')
const requiredInput = form.querySelector('#name')
const button = form.querySelector('#button')
const error = form.querySelector('#error')

const markValid = () => {
  requiredInput.setAttribute('aria-invalid', 'false')
  error.style.display = 'none'
}

const markInvalid = () => {
  requiredInput.setAttribute('aria-invalid', 'true')
  error.style.display = 'block'
}

const validateInput = () => {
  const value = requiredInput.value
  if (!value) {
    markInvalid()
  } else {
    markValid()
  }
}

const hideError = () => {
  const value = requiredInput.value
  if (value) {
    markValid()
  }
}

button.addEventListener('click', () => {
  validateInput()
})

requiredInput.addEventListener('change', validateInput)
requiredInput.addEventListener('input', hideError)

form.addEventListener('submit', (event) => {
  event.preventDefault()

  button.disabled = true
  // Исправляем поведение Firefox
  button.autocomplete = 'off'

  setTimeout(() => {
    button.disabled = false
  }, 2000)
})
```

Чтобы пользователь понял, что поле обязательное, используйте текст или знак звёздочки `*` (астериск) вместе с цветом. Это важно для пользователей с особенностями зрения. Например, обязательные поля с `aria-required` можно выделить с помощью CSS-селекторов:

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

Если все поля нужно заполнить, лучше укажите это в начале формы, а не добавляйте атрибут к каждому полю.

```html
<form aria-describedby="hint">
  <p id="hint">Обязательно заполните все поля 💯</p>

  <label for="name">Имя:</label>
  <input type="text" id="name" value="name" aria-required="true">
  <label for="lastname">Фамилия:</label>
  <input type="text" id="lastname" value="lastname" aria-required="true">

  <button>Отправить</button>
</form>
```

Скрывайте от скринридеров [избыточные подсказки](https://www.accessibility-developer-guide.com/examples/forms/required/#first-approach-using-aria) через атрибут [`aria-hidden="true"`](/a11y/aria-hidden/):

```html
<form>
  <label for="name">Имя*:</label>
  <input type="text" id="name" value="name" aria-required="true">
  <label for="lastname">Фамилия*:</label>
  <input type="text" id="lastname" value="lastname" aria-required="true">

  <label for="biography">Расскажите о себе:</label>
  <textarea id="biography" type="text"></textarea>

  <p aria-hidden="true">
    * — обязательное поле
  </p>

  <button>Отправить</button>
</form>
```

## Подсказки

💡 Атрибуты `required` и `aria-required` одинаково интерпретируются скринридерами.

💡 Чтобы форма не отправлялась с пустыми полями, настройте проверку через JavaScript.

💡 Для поддержки старых браузеров можно использовать `required` и `aria-required` одновременно. Современные браузеры проигнорируют `aria-required` и отдадут приоритет нативному `required`.
