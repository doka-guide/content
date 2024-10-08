---
title: "Колонка с контентом по центру экрана"
description: "Верстаем колонку с определённой шириной, расположенной по центру экрана."
authors:
  - gartonot
related:
  - recipes/center
  - recipes/multicolor-text
  - recipes/character-counter
tags:
  - article
---

## Задача

Колонка с контентом определённой ширины по центру экрана — частый паттерн в веб-дизайне. В этом рецепте разберём, как и какими способами можно это сделать. Также рассмотрим ситуацию, когда некоторые секции должны быть растянуты на весь экран.

## Термины

`.container` — специальный класс, который ограничивает по ширине и располагает по центру страницы блок с контентом. Стили для этого класса пишутся разработчиком и могут изменяться.

Имя класса может быть любым в зависимости от договорённостей внутри конкретной команды или от привычек верстальщика.

Можно использовать класс в любом нужном месте:

```html
<header class="header">
  <div class="container">
    <h1>Привет, мир!</h1>
  </div>
</header>
```

Стили для класса `container`:

```css
.container {
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
}
```

Значение для [`max-width`](/css/width/) может быть любым, всё зависит от дизайна и от того, насколько нужно ограничить ширину контента.

В примере значение `1024px` служит для ограничения контента, больше чем `1024px` контент не будет растягиваться и выходить за эти рамки, а свойство [`margin`](/css/margin/) расположит блок с контентом по центру экрана по горизонтали.

## Готовое решение

Код для адаптивного сайта. При необходимости меняйте ширину и отступы под свою задачу.

```css
.container {
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 1024px) {
  .container {
    padding-left: 128px;
    padding-right: 128px;
  }
}

@media (max-width: 768px) {
  .container {
    padding-left: 64px;
    padding-right: 64px;
  }
}

@media (max-width: 425px) {
  .container {
    padding-left: 24px;
    padding-right: 24px;
  }
}
```

Пример разметки:

```html
<header class="header">
  <div class="container">
    <!-- Контент -->
  </div>
</header>
<section class="section contacts">
  <div class="container">
    <!-- Контент -->
  </div>
</section>
```

## Разбор решения

Благодаря использованию [`padding`](/css/padding/) на каждой точке перехода, контент внутри `container` не будет прижат к краям страницы, а будет иметь отступ слева и справа.

<iframe title="Адаптивный контейнер" src="demos/container-media/" height="370"></iframe>

При изменении ширины фрейма срабатывает медиавыражение, которое добавляет отступы слева и справа.

## Готовое решение № 2

Так же можно не писать несколько [медиазапросов](/css/media/), а воспользоваться функцией `clamp()` и рассчитывать нужную ширину `.container` для каждой ширины экрана.

В этом примере в первую и третью секции вложен блок с классом `container`, контент в них будет ограничен по ширине и размещён по центру экрана. А во второй секции не будет вложен `.container` и контент будет растянут на всю ширину экрана.

```html
<section class="section-one">
  <div class="container">
    <!-- Контент -->
  </div>
</section>
<section class="section-two">
  <!-- Контент -->
</section>
<section class="section-third">
  <div class="container">
    <!-- Контент -->
  </div>
</section>
```

В стилях используем функцию `clamp()`

```css
.container {
  width: clamp(360px, 90%, 1024px);
  margin-left: auto;
  margin-right: auto;
}
```

## Разбор решения № 2

Код сократился, при этом работает как нужно.

Как именно функция `clamp()` рассчитывает `width`:

- Первый параметр `360px` — задаёт минимальное значение ширины блока;
- Последний параметр `1024px` — задаёт максимальное значение;
- Средний параметр `90%` — применяется в тех случаях, когда нижний или верхний пределы не достигнуты.

<iframe title="Адаптивный контейнер вместе с clamp()" src="demos/container-clamp/" height="530"></iframe>

## Заключение

Подобных утилитарных классов может быть сколько угодно в проекте. Их удобно использовать, когда нужно многократно повторить одинаковое поведение блоков. Достаточно вставить блок с нужным классом в разметку.

Представим «макет» блога, где весь контент расположен в `.container`, а вот текст статей будет ещё меньше основной колонки контента. Обернём его в блок `.wrapper`:

```html
<section class="section">
  <div class="container">
    <h1>Заголовок для блога</h1>
    <div class="wrapper">
      <!-- Текст статьи -->
    </div>
  </div>
</section>
```

Стилизуем любым удобным способом: через [`max-width`](/css/width/) или при помощи функции `clamp()`:

```css
.container {
  width: clamp(360px, 90%, 1024px);
  margin-left: auto;
  margin-right: auto;
}

.wrapper {
  width: clamp(280px, 90%, 768px);
  margin-left: auto;
  margin-right: auto;
}
```

<iframe title="Адаптивный container c дополнительным содержимым" src="demos/container-wrapper/" height="250"></iframe>
