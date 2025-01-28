---
title: "`Promise.try()`"
description: "Выполняет функцию и возвращает её результат как промис"
baseline:
  - group: promises
    features:
      - javascript.builtins.Promise.try
authors:
  - vitya-ne
related:
  - ""
tags:
  - doka
---

<aside>

💡 Эта документация связана с понятием [`Promise`](/js/promise/).

</aside>

## Кратко



## Пример


## Как пишется

```js
Promise.try(func, arg1, arg2, ..., argN)
```
`Promise.try()` принимает один обязательный аргумент — функцию, которая будет вызвана синхронно.

Остальные необязательные аргументы — параметры передываемые в функцию.

## Как понять

