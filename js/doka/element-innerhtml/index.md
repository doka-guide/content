---
title: "Element.innerHTML"
name: element-innerhtml
authors:
  - Windrushfarer
---

## Кратко

Свойство `Element.innerHTML` позволяет считать содержимое элемента в виде html-строки или установить новый html. Новое значение html необходимо передавать в виде строки и оно заменит текущее содержимое элемента. При передаче невалидной html-строки будет выброшена ошибка.

## Пример
```html
<form>
  <label>Логин</label>
  <input type="text" id="login" />
  <div class="error">Введите логин</div>
</form>
```

```js
const form = document.querySelector('.form')

console.log(form.innerHTML)
// Выведет "<label>Логин</label><input type="text" id="login" /><div class="error">Введите логин</div>"

form.innerHTML = '<div class="success">Вход выполнен</div>' // Меняем содержимое новым html
```

HTML после изменения:
```html
<form>
  <div class="success">Вход выполнен</div>
</form>
```

<iframe title="Element.innerHTML" src="demos/index.html"></iframe>

## Как понять

Браузер предоставляет разработчику возможность управлять содержимым на странице и менять его как угодно. `Element.innerHTML` – самый простой способ считать или изменить html-содержимое элемента. Это свойство использует строки, что даёт возможность легко менять и очищать содержимое элементов.

## Как пишется

Обращение к свойству `Element.innerHTML` вернёт html элемента в виде строки. Просмотреть или изменить HTML можно у всех элементов, включая `<html>` и `<body>`. Присвоение нового значения к свойству очистит все текущее содержимое и заменит его новым html.

```js
document.body.innerHTML = '<h1>Hello Inner HTML!<h1>'
```

В результате в документ будет вставлен html:

```html
<h1>Hello Inner HTML!<h1>
```

Если передать в `Element.innerHTML` строку с невалидным html, то будет выброшена ошибка.

::: callout ☝️

Несмотря на то, что с помощью `Element.innerHTML` вставить любой html, есть некоторые ограничения, связанные с [безопасностью веб-приложений](js/articles/web-security). Если вставить в элемент html в котором содержится тег [<script>](/js/doka/script), то он успешно вставится в страницу, но исполнится. Но исполнить вредоносный скрипт возможно и без тега `<script>`, и эти способы получения зловредного кода все-равно сохраняются. Потому в любом случае **не рекомендуется** вставлять с помощью `Element.innerHTML` html из ненадёжных источников. Если нужно просто изменить текст, то для этой задачи лучше подойдут [Element.innerText](/js/doka/element-innertext) или [Element.textContent](/js/doka/element-textcontent).

:::

```js
// Скрипт станет частью body, но не выполнится
document.body.innerHTML = '<script>alert("Мы не смогли вас взломать :(")</script>'

// После вставки в html картинка не загрузится и тогда сработает код из onerror
document.body.innerHTML = '<img src="broken-link" onerror="alert("Теперь вы точно взломаны!")">'
```
