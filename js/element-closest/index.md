---
title: "`.closest()`"
description: "Возвращает ближайший родительский элемент в документе соответствующий указанному CSS-селектору."
authors:
  - doka-dog
contributors:
  - vitya-ne
related:
  - html/article
  - js/element-addeventlistener
  - js/dom
tags:
  - doka
  - placeholder
---

## Кратко

Метод `Element.closest()` ищет и возвращает ближайший (начиная с самого элемента) родительский элемент соответствующий указанному [CSS-селектору](/css/combined-selectors/).
Если ни один элемент не соответствует указанному CSS-селектору возвращается `null`.

## Пример

Для элемента `<div id="25" class="common">` найдём ближайшие родительские элементы соответствующие селекторам: `'.container'` и `'div.common'`:

```html
<article class="container common">
  <header class="container-header container">
    <div id="25" class="common">
      <span class="title">Заголовок</span>
    </div>
  </header>
</article>
```

```javascript
const element = document.querySelector('#25')
const closestElement1 = element.closest('.container')
const closestElement2 = element.closest('div.common')

console.log(closestElement1)
// <header class="container-header container">
console.log(closestElement1)
// <div id="25" class="common">
```

## Как пишется

`Element.closest()` принимает в качестве аргумента строку с искомым CSS-селектором.

Если строка не является валидным CSS-селектором, произойдет ошибка 'SyntaxError' DOMException.

`Element.closest()` возвращает [Element](/js/element/) соответствующий указанному CSS-селектору или `null` если искомый элемент не был найден.

## Как понять

Метод `Element.closest()` позволяет искать в [DOM](/js/dom/) ближайший подходящий элемент среди родительских начиная от элемента для которого метод был вызван.

