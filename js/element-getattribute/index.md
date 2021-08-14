---
title: "Element.getAttribute"
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

`Element.getAttribute` принимает один аргумент – строка с именем атрибута. В ответ метод возвращает значение атрибута в виде строки или `null`, если атрибута нет на элементе.

```html
<script type="application/json" id=hydration"></script>
```

```js
const scriptElement = document.querySelector('script')

scriptElement.getAttribute('type') // 'application/json'
scriptElement.getAttribute('id') // 'hydration'
scriptElement.getAttribute('class') // null
```

## Как понять

Существует [большой список](https://www.w3schools.com/tags/ref_attributes.asp) атрибутов для HTML-элементов, но не все атрибуты можно прочитать из объекта [DOM-элемента](/js/element), как например [Element.hidden](js/element-hidden) или [Element.dataset](js/element-dataset). Разработчики так же могут задавать элементу свои собственные атрибуты.

Метод `Element.getAttribute` является универсальным способом прочитать значение любого атрибута.
