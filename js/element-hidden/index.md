---
title: "`.hidden`"
description: "Свойство `hidden` у DOM-элементов позволяет узнать или изменить значение HTML-атрибута `hidden`."
authors:
  - windrushfarer
related:
  - html/hidden
  - js/dom
  - css/display
tags:
  - doka
---

## Кратко

Свойство `hidden` позволяет узнать значение [HTML-атрибута `hidden`](/html/hidden/) или изменить его. Когда `hidden` равен `true`, элемент скрыт на странице и недоступен для [скринридеров](/a11y/screenreaders/).

## Как пишется

Обращение к свойству `hidden` вернёт текущее значение HTML-атрибута `hidden`. Если атрибута нет на элементе, результат будет `false`:

```html
<input type="text" placeholder="Введите почту">
<div class="error" hidden>Неправильная почта</div>
```

```js
const input = document.querySelector('input')
const div = document.querySelector('div')

console.log(input.hidden)
// false
console.log(div.hidden)
// true
```

Присвоение значения в `hidden` изменит значение атрибута. В зависимости от значения элемент скроется или появится. Скроем поле ввода из примера выше:

```js
input.hidden = true
```

В результате у поля ввода появится атрибут `hidden` и элемент скроется:

```html
<input type="email" placeholder="email@example.com" hidden>
```

Если присвоить `false` то атрибут будет удалён с элемента, а сам элемент снова станет видимым:

```js
input.hidden = false
```

## Как понять

HTML-атрибут `hidden` существует давно и работает так же как [`display: none`](/css/display/). Когда атрибут активен, элемент будет не только визуально скрыт, но и не будет занимать место на странице. То есть скрытый элемент будет вести себя так, будто его совсем нет.

Скрывать элементы через `display` можно в CSS или с помощью свойства [`style`](/js/element-style/), но атрибутом `hidden` удобно управлять из JavaScript.

<aside>

❗️ Приоритет CSS-свойства `display` выше, чем у атрибута `hidden`. Если на элементе одновременно установлен атрибут `hidden` и `display: block`, то элемент будет виден.

</aside>
