---
title: "<search>"
description: "Один тег чтобы обернуть секцию с поиском или фильтром."
authors:
  - andreysukhov
related:
  - html/form
  - html/input
  - a11y/role-search
tags:
  - doka
---

## Кратко

Семантический тег-обёртка для блока с поиском или фильтром.

## Пример

```html
<search>
  <form>
    <input type="search">
    <button>Поиск</button>
  </form>
</search>
```

## Как пишется
```html
<search>
  ...
</search>
```

<iframe title="Примеры использования search" src="demos/base/" height="489"></iframe>


## Как понять

Этот семантический тег пришёл на замену ARIA-атрибуту [`role="search"`](https://doka.guide/a11y/role-search/). Им можно обернуть форму с поиском или блок на странице с результатами фильтрации.

Как было раньше

```html
<form role="search">
</form>
 ```

Как будет теперь

```html
<search>
  <form>
  </form>
</search>
 ```

или

```html
<search>
  <h4>
    Поиск по фильтрам
  </h4>
  <form>
    <label>
      цвет
      <select name="color">
        <option value="red">red</option>
        <option value="green">green</option>
        <option value="blue">blue</option>
      </select>
    </label>
  </form>
</search>
```

Что делать если на странице одновременно есть и то и другое? Просто добавьте атрибут `title`, например:

```html
<body>
<search title="global-search">
  <form>
    ...
  </form>
</search>
<search title="products-filter-results">
  <h2>
    Результаты фильтрации
  </h2>
</search>
</body>
```

Важно упомянуть что этот тег новый и пока что не имеет широкой браузерной поддержки. Понадобится время чтобы браузеры и скринридеры внедрили его использование. Но когда это произойдёт мы получим отличное дополнение к другим семантическим тегам, таким как [`<aside>`](/html/aside/) или [`<header>`](/html/header/).

