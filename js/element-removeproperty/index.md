---
title: "`.removeProperty()`"
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

Метод `.removeProperty()` убирает CSS-свойство из инлайн-стиля элемента — оно сбрасывается к значению по умолчанию или к тому, что задано в подключённых стилях.

## Пример

Превращаем круг в квадрат:

```js
const circle = document.getElementById('round')

function turnToSquare() {
  circle.style.removeProperty('border-radius')
}
```

<iframe title="Демонстрация работы метода" src="demos/index.html" height="300"></iframe>

## Как пишется

`.removeProperty()` принимает один аргумент — строку с именем свойства. Название должно соответствовать CSS-формату: [`background-color`](/css/background-color/), а не `backgroundColor`. Регистр букв значения не имеет — `BACKGROUND-COLOR` тоже сработает.

Метод возвращает строку со старым значением удалённого свойства. Если свойство не было установлено, метод вернёт пустую строку `''`.

```js
const oldShadow = vampire.style.removeProperty('box-shadow')
console.log(oldShadow) // '0 0 10px rgb(0 0 0 / 0.5)'
```

## Как понять

Метод `.removeProperty()` удаляет отдельное CSS-свойство элемента. Метод живёт в интерфейсе [CSSStyleDeclaration](/js/css-style-declaration/).

Удалить свойство получится только для инлайн-стилей. Для `read-only` свойств выбрасывается ошибка `NoModificationAllowedError`, изменять их напрямую не получится.

Например, вычисленные стили (_computed styles_) — это то, что браузер рассчитал, применив все CSS-правила к элементу. Их нельзя изменить напрямую:

```js
const circle = document.getElementById('round')
// ❌ Ошибка! Uncaught NoModificationAllowedError
window.getComputedStyle(circle).removeProperty('border-radius')
```

Однако удалять свойства из таблиц стилей всё же можно, обратившись к CSSRules.

<aside>

⚠️ Этот способ требует точного знания структуры таблиц стилей и может быть ненадёжным в случае подключения новых стилей.

</aside>

```js
const circle = document.getElementById('round')
// ✅ Так работать будет
const declaration = document.styleSheets[0].cssRules[1].style;
declaration.removeProperty('border-radius')
```

Один из полезных сценариев использования `.removeProperty()` — управление подсказками для браузера с помощью свойства [`will-change`](/css/will-change/):

```js
const animatedElement = document.getElementById('animated')

function startAnimation() {
  // Подсказываем браузеру, что свойство transform будет анимироваться
  animatedElement.style.willChange = 'transform'

  // Запускаем анимацию
  animatedElement.classList.add('animate')
}

// Когда анимация закончилась, удаляем подсказку — она больше не нужна
animatedElement.addEventListener('animationend', () => {
  animatedElement.style.removeProperty('will-change')
}, { once: true })
```

Есть альтернатива: можно использовать [`style`](/js/element-style/) и указать свойству значение `null`. Названия в этом случае пишем через _camelCase_:

```js
vampire.style.boxShadow = null
```
