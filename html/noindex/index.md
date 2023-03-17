---
title: "Тег `<noindex>`"
description: "Запрет индексирования содержимого."
authors:
  - rrramble
related:
  - html/a
  - html/meta
  - rfc9309
tags:
  - doka
---

## Кратко

Тег [`<noindex></noindex>`](https://yandex.ru/support/webmaster/adding-site/indexing-prohibition.html#indexing-prohibition__content) указывает поисковым системам не учитывать его содержимое.
Тег поддерживается только [поисковой системой Яндекс](https://yandex.ru).


## Как понять

Поисковые системы сканируют (индексируют) содержимое сайтов. Когда пользователь ищет информацию, поисковики выдают ответ на основе ранее отсканированного.

Некоторый контент не имеет смысла показывать при поиске, например:
- сторонная реклама других компаний;
- служебная информация для работников компаний;
- ссылки, указанные другими пользователями на форумах (user generated context, UGC).

Такой контент можно исключить из индексирования.

## Пример

```html
<noindex>
  <!-- рекламный текст другой компании -->
  <article>Реклама наших партнеров:...</article>
  
  <!-- служебная ссылка -->
  <a href="/login">Вход во внутренний портал для работников компании</a>
</noindex>
```

## Ограничения

Этого тега нет в спецификации HTML, поэтому [HTML-валидатор](https://validator.w3.org/) укажет на ошибку.
Яндекс предлагает синтаксис `<!‐‐noindex‐‐><!‐‐/noindex‐‐>` для [обхода проблемы валидации `<noindex>`](https://yandex.ru/support/webmaster/adding-site/indexing-prohibition.html#indexing-prohibition__content).

Также можно использовать скрипт `<noscript></noscript>`.

Примеры:

```html
<!‐‐noindex‐‐>
  <!-- рекламный текст другой компании -->
  <article>Реклама наших партнеров:...</article>

  <!-- служебная ссылка -->
  <a href="/login">Вход во внутренний портал для работников компании</a>
<!‐‐/noindex‐‐>

<noscript>Текст, индексирование которого нужно запретить.</noscript>
```

## Другие способы запрета индексирования

- запретить индексирование разделов сайта и страниц: поместите в корневую папку сайта [файл `robots.txt`](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt?hl=ru);
- запретить индексирование страницы полностью: укажите тег тег `<meta name="robots" content="noindex">` в секции [`<head>`](/html/head/);
- запретить переходить по ссылке тега `<a>`: укажите в нем [атрибут `rel="nofollow"`](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links?hl=ru).
