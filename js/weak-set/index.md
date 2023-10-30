---
title: "`WeakSet`"
description: "Коллекция, в которой временно хранятся уникальные объекты."
authors:
  - doka-dog
keywords:
  - keyed collection
  - javascript collection
related:
  - js/collection-weakmap
  - js/map
  - js/set
tags:
  - doka
  - placeholder
---

## Кратко

Коллекция из пар ключ-значение, которая временно хранит объекты и/или символы. Все элементы уникальные и могут быть добавлены в такую коллекцию один раз. Как и [`WeakMap`](/js/collection-weakmap/), `WeakSet` нужна для сборщика мусора.

## Пример

```js
var ws = new WeakSet()
var obj = {}
var foo = {}

ws.add(window)
ws.add(obj)

ws.has(window); // true
ws.has(foo); // false, foo не добавлен в WeakSet

ws.delete(window) // удаляет window из WeakSet
ws.has(window) // false, window был удалён
```

## Как понять

_Коллекция в JavaScript_ — это набор данных разного типа. К примеру, в ней могут хранится массивы и объекты. Также коллекция может быть сама по себе специфической структурой данных, если в ней намешано много всего. Они бывают нескольких видов, и `WeakSet` относится к ключевым коллекциям.
