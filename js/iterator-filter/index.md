---
title: "Iterator.prototype.filter()"
description: "Возвращает итератор, из которого можно получить только отфильтрованные значения"
baseline:
  - group: iterator-methods
    features:
      - javascript.builtins.Iterator.filter
authors:
  - vitya-ne
related:
  - js/iterator
  - js/iterator-to-array
  - js/iterator-take
tags:
  - doka
---

## Кратко

`Iterator.prototype.filter()` создаёт итератор только с теми значениями, которые удовлетворяют условию callback-функции. Фильтрация значений выполняется по мере необходимости (lazy evaluation). При каждом вызове метода `next()` итератор, будет возвращать следующее подходящее значение исходного итератора, определённое с помощью callback-функции. О том, что такое итератор, можно прочитать в статье [«Итератор»](/js/iterator/).

## Пример




## Как пишется

`Iterator.prototype.filter()` принимает один обязательный аргумент — функцию.

`Iterator.prototype.filter()` возвращает новый итератор.


## Как понять

Итератор, созданный методом `Iterator.prototype.filter()`, использует исходный итератор как источник данных.



У нас есть функция-генератор id, состоящих из 4-х цифр:

```js
function* idGenerator(length = 4) {
  const charset = '0123456789'

  while (true) {
    let id = '';
    for (let i = 0; i < length; i++) {
      const random = Math.floor(Math.random() * charset.length);
      id += charset[random];
    }
    yield id;
  }
}
```

Необходимо получить 10 id-значений в которых одна из цифр повторятся не менее 2 раз.


## Подсказки

