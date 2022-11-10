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

[Событие](/js/invalid/) `invalid` срабатывает при попытке отправить форму [форму](/html/form/) с неверными значениями. Например, если не заполнено одно из необходимых полей.

```js
<input type="text" required />
```

## Как пишется

На `invalid` можно [подписаться](/js/element-addeventlistener/) и отреагировать, например, вывести фразу или массив с неправильными данными в консоль:

```js
const gandalf = document.querySelector('input')

gandalf.addEventListener('invalid', (event) => {
  console.log('Ты не пройдешь!')
});
```

## Как понять

Событие `invalid` срабатывает после события `submit` при проверке полей формы если значение в одном из полей не соответствует условию.

Если в форме ниже ввести значение 6, сработает событие `invalid`, так как на поле есть проверка `max=5`:

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

Можно настроить то, как будут отображаться ошибки проверки формы.
