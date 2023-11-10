---
title: "Асинхронная отправка формы"
description: "Отправляем данные формы без перезагрузки страницы."
authors:
  - fpetrakov
keywords:
  - fetch
  - formdata
  - отправка без перезагрузки
related:
  - js/deal-with-forms
  - html/form
  - js/form-data
tags:
  - article
---

## Задача

Возможно, вы хотите иметь больше контроля над вашей формой: показывать лоадер при отправке данных или обновить интерфейс ещё до получения ответа с сервера. Первым делом нужно отключить дефолтное поведение формы — перезагрузку страницы.

## Готовое решение

```html
<form>
  <label>
    Почта:
    <input type="email" autocomplete="email" name="email" required>
  </label>
  <label>
    Пароль:
    <input type="password" autocomplete="password" name="password" required>
  </label>
  <button type="submit">Войти</button>
</form>
```

```js
const form = document.querySelector("form")
const submitButton = document.querySelector("button")

form.addEventListener("submit", async (event) => {
  // Отключаем дефолтное поведение
  event.preventDefault()
  submitButton.disabled = true

  try {
    showLoader();
    const response = await fetch("/api/login", {
      headers: { "Content-Type": "multipart/form-data" },
      method: "POST"
      body: new FormData(form);
    })
    const result = await response.json()
  } catch (error) {
    showError(error)
  } finally {
    hideLoader()
    submitButton.disabled = false
  }
})

function showLoader() {
  // Показываем пользователю лоадер
}

function hideLoader() {
  // Скрываем лоадер от пользователя
}

function showError() {
  // Показываем пользователю ошибку
}
```

## Разбор решения

Напишем простую формочку c двумя полями: почтой и паролем.

```html
<form>
  <label>
    Почта:
    <input type="email" autocomplete="email" name="email" required>
  </label>
  <label>
    Пароль:
    <input type="password" autocomplete="password" name="password" required>
  </label>
  <button type="submit">Войти</button>
</form>
```

Найдём нашу форму по тегу [`<form>`](/html/form/).

```js
const form = document.querySelector("form")
```

На форму добавим обработчик события [`submit`](/js/event-submit/) и отключим его дефолтное поведение с помощью метода [`preventDefault()`](/js/event-prevent-default/).

```js
form.addEventListener("submit", async (event) => {
  event.preventDefault()
})
```

Теперь наша страница не будет перезагружаться, а мы можем, например, не только отправить запрос, но и показать пользователю лоадер или ошибку.

```js
form.addEventListener("submit", async (event) => {
  event.preventDefault()

  try {
    showLoader()
    const response = await fetch("/api/login", {
      headers: { "Content-Type": "multipart/form-data" },
      method: "POST"
      body: new FormData(form);
    })
    const result = await response.json()
  } catch (error) {
    showError(error)
  } finally {
    hideLoader()
  }
})

function showLoader() {
  // Показываем пользователю лоадер
}

function hideLoader() {
  // Скрываем лоадер от пользователя
}

function showError() {
  // Показываем пользователю ошибку
}
```

Также можно отключить кнопку, пока сервер не пришёл с ответом, чтобы предотвратить повторную отправку формы.

```js
const form = document.querySelector("form")
const submitButton = document.querySelector("button")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  submitButton.disabled = true

  try {
    showLoader();
    const response = await fetch("/api/login", {
      headers: { "Content-Type": "multipart/form-data" },
      method: "POST"
      body: new FormData(form);
    })
    const result = await response.json()
  } catch (error) {
    showError(error)
  } finally {
    hideLoader()
    submitButton.disabled = false
  }
})
```
