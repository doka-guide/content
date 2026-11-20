---
title: "`.classList`"
description: "Динамически читаем, добавляем и удаляем классы у элементов."
baseline:
  - group: dom
    features:
      - api.Element.classList
authors:
  - windrushfarer
contributors:
  - nlopin
keywords:
  - className
related:
  - css/class-selector
  - html/class
  - js/dom
tags:
  - doka
---

## Кратко

Свойство `classList` даёт возможность просматривать и манипулировать [классами](/html/class/) элемента.

## Пример

```js
const button = document.querySelector('button')

// Добавили класс
button.classList.add('active')

// Удалили класс
button.classList.remove('active')

button.classList.contains('active')
// Вернёт false, так как такого класса у элемента нет
```

<iframe title="Как работает .classList" src="demos/Windrushfarer-BaLREeZ/" height="380"></iframe>

## Как понять

Управлять классами элемента — одна из распространённых задач, потому браузеры предоставляют встроенные средства для решения такой задачи. В свойстве `classList` содержится специальный объект, который хранит информацию о текущих классах элемента и содержит методы для работы с ними.

```js
const button = document.querySelector('button')

button.classList.add('active')
console.log(button.classList[0])
// 'active'
```

## Как пишется

У `classList` есть множество методов, но мы рассмотрим только часто используемые.

### `classList.add()`

Этот метод используется для добавления класса к элементу. В качестве аргументов нужно передавать строку с именем класса.

Добавим элементу класс `animate`:

```js
const element = document.querySelector('div')

element.classList.add('animate')
```

Можно так же передать несколько строк-аргументов, тогда добавится несколько классов:

```js
const element = document.querySelector('div')

// Добавятся классы black, fade и animate
element.classList.add('black', 'fade', 'animate')
```

<aside>

💡 Можно не бояться, что один и тот же класс добавится два раза. Если вызвать метод `add()` и передать уже существующий класс, то он не добавится второй раз.

</aside>

```js
const element = document.querySelector('div.header')

// Добавится только animate, так как header уже есть на элементе
element.classList.add('header', 'animate')
```

### `classList.remove()`

Метод используется для удаления класса у элемента. В качестве аргумента нужно передавать строку с именем класса.

Предположим, что кнопке назначен единственный класс `submit`:

```js
const button = document.querySelector('button.submit')

// Убираем класс
button.classList.remove('submit')

console.log(button.classList[0])
// undefined
```

В `remove()` можно передать несколько аргументов и удалится несколько классов

Предположим что в HTML есть элемент `<div class="banner hidden animated">...</div>`:

```js
const elem = document.querySelector('div.banner')

// Убираем классы hidden и animated
button.classList.remove('hidden', 'animated')
```

### `classList.replace()`

Метод позволяет заменить одно значение класса другим. Метод принимает 2 параметра:

- название класса, который нужно заменить;
- название класса, на что нужно заменить.

После выполнения `replace()` возвращает [boolean-значение](/js/boolean/), которые сообщает нам об успешности операции:

- `true` если класс был заменён;
- `false` если ничего не изменилось.

```js
// На кнопке есть класс hidden
const button = document.querySelector('button.hidden')

// Заменяем класс hidden на visible
const result = button.classList.replace('hidden', 'visible')
console.log(result)
// true, класс успешно заменился на visible

// Попробуем заменить ещё раз
const resultAgain = button.classList.replace('hidden', 'visible')
console.log(result)
// false, потому что ничего не изменилось
```

### `classList.toggle()`

Метод можно использовать, чтобы включать или выключать класс. Если при вызове `toggle()` переданный класс уже есть на элементе, то он будет убран. Если класса не было — то добавлен.

```js
// На кнопке есть класс hidden
const button = document.querySelector('button.hidden')

// Так как класс есть, он будет убран
button.classList.toggle('hidden')

// А при повторном вызове будет снова добавлен
button.classList.toggle('hidden')
```

Метод `toggle()` принимает только один класс для переключения. Опционально вторым аргументом можно передать boolean-значение: метод будет работать как `add()`, если передать `true`, и как `remove()`, если передать `false`.

```js
// На кнопке есть класс submit
const button = document.querySelector('button.submit')

// Передаём вторым аргументом false, и будет работать как remove()
button.classList.toggle('submit', false)
console.log(button.classList[0])
// undefined, потому что класса больше нет

// Передаём true, и теперь класс добавится
button.classList.toggle('submit', true)
```

### `classList.contains()`

Метод позволяет проверить наличие класса у элемента. Метод принимает один параметр — [строку](/js/string/) с названием класса, наличие которого нужно проверить.

Метод `contains()` вернёт `true`, если класс есть, и `false`, если класса нет.

```js
// На кнопке есть класс hidden, найдём эту кнопку
const button = document.querySelector('button.hidden')

// Проверим, есть ли класс visible на кнопке
const isVisible = button.classList.contains('visible')
console.log(isVisible)
// false, класс 'visible' у кнопки отсутствует

// Проверим, есть ли класс hidden на кнопке
const isHidden = button.classList.contains('hidden')
console.log(isHidden)
// true, класс 'hidden' у кнопки присутствует
```

### Имена классов

<aside>

☝️ Классом не может быть строка, содержащая пробелы. При попытке передать в аргументах такую строку, будет выброшена ошибка. Это правило касается любого метода в `classList`.

</aside>

```js
const element = document.querySelector('div')

element.classList.add('my awesome class')
// Ошибка: Uncaught DOMException: String
// contains an invalid character
```
