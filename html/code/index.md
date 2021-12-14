---
title: "`<code>`"
authors:
  - xpleesid
keywords:
  - код
tags:
  - doka
---

## Кратко

Тег `<code>` используется для вывода фрагментов программного кода.

## Как пишется

```html
<code>
  const element = document.getElementById('#some-id');
</code>
```

<iframe title="Базовый пример" src="demos/basic/" height="100"></iframe>

## Как понять

`<code>` используется для вывода любой информации, которая может быть обработана компьютером как программный код. Помимо непосредственно кода, сюда также относятся названия файлов, конфигурационные файлы, XML-элементы и т. д.

Тег `<code>` по умолчанию строчный и браузеры не применяют к тексту внутри него никакого форматирования, кроме `font-family: monospace;`, и не подсвечивают синтаксис. Они не анализируют содержимое и не делают никаких предположений, на каком языке программирования написан вставленный код.

## Подсветка синтаксиса

Если мы хотим красивого форматирования и подсветки синтаксиса, мы должны использовать сторонние инструменты и дополнительно пометить код, например, при помощи атрибута [`class`](/html/class/). Для этого обычно используются библиотеки, такие как [highlight.js](https://highlightjs.org/) и [prism.js](https://prismjs.com/).

Например, они генерируют HTML приблизительно такого вида:

```html
<code class="block-code__highlight">
  <span class="token keyword">const</span>
  element
  <span class="token operator">=</span>
  <span class="token dom variable">document</span>
  <span class="token punctuation">.</span>
  <span class="token method function property-access">getElementById</span>
  <span class="token punctuation">(</span>
  <span class="token string">'#some-id'</span>
  <span class="token punctuation">)</span>
</code>
```

А пользователи его увидят вот так:

```js
const element = document.getElementById('#some-id')
```

Этот пример кода был обёрнут в теги [`<pre>`](/html/pre/) и `<code>` (вы можете проверить это, выбрав фрагмент в инспекторе элементов), а подсветку синтаксиса обеспечила библиотека prism.js.
