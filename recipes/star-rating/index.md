---
title: "Рейтинг «5 звёзд»"
description: "Популярный элемент для оценки по пятибальной шкале на чистом HTML, CSS и JavaScript."
authors:
  - solarrust
related:
  - css/hover
  - js/query-selector
  - css/cascade/
tags:
  - article
---

## Задача

Создать компонент, состоящий из 5 звезд. На любую из звёзд можно кликнуть и все звёзды до неё и она сама станут отмеченными, активными. Если кликнуть на эту звезду второй раз, то все звёзды снова станут неактивными. По наведению курсора на любую звезду все элементы до неё и она сама становятся активными. При этом когда курсор убирается кликнутые звёзды остаются активными.

## Готовое решение

<iframe title="Финальное решение" src="demos/result/" height="400"></iframe>

Разметка:

```html
<fieldset class="star-rating" role="radiogroup" data-rating-value="">
  <legend>Оцените товар:</legend>
  <ul class="stars">
    <li class="star">
      <button><span class="visually-hidden">5 звёзд</span>⭐️</button>
    </li>
    <li class="star">
      <button><span class="visually-hidden">4 звезды</span>⭐️</button>
    </li>
    <li class="star">
      <button><span class="visually-hidden">3 звезды</span>⭐️</button>
    </li>
    <li class="star">
      <button><span class="visually-hidden">2 звезды</span>⭐️</button>
    </li>
    <li class="star">
      <button><span class="visually-hidden">1 звезда</span>⭐️</button>
    </li>
  </ul>
</fieldset>
```

Стили:

```css
button {
  background-color: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  font: inherit;
  padding: 0;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  clip: rect(0 0 0 0);
  overflow: hidden;
}

.star-rating {
  text-align: center;
  border: none;
}

.stars {
  list-style: none;
  display: flex;
  flex-direction: row-reverse;
  gap: 1rem;
  font-size: 5rem;
}

.star {
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.2s;
}

.stars:hover .star {
  opacity: 0.5;
}

.active,
.active ~ .star {
  opacity: 1;
}

.stars .star:hover,
.stars .star:hover ~ .star {
  opacity: 1;
}
```

JavaScript:

```javascript
const rating = document.querySelector('.star-rating')
const stars = document.querySelectorAll('.star')

stars.forEach((star, index) => {
  star.addEventListener('click', (event) => {
    const activeStar = event.currentTarget

    if (activeStar.classList.contains('active')) {
      activeStar.classList.remove('active')
      rating.dataset.ratingValue = ''
    } else {
      stars.forEach(star => star.classList.remove('active'))
      activeStar.classList.add('active')
      rating.dataset.ratingValue = parseInt(activeStar.textContent.trim())
    }
  })
})
```

## HTML

В первую очередь создадим HTML-разметку для рейтинга. Элементы связаны по смыслу, поэтому нужно использовать подходящий семантический тег. Также для нативной поддержки фокуса используем тег [`<button>`](/html/button/). Понадобиться 5 пунктов списка с вложенными кнопками.

Обратите внимание, что элементы идут в разметке в обратном порядке. Это связано с особенностями работы CSS.


```html
<ul class="stars" >
  <li class="star">
    <button>⭐️</button>
  </li>
  <li class="star">
    <button>⭐️</button>
  </li>
  <li class="star">
    <button>⭐️</button>
  </li>
  <li class="star">
    <button>⭐️</button>
  </li>
  <li class="star">
    <button>⭐️</button>
  </li>
</ul>
```

Чтобы скринридеры воспринимали элемент целиком и зачитывали его подпись используем связку [`<fieldset>`](/html/fieldset/) + [`<legend>`](/html/legend/).


```html
<fieldset class="star-rating">
  <legend>Оцените товар:</legend>
  <ul class="stars" >
    <li class="star">
      <button>⭐️</button>
    </li>
    <li class="star">
      <button>⭐️</button>
    </li>
    <li class="star">
      <button>⭐️</button>
    </li>
    <li class="star">
      <button>⭐️</button>
    </li>
    <li class="star">
      <button>⭐️</button>
    </li>
  </ul>
</fieldset>
```

Не забудем добавить скрытый [`<span>`](/html/span/) с классом [`visually-hidden`](/a11y/content-hidden/#klassy-.visually-hidden-.sr-only-.off-screen). Всему элементу добавим роль [`radiogrup`](/a11y/role-radiogroup/) и будем сохранять текущее значение рейтинга в [дата-атрибут](/html/data-attributes/) `data-rating-value`. Если никакая из звёзд не вбрана значение этого атрибута будет пустым.

```html
<fieldset class="star-rating" role="radiogroup" data-rating-value="">
  <legend>Оцените товар:</legend>
  <ul class="stars">
    <li class="star">
      <button><span class="visually-hidden">5 звёзд</span>⭐️</button>
    </li>
    <li class="star">
      <button><span class="visually-hidden">4 звезды</span>⭐️</button>
    </li>
    <li class="star">
      <button><span class="visually-hidden">3 звезды</span>⭐️</button>
    </li>
    <li class="star">
      <button><span class="visually-hidden">2 звезды</span>⭐️</button>
    </li>
    <li class="star">
      <button><span class="visually-hidden">1 звезда</span>⭐️</button>
    </li>
  </ul>
</fieldset>
```

<iframe title="HTML-разметка" src="demos/html/" height="400"></iframe>

Разметка готова, можно переходить к стилям.

## CSS

В стилях будет своя «изюминка», но начнём с простого.

Уберём рамку у `<fieldset>`, сбросим стандартные стили кнопок, сбросим маркеры у списка. Cкроем текст, предназначенный для скринридеров. Поставим звёзды в ряд, зададим между ними отступ и сделаем их большими.

```css
button {
  background-color: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  font: inherit;
  padding: 0;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  clip: rect(0 0 0 0);
  overflow: hidden;
}

.star-rating {
  text-align: center;
  border: none;
}

.stars {
  list-style: none;
  font-size: 5rem;
  display: flex;
  gap: 1rem;
}
```

<iframe title="Базовые стили" src="demos/css-1/" height="400"></iframe>

Теперь сделаем каждую звезду полупрозрачной при помощи [`opacity`](/css/opacity/) и предусмотрим плавное изменение видимости при помощи свойства [`transition`](/css/transition/).

```css
.star {
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.2s;
}
```

При наведении курсора на какую-то из звёзд будем менять её видимость (свойство `opacity`) и видимость всех звёдз, стоящих после неё в разметке, с 0.5 на 1. Потребуется [оператор `~`](/css/combined-selectors/#posleduyushchie-.element1-~-.element2) чтобы выбирать все звёзды, следующие в разметке **после** той, на которую наведён курсор. И про саму звезду, на которую наведён курсор тоже не забудем. [Перечислим](/css/combined-selectors/#gruppirovka-.element1-.element2) эти селекторы через запятую.

```css
.star:hover,
.star:hover ~ .star {
  opacity: 1;
}
```

<iframe title="Стили при наведении курсора" src="demos/css-2/" height="400"></iframe>

Но пока всё работает непривычно, наоборот. Звёзды закрашиваются справа налево, а должны слева направо. Для этого в разметке кнопки поставлены в обратном порядке. Чтобы их можно было перевернуть и получить верный порядок. Для поворота используем свойство [`flex-direction`](/css/flex-direction/) со значением `row-reverse`.

```css
.stars {
  flex-direction: row-reverse;
}
```
<iframe title="Перевёрнутый рейтинг" src="demos/css-3/" height="400"></iframe>

## JavaScript

Теперь нужно реализовать нажатие на звезду. Для этого используем JavaScript.

Найдём и сохраним в [константы](/js/const/) элемент, оборачивающий весь рейтинг и каждую из звёзд. Для этого используем [`.querySelector`](/js/query-selector/) и [`.querySelectorAll`](/js/query-selector-all/) соответственно.

Дальше при помощи метода [`forEach()`](/js/array-foreach/) переберём массив со звёздами и каждой из них добавим слушатель события `click` при помощи метода [`addEventListener`](/js/events/#metod-addeventlistener).

При клике на любую из звёзд запишем её в константу `activeStar`. Пройдёмся по всем звёздам ещё раз чтобы удалить класс `active` с любой из них, где бы он не стоял. Дальше той звезде, по которой кликнули, добавим класс `active`.

```javascript
const rating = document.querySelector('.star-rating')
const stars = document.querySelectorAll('.star')

stars.forEach((star, index) => {
  star.addEventListener('click', (event) => {
    const activeStar = event.currentTarget

    stars.forEach(star => star.classList.remove('active'))
    activeStar.classList.add('active')
  })
})
```

<iframe title="Обработка клика без стилей" src="demos/js-1/" height="400"></iframe>

Если открыть инструменты разработчика для демо выше, то можно увидеть, что при клике на звёздочку у неё появляется класс `active`, но внешне она не меняется. Добавим стили для этого класса и для всех звёзд, стоящих после активной.

```css
.active,
.active ~ .star {
  opacity: 1;
}
```

Теперь при клике все звёзды до и та, по которой был клик становятся яркими.

<iframe title="Обработка клика со стилями" src="demos/js-2/" height="400"></iframe>

Теперь сделаем так, чтобы при повторном клике оценка убиралась и все звёзды снова становились неактивными. Для этого добавим проверку, есть ли класс `active` у звезды на которую кликнули или нет.

Если есть, то убираем его, если нет, то добавляем.

```javascript
const rating = document.querySelector('.star-rating')
const stars = document.querySelectorAll('.star')

stars.forEach((star, index) => {
  star.addEventListener('click', (event) => {
    const activeStar = event.currentTarget

    if (activeStar.classList.contains('active')) {
      activeStar.classList.remove('active')
    } else {
      stars.forEach(star => star.classList.remove('active'))
      activeStar.classList.add('active')
    }
  })
})
```

<iframe title="Обработка клика в обе стороны" src="demos/js-3/" height="400"></iframe>

Добавим пару строк чтобы менялось значение атрибута `data-rating-value` в зависимости от того, какая звезда выбрана. Для этого используем свойство [`.dataset`](/js/element-dataset/) и будем _читать_ значение скрытого текста, доставать оттуда цифру при помощи [`parseInt()`](/js/parseint/).

```javascript
const rating = document.querySelector('.star-rating')
const stars = document.querySelectorAll('.star')

stars.forEach((star, index) => {
  star.addEventListener('click', (event) => {
    const activeStar = event.currentTarget

    if (activeStar.classList.contains('active')) {
      activeStar.classList.remove('active')
      rating.dataset.ratingValue = ''
    } else {
      stars.forEach(star => star.classList.remove('active'))
      activeStar.classList.add('active')
      rating.dataset.ratingValue = parseInt(activeStar.textContent.trim())
    }
  })
})
```

<iframe title="Сохранение рейтинга в дата-атрибут" src="demos/js-4/" height="400"></iframe>

## Ещё немного CSS

Осталось реализовать последнее требование. По наведению курсора на любую звезду все элементы до неё и она сама становятся активными. Это условие должно работать вне зависимости от того, какой рейтинг сейчас выбран.

Для этого немного схитрим и будем делать полупрозрачными все звёзды если курсор находится в пределах родительского блока `.stars`.

```css
.stars:hover .star {
  opacity: 0.5;
}
```

Теперь доработаем правило для [`:hover`](/css/hover/), которе уже было в CSS. Увеличим вес селектора при помощи класса `.stars` в начале и обязательно подвинем его вниз, под предыдущее правило. Это нужно из-за [принципа каскада](/css/cascade/). Иначе правила начнут перебивать друг друга.

```css
.stars .star:hover,
.stars .star:hover ~ .star {
  opacity: 1;
}
```

<iframe title="Ховер при выбраном рейтинге" src="demos/js-css/" height="400"></iframe>

## Финальный код

Разметка:

```html
<fieldset class="star-rating" role="radiogroup" data-rating-value="">
  <legend>Оцените товар:</legend>
  <ul class="stars">
    <li class="star">
      <button><span class="visually-hidden">5 звёзд</span>⭐️</button>
    </li>
    <li class="star">
      <button><span class="visually-hidden">4 звезды</span>⭐️</button>
    </li>
    <li class="star">
      <button><span class="visually-hidden">3 звезды</span>⭐️</button>
    </li>
    <li class="star">
      <button><span class="visually-hidden">2 звезды</span>⭐️</button>
    </li>
    <li class="star">
      <button><span class="visually-hidden">1 звезда</span>⭐️</button>
    </li>
  </ul>
</fieldset>
```

Стили:

```css
button {
  background-color: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  font: inherit;
  padding: 0;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  clip: rect(0 0 0 0);
  overflow: hidden;
}

.star-rating {
  text-align: center;
  border: none;
}

.stars {
  list-style: none;
  display: flex;
  flex-direction: row-reverse;
  gap: 1rem;
  font-size: 5rem;
}

.star {
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.2s;
}

.stars:hover .star {
  opacity: 0.5;
}

.active,
.active ~ .star {
  opacity: 1;
}

.stars .star:hover,
.stars .star:hover ~ .star {
  opacity: 1;
}
```

JavaScript:

```javascript
const rating = document.querySelector('.star-rating')
const stars = document.querySelectorAll('.star')

stars.forEach((star, index) => {
  star.addEventListener('click', (event) => {
    const activeStar = event.currentTarget

    if (activeStar.classList.contains('active')) {
      activeStar.classList.remove('active')
      rating.dataset.ratingValue = ''
    } else {
      stars.forEach(star => star.classList.remove('active'))
      activeStar.classList.add('active')
      rating.dataset.ratingValue = parseInt(activeStar.textContent.trim())
    }
  })
})
```

<iframe title="Финальное решение" src="demos/result/" height="400"></iframe>
