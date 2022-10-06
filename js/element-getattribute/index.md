---
title: "`.getAttribute()`"
description: "Получить значение любого HTML-атрибута."
authors:
  - windrushfarer
keywords:
  - атрибуты
related:
  - html/global-attrs
  - js/dom
  - js/element-hidden
tags:
  - doka
---

## Кратко

Метод `getAttribute()` позволяет получить значение указанного [атрибута](/html/global-attrs/) у [HTML-элемента](/js/element/). Если атрибута нет, то метод вернёт [`null`](/js/null-primitive/).

## Как пишется

`getAttribute()` принимает один аргумент – строку с именем атрибута. В ответ метод возвращает значение атрибута в виде строки или `null`, если атрибута нет на элементе.

```html
<script type="application/json" id="hydration"></script>
```

```js
const scriptElement = document.querySelector('script')

console.log(scriptElement.getAttribute('type'))
// 'application/json'
console.log(scriptElement.getAttribute('id'))
// 'hydration'
console.log(scriptElement.getAttribute('class'))
// null
```

## Как понять

Существует множество стандартных HTML-атрибутов, и разработчики могут задавать элементу свои собственные атрибуты. Метод `getAttribute()` является универсальным способом прочитать значение любого атрибута.

Не все атрибуты имеет смысл считывать с помощью  `getAttribute()`. Например, [атрибут `hidden`](/html/hidden/) лучше читать из поля [`hidden`](/js/element-hidden/) DOM-элемента, а дата-атрибуты — из поля [`dataset`](/js/element-dataset/).

Сравним два варианта получения значения атрибута. Возьмём элемент и считаем его атрибуты:

```html
<div data-color="red" hidden>Ошибка!</div>
```

```js
const element = document.querySelector('div')

console.log(element.hidden)
// true
console.log(element.getAttribute('hidden'))
// "" – пустая строка, т.к строкового значения у атрибута нет

console.log(element.dataset.color)
// "red"
console.log(element.getAttribute('data-color'))
// "red"
```
