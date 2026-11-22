---
title: "`TypedArray`"
description: "Объект для представления бинарных данных из буфера."
baseline:
  - group: typed-arrays
    features:
      - javascript.builtins.TypedArray
authors:
  - doka-dog
keywords:
  - typed array
  - indexed collection
  - javascript collection
  - typed array view
related:
  - js/shared-array-buffer
  - js/array-buffer
  - js/data-view
tags:
  - doka
  - placeholder
---

## Кратко

Типизированный массив, в котором содержатся байты. Хотя на первый взгляд `TypedArray` напоминает обычный массив, на самом деле это полноценный объект. С его помощью получаем доступ к двоичным данным из буфера — пространства в памяти, где хранятся бинарные данные. Обычно они находятся в оперативной памяти (Random Access Memory или коротко RAM).

<aside>

🧠 Про память подробнее узнаете из статьи «[Как устроена память](/tools/trivial-memory-model/)».

</aside>

Типизированные массивы `TypedArray` упрощают работу с тяжёлыми данными, например, видео, аудио и анимациями. Их часто используют с различными API — WebGL, Canvas 2D, XMLHttpRequest2 и так далее.

## Пример

```js
let view = new Int8Array(3)

view[0] = 1
view[2] = 6

console.log(view)
// Int8Array(3) [1, 0, 6, buffer: ArrayBuffer(3),
// byteLength: 3, byteOffset: 0, length: 3,
// Symbol(Symbol.toStringTag): 'Int8Array']
```

## Как пишется

Типизированные массивы состоят из буферов и представлений. В буфере содержатся данные, а представление помогает получить доступ к данным из буфера и представить их в виде типизированного массива.

Чтобы создать типизированный массив, сначала создайте буфер с помощью [объекта `ArrayBuffer`](/js/array-buffer/) или [`SharedArrayBuffer`](/js/shared-array-buffer/), а потом его представление объектами `TypedArray` или [`DataView`](/js/data-view/).

Для создания `ArrayBuffer` используйте оператор `new`. В `TypedArray` указывают нужный размер данных, количество элементов и их начальную позицию в буфере. Для этого используют разные [числовые форматы](https://tc39.es/ecma262/multipage/indexed-collections.html#table-the-typedarray-constructors). Например, `Int8Array`, `Uint8Array`, `Float64Array`, `Uint8ClampedArray`.

Можно использовать одновременно несколько представлений `TypedArray` для одного и того же буфера.

## Как понять

_Коллекция в JavaScript_ — это набор данных разного типа. К примеру, в ней могут хранится массивы и объекты. Также коллекция может быть сама по себе специфической структурой данных, если в ней намешано много всего. Они бывают нескольких видов, и `TypedArray` относится к проиндексированным коллекциям.
