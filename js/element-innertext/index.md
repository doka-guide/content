---
title: "`Element.innerText`"
authors:
  - Windrushfarer
tags:
  - doka
---

## Кратко

Свойство `Element.innerText` позволяет считывать или задавать текстовое содержимое элемента. При считывании текста с элемента будет возвращена строка с текстовым содержимым всех вложенных дочерних элементов. Не будет считываться только содержимое скрытых с помощью CSS элементов, а так же содержимое тегов `<script>` и `<style>`.

Аналогичной функциональностью обладает [Element.textContent](/js/element-textcontent/), но он возвращает содержимое всех дочерних элементов, даже скрытых.

## Пример
```html
<form>
  <label for='name'>Имя</label>
  <input type="text" id="name">
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

<iframe title="Element.innerText — Element.innerText — Дока" src="demos/index/" height="800"></iframe>

## Как понять

Считывание и изменение текстового содержимого – довольно распространённая задача. `Element.innerText` позволяет считывать содержимое элемента и всего потомков, но с несколькими исключениями:
- не считывается содержимое тегов `<script>` и `<style>`
- не считывается содержимое скрытых элементов

Свойство может изменять только текстовое содержимое элемента, если попытаться присвоить строку с HTML, она вставится как текст и не превратится в реальные DOM-элементы. Чтобы HTML в строке сработал, используйте [Element.innerHTML](/js/element-innerhtml/).

## Как пишется

Свойство `Element.innerText` работает и как геттер, и как сеттер — обращение к свойству вернёт текстовое содержимое элементов и его потомков, а установка нового значения изменит все текстовое содержимое элемента.

Например, мы хотим изменить текст в блоке после окончания загрузки:

```html
<div id="loading-status">
  Loading...
</div>
```

```js
const statusElement = document.getElementById('loading-status')

statusElement.innerText = 'Data loaded!'
```

В результате в браузере будет отображаться следующий HTML:

```html
<div id="loading-status">
  Data loaded!
</div>
```

<aside>

❗️ Установка нового текста с помощью `Element.innerText` полностью удалит все старое содержимое и запишет новое текстовое значение. Если внутри элемента были другие вложенные потомки, то все они удалятся.

</aside>

Предположим, что в блоке статуса загрузки был ещё элемент отображающий иконку-лоадер.

```html
<div id="loading-status">
  <div class="fancy-loader"></div>
  Loading....
</div>
```

Установка нового значения в `Element.innerText` полностью удалит все предыдущее содержимое и перезапишет его новым текстом.

```js
const statusElement = document.getElementById('loading-status')

statusElement.innerText = 'Error occurred!'
```

```html
<!-- Больше никакой иконки внутри, только новый текст -->
<div id="loading-status">
  Error occurred!
</div>
```
