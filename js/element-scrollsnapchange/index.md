---
title: "`scrollsnapchange`"
description: "Возникает, когда остановили прокрутку контейнера на новом месте."
baseline:
  - group: scroll-snap-events
    features:
      - api.Document.scrollsnapchange_event
      - api.Element.scrollsnapchange_event
      - api.Window.scrollsnapchange_event
authors:
  - akhmadullin
related:
  - css/scroll-snap-type
  - js/element-scrollsnapchanging
  - js/element-scroll
tags:
  - doka
---

## Кратко

Событие `scrollsnapchange` срабатывает в момент остановки прокрутки и выбора новой точки привязки.

## Как пишется

Современный способ с [addEventListener](/js/element-addeventlistener/):

```js
scrollContainer.addEventListener('scrollsnapchange', function(event) {
  console.log(event)
})
```

Также можно обработать событие через [встроенный обработчик событий](/js/element/#vstroennye-obrabotchiki-sobytiy), но этот способ считается устаревшим.

```js
scrollContainer.onscrollsnapchange = function(event) {
  console.log(event)
}
```

## Как понять

Событие `scrollsnapchange` возможно только на контейнерах с [привязкой прокрутки](/css/scroll-snap-type/). Сработает в момент, когда скролл остановился на новой точке привязки, причём до появления события `scrollend`.

Событие содержит ссылки на элементы, к которым привязалась прокрутка:

- `snapTargetBlock` — в блочном направлении;
- `snapTargetInline` — в строчном направлении.

```js
scrollContainer.addEventListener('scrollsnapchange', function(event) {
  // Получаем элемент, к которому привязалась прокрутка в блочном направлении
  console.log(event.snapTargetBlock)

  // Получаем элемент, к которому привязалась прокрутка в строчном направлении
  console.log(event.snapTargetInline)
})
```

Событие полезно, когда нужно получить информацию об элементе, на котором остановилась прокрутка. Попробуйте скроллить в демо ниже:

<iframe title="Получение номера слайда при остановке" src="demos/carousel/" height="550"></iframe>

## Подсказки

💡 Событие не сработает, пока пользователь не отпустит палец или курсор. Если пользователь перестал скроллить, но продолжил зажимать элемент, значит прокрутка не завершилась. Нет завершения прокрутки, нет и события `scrollsnapchange`.

💡 Событие не сработает, пока точка привязки не изменится. Если пользователь скроллил, но остановил прокрутку там же, где начал, то и `scrollsnapchange` не появится.
