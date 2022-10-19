---
title: "`<head>`"
description: "Какие настройки страницы скрываются в невидимой голове? Говорим о заголовке страницы, фавиконке, способах подключения стилей и скриптов."
cover:
  author: kirakusto
  desktop: 'images/covers/desktop.svg'
  mobile: 'images/covers/mobile.svg'
  alt: 'Голова улыбающейся девочки между тегами head. В голове теги title, style, script, base, link и логотип Доки'
authors:
  - doka-dog
contributors:
  - solarrust
editors:
  - tachisis
keywords:
  - хэд
related:
  - tools/site-readers
  - html/script
  - js/dom
tags:
  - doka
---

## Кратко

Элемент `<head>` содержит основную информацию о документе: метаданные (например, заголовок окна или кодировку), ссылки на скрипты и таблицы стилей.

Эта информация не отображается на странице браузера. Пользователи увидят только заголовок окна страницы — его задаёт тег [`<title>`](/html/title/), ну и [фавиконку](https://ru.wikipedia.org/wiki/Favicon), если вы её поставите.

![Пример выдачи страницы в поисковике, показаны заголовок и фавикон](images/1.png)

## Пример

```html
<html>
  <head>
    <title>Заголовок страницы</title>
  </head>
</html>
```

## Как пишется

Кроме `<title>`, внутри контейнера `<head>` можно разместить и другие элементы: [`<base>`](/html/base/), [`<link>`](/html/link/), [`<meta>`](/html/meta/), [`<script>`](/html/script/), [`<style>`](/html/style/). Вот пример того, как можно поставить фавиконку — маленькую иконку в углу вкладки браузера.

```html
<head>
  <link rel="shortcut icon" type="image/png" href="/favicon.png">
</head>
```
