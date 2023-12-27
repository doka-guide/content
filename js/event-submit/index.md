---
title: "`submit`"
description: "Пользователь отправляет форму, а мы реагируем."
authors:
  - inventoris
related:
  - js/element-addeventlistener
  - html/form
  - js/deal-with-forms
tags:
  - doka
---

## Кратко

[Событие](/js/events/) `submit` возникает, когда пользователь отправляет валидную [форму](/html/form/). Если форма невалидна и её нельзя отправить, то и `submit` не будет.

## Как пишется

На `submit` можно [подписаться](/js/element-addeventlistener/) и отреагировать, например, сказать спасибо:

```js
document.addEventListener('submit', function () {
  alert('Спасибо, что заполнили форму!')
})
```

## Как понять

Пользователь может отправить форму (и создать для нас событие `submit`) разными способами. Например, нажать клавишу <kbd>Enter</kbd> внутри поля `<input>` или кликнуть по кнопке `<button>`.

<iframe title="Пример способов возникновения события submit" src="demos/submitting-form/" height="250"></iframe>

Если мы вытащим, например, кнопку `<button>` из формы, то событие `submit` при клике на кнопку уже не произойдёт, потому что связи с формой больше нет. В то же время, нажатие <kbd>Enter</kbd> внутри поля `<input>` будет работать.

```html
<div>
  <form>
    <label for="input-field">Нажмите Enter в поле:</label>
    <input id="input-field" type="text">
  </form>
</div>
<div>
  <button>Или кликните тут</button>
</div>
```

```js
document.addEventListener('submit', function () {
  alert('Случился submit')
})
```

<iframe title="Пример когда событие submit не вызвать" src="demos/button-outside-form/" height="250"></iframe>
