---
title: "Счётчик символов в поле ввода"
description: "Считаем символы при вводе пользователем и не перегружаем браузер."
authors:
  - inventoris
keywords:
  - счётчик
  - подсчёт знаков
  - количество символов
related:
  - html/output
  - js/function-context
  - js/element-addeventlistener
tags:
  - article
---

## Задача

Нередко разработчик хочет знать число символов, которые пользователь вводит. Например, так можно сообщать количество доступных знаков.

Создадим такой счётчик без лишней нагрузки браузера (и человека).

## Готовое решение

В самой простой версии нам нужно поле ввода и вывода:

```html
  <input>
  <output>0</output>
```

Сам счётчик выглядит так:

```js
  const input = document.querySelector('input')
  const output = document.querySelector('output')

  input.addEventListener('input', function () {
    output.textContent = 0 + this.value.length
  })
```

Попробуйте код в демо ниже:

<iframe title="Готовый счётчик" src="demos/result/" height="370"></iframe>

## Разбор решения

В примере счётчик нужен для удобства пользователя, чтобы он видел число символов и не вспоминал про ограничение в семь букв.

### Разметка

Два блока, один с текстом загадки, другой с интерактивными элементами.

В качестве инструмента ввода у нас будет [`<input>`](/html/input/), а счётчик символов положим в [`<output>`](/html/output/). Последний удобно использовать для вывода результатов вычислений, а ещё он хорошо дружит со [скринридерами](/html/screenreaders/):

```html
<div class="riddle">
  <p>Вокруг снег, да лес не белый.</p>
  <p>А какой?</p>
</div>
<div class="solution">
  <label for="answer">Угадайте цвет:</label>
  <input id="answer" placeholder="Семь букв" autocomplete="off">
  <output>0</output>
</div>
```

### Стили

Два блока разместим друг под другом с помощью [`flex-direction: column`](/css/flex-direction/):

```css
body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
}
```

Блок с подсказкой визуально выделим цветом и размером:

```css
.riddle {
  width: 55%;
  padding: 55px 40px;
  background-color: #C56FFF;
}

.riddle p {
  color: #000000;
  font-size: 24px;
  text-align: center;
}
```

А блок с решением подготовим к выводу эмодзи. Они понадобятся для наглядности результатов:

```css
.solution {
  width: 410px;
}

.solution::after {
  content: var(--solution-emoji);
}
```

Лейбл и поле ввода:

```css
label {
  margin-right: 15px;
  font-size: 24px;
  font-weight: 500;
  line-height: 1;
}

input {
  width: 150px;
  border: 1px solid #FFFFFF;
  border-radius: 6px;
  padding: 10px 15px;
  background-color: transparent;
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 300;
  font-family: inherit;
  -webkit-appearance: none;
  appearance: none;
}

input:focus {
  border-color: #C56FFF;
  outline: none;
}
```

Счётчик стилизуем в виде небольшого квадратика со сглаженными углами:

```css
output {
  display: inline-block;
  width: 30px;
  border-radius: 5px;
  background-color: #C56FFF;
  text-align: center;
  margin-left: 10px;
}
```

### JavaScript

Сначала получим блок с результатами для добавления эмодзи. Затем поля ввода и вывода, а также объявим переменную с длиной правильного ответа:

```js
const solution = document.querySelector('.solution')
const input = document.querySelector('input')
const output = document.querySelector('output')
const ANSWER_LENGTH = 7
```

На поле ввода повесим [обработчик событий](/js/element-addeventlistener/) и подпишемся на событие `input`. Оно случится, когда пользователь введёт какие-то данные:

```js
input.addEventListener('input', function () {})
```

Внутри разместим сам счётчик. С помощью [`this`](/js/function-context/) мы получим доступ к объекту события, в нашем случае к `input`. Его значение получим с помощью метода `value`, это и будут символы, которые пользователь введёт.

Методом `length` посчитаем их количество и прибавим к нулю, а с помощью метода [`textContent`](/js/element-textcontent/) разместим число в поле вывода:

```js
input.addEventListener('input', function () {
  output.textContent = 0 + this.value.length
})
```

Для красоты можно добавить изменение стилей на случай правильного ответа или превышения числа символов:

```js
if (this.value.length > ANSWER_LENGTH) {
  output.style.backgroundColor = '#a52a2a'
  solution.style.setProperty('--solution-emoji', '"❌"')
} else {
  output.style.backgroundColor = '#C56FFF'
  solution.style.setProperty('--solution-emoji', '"🔄"')
}

if (/^зел[её]ный$/i.test(this.value)) {
  output.style.backgroundColor = '#41E847'
  solution.style.setProperty('--solution-emoji', '"✅"')
}
```

Когда символов будет больше семи, мы окрасим счётчик в красный и добавим крестик, а если меньше, то вернём голубой цвет и оставим значок загрузки. В случае правильного ответа окрасим счётчик в зелёный 👽 и добавим галочку.

А ещё, чтобы слово «зелёный» проходило проверку в любой форме, используем регулярное выражение и метод `test`, который возвращает `true` при совпадении либо `false`.

Посчитать символы можно и в [`<textarea>`](/html/textarea/), метод работы тот же:

```js
textarea.addEventListener('input', function () {
  output.textContent = 0 + this.value.length
})
```

### Финальный код

```html
<div class="riddle">
  <p>Вокруг снег, да лес не белый.</p>
  <p>А какой?</p>
</div>
<div class="solution">
  <label for="answer">Угадайте цвет:</label>
  <input id="answer" placeholder="Семь букв" autocomplete="off">
  <output>0</output>
</div>
```

```css
body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
}

.riddle {
  width: 55%;
  padding: 55px 40px;
  background-color: #C56FFF;
}

.riddle p {
  color: #000000;
  font-size: 24px;
  text-align: center;
}

.solution {
  width: 410px;
}

.solution::after {
  content: var(--solution-emoji);
}

label {
  margin-right: 15px;
  font-size: 24px;
  font-weight: 500;
  line-height: 1;
}

input {
  width: 150px;
  border: 1px solid #FFFFFF;
  border-radius: 6px;
  padding: 10px 15px;
  background-color: transparent;
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 300;
  font-family: inherit;
  -webkit-appearance: none;
  appearance: none;
}

input:focus {
  border-color: #C56FFF;
  outline: none;
}

output {
  display: inline-block;
  width: 30px;
  border-radius: 5px;
  background-color: #C56FFF;
  text-align: center;
  margin-left: 10px;
}
```

```js
const solution = document.querySelector('.solution')
const input = document.querySelector('input')
const output = document.querySelector('output')
const ANSWER_LENGTH = 7

input.addEventListener('input', function () {
  output.textContent = 0 + this.value.length

  if (this.value.length > ANSWER_LENGTH) {
    output.style.backgroundColor = '#a52a2a'
    solution.style.setProperty('--solution-emoji', '"❌"')
  } else {
    output.style.backgroundColor = '#C56FFF'
    solution.style.setProperty('--solution-emoji', '"🔄"')
  }

  if (/^зел[её]ный$/i.test(this.value)) {
    output.style.backgroundColor = '#41E847'
    solution.style.setProperty('--solution-emoji', '"✅"')
  }
})
```
