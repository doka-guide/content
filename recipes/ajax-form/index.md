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

```htmkl
<form>
  <label>
    Почта:
    <input type="email" autocomplete="email" name="email" required>
  </label>
  <label>
    Пароль:
    <input type="password" name="password" required>
  </label>
  <button type="submit">Войти</button>
</form>
```

```js
const form = document.querySelector("form")
const submitButton = document.querySelector("button")

if (form) {
  form.addEventListener("submit", handleFormSubmit)
}

async function handleFormSubmit(event) {
  // Отключаем дефолтное поведение
  event.preventDefault()
  disableButton()

  try {
    showLoader();
    const response = await fetch("/api/login", {
      method: "POST",
      body: new FormData(form)
    })
    const result = await response.json()
  } catch (error) {
    showError(error)
  } finally {
    hideLoader()
    enableButton()
  }
}

function disableButton() {
  if (submitButton) submitButton.disabled = true
}

function enableButton() {
  if (submitButton) submitButton.disabled = false
}

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
    <input type="password" name="password" required>
  </label>
  <button type="submit">Войти</button>
</form>
```

Найдём нашу форму по тегу [`<form>`](/html/form/).

```js
const form = document.querySelector("form")
```

На форму добавим обработчик события [`submit`](/js/event-submit/) и отключим дефолтное поведение события с помощью метода [`preventDefault()`](/js/event-prevent-default/).

```js
if (form) {
  form.addEventListener("submit", handleFormSubmit)
}

async function handleFormSubmit(event) {
  event.preventDefault()
}
```

Теперь наша страница не будет перезагружаться, а мы можем, например, не только отправить запрос, но и показать пользователю лоадер или ошибку.

```js
async function handleFormSubmit(event) {
  // Отключаем дефолтное поведение
  event.preventDefault()

  try {
    showLoader();
    const response = await fetch("/api/login", {
      headers: { "Content-Type": "multipart/form-data" },
      method: "POST",
      body: new FormData(form)
    })
    const result = await response.json()
  } catch (error) {
    showError(error)
  } finally {
    hideLoader()
  }
}

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
async function handleFormSubmit(event) {
  // Отключаем дефолтное поведение
  event.preventDefault()
  disableButton()

  try {
    showLoader();
    const response = await fetch("/api/login", {
      headers: { "Content-Type": "multipart/form-data" },
      method: "POST",
      body: new FormData(form)
    })
    const result = await response.json()
  } catch (error) {
    showError(error)
  } finally {
    hideLoader()
    enableButton()
  }
}

function disableButton() {
  if (submitButton) submitButton.disabled = true
}

function enableButton() {
  if (submitButton) submitButton.disabled = false
}
```
