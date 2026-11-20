---
title: "`.scrollIntoView()`"
description: "Прокрутить окно браузера до указанного элемента."
baseline:
  - group: scroll-into-view
    features:
      - api.Element.scrollIntoView
authors:
  - inventoris
contributors:
  - skorobaeus
related:
  - js/dom
  - html/a
  - js/element-scrollto
tags:
  - doka
---

## Кратко

Метод `scrollIntoView()` позволяет программно прокрутить окно до определённого элемента.

## Как пишется

Получаем элемент и накладываем метод `scrollIntoView()`:

```js
const element = document.querySelector('#about')

element.scrollIntoView()
```

🤖 В `scrollIntoView()` можно передать аргумент типа [boolean](/js/boolean/):

- если указать `true`, то скролл окна остановится у верхней границы элемента;
- если указать `false`, то у нижней границы.

<iframe title="Прокрутка к элементу с помощью логических аргументов" src="demos/basic/" height="450"></iframe>

А ещё в `scrollIntoView()` можно передать объект с опциями скролла, где:

- `behavior` отвечает за анимацию прокрутки. Принимает `smooth`, чтобы было плавно, по умолчанию резкое `auto`;
- `block` за вертикальное выравнивание. Принимает `start`, `center`, `end` и `nearest`;
- `inline` за горизонтальное выравнивание. Принимает то же, что и `block`.

```js
element.scrollIntoView(
  {behavior: "smooth", block: "center", inline: "start"}
)
```

## Как понять

Использовать `scrollIntoView()` полезно в случаях длинных веб-страниц, когда нужно прокрутить страницу к определённым частям, а использования [ссылок с якорями](/html/a/) недостаточно.
