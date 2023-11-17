---
title: "`Atomics`"
description: "Специальный объект для хранения функций, которые могут выполняться независимо и параллельно друг с другом."
authors:
  - doka-dog
related:
  - js/shared-array-buffer
  - js/array-buffer
  - js/arrays
tags:
  - doka
  - placeholder
---

## Кратко

Объект, который хранит атомарные операции и функции, которые отправляют примитивные события. Используется вместе с другим объектом [`SharedArrayBuffer`](/js/shared-array-buffer/).

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
