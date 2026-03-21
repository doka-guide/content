---
title: ".removeProperty()"
description: "Удаляем CSS-свойство у элемента."
authors:
  - bellabzhu
  - kiryshka1922
related:
  - js/element-style
  - js/css-style-declaration
  - /js/element-classlist/
tags:
  - doka
  - placeholder
---

## Кратко

Метод [`removeProperty()`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/removeProperty) позволяет удалить определенное CSS-свойство у элемента, возвращая его к значению по умолчанию или удаляя его полностью из стиля элемента.

## Пример

<iframe title="Демонстрация работы метода" src="demos/index.html" height="270"></iframe>

Превращаем круг в квадрат.

```js
const circle = document.getElementById('round')

function turnToSquare () {
  circle.style.removeProperty('border-radius')
}
```

## Как пишется

`removeProperty()` принимает один аргумент — строку с именем свойства. Пишем названия так же, как в CSS: `background-color`, а не `backgroundColor`.

Метод возвращает строку со старым значением удаленного свойства. Если свойство не было установлено, метод вернёт пустую строку `''`.
```js
vampire.style.removeProperty('box-shadow')
```

## Как понять

Метод `removeProperty()` удаляет отдельное CSS-свойство элемента. Доступен метод в интерфейсе [CSSStyleDeclaration]("js/css-style-declaration/").

### Инлайн-стили и вычисленные стили

Удалить свойство получится только для `inline` стилей. Для вычисленных стилей выбрасывается ошибка `NoModificationAllowedError`, потому что свойство элемента находится в режиме `read-only`, и изменять их напрямую не получится.

```js
const circle = document.getElementById('round')
// ❌ Так работать не будет
window.getComputedStyle(circle).removeProperty('border-radius')
```

Однако удалять свойства из таблиц стилей всё же можно, обратившись к CSSRule
```js
const circle = document.getElementById('round')
// ✅ Так работать будет
const declaration = document.styleSheets[0].cssRules[1].style;
declaration.removeProperty('border-radius')
```

Один из полезных сценариев использования `removeProperty()` — управление подсказками для браузера с помощью свойства `will-change`:

```js
const animatedElement = document.getElementById('animated')

function startAnimation() {
  // Подсказываем браузеру, что свойство transform будет анимироваться
  animatedElement.style.willChange = 'transform'
  
  // Запускаем анимацию
  animatedElement.classList.add('animate')
  
  // После завершения анимации удаляем подсказку, чтобы освободить память
  setTimeout(() => {
    animatedElement.style.removeProperty('will-change')
  }, 1000)
}
```

Есть альтернатива — можно использовать [`style`](/js/element-style/) и указать свойству значение `null`. Названия в этом случае пишем через _camelCase_:

Чтобы управлять отображением элемента и менять вычисленные стили, лучше использовать другой подход, устанавливая элементу классы-модификаторы с нужным набором стилей. Для этого можно использовать [ClassList](/js/element-classlist/)

```js
vampire.style.boxShadow = null
```
