---
title: "`sessionStorage`"
description: "Храним данные пользователя в браузере, но только до момента, пока открыта текущая вкладка."
baseline:
  - group: localstorage
    features:
      - api.Window.sessionStorage
authors:
  - akellbl4
contributors:
  - skorobaeus
keywords:
  - sessionstorage
  - webstorage
  - storage
related:
  - js/bom
  - tools/json
  - js/events
tags:
  - doka
---

<aside>

📚 `sessionStorage` — один из способов хранить данные в браузере. Обзор всех способов описан в статье «[Хранение данных в браузере](/tools/browsers-storages/)».

</aside>

## Кратко

Это объект, хранящийся в `window`, который позволяет сохранять данные в браузере на время сессии. Этот тип хранилища очень похож на [`localStorage`](/js/local-storage/) и работает как хранилище данных в формате ключ-значение. При сохранении данных мы указываем имя поля, в которое должны быть сохранены данные, и затем используем это имя для их получения.

- Сессия страницы создаётся при открытии новой вкладки браузера. Сессия остаётся активной до тех пор, пока открыта вкладка, а состояние сессии сохраняется между перезагрузками. Открытие новой вкладки с таким же адресом приведёт к созданию новой сессии.
- Значения хранятся в виде строк. При попытке сохранения других типов данных, они будут приведены к строке. Например, если записать число, то при чтении нам вернётся число, записанное в строку.
- Максимальный объём данных ограничен размером 5MB.

## Пример

Записываем данные:

```js
window.sessionStorage.setItem('name', 'Дока Дог')
```

При чтении ранее записанных данных по ключу `name` мы получим `Дока Дог`:

```js
const name = window.sessionStorage.getItem('name')
console.log(name)
// Дока Дог
```

Повторная запись по тому же ключу приведёт к замене данных:

```js
window.sessionStorage.setItem('name', 'Собака Дока')
const name = window.sessionStorage.getItem('name')
console.log(name)
// Собака Дока
```

## Как понять

Если вам нужно хранить данные в течение активной сессии, то `sessionStorage` отлично подойдёт для этого.

## Как пишется

### Запись

Запись производит метод `setItem('ключ', 'значение')`, который принимает два строковых параметра: ключ, по которому будет сохранено значение, и само значение.

```js
window.sessionStorage.setItem('name', 'Дока Дог')
```

### Чтение

За чтение отвечает `getItem('ключ')` c одним параметром, который указывает на ключ для чтения и возвращает полученное значение из хранилища. Если по этому ключу нет значения, то метод вернёт [`null`](/js/null-primitive/).

```js
window.sessionStorage.getItem('name')
// вернёт 'Дока Дог'
window.sessionStorage.getItem('user')
// вернёт null
```

### Удаление

Удаляет запись из хранилища `removeItem('ключ')`. Он успешно выполнится даже если указанного ключа не существует в хранилище.

```js
window.sessionStorage.removeItem('name')
window.sessionStorage.removeItem('user')
```

### Очистка хранилища

Метод `clear()` очищает хранилище полностью.

```js
window.sessionStorage.clear()
```

### Количество полей в хранилище

Используя свойство `length`, можно узнать, сколько всего полей было записано в хранилище.

```js
window.sessionStorage.length
```

### Получение ключа по индексу

Метод `key()` получает ключ по индексу. Значения в хранилище хранятся в порядке их добавления, поэтому значение, добавленное первым, будет храниться в позиции `0` и так далее.

```js
window.sessionStorage.setItem('name', 'Дока Дог')
window.sessionStorage.setItem('id', '5ac9bc9d1984')

console.log(window.sessionStorage.key(0))
// 'name'
```

Таким образом, используя количество полей в хранилище и получение ключа по индексу, можно перебрать все значения в хранилище.

```js
const sessionStorageSize = window.sessionStorage.length
for (let i = 0; i < sessionStorageSize; i++) {
  console.log(window.sessionStorage.getItem(sessionStorage.key(i)))
}
```
