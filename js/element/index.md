---
title: "`Element`"
description: "Теги HTML превращаются в элементы JavaScript, чтобы их можно было потрогать из кода."
authors:
  - nlopin
contributors:
  - furtivite
  - skorobaeus
related:
  - js/bom
  - js/element-positioning-js
  - tools/web-server
tags:
  - doka
---

## Кратко

Элемент — это кусочек HTML в [DOM-дереве](/js/dom/#iz-chego-sostoit-dom). Браузер создаёт DOM для взаимодействия между JavaScript и HTML. Каждый HTML-тег при этом превращается в элемент DOM. Ещё такие элементы называют _узлами_.

Из DOM можно получить элемент и изменить его. Браузер заметит изменения и отобразит их на странице.

## Как пишется

Например, можно поменять выравнивание у элемента `h1`:

```js
// Получаем элемент из DOM
const element = document.getElementsByTagName('h1')[0]

// После выполнения этого кода h1 выравнивает текст по центру
element.align = 'center'

// Меняем цвет шрифта на красный
element.style.color = 'red'
```

## Как понять

HTML-элементы содержат свойства, которые можно разделить на группы:

- свойства, связанные с HTML-атрибутами: ID, классы, стили и так далее;
- свойства и методы связанные с обходом DOM: получение дочерних элементов, родителя, соседей;
- информация о содержимом;
- специфические свойства элемента.

Первые три группы свойств есть у всех элементов. Специфические свойства отличаются в зависимости от типа элемента. Например, у полей ввода есть свойства, которых нет у параграфов и блоков: `value`, `type` и другие.

### Свойства, связанные с HTML-атрибутами

Читать и записывать значения HTML-атрибутов можно при помощи свойств элемента. Название обычно совпадает с названием атрибута.

`id` — получить идентификатор элемента.

`className` — список классов в HTML-атрибуте [`class`](/html/class/).

```js
const element = document.getElementsByTagName('div')[0]

// Напечатать список классов в консоль
console.log(element.className)

// Установить свой класс
element.className = 'hacked'
```

[`style`](/js/element-style/) — добавить стили. Стили добавляются так же с помощью свойств. Свойства именуются по аналогии с CSS-свойствами:

```js
const element = document.getElementsByTagName('div')[0]

// CSS-свойство background-color
element.style.backgroundColor = 'beige'

// CSS-свойство color
element.style.color = 'gray'

// CSS-свойство margin-top
element.style.marginTop = '20px'
```

### Свойства и методы, связанные с DOM

- `children` — список дочерних элементов;
- `parentElement` — получить родительский элемент;
- `nextElementSibling` и `previousElementSibling` — получить следующий или предыдущий узел-сосед.

<iframe title="Окружение DOM-элементов" src="demos/dom/" height="400"></iframe>

- [`getElementsByClassName()`](/js/getelementsbyclassname/) — поиск среди дочерних элементов по названию класса;
- [`getElementsByTagName()`](/js/getelementsbytagname/) — поиск среди дочерних элементов по названию тега;
- [`querySelector()`](/js/query-selector/) — поиск первого дочернего элемента, подходящего под CSS-селектор;
- [`querySelectorAll()`](/js/query-selector-all/) — поиск всех дочерних элементов подходящих под CSS-селектор;

С помощью этих свойств и методов можно перемещаться по дереву и даже обойти все его элементы, если это нужно.

### Свойства с информацией о содержимом

[`innerHTML`](/js/element-innerhtml/) — это свойство возвращает HTML-код всего, что вложено в текущий элемент. При записи в это свойство, предыдущее содержимое будет затёрто. Страница отобразит новое содержимое:

```js
const divElement = document.getElementsByTagName('div')[0]
divElement.innerHTML = '<p>Добавлен из кода</p>'
// После выполнения этого кода, на странице
// отобразится параграф с указанным текстом
```

[`outerHTML`](/js/element-outerhtml/) — это свойство возвращает HTML-код текущего элемента и всего, что в него вложено. При записи в это свойство, предыдущее содержимое будет затёрто.
[`textContent`](/js/element-textcontent/) — свойство, возвращает текст всех вложенных узлов без HTML-тегов.

Почувствуй разницу на демо:

<iframe title="Содержимое DOM-элементов" src="demos/dom-html/" height="600"></iframe>
