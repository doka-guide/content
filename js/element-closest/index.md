---
title: "`.closest()`"
description: "Возвращает ближайший родительский элемент в документе соответствующий указанному CSS-селектору."
authors:
  - doka-dog
contributors:
  - vitya-ne
related:
  - js/query-selector/
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

Типичный пример использования `Element.closest()` - определении области действия при клике:

Допустим у нас есть множество кнопок, находящихся во вложенных контейнерах. Необходимо определить контейнер содержащий нажатую кнопку.

```html
<div class="container main-container">
  <button id="1">Кнопка 1</button>
  <div class="container parent-container">
    <button id="2">Кнопка 2</button>
    <div class="container child-container">
      <button id="3">Кнопка 3</button>
    </div>
  </div>
</div>
```

Для решения задачи достаточно добавить только один обработчик события `click`:

```javascript
const mainContainer = document.querySelector('.main-container')

mainContainer.addEventListener('click', function (e) {
  const targetElem = e.target

  if (targetElem.tagName !== 'BUTTON') {
    e.stopPropagation() // если клик выполнен не на кнопке ничего не делаем
    return
  }

  const containerElem = targetElem.closest('.container')
  console.log(containerElem) // отображаем контейнер содержащий нажатую кнопку
})
```
