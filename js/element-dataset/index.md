---
title: "Element.dataset"
authors:
  - Windrushfarer
keywords:
  - дата-атрибуты
tags:
  - doka
---

## Кратко

`Element.dataset` позволяет считывать или устанавливать любые дата-атрибуты на HTML-элемент.

Дата-атрибут — это пользовательский атрибут на элементе, название которого начинается с `data-`, например `data-testid`. Дата атрибуты используются, чтобы хранить значения на элементах в HTML.

## Как пишется

Обращение к `Element.dataset` вернёт объект со всеми дата-атрибутами, которые есть на элементе. Названиями полей в объекте будут имена дата-атрибутов после префикса `data-`. Например, если атрибут называется `data-columns`, то поле в объекте для этого атрибута будет называться `columns`.

```html
<h1>Известные ситхи</h1>
<ul>
    <li data-id="1541" data-episode="1">Дарт Мол</li>
    <li data-id="9434" data-episode="4">Дарт Вейдер</li>
    <li data-id="5549" data-episode="4">Дарт Сидиус</li>
</ul>
```

```js
const items = document.querySelectorAll("li")

const firstItem = items[0]

firstItem.dataset // Вернет { id: "1541", episode: "1" }
```

Если дата-атрибутов на элементе нет, то вернется пустой объект.

```js
const heading = document.querySelector("h1")

heading.dataset // Вернет пустой объект {}, так как нет дата-атрибутов
```

Чтобы добавить дата-атрибут к элементу, нужно добавить новое поле в объект `Element.dataset`. Название поля так же должно быть без префикса `data-`, браузер автоматически подставит его. В значениях атрибутов в HTML могут быть только строки, потому любое значение будет автоматически приведено к строке.

```js
// Используем тот же HTML из примера выше
const items = document.querySelectorAll("li")

const secondItem = items[1]

secondItem.dataset.side = "evil"
secondItem.dataset.age = 46
secondItem.dataset.lightsaber = { color: 'red' } // Объекты тоже приводятся в строке
```

В результате получим такой элемент:

```html
<li data-id="9434" data-episode="4" data-side="evil" data-age="46" data-lightsaber="[object Object]>Дарт Вейдер</li>
```

Если в `Element.dataset` добавить поле с пустым значением, то в HTML будет создан дата-атрибут без значения.

::: callout ❗️

Если в `Element.dataset` присвоить поле со названием, записанным в `camelCase`, то браузер создаст дата-атрибут в название записанным в `kebab-case`. Однако в самом объекте `Element.dataset` значение будет храниться в `camelCase`.

Это правило работает и в обратную сторону – дата-атрибут в названии которого содержится несколько слов, разделённых дефисом, в `Element.dataset` будет иметь название поля записанным `camelCase` в одно слово.
:::

```html
<ul>
    <li data-candidate-role="junior">Иван Иванов</li>
</ul>
```

```js
const item = document.querySelector("li")

item.dataset // Вернет { candidateRole: "junior" }

item.dataset.yearsOfExperience = 2 // Создаст дата атрибут data-years-of-experience="1"
// Так будет выглядеть HTML
// <li data-candidate-role="junior" data-years-of-experience="1">Иван Иванов</li>
```

Удалить дата-атрибут можно только с помощью оператора `delete`. Если попытаться присвоить к полю значение `undefined` или `null`, то браузер просто присвоит атрибуту строку `"undefined"` или `"null"`.

Возьмем следующий HTML:

```html
<div data-testid="test">Любое содержимое<div>
```

При установке `undefined` в значение дата-атрибута, он не удалится с элемента.

```js
const element = document.querySelector("div")

element.dataset.testid = undefined


// Получится элемент без дата-атрибута <div>Любое содержимое<div>
```

В результате получится следующий HTML:

```html
<div data-testid="undefined">Любое содержимое<div>
```

Если использовать оператор `delete`, то получим элемент без дата-атрибута.

```js
delete element.dataset.testid
```

```html
<div>Любое содержимое<div>
```

`Element.dataset` защищён от перезаписи. Это значит что попытка присвоить в `Element.dataset` новое значение будет проигнорирована.

```js
const element = document.querySelector("div")

// Ничего не произойдет, дата-атрибуты на элементах тоже не изменятся
element.dataset = {}
element.dataset = "string"
```

## Как понять

Дата-атрибуты появились в HTML5 и добавили возможность разработчикам добавлять свои собственные атрибуты к элементам. Причин для использования таких атрибутов можно придумать множество, чаще всего в дата атрибутах хранят нужные значения, которые используют в CSS или JavaScript.

Браузер даёт возможность управлять дата-атрибутами через специальное API `Element.dataset`.
