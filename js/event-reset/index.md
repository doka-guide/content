---
title: "reset"
description: "Событие reset"
authors:
  - IVKrylova
tags:
  - doka
  - placeholder
---

## Кратко

`<input type="reset">` создаёт кнопку сброса. При нажатии на неё возникает событие `reset`. Оно нужно, чтобы вернуть значения полей формы к значениям по умолчанию.

## Пример

При нажатии на кнопку «Сбросить значение» в поле формы появится значение по умолчанию «Имя»:

```js
<form>
  <input type="text" name="name" value="Имя">
  <input type="reset" value="Сбросить значение">
  <input type="submit" value="Отправить">
</form>
```

В этом примере в текстовом поле нет атрибута `value`. При нажатии на кнопку «Сбросить значение» поле формы станет пустым:

```js
<form>
  <input type="text" name="name">
  <input type="reset" value="Сбросить значение">
  <input type="submit" value="Отправить">
</form>
```

## Как понять

Когда пользователь нажимает на кнопку «Сбросить значение», браузер создаёт [событие](https://doka.guide/js/events/). Чтобы получить доступ к объекту события, на `reset` нужно [подписаться](https://doka.guide/js/element-addeventlistener/) и передать объект события в функцию-обработчик:

```js
  const form = document.querySelector('.form')
  form.addEventListener('reset', function (evt) {
    console.log(evt)
  })
```
