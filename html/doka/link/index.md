---
title: "<link>"
author:
  - grachev
editor: tachisis
tags:
  - sprint-1
summary:
  - подключение стилей
  - link
---

## Кратко

Добавляет на страницу CSS-стили из внешнего файла.

## Пример

```html
<head>
  <link href="style.css" rel="stylesheet">
</head>
```

## Как это понять

Матёрые программисты советуют описывать CSS-стили в отдельных файлах: так их легче редактировать, сортировать и подключать к разным страницам сайта. Чтобы применить стили из внешнего файла на вашей странице, используйте тег `<link>`.

Тег `<link>` также используют, чтобы задать иконку, которая отображается возле названия страницы на вкладке в браузере. Эту иконку называют фавиконка (favicon).

В обоих случаях `<link>` пишется внутри [`<head>`](/html/doka/head).

## Атрибуты

- `href` — URL-ссылка на файл с CSS-стилями. Ссылка может быть как полной или абсолютной `http://localhost/sitename/css/style.css`, так и неполной или относительной `/sitename/css/style.css`.
- `rel` — говорит браузеру, какую роль играет ссылка внутри тега. Иными словами, этот атрибут выражает отношения между вашей страницей и файлом, на который ведёт ссылка. Самое часто встречающееся значение — `rel="stylesheet"`, оно означает, что ссылка внутри `<link>` ведёт на внешний файл с CSS-стилями. А для добавления фавиконки используется `rel="icon"`. Также `rel` помогает определить, какую фавиконку на каком устройстве загружать, например: `rel="apple-touch-icon-precomposed"`.
- `sizes` — устанавливает размер — ширину и высоту — фавиконки в пикселях, например `sizes="114x114"`. А если написать `sizes="any"`, то браузер сможет масштабировать иконку под любой размер. Так можно делать с иконками в векторном формате, например, SVG.
- `media` — в зависимости от того, на каком устройстве открывают вашу страницу, можно применять разные стили к тексту или показывать разные иконки. Атрибут `media` указывает устройство и/или размер экрана, на котором будет подключен тот или иной стиль. Например, `<link href="mobile.css" rel="stylesheet" media="screen and (max-width: 600px)">`.

## Пример

Самый простой пример, как подключить файл со стилями:

```html
<link href="style.css" rel="stylesheet">
```

Можно сделать разные версии сайта, чтобы пользователь мог выбрать удобную для него, например, версию для слабовидящих. Тогда для каждой версии можно подключить свой файл стилей:

```html
<link href="default.css" rel="stylesheet" title="Default Style">
<link
  href="accessibility.css"
  rel="alternate stylesheet"
  title="Accessibility"
>
```

Вот как можно использовать разные фавиконки для разных экранов и устройств:

```html
<!-- На iPad третьего поколения с Retina-дисплеем: -->
<link
  rel="apple-touch-icon-precomposed"
  sizes="144x144"
  href="favicon144.png"
>
<!-- iPhone с Retina-дисплеем: -->
<link
  rel="apple-touch-icon-precomposed"
  sizes="114x114"
  href="favicon114.png"
>
<!-- iPad первого и второго поколений: -->
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="favicon72.png">
<!-- iPhone, iPod Touch и Android 2.1+ устройства без Retina-дисплея: -->
<link rel="apple-touch-icon-precomposed" href="favicon57.png">
<!-- стандартная фавиконка -->
<link rel="icon" href="favicon32.png">
```

Страница может выглядеть по-разному на разных устройствах. Для этого подключите разные стили, задав тип устройства и размер экрана:

```html
<link href="print.css" rel="stylesheet" media="print">
<link href="mobile.css" rel="stylesheet" media="all">
<link
  href="desktop.css"
  rel="stylesheet"
  media="screen and (min-width: 600px)"
>
<link
  href="highres.css"
  rel="stylesheet"
  media="screen and (min-resolution: 300dpi)"
>
```

В этом примере мы подключаем внешний файл со стилями с помощью атрибута `rel="stylesheet"` тега `<link>`, указываем RSS-документ текущего сайта (`link rel="alternate" type="application/rss+xml"`) и устанавливаем иконку сайта — фавиконку — в адресной строке браузера (`link rel="shortcut icon"`):

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Кулинарный блог</title>
    <link rel="stylesheet" href="ie.css">
    <link
      rel="alternate"
      type="application/rss+xml"
      title="Статьи с сайта cookbook.ru"
      href="http://cookbook.ru/rss.xml"
    >
    <link rel="shortcut icon" href="http://cookbook.ru/favicon.ico">
  </head>
  <body>
    <p>...</p>
  </body>
</html>
```
