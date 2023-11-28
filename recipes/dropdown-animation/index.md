---
title: "Плавное раскрытие выпадающего меню"
description: "Раскрываем меню без расчёта высоты в JS и знания количества элементов, на чистом CSS."
authors:
  - solarrust
related:
  - css/numeric-types
  - html/button
  - css/transition
tags:
  - doka
---

## Задача

Иногда встречается задача: создать выпадающее меню, которое будет плавно раскрываться. В этом рецепте будет решение на чистом CSS. Вся магия кроется в единицах измерения [`lh`](/css/numeric-types/). Будем менять высоту строки, тем самым добившись эффекта плавного раскрытия меню.

## Готовое решение

Разметка в этой ситуации не играет особой роли. Вы можете адаптировать её под свои конкретные задачи. Возьмём простой вариант с кнопкой и списком ссылок.

```html
<div class="container">
  <button
    class="button"
    aria-expanded="false"
    aria-controls="list"
    >
      Меню
  </button>

  <ul class="menu" id="list">
    <li class="menu-item">
      <a href="#" class="menu-link">Винни-Пух</a>
    </li>
    <li class="menu-item">
      <a href="#" class="menu-link">Тигра</a>
    </li>
    <li class="menu-item">
      <a href="#" class="menu-link">Пятачок</a>
    </li>
  </ul>
</div>
```

Вся магия будет реализована в CSS. Тут готовый код, а полный разбор стилей будет ниже.

```css
.button {
  inline-size: 100%;
  padding: 0.5lh 1.5lh;
  font: inherit;
  color: currentColor;
  background-color: #f28482;
  border: none;
  cursor: pointer;
}

.button:hover,
.button:focus-visible {
  background-color: #f5cac3;
}

.menu {
  position: relative;
  display: grid;
  margin-block-start: 0.5lh;
  background-color: #f28482;

  overflow: hidden;
  line-height: 0;
  color: transparent;
  transition: line-height 0.5s, color 0.5s;
}

.menu-item {
  overflow: hidden;
}

.menu-link {
  display: block;
  padding: 0.5lh 80px;
}

.menu-link:hover,
.menu-link:focus-visible {
  background-color: #f5cac3;
}

.button.active ~ .menu {
  line-height: 1.2;
  color: currentColor;
}
```

JavaScript в этом примере будет только добавлять и удалять класс кнопке по клику или нажатию на <kbd>Enter</kbd>, а ещё менять значения атрибута [`aria-expanded`](/a11y/aria-expanded/).

```js
const button = document.querySelector('.button')

button.addEventListener('click', (e) => {
  e.target.classList.toggle('active')
  e.target.setAttribute(
    'aria-expanded', e.target.classList.contains('active')
    ? 'true'
    : 'false'
  )
})
```

<iframe title="Плавное выпадающее меню" src="demos/final/" height="450"></iframe>

## Разбор решения

Чаще всего, чтобы раскрыть выпадающее меню плавно, используют JavaScript для расчёта конечной высоты элемента. Это нужно, чтобы анимировать переход между `height: 0px` и рассчитанной конечной высотой в пикселях.

Обойдёмся без лишних усилий только CSS и его современными возможностями.

### Разметка

Для начала разберём простую разметку примера. Она может быть какой угодно, в зависимости от решаемой вами задачи.

Это могут быть вложенные списки, `<details>` или любой другой элемент. Для демонстрации нам достаточно кнопки и списка со ссылками, который и будет являться выпадающим меню.

Для раскрытия меню лучше всего использовать кнопку [`<button>`](/html/button/). Браузер «из коробки» поддерживает нужные сценарии взаимодействия с этим интерактивным элементом, а [скринридеры](/a11y/screenreaders/) правильно объявят пользователю, что это кнопка. С семантикой тоже всё в порядке. Создадим кнопку без наворотов, нам понадобиться только класс и два ARIA-атрибута — `aria-expanded` и [`aria-controls`](/a11y/aria-controls/). Благодаря `aria-expanded` вспомогательные технологии расскажут, что список со ссылками свёрнут или развёрнут, а `aria-controls` свяжет для них кнопку и список на уровне разметки.

```html
<button
  class="button"
  aria-expanded="false"
  aria-controls="list"
>
    Меню
</button>
```

Ниже разместим список со ссылками для меню. Важно чтобы кнопка и меню шли в разметке друг за другом, в стилях используется селектор [последующего элемента](/css/combined-selectors/#posleduyushchie-.element1-~-.element2).

```html
<ul class="menu" id="list">
  <li class="menu-item">
    <a href="#" class="menu-link">Винни-Пух</a>
  </li>
  <li class="menu-item">
    <a href="#" class="menu-link">Тигра</a>
  </li>
  <li class="menu-item">
    <a href="#" class="menu-link">Пятачок</a>
  </li>
</ul>
```

Обернём кнопку и меню в общего родителя исключительно в оформительских целях, чтобы разместить элементы по центру страницы. Обёртка не влияет на работу меню.

```html
<div class="container">
  <button
    class="button"
    aria-expanded="false"
    aria-controls="list"
  >
    Меню
  </button>

  <ul class="menu" id="list">
    <li class="menu-item">
      <a href="#" class="menu-link">Винни-Пух</a>
    </li>
    <li class="menu-item">
      <a href="#" class="menu-link">Тигра</a>
    </li>
    <li class="menu-item">
      <a href="#" class="menu-link">Пятачок</a>
    </li>
  </ul>
</div>
```

### JavaScript

Чтобы всё заработало, понадобится пара строк JavaScript-кода. По клику на кнопку к ней должен добавляться класс `.active`, а по второму клику убираться. Конечно, само имя класса можно изменять, но не забудьте поменять его не только в скрипте, но и в стилях. Он важен для работы.

Находим в разметке нужный элемент при помощи [`.querySelector`](/js/query-selector/) и добавляем обработчик события клика с помощью [`.addEventListener`](/js/element-addeventlistener/).

Для переключения класса туда-сюда отлично подходит метод [`classList.toggle()`](/js/element-classlist/#classlist.toggle). А [тернарный оператор](/js/ternary-operator/) поможет переключать значения `aria-expanded` с `true` на `false` и обратно в зависимости от наличия класса у кнопки.

```js
const button = document.querySelector('.button')

button.addEventListener('click', (e) => {
  e.target.classList.toggle('active')
  e.target.setAttribute(
    'aria-expanded', e.target.classList.contains('active')
    ? 'true'
    : 'false'
  )
})
```

### Стили

В текущем решении используем единицу измерения `lh`, которая зависит от текущей высоты строки — свойства [`line-height`](/css/line-height/). В закрытом состоянии у меню будет нулевая высота строки, а в открытом — 1.2.

`1.2` — это значение по умолчанию для этого свойства. Браузер его применит, если не задано другое. Обязательно указывайте для `line-height` именно числовое значение. К сожалению, ключевые слова типа [`initial`](/css/global-keywords/) не дадут нужного эффекта.

Из всех стилей примера для желаемого эффекта важны вот эти строчки:

```css
.menu {
  margin-block-start: 0.5lh;
  overflow: hidden;
  line-height: 0;
  transition: line-height 0.5s;
}

.button.active ~ .menu {
  line-height: 1.2;
}
```

В дефолтном состоянии у `.menu` высота строки равно 0. А если у кнопки `.button` появляется класс `.active`, то следующему за ним `.menu` задаётся высота строки 1.2.

Важно задать для `.menu` [`overflow: hidden`](/css/overflow/), чтобы в закрытом состоянии не был виден текст пунктов меню.

Верхний отступ тоже задан в `lh`, чтобы он плавно вырастал вместе с меню. Но это дело вкуса.

Для плавности используется свойство [`transition`](/css/transition/). С его помощью высота строк меняется не резко, а плавно, за пол секунды.

<iframe title="Плавное выпадающее меню без анимации цвета" src="demos/no-color-transition/" height="450"></iframe>

Сейчас, при закрытии, строки текста наезжают друг на друга и получается грязно. Добавим изменения цвета текста с [`transparent`](/css/web-colors/#transparent) на [`currentColor`](/css/web-colors/#currentcolor) — цвет, заданный родителю. Не забудем указать в свойстве `transition`, что `color` тоже должен меняться за 0.5 секунды. Тогда текст появляется и исчезает плавно вместе с открытием и закрытием меню. Чистота и красота!

```css
.menu {
  margin-block-start: 0.5lh;
  overflow: hidden;
  line-height: 0;
  color: transparent;
  transition: line-height 0.5s, color 0.5s;
}

.button.active ~ .menu {
  line-height: 1.2;
  color: currentColor;
}
```

<iframe title="Плавное выпадающее меню без скрытия" src="demos/final-no-tab/" height="450"></iframe>

### Навигация с клавиатуры

Сейчас, даже если меню закрыто, на ссылки из него можно попасть при помощи <kbd>Tab</kbd>. Это не лучшее поведение. Нужно «скрывать» меню от клавиатурной навигации, не только визуально.

Для этого используем атрибуты [`aria-hidden`](/a11y/aria-hidden/) для `.menu` и [`tabindex`](/html/tabindex/) для каждой ссылки. В закрытом состоянии значения будут `true` и `-1` соответственно. Таким образом скринридеры не зачитают содержимое раскрывающегося меню, а на ссылки нельзя будет попасть с клавиатуры.

В открытом состоянии будем менять значения на `fale` и `0` с помощью JavaScript, делая меню доступным для клавиатуры и скринридеров.

```html
<div class="container">
  <button class="button" aria-expanded="false" aria-controls="list">Меню</button>

  <ul class="menu" id="list" aria-hidden="true">
    <li class="menu-item">
      <a href="#" class="menu-link" tabindex="-1">Винни-Пух</a>
    </li>
    <li class="menu-item">
      <a href="#" class="menu-link" tabindex="-1">Тигра</a>
    </li>
    <li class="menu-item">
      <a href="#" class="menu-link" tabindex="-1">Пятачок</a>
    </li>
  </ul>
</div>
```

```js
const button = document.querySelector('.button')
const menu = document.querySelector('.menu')
const menuLinks = document.querySelectorAll('.menu-link')

button.addEventListener('click', (e) => {
  button.classList.toggle('active')

  if (button.classList.contains('active')) {
    button.setAttribute('aria-expanded', 'true')
    menu.setAttribute('aria-hidden', 'false')
    menuLinks.forEach(link => link.setAttribute('tabindex', '0'))
  } else {
    button.setAttribute('aria-expanded', 'false')
    menu.setAttribute('aria-hidden', 'true')
    menuLinks.forEach(link => link.setAttribute('tabindex', '-1'))
  }
})
```

<iframe title="Плавное выпадающее меню" src="demos/final/" height="450"></iframe>

### Финальный код

```html
<div class="container">
  <button class="button" aria-expanded="false" aria-controls="list">Меню</button>

  <ul class="menu" id="list" aria-hidden="true">
    <li class="menu-item">
      <a href="#" class="menu-link" tabindex="-1">Винни-Пух</a>
    </li>
    <li class="menu-item">
      <a href="#" class="menu-link" tabindex="-1">Тигра</a>
    </li>
    <li class="menu-item">
      <a href="#" class="menu-link" tabindex="-1">Пятачок</a>
    </li>
  </ul>
</div>
```

```css
.button {
  inline-size: 100%;
  padding: 0.5lh 1.5lh;
  font: inherit;
  color: currentColor;
  background-color: #f28482;
  border: none;
  cursor: pointer;
}

.button:hover,
.button:focus-visible {
  background-color: #f5cac3;
}

.menu {
  position: relative;
  display: grid;
  margin-block-start: 0.5lh;
  background-color: #f28482;

  overflow: hidden;
  line-height: 0;
  color: transparent;
  transition: line-height 0.5s, color 0.5s;
}

.menu-item {
  overflow: hidden;
}

.menu-link {
  display: block;
  padding: 0.5lh 80px;
}

.menu-link:hover,
.menu-link:focus-visible {
  background-color: #f5cac3;
}

.button.active ~ .menu {
  line-height: 1.2;
  color: currentColor;
}
```

```js
const button = document.querySelector('.button')
const menu = document.querySelector('.menu')
const menuLinks = document.querySelectorAll('.menu-link')

button.addEventListener('click', (e) => {
  button.classList.toggle('active')

  if (button.classList.contains('active')) {
    button.setAttribute('aria-expanded', 'true')
    menu.setAttribute('aria-hidden', 'false')
    menuLinks.forEach(link => link.setAttribute('tabindex', '0'))
  } else {
    button.setAttribute('aria-expanded', 'false')
    menu.setAttribute('aria-hidden', 'true')
    menuLinks.forEach(link => link.setAttribute('tabindex', '-1'))
  }
})
```

<iframe title="Плавное выпадающее меню" src="demos/final/" height="450"></iframe>
