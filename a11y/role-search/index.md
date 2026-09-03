---
title: "`search`"
description: "Добавляем ориентир для поиска по всему сайту или по отдельной странице."
authors:
  - tatianafokina
contributors:
  - skorobaeus
keywords:
  - landmark role
  - landmark
  - search landmark
  - поисковый ориентир
related:
  - html/search
  - a11y/role-searchbox
  - html/form
tags:
  - doka
---

## Кратко

[ARIA-роль ориентира](/a11y/aria-roles/#roli-orientirov) для области поиска по сайту.

Такая же семантика у HTML-тега [`<search>`](/html/search/).

## Пример

```html
<form role="search">
  <label for="search-field">Найти на сайте:</label>
  <input
    type="search"
    id="search-field"
    name="search"
    placeholder="Например, смысл жизни"
  >
  <input type="submit" value="Искать">
</form>
```

<iframe title="Простой ориентир поиска" src="demos/basic/" height="350"></iframe>

[Скринридер](/a11y/screenreaders/) не расскажет о роли области, но пользователь сможет с помощью горячих клавиш быстро перейти к ней.

## Как пишется

Добавьте к тегу `role="search"`. Это может быть [`<div>`](/html/div/), [`<span>`](/html/span/) или [`<form>`](/html/form/). Пока что у одноимённого элемента `<search>` нет стабильной поддержки скринридерами (хотя [у браузеров с тегом всё в порядке](https://caniuse.com/mdn-html_elements_search)), задавайте на всякий случай явную роль как в этом примере:

```html
<search role="search">
  <!-- Поле и другие элементы поиска -->
</search>
```

Внутри элемента с ролью `search` может быть не только поле поиска [`<input type="search">`](/html/input/#type), но также связанные с поиском фильтры и ссылки. Например, чекбоксы для выбора типа товара или его цвета, ссылки на инструкции по поиску, комбинированный список со словами для автозаполнения поискового поля или подсказки.

```html
<form role="search">
  <label for="search-field">Найти на сайте:</label>
  <input
    type="search"
    id="search-field"
    name="search"
    aria-describedby="hint"
    placeholder="Например, смысл жизни"
  >
  <span id="hint">
    Поддерживаем русский, корейский, латынь и пушту.
  </span>
  <a href="#">Советы по поиску</a>
  <fieldset>
    <legend>Тип товара:</legend>
    <label for="crowns">Короны</label>
    <input type="checkbox" id="crowns">

    <label for="cloaks">Мантии</label>
    <input type="checkbox" id="cloaks">

    <label for="scepters">Скипетры</label>
    <input type="checkbox" id="scepters">
  </fieldset>
  <input type="submit" value="Искать">
</form>
```

С ролью `search` сочетаются все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy), но чаще всего пригодятся:

- [`aria-label`](/a11y/aria-label/), если нет видимой подписи к области поиска;
- [`aria-labelledby`](/a11y/aria-labelledby/), когда у области `search` есть видимая подпись;
- [`aria-describedby`](/a11y/aria-describedby/) для подсказок;
- [`aria-errormessage`](/a11y/aria-errormessage/) для описания ошибок после отправки формы.

Целиком подписывать область `search` полезно, когда на сайте есть глобальный поиск и поиск по отдельной странице. Пользователи быстрее найдут нужный элемент в списке всех ориентиров благодаря такой подписи.

Пример с подписью прямо в атрибуте `aria-label`:

```html
<form
  role="search"
  aria-label="Поиск по сайту"
>
  <!-- Элементы поиска -->
</form>
```

Пример с подписью через `aria-labelledby`.

```html
<h4 id="form-label">Поиск по сайту</h4>
<form
  role="search"
  aria-labelledby="form-label"
>
  <!-- Элементы поиска -->
</form>
```

## Как понять

Роль `search` создаёт ориентир поиска на странице. Это значит, что пользователи скринридеров могут быстро переместиться к этой части страницы с помощью горячих клавиш или через меню с ориентирами.
