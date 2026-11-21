---
title: "`@container`"
description: "Контейнерные запросы: применяем стили по размерам, стилям и состоянию ближайшего контейнера, а не вьюпорта."
baseline:
  - group: container-queries
    features:
      - api.CSSContainerRule
      - api.CSSContainerRule.containerName
      - api.CSSContainerRule.containerQuery
      - css.at-rules.container
      - css.properties.container
      - css.properties.container-name
      - css.properties.container-name.none
      - css.properties.container-type
      - css.properties.container-type.inline-size
      - css.properties.container-type.normal
      - css.properties.container-type.size
      - css.types.length.container_query_length_units
  - group: container-name-queries
    features:
      - css.at-rules.container.container-query_optional
  - group: container-style-queries
    features:
      - css.at-rules.container.style_queries_for_custom_properties
  - group: container-scroll-state-queries
    features:
      - css.at-rules.container.scroll-state_queries
      - css.properties.container-type.scroll-state
  - group: container-anchor-position-queries
    features:
      - css.at-rules.container.anchor_position_queries
      - css.properties.container-type.anchored
authors:
  - drakesbot12
contributors:
  - solarrust
keywords:
  - контейнерные
  - запросы
  - container
  - queries
  - адаптивные
  - компоненты
  - style
  - scroll-state
  - anchored
related:
  - css/media
  - css/has
  - css/where
tags:
  - doka
---

## Кратко

Директива `@container` задаёт контейнерные запросы: стили применяются в зависимости от размеров родителя-контейнера, а не вьюпорта. Так компонент подстраивается под место, куда его поставили.

## Пример

```html
<section class="catalog">
  <div class="cards">
    <article class="card">Карточка 1</article>
    <article class="card">Карточка 2</article>
    <article class="card">Карточка 3</article>
    <article class="card">Карточка 4</article>
    <article class="card">Карточка 5</article>
  </div>
</section>
```

```css
/* Объявляем контейнер и следим за его шириной */
.catalog {
  container-type: inline-size;
}

.cards {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, 1fr);
}

/* Когда контейнер сужается, меняем раскладку карточек */
@container (max-width: 600px) {
  .cards { grid-template-columns: repeat(2, 1fr); }
}

@container (max-width: 380px) {
  .cards { grid-template-columns: 1fr; }
}
```

Контейнер — `.catalog`, а стили меняются у вложенного в него `.cards`. Элемент не может запрашивать сам себя: условия `@container` проверяют кого-то из его предков.

В демке двигайте ползунок: колонки перестроятся по ширине контейнера, а не окна.

<iframe title="Карточки перестраиваются по ширине контейнера" src="demos/basic/" height="560"></iframe>

## Как понять

Допустим, у нас есть карточка товара. На главной она стоит в широкой колонке, а на странице корзины — в узкой боковой. Медиазапрос [`@media`](/css/media/) тут не поможет: он смотрит на ширину вьюпорта, а она в обоих случаях одинаковая. Карточке важно, сколько места у её родителя.

`@container` решает эту задачу. Мы объявляем родителя карточки контейнером, и браузер следит за его размерами. Когда размер подходит под условие, правила внутри `@container` применяются к потомкам контейнера. Брейкпоинты живут рядом с компонентом и работают в любой раскладке.

Кроме размеров, у контейнера можно проверить:

- значения кастомных свойств — запросом `style()`;
- состояние прокрутки — запросом `scroll-state()`;
- запасное положение элемента с якорем — запросом `anchored()`.

## Как пишется

Контейнерный запрос срабатывает только в пределах контейнера. Чтобы он заработал, нужно:

1. Объявить контейнер на элементе-родителе компонентов: задать ему `container-type: inline-size` (измеряет только ширину) или `container-type: size` (измеряет и ширину, и высоту).

2. По желанию дать контейнеру имя и ссылаться на него в `@container`:

```css
.wrapper {
  container-name: layout;
  container-type: inline-size;
}

@container layout (min-width: 700px) {
  /* Правила для компонентов внутри .wrapper */
}
```

3. Написать условия как в `@media`, но проверять именно контейнер:

```css
/* Размерные запросы */
@container (min-width: 480px) { /* ... */ }
@container (width > 30rem) { /* Диапазонный синтаксис */ }

/* Логические операторы */
@container (width > 480px) and (width < 768px) { /* ... */ }
@container (width < 400px) or (height < 300px) { /* ... */ }
@container not (width > 800px) { /* ... */ }

/* Имя контейнера + условие */
@container sidebar (width > 400px) { /* ... */ }

/*
  Только имя: срабатывает, если у элемента
  есть предок-контейнер с этим именем
*/
@container sidebar { /* ... */ }

/*
  Несколько условий через запятую (ИЛИ):
  каждое ищет свой контейнер
*/
@container card (width > 400px),
  sidebar (width > 300px) { /* ... */ }
```

Тип контейнера задаёт свойство `container-type`:

- `normal` — значение по умолчанию, размерные запросы к элементу не работают;
- `inline-size` — учитывает только ширину контейнера;
- `size` — учитывает и ширину, и высоту;
- `scroll-state` — отвечает на запросы о прокрутке `scroll-state()`;
- `anchored` — отвечает на запросы `anchored()` о положении элемента с якорем.

Значения `scroll-state` и `anchored` можно сочетать с размерными через пробел: `container-type: inline-size scroll-state`.

<aside>

☝️ Контейнер с `inline-size` перестаёт учитывать содержимое при расчёте своей ширины. Если ширина элемента зависит от содержимого, он схлопнется в ноль. Так бывает:

- с флекс-элементами;
- с `inline-block`;
- с [`float`](/css/float/);
- с абсолютно позиционированными блоками без заданной ширины.

Задайте таким контейнерам ширину явно. Обычные блочные элементы растягиваются на всю ширину родителя, с ними проблем нет.

С `size` то же самое происходит и с высотой. А высота у обычного блока почти всегда зависит от содержимого. Поэтому блок с `container-type: size` без заданной высоты схлопнется по вертикали.

</aside>

Имя и тип удобно задать одним свойством-шорткатом `container`. Сначала идёт имя, потом через слэш — тип:

```css
.wrapper {
  container: layout / inline-size;
}
```

### Вложенные контейнеры

Можно вкладывать `@container` друг в друга, чтобы комбинировать условия:

```css
@container sidebar (width > 400px) {
  .card {
    font-size: 1.2rem;
  }

  @container (width > 700px) {
    .card {
      /*
        Сработает, если sidebar шире 400px
        и ближайший к .card контейнер шире 700px
      */
      font-size: 1.5rem;
    }
  }
}
```

Запрос без имени проверяет ближайший к `.card` контейнер. Если между `.card` и `.sidebar` нет других контейнеров, оба условия проверят `.sidebar`.

### Стилевые запросы `style()`

Контейнерные запросы умеют проверять не только размеры, но и значения [кастомных свойств](/css/custom-properties/) контейнера. Для стилевых запросов `container-type` не нужен: любой элемент уже стилевой контейнер. Запрос без имени проверяет родителя элемента.

```css
/*
  Булева форма проверяет, что значение свойства
  отличается от начального
*/
@container style(--featured) {
  .card {
    border-color: gold;
  }
}

@container style(--theme: dark) {
  .card {
    color: #fff;
    background: #1a1a1a;
  }
}

@container style(--number > 4) {
  .card { font-size: 1.25rem; }
}
```

`style()` смотрит на вычисленные значения. Кастомные свойства наследуются, поэтому контейнер может получить значение от своего предка.

Стилевые запросы к кастомным свойствам работают во всех браузерах с мая 2026 года, когда их добавил Firefox 151. Диапазонные сравнения вроде `style(--number > 4)` есть в Chrome и Edge с версии 142 и в Firefox 151, а в Safari пока нет. Спецификация разрешает проверять и обычные свойства, например `style(display: flex)`, но браузеры так пока не умеют.

В демке у левой карточки задано `--featured: 1`, и стилевой запрос подсвечивает её синим:

<iframe title="Стилевой запрос @container style()" src="demos/style-query/" height="260"></iframe>

### Запросы состояния прокрутки `scroll-state()`

Функция `scroll-state()` проверяет, что происходит с прокруткой. Элементу задают `container-type: scroll-state`, а стили меняют у его потомков. Какой элемент делать контейнером, зависит от запроса:

- `stuck` — прилип ли к краю контейнер с [`position: sticky`](/css/position-sticky/);
- `snapped` — встал ли в точку привязки контейнер со [`scroll-snap-align`](/css/scroll-snap-align/), когда у прокручиваемого родителя задан [`scroll-snap-type`](/css/scroll-snap-type/);
- `scrollable` — можно ли ещё прокрутить в указанную сторону контейнер с [`overflow`](/css/overflow/);
- `scrolled` — в какую сторону последний раз прокрутили контейнер с `overflow`.

После двоеточия указывают сторону или ось: `top`, `x`, `inline-start` и другие. Значение `none` значит, что состояния нет.

Например, добавим тень шапке, когда она прилипла к верху:

```css
.header {
  position: sticky;
  top: 0;
  container-type: scroll-state;
}

@container scroll-state(stuck: top) {
  .header__inner {
    box-shadow: 0 4px 12px rgb(0 0 0 / 0.4);
  }
}
```

В демке прокрутите текст: шапка прилипнет, станет компактнее и получит тень.

<iframe title="Шапка получает тень, когда прилипает к краю" src="demos/scroll-state/" height="460"></iframe>

Запросы `stuck`, `snapped` и `scrollable` работают без флагов в Chrome и Edge с версии 133, `scrolled` — с версии 144. В Firefox и Safari их пока нет. Если браузер не понимает запрос, стили внутри него просто не применятся. Поэтому тень или подсветка станут приятным улучшением, а не обязательной частью интерфейса.

### Запросы к якорю `anchored()`

Функция `anchored()` проверяет, какое запасное положение выбрал браузер для элемента с [якорным позиционированием](/css/anchor-positioning-guide/). Запасные положения перечисляют в свойстве [`position-try-fallbacks`](/css/position-try-fallbacks/) или в шорткате [`position-try`](/css/position-try/). Контейнер здесь — сам спозиционированный элемент с `container-type: anchored`, а меняются стили его потомков и псевдоэлементов.

Например, подсказка стоит над кнопкой, а стрелка у её нижнего края смотрит вниз. Если сверху не хватает места, браузер переносит подсказку под кнопку. Перенесём стрелку к верхнему краю и развернём её к кнопке:

```html
<button class="button">Сохранить</button>
<div class="tooltip">Сохраняет черновик</div>
```

```css
.button {
  anchor-name: --button;
}

.tooltip {
  --tooltip-bg: #282a2e;
  background-color: var(--tooltip-bg);
  position: absolute;
  position-anchor: --button;
  position-area: top;
  position-try: flip-block;
  container-type: anchored;
}

/* Стрелка снизу подсказки, смотрит вниз */
.tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  translate: -50% 0;
  border: 8px solid transparent;
  border-top-color: var(--tooltip-bg);
}

/* Подсказка переехала под кнопку */
@container anchored(fallback: flip-block) {
  .tooltip::after {
    top: auto;
    bottom: 100%;
    rotate: 180deg;
  }
}
```

Псевдоэлементы `::before` и `::after` проверяют свой исходный элемент, поэтому `.tooltip::after` смотрит на саму подсказку.

Запросы `anchored()` работают без флагов в Chrome и Edge с версии 143. В Firefox и Safari их пока нет.

## Подсказки

💡 Используйте имена контейнеров (`container-name`), когда на странице несколько контейнеров и правила не должны пересекаться.

💡 Внутри контейнера работают единицы `cqw`, `cqh`, `cqi`, `cqb`, `cqmin` и `cqmax`. Это проценты от размеров ближайшего контейнера, как `vw` и `vh` для вьюпорта. Например, `font-size: 5cqi` — это 5% ширины контейнера. Контейнер с `inline-size` не знает своей высоты. Поэтому `cqh` и `cqb` в нём возьмут высоту внешнего контейнера или вьюпорта.
