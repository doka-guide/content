---
title: ".removeProperty()"
description: "Удаляем CSS-свойство у элемента."
authors:
  - bellabzhu
  - kiryshka1922
related:
  - js/element-style
  - js/css-style-declaration
  - js/element-classlist
tags:
  - doka
---

## Кратко

Метод [`removeProperty()`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/removeProperty) позволяет удалить определённое CSS-свойство у элемента, возвращая его к значению по умолчанию или удаляя его полностью из стиля элемента.

## Пример

<iframe title="Демонстрация работы метода" src="demos/index.html" height="270"></iframe>

Превращаем круг в квадрат:

```js
const circle = document.getElementById('round')

function turnToSquare() {
  circle.style.removeProperty('border-radius')
}
```

## Как пишется

`removeProperty()` принимает один аргумент — строку с именем свойства. Название должно соответствовать CSS-формату **kebab-case**: слова разделяются дефисом, например `background-color`. Верблюжья нотация (`backgroundColor`) не подойдёт. Регистр букв значения не имеет — `BACKGROUND-COLOR` тоже сработает.

Метод возвращает строку со старым значением удалённого свойства. Если свойство не было установлено, метод вернёт пустую строку `''`.
```js
const oldShadow = vampire.style.removeProperty('box-shadow')
console.log(oldShadow) // '0 0 10px rgba(0,0,0,0.5)'
```

## Как понять

Метод `removeProperty()` удаляет отдельное CSS-свойство элемента. Доступен метод в интерфейсе [CSSStyleDeclaration](/js/css-style-declaration/).

Удалить свойство получится только для `inline` стилей. Для `read-only` свойств выбрасывается ошибка `NoModificationAllowedError`, изменять их напрямую не получится.

Например, вычисленные стили (`computed styles`) — это то, что браузер рассчитал, применив все CSS-правила к элементу. Их нельзя изменить напрямую:
```js
const circle = document.getElementById('round')
// ❌ Ошибка! Uncaught NoModificationAllowedError
window.getComputedStyle(circle).removeProperty('border-radius')
```

Однако удалять свойства из таблиц стилей всё же можно, обратившись к CSSRules.

⚠️ **Важно**: этот способ требует точного знания структуры таблиц стилей и может быть ненадёжным в случае подключения новых стилей.
```js
const circle = document.getElementById('round')
// ✅ Так работать будет
const declaration = document.styleSheets[0].cssRules[1].style;
declaration.removeProperty('border-radius')
```

🚀 Один из полезных сценариев использования `removeProperty()` — управление подсказками для браузера с помощью свойства [`will-change`](/css/will-change/):

```js
const animatedElement = document.getElementById('animated')

function startAnimation() {
  // Подсказываем браузеру, что свойство transform будет анимироваться
  animatedElement.style.willChange = 'transform'
  
  // Запускаем анимацию
  animatedElement.classList.add('animate')
  
  // После завершения анимации удаляем подсказку, чтобы освободить память
  // и не занимать ресурсы браузера излишними обещаниями анимации
  setTimeout(() => {
    animatedElement.style.removeProperty('will-change')
  }, 1000)
}
```

Есть альтернатива — можно использовать [`style`](/js/element-style/) и указать свойству значение `null`. Названия в этом случае пишем через _camelCase_:

```js
vampire.style.boxShadow = null
```

Чтобы управлять отображением элемента и менять вычисленные стили, лучше использовать другой подход, устанавливая элементу классы-модификаторы с нужным набором стилей. Для этого можно использовать [ClassList](/js/element-classlist/).
