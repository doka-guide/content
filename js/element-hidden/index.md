---
title: "`Element.hidden`"
description: "Свойство .hidden у DOM-элементов позволяет узнать или изменить значение HTML-атрибута hidden"
authors:
  - windrushfarer
tags:
  - doka
---

## Кратко

Свойство `Element.hidden` позволяет узнать значение HTML-атрибута `hidden` или изменить его. Когда `Element.hidden` равен `true`, элемент скрыт на странице и недоступен для скринридеров.

## Как пишется

Обращение к свойству `Element.hidden` вернёт текущее значение HTML-атрибута `hidden`. Если атрибута нет на элементе, результат будет `false`.

```html
<input type="text" placeholder="Введите почту">
<div class="error" hidden>Неправильная почта</div>
```

```js
const input = document.querySelector('input')
const div = document.querySelector('div')

// false
console.log(input.hidden)
// true
console.log(div.hidden)
```

Присвоение значения в `Element.hidden` изменит значение атрибута `hidden`. В зависимости от него элемент скроется или появится. Скроем поле ввода из примера выше:

```js
input.hidden = true
```

В результате у поля ввода появится атрибут `hidden` и элемент скроется:

```html
<input type="email" placeholder="email@example.com"> hidden>
```

Если присвоить `false` то атрибут будет удалён с элемента, а сам элемент снова появится:

```js
input.hidden = false
```

## Как понять

HTML-атрибут `hidden` существует очень давно и работает так же как `display: none`. Когда атрибут активен, элемент будет не только визуально скрыт, но и не будет занимать место на странице. То есть скрытый элемент будет вести себя так, будто его совсем нет.

Скрывать элементы через `display` можно в CSS или с помощью атрибута [`style`](/js/element-style/), но атрибутом `hidden` удобно управлять из JavaScript.

<aside>

❗️ Приоритет CSS-свойства `display` выше, чем у атрибута `hidden`. Если на элементе одновременно установлен атрибут `hidden` и `display: block`, то элемент будет виден.

</aside>
