---
title: "`load`"
description: "Запускаем код, когда страница полностью загрузилась."
authors:
  - nlopin
contributors:
  - furtivite
  - skorobaeus
  - inventoris
related:
  - js/dom
  - js/element-addeventlistener
  - tools/how-the-browser-creates-pages
tags:
  - doka
---

## Кратко

[Событие](/js/events/) `load` происходит, когда загрузилась и HTML страница (за это отвечает событие [`DOMContentLoaded`](/js/event-domcontentloaded/)), и все ресурсы для её отображения пользователю: стили, картинки и другое.

## Как пишется

Можно подписаться на объект `window`:

```js
window.addEventListener('load', function () {
  console.log('Страница готова!')
})
```

Или поймать событие на элементах, у которых есть ресурс загрузки:

```js
const img = document.getElementById('img')

img.addEventListener('load', function () {
  alert('А вот и картиночка')
})
```

## Как понять

Событие `load` гарантирует, что браузер отображает страницу полностью: все стили и картинки готовы, размеры элементов на странице посчитаны верно и доступны. Предшествующее `load` событие `DOMContentLoaded` таких гарантий не даёт. То же самое с отдельными элементами на странице: если случился `load`, значит элемент полностью загрузился.

Попробуйте открыть новую страничку кнопкой в демо:

```js
window.addEventListener('load', function () {
  alert('Хоп! Страничка полностью загрузилась, поэтому стили радуют глаз!')
})
```

<iframe title="Пример события load. Стартовая страница" src="demos/start-page/" height="250"></iframe>
