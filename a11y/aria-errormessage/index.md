---
title: "`aria-errormessage`"
description: "Атрибут, который нужен для описания ошибки при вводе данных."
authors:
  - tatianafokina
contributors:
  - skorobaeus
  - solarrust
related:
  - html/input
  - a11y/aria-invalid
  - a11y/aria-describedby
tags:
  - doka
---

## Кратко

[Свойство связи](/a11y/aria-attrs/#atributy-svyazi) и [виджета](/a11y/aria-attrs/#atributy-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya). Атрибут связывает текст ошибки с элементом, в котором что-то пошло не так.

<aside>

🚧 Поддержка атрибута [пока неполная](https://webaim.org/blog/up-and-coming-aria/). Надёжно его озвучивают JAWS, NVDA и VoiceOver на iOS. В других скринридерах и браузерах возможны пропуски. Проверяйте его на тех [скринридерах](/a11y/screenreaders/), на которые рассчитан сайт.

</aside>

## Пример

```html
<label for="email">
  Ваша почта (обязательно):
</label>
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
></span>
<button class="button button-aqua">
  Отправить
</button>
```

```js
const input = document.getElementById('email')
const error = document.getElementById('error')
const button = document.querySelector('button')

function showError() {
  input.setAttribute('aria-invalid', 'true')
  error.textContent = ''
  setTimeout(() => {
    error.textContent =
      'Поле с почтой обязательно для заполнения.'
  }, 100)
}

function hideError() {
  input.setAttribute('aria-invalid', 'false')
  error.textContent = ''
}

button.addEventListener('click', () => {
  if (input.value === '') {
    showError()
  } else {
    hideError()
  }
})
```

В демке ошибка появляется, если нажать «Отправить» с пустым полем почты.

Перед показом скрипт очищает текст ошибки и через 100 мс вставляет его снова. Так содержимое [живой области](/a11y/live-region/) меняется при каждом нажатии, и скринридер повторяет сообщение.

<iframe title="aria-errormessage для пустого поля" src="demos/field-with-aria-errormessage/" height="400"></iframe>

После нажатия кнопки скринридер сразу прочтёт текст из живой области: «Поле с почтой обязательно для заполнения». Когда пользователь вернётся в поле, скринридер с поддержкой `aria-errormessage` прочтёт примерно так: «Ваша почта обязательно, редактировать, обязательно, неверно. Поле с почтой обязательно для заполнения».

## Как пишется

Добавьте полю атрибут `aria-errormessage` со значением в виде ID. Тот же ID задайте элементу для текста ошибки.

```html
<input
  id="email"
  type="email"
  aria-invalid="false"
  aria-errormessage="error"
>
<span id="error" aria-live="assertive"></span>
```

Атрибут можно задавать только некоторым интерактивным элементам:

- [`<textarea>`](/html/textarea/), [`<input>` с типами](/html/input/#type) `text`, `email`, `tel`, `url` или [роли `textbox`](/a11y/role-textbox/);
- `<input type="checkbox">` или [роли `checkbox`](/a11y/role-checkbox/);
- `<input type="range">` или роли [`slider`](/a11y/role-slider/);
- `<input type="number">` или роли [`spinbutton`](/a11y/role-spinbutton/);
- `<input type="search">` или роли [`searchbox`](/a11y/role-searchbox/);
- [`<select>`](/html/select/) или ролям [`combobox`](/a11y/role-combobox/) и [`listbox`](/a11y/role-listbox/);
- ячейкам с ролью [`gridcell`](/a11y/role-gridcell/), например, [`<td>`](/html/tables/#td) внутри таблицы с ролью [`grid`](/a11y/role-grid/) или [`treegrid`](/a11y/role-treegrid/) (в обычной таблице у `<td>` роль [`cell`](/a11y/role-cell/), и атрибут там не работает);
- ролям [`columnheader`](/a11y/role-columnheader/), [`rowheader`](/a11y/role-rowheader/), [`radiogroup`](/a11y/role-radiogroup/), [`application`](/a11y/role-application/), [`tree`](/a11y/role-tree/), `treegrid` и [`switch`](/a11y/role-switch/).

Обязательно сочетайте `aria-errormessage` с атрибутом [`aria-invalid`](/a11y/aria-invalid/). Браузер передаёт скринридеру связь поля с текстом ошибки, только когда у `aria-invalid` значение не `false`, обычно `true`. Пока значение `false`, элемент для текста ошибки оставляйте пустым.

Чтобы скринридер сразу сообщил об ошибке, добавьте элементу для текста ошибки атрибут [`aria-live`](/a11y/aria-live/) со значением `assertive` или [роль `alert`](/a11y/role-alert/).

Держите этот элемент на странице с самого начала, пустым и без [`display: none`](/css/display/) или [атрибута `hidden`](/html/hidden/). Когда ошибка появится, вставьте в него текст через [`textContent`](/js/element-textcontent/). Скринридеры надёжнее всего сообщают об изменении содержимого живой области, которая уже есть в [дереве доступности](/a11y/a11y-tree/). Если же показать скрытый элемент вместе с текстом, многие связки браузера и скринридера ошибку не озвучат.

Если важно, чтобы ошибку услышали во всех скринридерах, используйте вместо `aria-errormessage` атрибут [`aria-describedby`](/a11y/aria-describedby/). Его поддерживают все популярные скринридеры.

Описание из `aria-describedby` скринридер читает всегда, а не только при `aria-invalid="true"`. Поэтому оставьте элемент для текста ошибки пустым и вставляйте в него текст, только когда ошибка появилась. Скрыть текст через `display: none` не поможет: скринридер всё равно прочитает описание, на которое ссылается `aria-describedby`.

```html
<label for="email">
  Ваша почта (обязательно):
</label>
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
  <!-- Сюда скрипт вставит текст ошибки -->
</span>
```

Не ссылайтесь обоими атрибутами на один элемент: некоторые скринридеры прочтут ошибку дважды.

В черновике ARIA 1.3 в `aria-errormessage` можно перечислить несколько ID через пробел. В действующей ARIA 1.2 значение — один ID, поэтому пока указывайте один.
