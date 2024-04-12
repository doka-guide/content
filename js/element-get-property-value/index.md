---
title: ".getPropertyValue()"
description: "Получаем строку с CSS-свойством элемента."
authors:
  - madey-kv
related:
  - js/element-classlist
  - js/element
  - js/element-closest
tags:
  - doka
  - placeholder
---

## Кратко

Метод `getPropertyValue()` возвращает строку, в которой записано значение указанного CSS-свойства. Если свойство не указано, возвращает пустую строку.

## Как пишется

```js
element.getPropertyValue('value')
```

## Пример

Создадим блочный элемент размером 100 на 200 пикселей.

```html
<div class="block"></div>
```

```css
.block {
  background-color: aqua;
  width: 100px;
  height: 200px;
}
```

Запишем ширину элемента в переменную и выведем её на экран:

```js
const block = document.querySelector('.block')
// Получаем все стили элемента
const styles = window.getComputedStyle(block)
const width = styles.getPropertyValue('width')

console.log(width)
// 100px
```
