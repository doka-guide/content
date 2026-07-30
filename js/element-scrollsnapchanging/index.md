---
title: "`scrollsnapchanging`"
description: "Срабатывает, пока скроллим контейнер."
baseline:
  - group: scroll-snap-events
    features:
      - api.Document.scrollsnapchanging_event
      - api.Element.scrollsnapchanging_event
      - api.Window.scrollsnapchanging_event
authors:
  - akhmadullin
related:
  - css/scroll-snap-type
  - js/element-scrollsnapchange
  - js/element-scroll
tags:
  - doka
---

## Кратко

Событие `scrollsnapchanging` срабатывает во время прокрутки в момент определения браузером потенциальной точки привязки.

## Как пишется

Современный способ с [addEventListener](/js/element-addeventlistener/):

```js
scrollContainer.addEventListener('scrollsnapchanging', function(event) {
  console.log(event)
})
```

Также можно обработать событие через [встроенный обработчик событий](/js/element/#vstroennye-obrabotchiki-sobytiy), но этот способ считается устаревшим.

```js
scrollContainer.onscrollsnapchanging = function(event) {
  console.log(event)
}
```

## Как понять

Событие `scrollsnapchanging` возможно только на контейнерах с [привязкой прокрутки](/css/scroll-snap-type/). Сработает во время скролла, когда браузер определил точку, к которой привяжется прокрутка, если она остановится прямо сейчас.

Событие содержит ссылки на элементы, к которым может быть привязана прокрутка:

- `snapTargetBlock` — в блочном направлении;
- `snapTargetInline` — в строчном направлении.

```js
scrollContainer.addEventListener('scrollsnapchanging', function(event) {
  // Получаем элемент, к которому может быть привязана прокрутка в блочном направлении
  console.log(event.snapTargetBlock)

  // Получаем элемент, к которому может быть привязана прокрутка в строчном направлении
  console.log(event.snapTargetInline)
})
```

Событие полезно, если необходимо получить информацию о пролистываемом элементе прямо во время прокрутки. Попробуйте скроллить в демо ниже:

<iframe title="Получение номера слайда во время прокрутки" src="demos/carousel/" height="550"></iframe>

## Подсказки

💡 В отличие от события [`scrollsnapchange`](/js/element-scrollsnapchange/), которое ждет завершения прокрутки, `scrollsnapchanging` срабатывает в момент пролистывания. Если пользователь медленно скроллит, не отрывая палец или курсор, событие сработает несколько раз, пока он пролистывает возможные точки привязки. Каждый раз, когда браузер определяет, что при остановке прокрутка зафиксируется на новом элементе, событие сообщает, какой это элемент.

💡 При быстром пролистывании через несколько точек привязки событие сработает один раз — для конечной точки.
