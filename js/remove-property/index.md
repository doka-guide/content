---
title: "Метод removeProperty()"
description: "Удаляем CSS-свойство у элемента"
authors:
  - bellabzhu
related:
  - js/element-style/
  - css/specificity/
  - js/code-style/
tags:
  - doka
---

## Кратко
Метод [`removeProperty()`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/removeProperty) удаляет указанное CSS-свойство у элемента. Возвращает значение свойства.

## Пример

<iframe title="Демонстрация работы — removeProperty() — Дока" src="demos/index.html" height="180"></iframe>

Представим, что у нас есть круг, которому надо превратиться в квадрат.

```js
const circle = document.getElementById('round');

function turnToSquare () {
  circle.style.removeProperty('border-radius');
}
```

## Как пишется

`removeProperty()` принимает один аргумент – строку с именем свойства. Пишем названия также, как в CSS: 'background-color', а не 'backgroundColor'.

```js
vampire.style.removeProperty('box-shadow');
```

## Как понять

С помощью этого метода можно управлять отображением элементов в «рантайме», то есть во время выполнения скрипта.
В целом для управления стилями лучше использовать CSS. Можно использовать классы-модификаторы, чтобы придавать какие-то наборы стилей элементу. Но бывает, когда изменять стили инлайново становится необходимо.

Если с помощью метода не выходит удалить свойство и вы получаете ошибку "NoModificationAllowedError" - значит элемент или его свойство находится в режиме read-only.

Есть альтернатива - можно использовать [style](js/element-style/) и указать свойству значение "null". Названия в этом случае пишем через camelCase:

```js
vampire.style.boxShadow = null;
```