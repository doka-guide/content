---
title: "`<code>`"
description: "Тег для оформления программного кода."
authors:
  - xpleesid
keywords:
  - код
related:
  - css/font-family
  - html/comments
  - css/tag-selector
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

Изначально `<code>` предназначен для вывода информации во фразовом контексте. Например, мы можем вставить код в середину предложения.

```html
<p>Пожалуй, <code>i</code> — самое часто встречающееся имя переменной.</p>
```

Если мы хотим вывести блок кода, то нужно дополнительно использовать тег [`<pre>`](/html/pre/) для вывода кода с сохранением форматирования.

```html
<pre><code>
  for(let i = 0; i < 10; i++){
    console.log(i)
  }
</code></pre>
```

## Подсветка синтаксиса

Если мы хотим красивого форматирования и подсветки синтаксиса, мы должны использовать сторонние инструменты и дополнительно пометить код, например, при помощи атрибута [`class`](/html/class/). Для этого обычно используются библиотеки, такие как [highlight.js](https://highlightjs.org/) и [prism.js](https://prismjs.com/).

Например, они генерируют HTML приблизительно такого вида:

```html
<pre class="block-code font-theme font-theme--code" data-lang="html">
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
</pre>
```

А пользователи его увидят вот так:

```js
const element = document.getElementById('#some-id')
```

Этот пример кода был обёрнут в теги [`<pre>`](/html/pre/) и `<code>` (вы можете проверить это, выбрав фрагмент в инспекторе элементов), а подсветку синтаксиса обеспечила библиотека prism.js.
