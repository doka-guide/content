---
title: "`aria-errormessage`"
description: "Атрибут, который нужен для описания ошибки при вводе данных."
authors:
  - tatianafokina
contributors:
  - skorobaeus
related:
  - html/input
  - a11y/aria-invalid
  - a11y/aria-describedby
tags:
  - doka
---

## Кратко

[Свойство связи](/a11y/aria-attrs/#atributy-svyazi) и [виджета](/a11y/aria-attrs/#atributy-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya). Оно связывает текст ошибки с элементом, в котором что-то пошло не так.

<aside>

🚧 У свойства [нестабильная поддержка](https://a11ysupport.io/tech/aria/aria-errormessage_attribute). С ним пока знакомы только JAWS и Orca.

</aside>

## Пример

```html
<label for="email">Ваша почта (обязательно):</label>
<input
  id="email"
  type="email"
  name="email"
  aria-invalid="false"
  aria-errormessage="error"
  required
>
<span
  class="error-message"
  id="error"
  aria-live="assertive"
>
  Поле с почтой обязательно для заполнения.
</span>
<button class="button button-aqua">
  Отправить
</button>
```

```css
.error-message {
  display: none;
}
```

В демо показываем ошибку, когда поле почты не заполнено и при этом нажата кнопка «Отправить».

<iframe title="aria-errormessage для пустого поля" src="demos/field-with-aria-errormessage/" height="400"></iframe>

[Скринридер](/a11y/screenreaders/) прочтёт ошибку примерно так: «Ваша почта обязательно, редактировать, обязательно, неверно. Поле с почтой обязательно для заполнения».

## Как пишется

Добавьте к тегу `aria-errormessage` со значением в виде ID и свяжите с ним другой тег с текстом ошибки и таким же ID.

Этот атрибут раньше использовали для всех тегов и ролей, но сейчас его можно задавать только некоторым интерактивным элементам:

- [`<textarea>`](/html/textarea/), [`<input>` с типами](/html/input/#type) `text`, `email`, `tel`, `url` или [роли `textbox`](/a11y/role-textbox/).
- [`<input type="checkbox">`](/html/input/#type) или [роли `checkbox`](/a11y/role-checkbox/).
- [`<input type="range">`](/html/input/#type) или роли [`slider`](/a11y/role-slider/).
- [`<input type="number">`](/html/input/#type) или роли [`spinbutton`](/a11y/role-spinbutton/).
- [`<select>`](/html/select/) или ролям [`combobox`](/a11y/role-combobox/) и [`listbox`](/a11y/role-listbox/).
- [`<td>`](/html/tables/#td) и [`<th>`](/html/tables/#th) или роли [`gridcell`](/a11y/role-gridcell/).
- [`radiogroup`](/a11y/role-radiogroup/).
- [`application`](/a11y/role-application/).
- [`tree`](/a11y/role-tree/).

Обязательно сочетайте `aria-errormessage` с другим атрибутом [`aria-invalid`](/a11y/aria-invalid/). Когда у `aria-invalid` значение `false`, текст связанной с элементом ошибки нужно скрыть. Если пользователь неправильно заполнил поле и значение `aria-invalid` стало `true`, стоит показать ошибку всем, включая пользователей скринридеров. С этим поможет JavaScript.

Скрыть ошибку от всех можно с помощью свойства [`display: none`](/css/display/). Другой вариант — добавлять текст ошибки методами из JavaScript. Например, `appendChild()` или `insertAdjacentText()`.

Также не забывайте добавлять для элемента с ошибкой атрибут [`aria-live`](/a11y/aria-live/) со значением `assertive` или [роль `alert`](/a11y/role-alert/). Благодаря им скринридер расскажет об ошибке как только она появится на странице.

Так как текст ошибки из `aria-errormessage` не всегда озвучивается скринридерами, лучше использовать вместо него [`aria-describedby`](/a11y/aria-describedby/). Этот атрибут работает точно так же, но в него можно добавлять любое краткое описание элемента, не только текст ошибки.

```html
<label for="email">Ваша почта (обязательно):</label>
<input
  id="email"
  type="email"
  name="email"
  aria-invalid="false"
  aria-describedby="error"
  required
>
<span
  class="error-message"
  id="error"
  aria-live="assertive"
>
  Поле с почтой обязательно для заполнения.
</span>
```

## Как понять

`aria-errormessage` связывает один элемент с другим, в котором содержится сообщение об ошибке.
