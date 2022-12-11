---
title: "Снежинки"
description: "Добавим на сайт оптимизированные и дешёвые для производительности снежинки."
cover:
  author: kirakusto
  desktop: 'images/covers/desktop.svg'
  mobile: 'images/covers/mobile.svg'
  alt: 'Игрушка «снежный шар» с домиком с флагом Доки'
authors:
  - solarrust
editors:
  - tachisis
tags:
  - article
---

## Задача

В начале 2000-х было очень модно добавлять на сайты падающий снег. Тогда это была нетривиальная задача, она требовала много усилий разработчика и сильно нагружала и без того слабые компьютеры пользователей.

Перед новым 2022 годом я решила добавить снег на сайт, но сделать это при помощи современных технологий и максимально дешёвым для производительности способом. Так, чтобы это умиляло пользователя, но не мешало пользоваться сайтом.

Первым делом я пошла искать готовые решения. Нашла несколько заготовок, но все они были сложными и тяжёлыми. Для простых падающих снежинок подключались целые библиотеки анимации и были написаны сотни строк JavaScript.

Поэтому я решила написать оптимизированный и производительный падающий снег для сайта сама.

## Готовое решение

Поместите HTML-разметку в конец страницы:

```html
<div class="snow">
  <div class="snow__flake">﹡</div>
  <div class="snow__flake">﹡</div>
  <div class="snow__flake">﹡</div>
  <div class="snow__flake">﹡</div>
  <div class="snow__flake">﹡</div>
  …
</div>
```

Кнопки для управления погодой можно разместить в любом удобном месте сайта:

```html
<div class="snow-toggle">
  <label class="snow-toggle__item">
    <input class="snow-toggle__control" type="radio" name="snow" value="snowfall" checked>
    <span class="snow-toggle__text">Снег</span>
  </label>
  <label class="snow-toggle__item">
    <input class="snow-toggle__control" type="radio" name="snow" value="none">
    <span class="snow-toggle__text">Без осадков</span>
  </label>
</div>
```

```css
.snow {
  --animation-name: snowfall;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
}

.snow__flake {
  position: relative;
  top: -1.5em;
  color: #c1dcec;
  animation-name: var(--animation-name);
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  will-change: transform;
}

@keyframes snowfall {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(calc(100vh + 1.5em));
  }
}
```

JS-код должен быть в конце страницы, чтобы загрузка HTML к моменту его выполнения уже закончилась:

```javascript
const storageKey = 'snow'
const snow = document.querySelector('.snow')
const snowflakes = document.querySelectorAll('.snow__flake')
const snowToggle = document.querySelector('.snow-toggle')

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min
}

function getRndFloat(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1)
}

snowflakes.forEach(snowflake => {
  snowflake.style.fontSize = getRndFloat(0.7, 1.5) + 'em'
  snowflake.style.animationDuration = getRndInteger(20, 30) + 's'
  snowflake.style.animationDelay = getRndInteger(-1, snowflakes.length / 2) + 's'
})

function changeSnowAnimation(animationName) {
  snow.style.setProperty('--animation-name',  animationName)
}

snowToggle.addEventListener('change', event => {
  changeSnowAnimation(event.target.value)
  localStorage.setItem(storageKey, event.target.value)
})

document.addEventListener('DOMContentLoaded', () => {
  let currentStorage = localStorage.getItem(storageKey)

  if (currentStorage) {
    snowToggle.querySelector(`.snow-toggle__control[value='${currentStorage}']`).checked = true
  }

  changeSnowAnimation(currentStorage)

  window.addEventListener('storage', () => {
    changeSnowAnimation(localStorage.getItem(storageKey))
  })
})
```

<iframe title="Снег" src="demos/result/" height="450"></iframe>

## Разбор решения

### Разметка

Создадим разметку для снежинок. Понадобится родительский контейнер с классом `snow`. Внутри будут блоки с классом `snow__flake` и символом `﹡` в контенте.

```html
<div class="snow">
  <div class="snow__flake">﹡</div>
  <div class="snow__flake">﹡</div>
  <div class="snow__flake">﹡</div>
  <div class="snow__flake">﹡</div>
  <div class="snow__flake">﹡</div>
  …
</div>
```

Количество блоков выбирайте сами. Хотите ли вы редкие снежинки или густой снегопад. Но имейте в виду, что каждый блок будет дополнительно нагружать браузер. Лучше найти оптимальное количество. Мне хватило 90 блоков.

В качестве снежинок используются текстовые символы `﹡` вместо картинок. Так мы не нагружаем браузер лишними запросами.

Браузер загружает разметку сверху вниз по порядку, блок за блоком. Поскольку снег — чисто декоративный элемент и не должен мешать пользователям или замедлять загрузку страницы, то лучше поместить его в самый конец страницы.

### Стили

Разметка максимально простая. Вся магия заключается в стилях.

Для начала сделаем блок `.snow` флекс-контейнером, чтобы все вложенные блоки встали в один ряд. Используем свойство [`justify-content`](/css/justify-content), чтобы снежинки распределились на всю ширину экрана:

```css
.snow {
  display: flex;
  justify-content: space-between;
}
```

Покрасим снежинки в голубой цвет:

```css
.snow__flake {
  color: #c1dcec;
}
```

Расположим весь блок со снегом поверх страницы при помощи [`position: fixed`](/css/position/) и прижмём ко всем четырём краям окна. Чтобы снег шёл поверх всех блоков, добавим [`z-index: 100`](/css/z-index/):

```css
.snow {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
```

При помощи [`pointer-events: none`](/css/pointer-events/) укажем, что блок со снегом не должен реагировать на какие-либо события:

```css
.snow {
  pointer-events: none;
}
```

Поднимем снежинки чуть выше края экрана. Чтобы не мозолили глаза пользователю, пока не начнут своё движение:

```css
.snow__flake {
  position: relative;
  top: -1.5em;
}
```

### Анимация

Теперь самое интересное! Заставим наш снег падать 😍 Для этого используем [CSS-анимации](/css/animation/). При помощи директивы [`@keyframes`](/css/keyframes) напишем ключевые кадры анимации. Их будет всего два. Назовём нашу анимацию `snowfall`.

```css
@keyframes snowfall {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(calc(100vh + 1.5em));
  }
}
```

Элемент, к которому мы применим эту анимацию, будет при помощи [трансформации](/css/transform) перемещаться по вертикали от верхнего края до 100 единиц [высоты экрана](/css/vw-vh/) и ещё плюс 1.5 em, чтобы снежинки скрывались за нижним краем страницы.

Свойство `transform` является для браузера довольно дешёвым в плане перформанса и минимально затормаживает работу сайта.

Применим анимацию к снежинкам:

```css
.snow__flake {
  animation-name: snowfall;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
```

Заодно зададим свойство [`animation-timing-function`](/css/animation-timing-function/) со значением `ease-in-out`, чтобы снежинки начинали и заканчивали своё падение медленно, а посередине ускорялись.

Свойство [`animation-iteration-count`](/css/animation-iteration-count/) со значением `infinite` означает, что анимация будет повторяться бесконечно.

Пока ничего не происходит. Всё потому, что мы не задали одно из обязательных значений — время проигрывания анимации. Это и ещё несколько действий мы сделаем при помощи JavaScript.

Чтобы браузер заранее подготовил ресурсы для анимации, сообщим ему о том, какое конкретно CSS-свойство будет анимировано. Сделать это можно при помощи свойства `will-change`.

```css
.snow__flake {
  will-change: transform;
}
```

### JavaScript

Чтобы добавить лёгкого рандома и заставить снежинки падать с разной скоростью и разной задержкой, используем JS. Потому что в CSS пришлось бы написать довольно много строк кода для достижения того же результата.

Для начала объявим переменные и найдём все нужные блоки на странице:

```javascript
const snow = document.querySelector('.snow')
const snowflakes = document.querySelectorAll('.snow__flake')
```

Нам понадобятся две функции рандома. Первая будет возвращать целое значение в указанном диапазоне, включая конечные точки:

```javascript
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min
}
```

Вторая будет делать практически то же самое, но вернёт дробное значение с округлением до одного знака после запятой:

```javascript
function getRndFloat(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1)
}
```

Переберём все снежинки при помощи [`forEach`](/js/array-foreach/) и каждой из них зададим время анимации в промежутке между 20 и 30 секундами.

```javascript
snowflakes.forEach(snowflake => {
  snowflake.style.animationDuration = getRndInteger(20, 30) + 's'
})
```

Обратите внимание, что CSS-свойство [`animation-duration`](/css/animation-duration) пишется не через дефис. Это особенность [работы со стилями](/js/element-style/) в JavaScript.

Теперь все снежинки падают с разной скоростью, но начинают своё движение в одно время. Добавим рандомности и в этом. Каждой снежинке пропишем свойство [`animation-delay`](/css/animation-delay/) со значением от -1 до числа, равного количеству блоков со снежинками, делённому на два. Тут можно смело экспериментировать и подбирать разные значения.

```javascript
snowflakes.forEach(snowflake => {
  snowflake.style.animationDuration = getRndInteger(20, 30) + 's'
  snowflake.style.animationDelay = getRndInteger(-1, snowflakes.length / 2) + 's'
})
```

Снежинки падают с разной скоростью и начинают движение в разное время. Добавим снежинкам уникальности и сделаем их разного размера. Поскольку снежинки — текстовые символы, то достаточно поменять размер шрифта у каждой из них. Пусть каждая из снежинок будет размером в промежутке от 0.7 до 1.5 в относительных единицах [`em`](/css/rem-em/). При стандартных настройках браузера и с учётом округления это будет от 11 до 24 пикселей.

```javascript
snowflakes.forEach(snowflake => {
  snowflake.style.fontSize = getRndFloat(0.7, 1.5) + 'em'
  snowflake.style.animationDuration = getRndInteger(20, 30) + 's'
  snowflake.style.animationDelay = getRndInteger(-1, snowflakes.length / 2) + 's'
})
```

Теперь все снежинки разные, падают с разной скоростью и в разное время. Успех!

### Финальный код

```html
<div class="snow">
  <div class="snow__flake">﹡</div>
  <div class="snow__flake">﹡</div>
  <div class="snow__flake">﹡</div>
  <div class="snow__flake">﹡</div>
  <div class="snow__flake">﹡</div>
  …
</div>
```

```css
.snow {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
}

.snow__flake {
  position: relative;
  top: -1.5em;
  color: #c1dcec;
  animation-name: snowfall;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  will-change: transform;
}
```

```javascript
const snow = document.querySelector('.snow')
const snowflakes = document.querySelectorAll('.snow__flake')

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min
}

function getRndFloat(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1)
}

snowflakes.forEach(snowflake => {
  snowflake.style.fontSize = getRndFloat(0.7, 1.5) + 'em'
  snowflake.style.animationDuration = getRndInteger(20, 30) + 's'
  snowflake.style.animationDelay = getRndInteger(-1, snowflakes.length / 2) + 's'
})
```

<iframe title="Снег" src="demos/result-no-toggler/" height="450"></iframe>

В дополнение к этому можно дать пользователю возможность отключать анимацию. Не все любят снег.

### Кнопки управления погодой

Используем в качестве переключателей радио-кнопки. Обязательно обернём их [`<label>`](/html/label/), чтобы кнопки были доступными для пользователей со [скринридерами](/a11y/screenreaders/).

```html
<div class="snow-toggle">
  <label class="snow-toggle__item">
    <input class="snow-toggle__control" type="radio" name="snow" value="snowfall" checked>
    <span class="snow-toggle__text">Снег</span>
  </label>
  <label class="snow-toggle__item">
    <input class="snow-toggle__control" type="radio" name="snow" value="none">
    <span class="snow-toggle__text">Без осадков</span>
  </label>
</div>
```

Чтобы радио-кнопки знали о состоянии друг друга, важно задать им одинаковое значение свойства `name`. Значение свойства `value` тоже важно. Мы будем манипулировать им при помощи JS. По умолчанию снег будет идти, поэтому первой радиокнопке добавим атрибут `checked`.

Стилизовать кнопки можно с учётом дизайна вашего сайта. Куда важнее то, как мы будем выключать и включать анимацию.

Для начала в стилях создадим у блока `.snow` [CSS-переменную](/css/custom-properties) `--animation-name`. Значением по умолчанию будет название нашей анимации — `snowfall`. У снежинок имя анимации заменим на переменную:

```css
.snow {
  --animation-name: snowfall;
}

.snow__flake {
  animation-name: var(--animation-name);
}
```

Таким образом мы элегантно сможем выключать и включать анимацию, меняя значение одной CSS-переменной. Пропишем это поведение в JavaScript:

```javascript
const snowToggle = document.querySelector('.snow-toggle')

function changeSnowAnimation(animationName) {
  snow.style.setProperty('--animation-name',  animationName)
}

snowToggle.addEventListener('change', event => {
  changeSnowAnimation(event.target.value)
})
```

Первым делом объявим константу `snowToggle`, в которую запишем найденный в HTML элемент `.snow-toggle`.

Функция `changeSnowAnimation` принимает в качестве аргумента имя анимации и делает его текущим значением переменной `--animation-name`.

Ниже добавляем обработчик события клика мыши. При клике на любой элемент, вложенный в блок `.snow-toggle`, будет вызываться функция `changeSnowAnimation`. Внутрь функции передаём значение атрибута `value` того элемента, по которому произошёл клик.

Кажется, что всё супер. Снег теперь можно включать и выключать. Но засада в том, что после перехода на другую страницу или после перезагрузки снежинки снова начнут падать. Значит, нужно сохранять куда-то выбранное пользователем состояние.

### Сохраняем выбор

Используем для сохранения [`localStorage`](/js/local-storage). Это позволит сохранять состояние анимации как во время одного сеанса, так и между повторными заходами на сайт. Объявим константу с ключом для нашего хранилища и добавим запись значения для этого ключа в обработчик события клика. Теперь значение атрибута `value` записывается не только в CSS-переменную, но и в локальное хранилище:

```javascript
const storageKey = 'snow'

snowToggle.addEventListener('change', event => {
  changeSnowAnimation(event.target.value)
  localStorage.setItem(storageKey, event.target.value)
})
```

Добавим ещё один обработчик события. На этот раз будем _слушать_ полную загрузку HTML-разметки страницы. После загрузки проверим текущее значение свойства анимации в хранилище. Если пользователь уже заходил на сайт и нажал на одну из кнопок переключателя, то в хранилище будет это записано, и мы включим выбранный режим:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  let currentStorage = localStorage.getItem(storageKey)

  changeSnowAnimation(currentStorage)
})
```

Теперь поменяем состояние радиокнопок переключателей в соответствии с тем, что записано в хранилище. Ищем кнопку с классом `snow-toggle__control` и значением атрибута `value`, совпадающим с текущим значением из хранилища, и задаём ей атрибут `checked` со значением `true`. Технически значение этому атрибуту не нужно, но в JS иначе не получится. Предварительно при помощи [`if`](/js/if-else/) проверим, что значение переменной `currentStorage` не [`undefined`](/js/undefined/):

```javascript
document.addEventListener('DOMContentLoaded', () => {
  let currentStorage = localStorage.getItem(storageKey)

  if (currentStorage) {
    snowToggle.querySelector(`.snow-toggle__control[value='${currentStorage}']`).checked = true
  }

  changeSnowAnimation(currentStorage)
})
```

Последний шаг. Добавим обработчик события на изменение записей в локальном хранилище. Как только запись меняется, сразу вызывается функция изменения анимации, передавая в неё текущее значение из хранилища:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  let currentStorage = localStorage.getItem(storageKey)

  if (currentStorage) {
    snowToggle.querySelector(`.snow-toggle__control[value='${currentStorage}']`).checked = true
  }

  changeSnowAnimation(currentStorage)

  window.addEventListener('storage', () => {
    changeSnowAnimation(localStorage.getItem(storageKey))
  })
})
```

### Финальный код с переключателями

```html
<div class="snow">
  <div class="snow__flake">﹡</div>
  <div class="snow__flake">﹡</div>
  <div class="snow__flake">﹡</div>
  <div class="snow__flake">﹡</div>
  <div class="snow__flake">﹡</div>
  …
</div>

<div class="snow-toggle">
  <label class="snow-toggle__item">
    <input class="snow-toggle__control" type="radio" name="snow" value="snowfall" checked>
    <span class="snow-toggle__text">Снег</span>
  </label>
  <label class="snow-toggle__item">
    <input class="snow-toggle__control" type="radio" name="snow" value="none">
    <span class="snow-toggle__text">Без осадков</span>
  </label>
</div>
```

```css
.snow {
  --animation-name: snowfall;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
}

.snow__flake {
  position: relative;
  top: -1.5em;
  color: #c1dcec;
  animation-name: var(--animation-name);
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  will-change: transform;
}

@keyframes snowfall {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(calc(100vh + 1.5em));
  }
}
```

```javascript
const storageKey = 'snow'
const snow = document.querySelector('.snow')
const snowflakes = document.querySelectorAll('.snow__flake')
const snowToggle = document.querySelector('.snow-toggle')

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min
}

function getRndFloat(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1)
}

snowflakes.forEach(snowflake => {
  snowflake.style.fontSize = getRndFloat(0.7, 1.5) + 'em'
  snowflake.style.animationDuration = getRndInteger(20, 30) + 's'
  snowflake.style.animationDelay = getRndInteger(-1, snowflakes.length / 2) + 's'
})

function changeSnowAnimation(animationName) {
  snow.style.setProperty('--animation-name',  animationName)
}

snowToggle.addEventListener('change', event => {
  changeSnowAnimation(event.target.value)
  localStorage.setItem(storageKey, event.target.value)
})

document.addEventListener('DOMContentLoaded', () => {
  let currentStorage = localStorage.getItem(storageKey)

  if (currentStorage) {
    snowToggle.querySelector(`.snow-toggle__control[value='${currentStorage}']`).checked = true
  }

  changeSnowAnimation(currentStorage)

  window.addEventListener('storage', () => {
    changeSnowAnimation(localStorage.getItem(storageKey))
  })
})
```

<iframe title="Снег" src="demos/result/" height="450"></iframe>
