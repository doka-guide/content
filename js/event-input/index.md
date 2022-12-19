---
title: "input"
description: "`Input` - событие, срабатывающее каждый раз при изменении значения."
authors:
  - tarahovmaksim
related:
  - html/input
  - html/form
tags:
  - doka
  - placeholder
---

## Кратко

Событие `input` возникает, когда пользователь печатает текст в поле для ввода. Оно срабатывает при добавлении или удалении каждого символа и при вставке скопированного текста.

## Пример

```js
<input type="text" id="input"> oninput: <span id="result"></span>
<script>
  input.oninput = function() {
    result.innerHTML = input.value;
  };
</script>
```
<iframe title="Пример работы input" src="demos/index.html" height="40px"></iframe>

## Как пишется

```js
const textInput = document.querySelector('input[type=text]');

function callback(evt) {
  console.log(`Произошло событие ${evt.type}`);
}

textInput.addEventListener('input', callback);

/* Если теперь ввести в текстовое поле
  слово «Дока» и щёлкнуть вне этого поля,
  в консоли будут показаны сообщения:

  4 раза: Произошло событие input
*/
```

## Как понять

События `input` и `change` позволяют отслеживать изменения в полях форм и не только.
Эти события очень похожи. Для всех полей ввода, кроме текстовых, они работают одинаково – происходят при любом изменении значения в поле:
```js
const checkbox = document.querySelector('input[type=checkbox]');

function callback(evt) {
  // в свойстве evt.type хранится тип события
  console.log(`Произошло событие ${evt.type}`);
}

checkbox.addEventListener('input', callback);
// Произошло событие input

checkbox.addEventListener('change', callback);
// Произошло событие change
```

А для текстовых полей по-разному:
`input` — срабатывает при вводе или удалении каждого символа,
`change` — только когда значение изменилось и пользователь перешёл к другому элементу формы.

Событие `input` подойдёт если мы хотим обрабатывать все изменения в поле. A вот если значение в поле не изменилось, то событие `input` не произойдёт. Например, нажатия клавиш ⇦, ⇨ при фокусе на текстовом поле не вызовут это событие.

