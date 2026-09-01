---
title: "`form`"
description: "Как добавить ориентир формы на страницу с помощью WAI-ARIA."
authors:
  - tatianafokina
related:
  - html/search
  - a11y/role-search
  - html/form
tags:
  - doka
---

## Кратко

[ARIA-роль ориентира](/a11y/aria-roles/#roli-orientirov), которая определяет область формы. Обычно формы состоят из нескольких полей и кнопки для отправки данных, которые ввёл пользователь.

Роль `form` есть у тега [`<form>`](/html/form/) по умолчанию.

## Пример

```html
<div
  role="form"
  aria-label="Подписка на рассылку"
>
  <label for="email">Электронная почта</label>
  <input
    type="text"
    id="email"
    name="email"
    autocomplete="email"
    spellcheck="false"
  >
  <button>Подписаться</button>
</div>
```

<iframe title="Кастомный ориентир формы" src="demos/custom-form-landmark/" height="320"></iframe>

## Как пишется

В первую очередь используйте HTML-элемент `<form>` вместо явной роли `form`. У тега `<form>` хорошая поддержка браузерами и [скринридерами](/a11y/screenreaders/). Также `<form>` по умолчанию поддерживает необходимые атрибуты и слушает событие `onSubmit`: вам не нужно писать лишний JavaScript.

```html
<form aria-label="Подписка на рассылку">
  <label for="email">Электронная почта</label>
  <input
    type="text"
    id="email"
    name="email"
    autocomplete="email"
    spellcheck="false"
  >
  <button type="submit">Подписаться</button>
</form>
```

<iframe title="Обычная форма" src="demos/native-form-landmark/" height="330"></iframe>

Явная роль понадобится в редких случаях: при вёрстке сложных кастомных компонентов или для поддержки _очень_ старыми браузерами.

Когда задаёте `role="form"` явно, лучше добавлять роль к семантически нейтральным [`<div>`](/html/div/) и [`<span>`](/html/span/). Одно из [правил использования ARIA](/a11y/aria-intro/#pravila-ispolzovaniya) — не перезаписывать роли без необходимости.

Не забудьте _по-настоящему_ отправить данные из формы. Роль, в отличие от HTML-элемента, не умеет слушать браузерные события. Для этого, например, можете использовать метод [`fetch()`](/js/fetch/):

```js
const form = document.getElementById('custom-form')
const input = document.getElementById('email')
const button = document.getElementById('subscribe-btn')

function submitForm(event) {
  event.preventDefault()
  const email = input.value.trim()

  if (email) {
    fetch('/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
  }
}

button.addEventListener('click', submitForm)
```

<iframe title="Кастомный ориентир формы" src="demos/custom-form-landmark/" height="320"></iframe>

Пользователи скринридеров смогут быстро переместиться к форме только в случае, если форма имеет [доступное имя](/a11y/accessible-names-and-descs/). Есть два способа задать имя форме: через атрибуты [`aria-label`](/a11y/aria-label/) и [`aria-labelledby`](/a11y/aria-labelledby/).

Имя из `aria-label` скрыто визуально, но доступно для пользователей вспомогательных технологий и поисковых роботов.

```html
<form
  aria-label="Подписка на рассылку"
>
  <!-- Содержимое формы -->
</div>
```

С помощью `aria-labelledby` с формой связывают видимое имя, например, из заголовка.

```html
<div
  role="form"
  aria-labelledby="subscription"
>
  <h3 id="subscription">
    Подписка на рассылку
  </h3>
  <!-- Остальное содержимое -->
</div>
```

Хотя на странице может быть несколько форм, они не обязательно должны быть ориентирами. Старайтесь называть только формы для ввода важных данных, к которым пользователям скринридеров было бы полезно и необходимо быстро перемещаться.

Для элемента с ролью `form` можно использовать и другие [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy).

## Как понять

Роль `form` создаёт _ориентир_ на странице. Это значит, что пользователи скринридеров могут быстро переместиться к этой части страницы с помощью горячих клавиш или через меню со всеми ориентирами.

## Подсказки

💡 Для области с полем для поиска по сайту используйте [`<search>`](/html/search/) или `role="search"`.

💡 Без `aria-label` или `aria-labelledby` форма не станет ориентиром для пользователей скринридеров.
