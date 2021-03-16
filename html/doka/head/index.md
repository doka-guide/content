---
title: "<head>"
author: vladimir
co-authors:
  - solarrust
summary:
  - хэд
  - head
  - "<head>"
  - тэг
  - тег
---

## Кратко

Элемент `<head>` содержит основную информацию о документе: метадату, которая включает название, ссылки на скрипты и таблицы стилей.

Эта информация не отображается на странице браузера. Пользователи увидят только заголовок окна страницы — его задаёт тег [`<title>`](/html/doka/title), ну и [фавикон](https://ru.wikipedia.org/wiki/Favicon), если вы его поставите.

## Пример

```html
<html>
  <head>
    <title>Заголовок страницы</title>
  </head>
</html>
```

## Как пишется

Кроме `<title>`, внутри контейнера `<head>` можно разместить и другие элементы: [`<base>`](/html/doka/TODO) (в работе), [`<link>`](/html/doka/link), [`<meta>`](/html/doka/meta), [`<script>`](/html/doka/script), [`<style>`](/html/doka/style). Вот пример того, как можно поставить фавикон — маленькую иконку в углу вкладки браузера.

```html
<head>
  <link rel="shortcut icon" type="image/png" href="/favicon.png" />
</head>
```
