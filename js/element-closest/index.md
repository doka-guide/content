---
title: "`.closest()`"
description: "Возвращаем ближайший родительский элемент, который соответствует нужному CSS-селектору."
authors:
  - vitya-ne
related:
  - js/query-selector
  - js/element-addeventlistener
  - js/dom
tags:
  - doka
---

## Кратко

Метод `Element.closest()` ищет и возвращает ближайший (начиная с самого элемента) родительский элемент, соответствующий указанному [CSS-селектору](/css/combined-selectors/). Если ни один элемент не соответствует указанному CSS-селектору, возвращается `null`.

## Пример

Для элемента `<div id="25" class="common">` найдём ближайшие родительские элементы, соответствующие селекторам `'.container'` и `'div.common'`:

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

console.log(closestElement2)
// <div id="25" class="common">
```

## Как пишется

`Element.closest()` принимает в качестве аргумента строку с искомым CSS-селектором.

Если строка не является валидным CSS-селектором, произойдёт ошибка «'SyntaxError' DOMException».

`Element.closest()` возвращает [Element](/js/element/), соответствующий указанному CSS-селектору, или `null`, если искомый элемент не был найден.

## Как понять

Метод `Element.closest()` позволяет искать в [DOM](/js/dom/) ближайший подходящий элемент среди родительских, начиная от элемента для которого метод был вызван.

Типичный пример использования `Element.closest()` — определение области действия при клике. Допустим, у нас есть множество кнопок, находящихся во вложенных контейнерах. Необходимо найти ближайший к нажатой кнопке контейнер.

```html
<div class="container main-container">
  <button id="1" class="button">Кнопка 1</button>
  <div class="container parent-container">
    <button id="2" class="button">
      <span class="button-content">Кнопка 2</span>
    </button>
    <div class="container child-container">
      <button id="3" class="button">Кнопка 3</button>
    </div>
  </div>
</div>
```

Для решения задачи достаточно добавить только один обработчик события `click`:

```javascript
const mainContainer = document.querySelector('.main-container')

mainContainer.addEventListener('click', function (e) {
  // Элемент, на котором был выполнен клик
  const targetElem = e.target

  // Определяем был ли выполнен клик
  // на одной из кнопок или внутри её
  const buttonElem = targetElem.closest('.button')

  // Если клик был выполнен вне кнопки, buttonElem === null
  if (buttonElem === null) {
    // Если клик выполнен не на кнопке, ничего не делаем
    e.stopPropagation()
    return
  }

  const containerElem = targetElem.closest('.container')
  // Выводим в консоль контейнер, содержащий нажатую кнопку
  console.log(containerElem)
})
```
