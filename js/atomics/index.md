---
title: "`Atomics`"
description: "Специальный объект для хранения функций, которые могут выполняться независимо и параллельно друг с другом."
authors:
  - doka-dog
related:
  - js/weak-ref
  - js/array-isarray
  - js/arrays
tags:
  - doka
  - placeholder
---

## Кратко

Объект, который хранит атомарные операции и функции, отправляющие примитивные события. Используется вместе с другим объектом `SharedArrayBuffer`.

## Пример

```js
const arrayForMultipleThreads = new SharedArrayBuffer(1024)
const threadArrayView = new Uint8Array(sab)

ta[0]
// 0

ta[0] = 5
// 5

Atomics.add(ta, 0, 12)
// 5

Atomics.load(ta, 0)
// 17
```

## Как пишется

В отличие от других объектов, `Atomics` не является конструктором. Его нельзя использовать вместе с оператором `new` или вызывать как функцию. Все свойства и методы `Atomics` статические.
