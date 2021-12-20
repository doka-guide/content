---
title: "`Element.getAttribute()`"
authors:
  - Windrushfarer
keywords:
  - атрибуты
tags:
  - doka
---

## Кратко

Метод `Element.getAttribute` позволяет получить значение указанного атрибута у HTML-элемента. Если атрибута нет, то метод вернёт `null`.

## Как пишется

`Element.getAttribute` принимает один аргумент – строку с именем атрибута. В ответ метод возвращает значение атрибута в виде строки или `null`, если атрибута нет на элементе.

```html
<script type="application/json" id="hydration"></script>
```

```js
const scriptElement = document.querySelector('script')

scriptElement.getAttribute('type')
// 'application/json'
scriptElement.getAttribute('id')
// 'hydration'
scriptElement.getAttribute('class')
// null
```

## Как понять

Существует множество стандартных HTML-атрибутов, и разработчики могут задавать элементу свои собственные атрибуты. Метод `Element.getAttribute` является универсальным способом прочитать значение любого атрибута.

Не все атрибуты имеет смысл считывать с помощью  `Element.getAttribute`. Значения атрибутов, доступные в объекте [DOM-элемента](/js/element/), как например [`Element.hidden`](/js/element-hidden/) или [`Element.dataset`](/js/element-dataset/), лучше считывать из соответствующих полей.

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
