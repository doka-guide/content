---
title: "`<search>`"
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

<iframe title="Примеры использования search" src="demos/base/" height="540"></iframe>


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
        <option value="red">Красный</option>
        <option value="green">Зелёный</option>
        <option value="blue">Синий</option>
      </select>
    </label>
  </form>
</search>
```

Что делать, если на странице одновременно есть и то, и другое? Просто добавьте атрибут [`aria-label`](/a11y/aria-label/), если заголовок видят только [скринридеры](/a11y/screenreaders/), или [`aria-labelledby`](/a11y/aria-labelledby/), когда заголовок видят все. Например:

```html
<body>
  <search aria-label="По сайту">
    <form>
      <!-- Содержимое, связанное с поиском -->
    </form>
  </search>

  <search aria-labelledby="label">
    <h2 id="label">
      Результаты фильтрации
    </h2>
  </search>
</body>
```

Важно упомянуть, что это новый тег и пока у него нет широкой браузерной поддержки. Понадобится время, чтобы браузеры и скринридеры его внедрили. Когда это произойдёт, мы получим отличное дополнение к другим семантическим тегам, таким как [`<aside>`](/html/aside/) или [`<header>`](/html/header/).

Пока у тега нет хорошей поддержки, можно дублировать роль `search`:

```html
<search role="search">
  <!-- Содержимое формы -->
</search>
```
