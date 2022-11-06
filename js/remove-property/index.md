---
title: ".removeProperty()"
description: "Удаляем CSS-свойство у элемента"
authors:
  - bellabzhu
related:
  - js/element-style
  - css/specificity
tags:
  - doka
  - placeholder
---

## Кратко
Метод [`removeProperty()`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/removeProperty) удаляет указанное CSS-свойство у элемента и возвращает значение этого свойства.

## Пример

<iframe title="Демонстрация работы — removeProperty() — Дока" src="demos/index.html" height="270"></iframe>

Превращаем круг в квадрат.

```js
const circle = document.getElementById('round');

function turnToSquare () {
  circle.style.removeProperty('border-radius');
}
```

## Как пишется

`removeProperty()` принимает один аргумент – строку с именем свойства. Пишем названия также, как в CSS: `background-color`, а не `backgroundColor`.

```js
vampire.style.removeProperty('box-shadow');
```

## Как понять

Метод `removeProperty()` позволяет удалить отдельное CSS-свойство элемента.

Чтобы управлять отображением элемента лучше использовать чистый CSS, устанавливая элементу классы-модификаторы с нужным набором стилей.

Но иногда полезно программно изменять CSS-свойства. Например, если в нужный момент установить элементу свойство `will-change`, а потом удалить его, то можно получить выигрыш по производительности.

Если с помощью метода `removeProperty()` не выходит удалить свойство и вы получаете ошибку "NoModificationAllowedError" – значит элемент или его свойство находится в режиме `read-only`.

Есть альтернатива – можно использовать [`style`](js/element-style/) и указать свойству значение "null". Названия в этом случае пишем через _camelCase_:

```js
vampire.style.boxShadow = null;
```
