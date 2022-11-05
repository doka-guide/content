---
title: "<noscript>"
description: "Покажет контент пользователю, когда отключена поддержка JavaScript"
authors:
  - doka-dog
contributors:
  - Daria Kamenskaya
keywords:
  - отсутствует поддержка JavaScript
related:
  - html/script
  - js/dom
  - html/link
tags:
  - doka
---


## Кратко
Тег `<noscript>` используется для показа пользователю контента, когда отключена поддержка JavaScript.

## Пример
Для наглядности приведём пример использования тега `<noscript>` вместе с его противоположным тегом - `<script>`.

```html
<body>
  <script>
    document.write("My first code in JavaScript!")
  </script>
  <noscript>Sorry, your Browser doesn’t support JavaScript!</noscript>
</body>
```

## Как пишется
Тег `<noscript>` — парный, его всегда нужно закрывать с помощью `</noscript>`.

## Как понять

Тег `<noscript>` используется для предоставления альтернативного контента пользователям, у которых отключены скрипты в браузере или браузер их не поддерживает. В остальных случаях браузер игнорирует этот тег и всё, что располагается внутри него.
`<noscript>` может использоваться как в `<head>`, так и в `<body>`. При использовании внутри `<head>` тег `<noscript>` может содержать только теги `<link>`, `<style>` и `<meta>`.

Ссылка на спецификацию: (http://www.w3.org/TR/html5/semantics.html#the-noscript-element)

## Атрибуты

У `<noscript>` нет уникальных атрибутов, применяются все [глобальные атрибуты](/html/global-attrs/). Атрибуты для [браузерных событий](/js/events/) поддерживаются, но не применяются, т. к. `<noscript>` используется, когда отсутствует поддержка JavaScript.

