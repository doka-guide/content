---
title: "reset event"
description: ""
authors:
  - IVKrylova
related:
  - ""
tags:
  - doka
---

## Кратко
Событие `reset` возникает при очистке полей формы. Оно нужно, чтобы вернуть значения полей к значениям по умолчанию.

## Как пишется
На `reset` можно [подписаться](https://doka.guide/js/element-addeventlistener/):
```js
  const form = document.querySelector('.form')

  form.addEventListener('reset', function () {
    console.log('Поля формы очищены!')
  })
```

## Как понять
При [событии `submit`](https://doka.guide/js/event-submit/) браузер перезагружает страницу и отправляет форму на сервер. Когда мы обрабатываем форму в JavaScript, мы отменяем стандартное действие браузера. Это значит, что после выполнения скрипта перезагрузки страницы не произойдёт, и поля формы останутся заполненными. Вот тут нам и нужно событие `reset`. Его стоит использовать после успешной отправки формы.
