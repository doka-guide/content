---
title: "Element.innerText"
name: element-innertext
authors:
  - Windrushfarer
---

## Кратко

Свойство `Element.innerText` позволяет считывать или задавать текстовое содержимое элемента. При считывании текста с элемента будет возвращена строка с текстовым содержимым всех вложенных дочерних элементов. Не будет считываться только содержимое скрытых с помощью CSS элементов, а так же содержимое тегов `<script>` и `<style>`.

Аналогичным функционалом, но с некоторыми отличиями обладает [Element.textContent](/js/doka/element-textcontent).

## Пример
```html
<form>
  <label for='name'>Имя</label>
  <input type="text" id="name" />
  <button type="submit" id="submit">Submit</button>
</form>
```

```js
const form = document.querySelector('form')
const button = document.getElementById('submit')

console.log(form.innerText) // Склеит текст всех потомков и выведет "ИмяSubmit"

button.innerText = 'Done!' // Изменит текст кнопки на Done
// В результате будет: <button type="submit" id="submit">Done</button>
```

<iframe title="Element.innerText" src="demos/index.html"></iframe>

## Как понять

Считывание и изменение текстовое содержимое – довольно распространённая задача. `Element.innerText` позволяет считывать содержимое элемента и всего потомков, но с несколькими исключениями:
- не считывается содержимое тегов `<script>` и `<style>`
- не считывается содержимое скрытых элементов

Свойство может изменять только текстовое содержимое элемента, если попытаться присвоить строку с html, то она вставится как текст и не превратиться в реальные DOM-элементы. Чтобы html в строке сработал лучше использовать [Element.innerHTML](/js/doka/element-innerhtml).

## Как пишется

Свойство `Element.innerText` работает и как геттер, и как сеттер: обращение к свойству вернёт текстовое содержимое элементов и его потомков, а установка нового значения изменит все текстовое содержимое элемента.

Например мы хотим изменить текст в блоке после окончания загрузки

```html
<div id="loading-status">
  Loading...
</div>
```

```js
const statusElement = document.getElementById('loading-status')

statusElement.innerText = 'Data loaded!'
```

В результате в браузер будет отображаться следующий html:

```html
<div id="loading-status">
  Data loaded!
</div>
```

::: callout ❗️

Установка нового текста с помощью `Element.innerText` полностью удалит все старое содержимое и запишет новое текстовое значение. Если внутри элемента были другие вложенные потомки, то все они удалятся.

:::

Предположим, что в блоке статуса загрузки был ещё элемент отображающий иконку-лоадер.

```html
<div id="loading-status">
  <div class="fancy-loader" />
  Loading....
</div>
```

Установка нового значения в `Element.innerText` полностью удалит все предыдущее содержимое и перезапишет его новым текстом.

```js
const statusElement = document.getElementById('loading-status')

statusElement.innerText = 'Error occured!'
```

```html
<!-- Больше никакой иконки внутри, только новый текст -->
<div id="loading-status">
  Error occured!
</div>
```
