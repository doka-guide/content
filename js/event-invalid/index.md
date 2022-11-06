---
title: "`invalid`"
description: "Проверяем валидность формы."
authors:
  - delioncourts
related:
  - html/form
  - js/element-addeventlistener
  - js/deal-with-forms
tags:
  - doka
  - placeholder
---

## Кратко

[Событие](/js/invalid/) `invalid` срабатывает, когда пользователь отправляет форму [форму](/html/form/), а заполненные данные не соответствует заданным условиям. Например, введенное число больше, чем в заданном диапазоне.

## Как пишется

На `invalid` можно [подписаться](/js/element-addeventlistener/) и отреагировать, например, вывести фразу в console.log или показать массив с неправильными данными:

```js
const gandalf = document.querySelector('input')

gandalf.addEventListener('invalid', (event) => {
  console.log('Ты не пройдешь!')
});
```

## Как понять

Событие `invalid` запускается после события `submit` и проверяет введенные значения в input. Если значение не подходит по условию, например, введено число 5, а диапазон указан от 1 до 4, то будет указано, что произошла ошибка.

```html
<form>
    <label for="input-containter">Введите количество пчёл от 1 до 5:</label>
    <input id="input-containter" type="number" min="1" max="5" required />
</form>
<div>
    <button type="submit" value="submit">Получить мёд</button>
</div>
```

```js
const input = document.querySelector("input");

input.addEventListener('invalid', (event) => {
    alert('Неправильная пчела!');
});
```

Отображение ошибки можно кастомизировать.
