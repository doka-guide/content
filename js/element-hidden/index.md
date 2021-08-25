---
title: "Element.hidden"
authors:
  - windrushfarer
tags:
  - doka
---

## Кратко

Свойство `Element.hidden` позволяет узнать значение атрибута `hidden` или изменить его. Когда `Element.hidden` равен `true`, элемент скрыт на странице.

## Как пишется

Обращение к свойству `Element.hidden` вернёт текущее значение атрибута `hidden`. Если атрибута нет на элементе, результат будет `false`.

```html
<input type="text" placholder="Введите почту">
<div class="error" hidden>Неправильная почта</div>
```

```js
const input = document.querySelector('input')
const div = document.querySelector('div')

console.log(input.hidden) // false
console.log(div.hidden) // true
```

Присвоение значения в `Element.hidden` изменит значение атрибута `hidden` и в зависимости от него элемент скроется или, наоборот, появится. Скроем поле ввода из примера выше.

```js
input.hidden = true
```

В результате у поля ввода появится атрибут `hidden` и элемент скроется.

```html
<input type="email" placeholder="email@example.com"> hidden>
```

Если присвоить `false` то атрибут будет удалён с элемента, а сам элемент снова появится.

```js
input.hidden = false
```

## Как понять

Атрибут `hidden` существует очень давно и работает так же как `display: none`. Когда атрибут активен, элемент будет не только визуально скрыт, но и не будет занимать место на странице. То есть будет скрытый элемент будет вести себя так будто его совсем нет.

Скрывать элементы через `diplay` можно в CSS или с помощью атрибута [`style`](/js/element-style/), но атрибутом `hidden` удобно управлять из JavaScript.

::: callout ❗️

CSS свойство `diplay` переопределяет поведение атрибута `hidden`. Если на элементе установлен атрибут `hidden` и одновременно установлен `diplay: block`, то элемент будет виден.

:::


