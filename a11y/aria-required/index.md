---
title: "`aria-required`"
description: "ARIA-атрибут, который указывает на обязательность ввода данных в элемент формы."
authors:
  - doka-dog
keywords:
  - доступность
  - ARIA
  - ARIA-атрибут
  - форма
related:
  - a11y/aria-errormessage
  - a11y/aria-attrs
  - html/required
tags:
  - doka
  - placeholder
---

## Кратко

[Свойство виджета](/a11y/aria-attrs/#atributy-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya), которое определяет обязательность ввода данных в элемент формы перед их отправкой.

`aria-required` используются c несемантическими/кастомными элементы формы, например при помощи [`<div>`](/html/div) или [`span`](/html/span)

Аналог `aria-required` в HTML — атрибут [`required`](/html/required/).

## Пример

```html
<span id="label">Ваша почта:</span>
<span role="textbox" aria-labelledby="label" id="email" aria-required="true" contenteditable></span>
```

## Как пишется

Добавьте к тегу атрибут `aria-required` с одним из двух значений:

- `true` — нужно обязательно ввести сюда данные.
- `false` (по умолчанию) — данные вводить необязательно.

Атрибут можно использовать только для некоторых тегов и [ARIA-ролей](/a11y/aria-roles/):

- [`<input type="checkbox">`](/html/input/#type) или [`checkbox`](/a11y/role-checkbox/).
- [`<select>`](/html/select/) или [`combobox`](/a11y/role-combobox/) и [`listbox`](/a11y/role-listbox/).
- [`<textarea>`](/html/textarea/), [`<input>` с типами](/html/input/#type) `text`, `email`, `tel`, `url` или роли [`textbox`](/a11y/role-textbox/).
- [`<input type="number">`](/html/input/#type) или [`spinbutton`](/a11y/role-spinbutton/).
- [`div`](/html/div/), [`span`](/html/span/) или [`generic`](/a11y/role-generic/).
- [`radiogroup`](/a11y/role-radiogroup/).
- [`tree`](/a11y/role-tree/).
- [`gridcell`](/a11y/role-gridcell/).

Для `<input>`, `<select>` или `<textarea>` лучше использовать атрибут `required`.

## Как понять

`aria-required` можно добавлять не только к полям или чекбоксам, но и к целым группам радиокнопок или к ячейкам сеток.

## Пример

```html
<span id="label">Ваша почта:</span>
<span role="textbox" aria-labelledby="label" id="email" aria-required="true" contenteditable></span>
```
## Еще Пример

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


## Подсказки

💡 Атрибуты `required` и `aria-required` одинаково интерпретируются скринридерами.

💡`aria-required` не влияет на функциональность и поведение элемента, а лишь помогает ассистивным технологииям сообщать пользователям о том, что поле обязательно.

💡 Чтобы форма не отправлялась с пустыми полями, настройте проверку через JavaScript.

💡 C помощью CSS селекторов можно выделить обязательные поля с `aria-required`:

```css
[aria-required="true"] {
border: 2px solid red;
}
```
Или показать подсказки:
```css
[aria-required="true"]::after {
content: '*';
color: red;
}

```

💡 Для поддержки старых браузеров можно использовать одновременно оба атрибута. Современные браузеры в таком случае будут игнорировать `aria-required` и отдадут приоритет нативному `required`.


## На практике

🛠 Чтобы пользователь понял, что поле обязательное используйте текст или символ вместе с [цветом](https://doka.guide/css/required/). Это важно для пользователей с ограничениями по зрению.

🛠 [Скрывайте]('https://www.accessibility-developer-guide.com/examples/forms/required/#first-approach-using-aria) дополнительные символы от скринридеров через атрибут `aria-hidden="true"`, чтобы они не мешали восприятию.

🛠 Если все поля формы обязательны, лучше укажите это в начале формы, а не добавляйте атрибут к каждому полю.

🛠 Для сложных групп элементов, например радиокнопок или чекбоксов, используйте `aria-required`, а валидацию настроите через JavaScript.




