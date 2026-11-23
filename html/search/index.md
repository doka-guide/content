---
title: "`<search>`"
description: "Один тег, чтобы обернуть блок с поиском или фильтрами."
baseline:
  - group: search
    features:
      - html.elements.search
authors:
  - andreysukhov
contributors:
  - skorobaeus
  - solarrust
related:
  - html/form
  - html/input
  - a11y/role-search
tags:
  - doka
---

## Кратко

Семантический тег `<search>` оборачивает блок с поиском или фильтрами. [Скринридеры](/a11y/screenreaders/) объявляют такой блок как область поиска.

## Пример

```html
<search>
  <form>
    <label for="site-search">Поиск по сайту</label>
    <input type="search" id="site-search" name="q">
    <button>Найти</button>
  </form>
</search>
```

## Как пишется

```html
<search>
  ...
</search>
```

Тег можно ставить внутрь других семантических тегов, например [`<header>`](/html/header/) или [`<aside>`](/html/aside/).

В демке два блока `<search>`: форма поиска по сайту и фильтр по цвету.

<iframe title="Примеры использования search" src="demos/base/" height="600"></iframe>

## Как понять

Тегом оборачивают форму поиска по сайту, поиск по странице или блок с фильтрами. Сами результаты поиска в `<search>` не оборачивают. Исключение — подсказки быстрого поиска, которые появляются прямо под полем ввода.

У тега `<search>` есть встроенная роль [`search`](/a11y/role-search/). По ней скринридер понимает, что перед ним область поиска.

Такая область — [ориентир](/a11y/aria-roles/#roli-orientirov). Пользователь скринридера найдёт её в списке ориентиров и перейдёт к поиску сразу, не перебирая всю страницу.

Раньше роль `search` задавали форме атрибутом `role="search"`. Он по-прежнему допустим, но с `<search>` больше не нужен.

Как было раньше:

```html
<form role="search">
</form>
```

Как теперь:

```html
<search>
  <form>
  </form>
</search>
```

Если на странице несколько блоков `<search>`, подпишите каждый. Так пользователи скринридеров смогут их различить:

- если у блока есть заголовок, видимый или скрытый от глаз, свяжите их атрибутом [`aria-labelledby`](/a11y/aria-labelledby/);
- если заголовка нет, добавьте атрибут [`aria-label`](/a11y/aria-label/): подпись не видна на экране, но её прочитают скринридеры.

Например:

```html
<body>
  <search aria-label="По сайту">
    <form>
      <!-- Содержимое, связанное с поиском -->
    </form>
  </search>

  <search aria-labelledby="filters">
    <h2 id="filters">
      Фильтры
    </h2>
    <form>
      <!-- Поля фильтров -->
    </form>
  </search>
</body>
```
